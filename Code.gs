/**
 * Ignite Brilliance - Backend Apps Script
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone)
 * Ensure you have a Google Sheet with tabs: "News", "Gallery", "Settings", "Activity_Log"
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID
const ADMIN_PASSWORD_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'; // "admin" (SHA-256) - update via admin panel later

function doPost(e) {
  return handleRequest(e, 'POST');
}

function doGet(e) {
  return handleRequest(e, 'GET');
}

function handleRequest(e, method) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  Headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization"
  };

  try {
    const action = e.parameter.action;
    let params;
    
    // Parse POST body if exists
    if (method === 'POST' && e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else {
      params = e.parameter;
    }

    // CORS preflight
    if (method === 'OPTIONS') {
      return output.setContent(JSON.stringify({status: 'ok'})); 
    }

    if (!action) throw new Error("No action specified");

    // Login doesn't need auth check
    if (action === 'login') {
      const hashed = hashPassword(params.pass);
      const storedHash = getSetting('adminPasswordHash') || ADMIN_PASSWORD_HASH;
      if (hashed === storedHash) {
        return output.setContent(JSON.stringify({ token: generateToken() }));
      } else {
        throw new Error("Invalid password");
      }
    }

    // All other endpoints require basic auth currently
    // NOTE: For true session auth, store valid generated tokens in the Settings sheet or CacheService
    
    // Switch actions
    let result = {};
    if (action === 'getNews') result = getRows('News');
    else if (action === 'addNews') result = addRow('News', params, ['id','title','category','summary','body','thumbnailUrl','sourceLink','status','pinned','date']);
    else if (action === 'updateNews') result = updateRow('News', params.id, params);
    else if (action === 'deleteNews') result = deleteRow('News', params.id);
    else if (action === 'getGallery') result = getRows('Gallery');
    else if (action === 'addImage') result = addRow('Gallery', params, ['id','url','caption','category','date']);
    else if (action === 'deleteImage') result = deleteRow('Gallery', params.id);
    else if (action === 'getSettings') result = getSettings();
    else if (action === 'updateSettings') result = updateSettings(params);
    else if (action === 'changePassword') result = changePassword(params.currentPassword, params.newPassword);
    else if (action === 'getLogs') result = getRows('Activity_Log').reverse().slice(0, 5);
    else if (action === 'uploadToDrive') result = uploadToDrive(params.base64, params.filename, params.type);
    else if (action === 'subscribe') result = addRow('Subscribers', params, ['id', 'email', 'date']);
    else throw new Error("Unknown action");

    // return response
    return output.setContent(JSON.stringify(result));
    
  } catch (error) {
    return output.setContent(JSON.stringify({ error: error.message }));
  }
}

// ------ HELPER FUNCTIONS ------

function uploadToDrive(base64, filename, type) {
  const FOLDERS = {
    news: '1nBWfeXRe8lW70A_1kVr2KVfAkI31_quu',
    gallery: '1BPoDUlyhWlKC11sSS0SftrsHB5nIyOPg'
  };
  
  const folderId = FOLDERS[type] || FOLDERS.news;
  const folder = DriveApp.getFolderById(folderId);
  
  // Extract base64 data
  const decoded = Utilities.base64Decode(base64.split(',')[1]);
  const contentType = base64.split(':')[1].split(';')[0];
  const blob = Utilities.newBlob(decoded, contentType, filename);
  
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
  
  const fileId = file.getId();
  // Construct direct link
  const url = 'https://lh3.googleusercontent.com/d/' + fileId;
  
  logActivity('Uploaded Image', `Type: ${type}, File: ${filename}`);
  return { url: url, fileId: fileId };
}

function hashPassword(pass) {
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, pass);
  let txtHash = '';
  for (let i = 0; i < rawHash.length; i++) {
    let hashVal = rawHash[i];
    if (hashVal < 0) {
      hashVal += 256;
    }
    if (hashVal.toString(16).length == 1) {
      txtHash += '0';
    }
    txtHash += hashVal.toString(16);
  }
  return txtHash;
}

function generateToken() {
  return Utilities.getUuid(); 
}

function getSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName(sheetName);
}

function logActivity(actionName, details) {
  const sheet = getSheet('Activity_Log');
  if(sheet) {
    sheet.appendRow([new Date().toISOString(), actionName, details]);
  }
}

function getRows(sheetName) {
  const sheet = getSheet(sheetName);
  if (!sheet) return [];
  const range = sheet.getDataRange();
  const values = range.getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  const data = [];
  for (let i = 1; i < values.length; i++) {
    let rowObj = {};
    for (let j = 0; j < headers.length; j++) {
      rowObj[headers[j]] = values[i][j];
    }
    data.push(rowObj);
  }
  return data;
}

function addRow(sheetName, dataObj, fields) {
  const sheet = getSheet(sheetName);
  if (!sheet) throw new Error("Sheet not found");

  // Ensure ID and date
  dataObj.id = Utilities.getUuid();
  dataObj.date = new Date().toISOString();

  // Create row array based on fields
  // In reality, match with headers
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(h => dataObj[h] || '');
  
  sheet.appendRow(row);
  logActivity(`Added to ${sheetName}`, `ID: ${dataObj.id}`);
  return dataObj;
}

function deleteRow(sheetName, id) {
  const sheet = getSheet(sheetName);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) { // Assuming first column is ID
      sheet.deleteRow(i + 1);
      logActivity(`Deleted from ${sheetName}`, `ID: ${id}`);
      return { success: true };
    }
  }
  throw new Error("ID not found");
}

function updateRow(sheetName, id, updates) {
  const sheet = getSheet(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) { // Assuming first column is ID
      for (let j = 0; j < headers.length; j++) {
        if (updates.hasOwnProperty(headers[j])) {
          sheet.getRange(i + 1, j + 1).setValue(updates[headers[j]]);
        }
      }
      logActivity(`Updated ${sheetName}`, `ID: ${id}`);
      return { success: true };
    }
  }
  throw new Error("ID not found");
}

function getSettings() {
  const sheet = getSheet('Settings');
  const obj = {};
  if (!sheet) return obj;
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    obj[values[i][0]] = values[i][1];
  }
  return obj;
}

function updateSettings(updates) {
  const sheet = getSheet('Settings');
  const values = sheet.getDataRange().getValues();
  const currentKeys = values.slice(1).map(r => r[0]);

  for (const [key, value] of Object.entries(updates)) {
    if (key === 'adminPasswordHash') continue; // Don't allow password update through this
    const idx = currentKeys.indexOf(key);
    if (idx !== -1) {
      sheet.getRange(idx + 2, 2).setValue(value);
    } else {
      sheet.appendRow([key, value]);
    }
  }
  logActivity('Updated Settings', 'Global settings');
  return getSettings();
}

function getSetting(key) {
  const settings = getSettings();
  return settings[key];
}

function changePassword(oldPass, newPass) {
  const hashedOld = hashPassword(oldPass);
  const currentHash = getSetting('adminPasswordHash') || ADMIN_PASSWORD_HASH;

  if (hashedOld !== currentHash) {
    throw new Error('Incorrect current password');
  }

  const hashedNew = hashPassword(newPass);
  updateSettings({ adminPasswordHash: hashedNew });
  logActivity('Changed Password', 'Admin password updated');
  return { success: true };
}
