// API Interface for Google Apps Script Backend (Hybrid Logic)

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxU4mw7zNYa4zUO_nIBRMzOkRsh9rB-arkCt2HKyo1M_nFyeGMdjpw_2ICBpHrHZEK-/exec'; 

// ACTIONS TO BE HANDLED BY APPS SCRIPT
const REMOTE_ACTIONS = ['getNews', 'addNews', 'updateNews', 'deleteNews', 'uploadToDrive'];

// Helper to clear all cache variants for a specific action
const clearCacheFamily = (action) => {
  const prefix = `ib_cache_${action}`;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      localStorage.removeItem(key);
      i--; 
    }
  }
};

// Helper wrapper for fetch with 5-minute caching
async function fetchAPI(action, params = {}, method = 'GET') {
  const CACHE_KEY = `ib_cache_${action}_${JSON.stringify(params)}`;
  const CACHE_DURATION = 5 * 60 * 1000; 

  // Only cache public GET requests
  const isPublicGET = method === 'GET' && ['getNews', 'getGallery', 'getSettings', 'getLogs'].includes(action);

  if (isPublicGET) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data; 
      }
    }
  }

  // HYBRID ROUTING LOGIC
  const useRemote = REMOTE_ACTIONS.includes(action) && API_URL;

  if (!useRemote) {
    const data = await handleMockAPI(action, params, method);
    if (isPublicGET) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    }
    return data;
  }

  // REMOTE EXECUTION
  const token = sessionStorage.getItem('adminToken') || '';
  const url = new URL(API_URL);
  url.searchParams.append('action', action);
  
  if (method === 'GET') {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const useHeaders = method !== 'GET';
  
  try {
    const fetchOptions = {
      method,
    };

    if (useHeaders) {
      const token = sessionStorage.getItem('adminToken') || '';
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      fetchOptions.body = JSON.stringify(params);
    }

    const res = await fetch(url.toString(), fetchOptions);

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    if (isPublicGET) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    }

    return data;
  } catch (err) {
    console.error(`Remote API error for ${action}:`, err);
    // FALLBACK TO MOCK ON ERROR TO PREVENT CRACKED PAGE
    return handleMockAPI(action, params, method);
  }
}

// ------ PERSISTENT MOCK DB LOGIC ------ //
const INITIAL_MOCK_DB = {
  news: [
    { id: '1', title: 'Welcome to Ignite Brilliance', category: 'General', summary: 'Connecting you to a shared future.', body: '<p>Loading your news from the shared database...</p>', status: 'Published', date: new Date().toISOString() }
  ],
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80', caption: 'Student Session', category: 'Counselling Sessions', date: new Date().toISOString() },
    { id: '2', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80', caption: 'Career Fair 2025', category: 'Events', date: new Date().toISOString() }
  ],
  settings: {
    contactPhone1: '+91 9456 241 625',
    contactEmail: 'hello@ignitebrilliance.com',
    whatsapp: '+919456241625',
    address: 'Payyavoor Angadi Complex , Block D , Third Floor, Payyavoor-Sreekandapuram Road, 670633',
    heroTagline: 'Kerala\'s Premier Centre for Career Planning & Government Services',
    bannerActive: true,
    bannerText: 'KEAM 2026 registration now open — Contact us for guidance!',
    bannerColor: 'red'
  },
  logs: []
};

// Load or Init MOCK_DB
let MOCK_DB = JSON.parse(localStorage.getItem('ib_mock_db')) || INITIAL_MOCK_DB;

const saveMockDB = () => {
  localStorage.setItem('ib_mock_db', JSON.stringify(MOCK_DB));
};

async function handleMockAPI(action, params, method) {
  await new Promise(r => setTimeout(r, 200)); 
  
  const publicActions = ['login', 'getNews', 'getGallery', 'getSettings', 'subscribe'];
  if (!publicActions.includes(action)) {
    const token = sessionStorage.getItem('adminToken');
    if (!token) throw new Error('Unauthorized');
  }

  const newId = () => Math.random().toString(36).substr(2, 9);
  const logAction = (act, det) => {
    MOCK_DB.logs.unshift({ timestamp: new Date().toISOString(), action: act, details: det });
    if (MOCK_DB.logs.length > 20) MOCK_DB.logs.pop();
    saveMockDB();
  };

  switch(action) {
    case 'login':
      if (params.pass === 'ignite#brilliance*') return { token: 'mock-session-token-' + Date.now() };
      throw new Error('Incorrect password');
      
    case 'getNews': return MOCK_DB.news;
    case 'addNews': 
      const newArticle = { ...params, id: newId(), date: new Date().toISOString() };
      MOCK_DB.news.push(newArticle);
      logAction('Added News', newArticle.title);
      return newArticle;
    case 'updateNews':
      MOCK_DB.news = MOCK_DB.news.map(n => n.id === params.id ? { ...params } : n);
      logAction('Updated News', params.title);
      return { success: true };
    case 'deleteNews':
      MOCK_DB.news = MOCK_DB.news.filter(n => n.id !== params.id);
      logAction('Deleted News', 'ID: ' + params.id);
      return { success: true };

    case 'getGallery': return MOCK_DB.gallery;
    case 'addImage':
      const img = { ...params, id: newId(), date: new Date().toISOString() };
      MOCK_DB.gallery.push(img);
      logAction('Uploaded Image', img.caption || 'No caption');
      return img;
    case 'deleteImage':
      MOCK_DB.gallery = MOCK_DB.gallery.filter(i => i.id !== params.id);
      logAction('Deleted Image', 'ID: ' + params.id);
      return { success: true };

    case 'getSettings': return MOCK_DB.settings;
    case 'updateSettings':
      MOCK_DB.settings = { ...MOCK_DB.settings, ...params };
      logAction('Updated Settings', 'Global settings changed');
      return MOCK_DB.settings;
      
    case 'changePassword':
      logAction('Changed Password', 'Admin password updated');
      return { success: true };

    case 'getLogs': return MOCK_DB.logs.slice(0, 10);
    
    case 'uploadToDrive':
      logAction('Uploaded Local File', params.filename);
      return { url: params.base64, success: true };
      
    case 'subscribe':
      logAction('New Subscriber', params.email);
      return { success: true };

    default: throw new Error('Unknown action: ' + action);
  }
}

export const api = {
  login: (password) => fetchAPI('login', { pass: password }, 'POST'),
  
  getNews: () => fetchAPI('getNews'),
  addNews: async (data) => {
    const res = await fetchAPI('addNews', data, 'POST');
    clearCacheFamily('getNews');
    return res;
  },
  updateNews: async (data) => {
    const res = await fetchAPI('updateNews', data, 'POST');
    clearCacheFamily('getNews');
    return res;
  },
  deleteNews: async (id) => {
    const res = await fetchAPI('deleteNews', { id }, 'POST');
    clearCacheFamily('getNews');
    return res;
  },
  
  getGallery: () => fetchAPI('getGallery'),
  addImage: async (data) => {
    const res = await fetchAPI('addImage', data, 'POST');
    clearCacheFamily('getGallery');
    return res;
  },
  deleteImage: async (id) => {
    const res = await fetchAPI('deleteImage', { id }, 'POST');
    clearCacheFamily('getGallery');
    return res;
  },
  
  getSettings: () => fetchAPI('getSettings'),
  updateSettings: async (data) => {
    const res = await fetchAPI('updateSettings', data, 'POST');
    clearCacheFamily('getSettings');
    return res;
  },
  
  changePassword: (data) => fetchAPI('changePassword', data, 'POST'),
  
  getRecentLogs: () => fetchAPI('getLogs'),

  uploadImage: (base64, filename, type = 'news') => 
    fetchAPI('uploadToDrive', { base64, filename, type }, 'POST'),

  subscribe: (email) => fetchAPI('subscribe', { email }, 'POST')
};
