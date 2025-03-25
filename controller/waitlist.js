// controller/waitlist.js
import sheets from '../config/sheets.js';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const SHEETS = {
  DISCOVER: process.env.DISCOVER_SHEET_ID

};

// Add validation for sheet IDs
if (!SHEETS.DISCOVER) {
  logger.error('Missing sheet IDs in environment variables:', {
    DISCOVER_SHEET_ID: SHEETS.DISCOVER

  });
  throw new Error('Sheet IDs not properly configured');
}

const formatDiscoverData = (data) => {
  const { fullName, mobile, email, interest} = data;
  return [
    [
      new Date().toISOString(),
      fullName,
      `${mobile}`,
      email,
      interest,
      'Discover Waitlist'

    ]
  ];
}
const appendToSheet = async (sheetId, range, values) => {
  try {
    logger.info('Attempting to append to sheet:', { sheetId, range });

    if (!sheetId) {
      throw new Error('Sheet ID is undefined');
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    logger.info('Successfully appended to sheet:', {
      updatedRange: response.data.updates?.updatedRange,
      updatedRows: response.data.updates?.updatedRows
    });

    return response;
  } catch (error) {
    logger.error('Error appending to sheet:', {
      error: error.message,
      sheetId,
      range
    });
    throw error;
  }
};

export const addDiscoverToWaitlist = async(req, res) => {
  try {
  logger.info('Received discover us waitlist submisson',{
   ...req.body,
   mobile: '***'
  });

  const values = formatDiscoverData(req.body);
  await appendToSheet(SHEETS.DISCOVER, 'Sheet1!A:F', values);  // 'Sheet1 is the bottom tab name(bottom of the sheet)
                                                               //A:F is the range ....

  logger.info('Discover us waitlist added:', {email: req.body.email});

  res.status(200).json({
    success: true,
    message: 'Successfully added to discover waitlist'
  })

  } catch (error) {
    logger.error('Failed to add waitlist', {
      error: error.message,
      stack: error.stack
    })
    res.status(500).json({
      success: false,
      error: 'Failed to add to waitlist',
      details: error.message
    });
  };
};

