/**
 * Ignite Brilliance - MASTER BACKEND (Self-Healing News Feed)
 * 1. Paste your Sheet ID below.
 * 2. Deploy > New Deployment > Web App > Who has access: Anyone.
 */

const SHEET_ID = 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID'; 

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  const output = ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
  const action = e.parameter.action;
  
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('News') || ss.insertSheet('News');
    
    // Ensure Headers exist
    if (sheet.getLastColumn() === 0) {
      sheet.appendRow(['id', 'title', 'category', 'summary', 'body', 'thumbnailUrl', 'status', 'date', 'pinned']);
    }

    if (action === 'getNews') {
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const news = data.slice(1).map(row => {
        let obj = {};
        headers.forEach((h, i) => obj[h] = row[i]);
        return obj;
      });
      return output.setContent(JSON.stringify(news));
    }

    if (action === 'addNews' || action === 'updateNews') {
      let params;
      if (method === 'POST') {
        params = JSON.parse(e.postData.contents);
      } else {
        params = e.parameter;
      }

      if (action === 'addNews') {
        params.id = Utilities.getUuid();
        params.date = new Date().toISOString();
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        const row = headers.map(h => params[h] || '');
        sheet.appendRow(row);
        return output.setContent(JSON.stringify({ success: true, id: params.id }));
      }
    }
    
    throw new Error("Action not handled: " + action);
  } catch (error) {
    return output.setContent(JSON.stringify({ error: error.message }));
  }
}
