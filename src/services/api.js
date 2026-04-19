// API Interface for Google Apps Script Backend (Mock Data Fallback for Development)

// To deploy: copy Code.gs to your Google Apps Script project, deploy as web app, and paste the URL below
const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxU4mw7zNYa4zUO_nIBRMzOkRsh9rB-arkCt2HKyo1M_nFyeGMdjpw_2ICBpHrHZEK-/exec'; 
const USE_MOCK = !API_URL; // If no URL provided, we use mock storage for development

// Helper to clear all cache variants for a specific action
const clearCacheFamily = (action) => {
  const prefix = `ib_cache_${action}`;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      localStorage.removeItem(key);
      i--; // Adjust index after removal
    }
  }
};

// Helper wrapper for fetch with 5-minute caching
async function fetchAPI(action, params = {}, method = 'GET') {
  const CACHE_KEY = `ib_cache_${action}_${JSON.stringify(params)}`;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Only cache public GET requests
  const isPublicGET = method === 'GET' && ['getNews', 'getGallery', 'getSettings', 'getLogs'].includes(action);

  if (isPublicGET) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data; // Return fresh cache
      }
    }
  }

  if (USE_MOCK) {
    const data = await handleMockAPI(action, params, method);
    if (isPublicGET) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    }
    return data;
  }

  const token = sessionStorage.getItem('adminToken') || '';
  const url = new URL(API_URL);
  url.searchParams.append('action', action);
  
  if (method === 'GET') {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  try {
    const res = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: method !== 'GET' ? JSON.stringify(params) : undefined,
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // Update cache on success
    if (isPublicGET) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    }

    return data;
  } catch (err) {
    // If fetch fails, try to return stale cache as fallback
    if (isPublicGET) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        console.warn('API fetch failed, using stale cache fallback');
        return JSON.parse(cached).data;
      }
    }
    throw err;
  }
}

// ------ MOCK API LOGIC ------ //
const MOCK_DB = {
  news: [
    { id: '1', title: 'KEAM 2026 dates announced', category: 'Exam News', summary: 'The official dates for KEAM 2026 are out.', body: '<p>The Kerala Engineering Architecture Medical (KEAM) 2026 dates have been officially announced. Students requested to start preparation.</p>', status: 'Published', date: new Date().toISOString() },
    { id: '2', title: 'Scholarship up to 50% for top scorers', category: 'Scholarship', summary: 'Top students can avail massive discounts.', body: '<p>Announcing 50% scholarships based on merit.</p>', status: 'Published', date: new Date().toISOString() }
  ],
  gallery: [
    { id: '1', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80', caption: 'Student Session', category: 'Counselling Sessions', date: new Date().toISOString() },
    { id: '2', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80', caption: 'Career Fair 2025', category: 'Events', date: new Date().toISOString() }
  ],
  settings: {
    contactPhone1: '+91 98765 43210',
    contactEmail: 'hello@ignitebrilliance.com',
    whatsapp: '+919876543210',
    address: 'Payyavoor Angadi Complex , Block D , Third Floor, Payyavoor-Sreekandapuram Road, 670633',
    heroTagline: 'Kerala\'s Premier Centre for Career Planning & Government Services',
    bannerActive: true,
    bannerText: 'KEAM 2026 registration now open — Contact us for guidance!',
    bannerColor: 'red'
  },
  logs: [
    { timestamp: new Date().toISOString(), action: 'System Initialization', details: 'Mock DB loaded' }
  ]
};

async function handleMockAPI(action, params, method) {
  await new Promise(r => setTimeout(r, 500)); // Simulate network
  
  // Auth Check
  const publicActions = ['login', 'getNews', 'getGallery', 'getSettings', 'subscribe'];
  if (!publicActions.includes(action)) {
    const token = sessionStorage.getItem('adminToken');
    if (!token) throw new Error('Unauthorized');
  }

  // Generate unique ID
  const newId = () => Math.random().toString(36).substr(2, 9);
  const logAction = (act, det) => MOCK_DB.logs.unshift({ timestamp: new Date().toISOString(), action: act, details: det });

  switch(action) {
    case 'login':
      if (params.pass === 'admin123') return { token: 'mock-session-token-' + Date.now() };
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

    case 'getLogs': return MOCK_DB.logs.slice(0, 5); // Return last 5
    
    case 'uploadToDrive':
      logAction('Uploaded Mock File', params.filename);
      // For local development without a backend, we just return the raw base64 string 
      // so the browser renders it perfectly without needing external storage!
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
