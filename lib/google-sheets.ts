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
    const range = 'Sheet1!A:B'; // Email and timestamp

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

export async function updateUserData(email: string, userData: {
  name: string;
  background: string;
  learningGoals: string;
  experienceLevel: string;
  learningPreferences: string;
}) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    // First, find the row with the email
    const findRange = 'Sheet1!A:A';
    const findResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: findRange,
    });

    const values = findResponse.data.values || [];
    const rowIndex = values.findIndex(row => row[0] === email);
    
    if (rowIndex === -1) {
      return { success: false, error: 'Email not found' };
    }

    // Update the row with additional data (columns C through G)
    const updateRange = `Sheet1!C${rowIndex + 1}:G${rowIndex + 1}`;
    const updateValues = [[
      userData.name,
      userData.background,
      userData.learningGoals,
      userData.experienceLevel,
      userData.learningPreferences
    ]];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: updateRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: updateValues,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user data:', error);
    return { success: false, error: 'Failed to update user data' };
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
    const emails = values.flat().map((row: any) => row.toString().toLowerCase());
    
    return emails.includes(email.toLowerCase());
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
} 