import { google } from 'googleapis';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function addEmailToSheet(email: string) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A:B'; // Assuming emails go in column A, timestamp in column B

    const values = [[email, new Date().toISOString()]];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    return { success: false, error: 'Failed to add email to sheet' };
  }
}

export async function checkEmailExists(email: string) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A:A';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values || [];
    const emails = values.flat().map(row => row.toString().toLowerCase());
    
    return emails.includes(email.toLowerCase());
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
} 