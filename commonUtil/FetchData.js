import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';

const fetchSheetData = async (sheetName) => {
  try {
    let data = [];
    if (sheetName == 'Clubs') {
      data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/' +
          Constants.manifest.extra.clubsSheetId +
          '/values/' +
          sheetName +
          '?valueRenderOption=FORMATTED_VALUE&fields=values&key=' +
          Constants.manifest.extra.googleKey
      );
    } else if (sheetName == 'Community') {
      data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/' +
          Constants.manifest.extra.commSheetId +
          '/values/' +
          sheetName +
          '?valueRenderOption=FORMATTED_VALUE&fields=values&key=' +
          Constants.manifest.extra.googleKey
      );
    } else {
      data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/' +
          Constants.manifest.extra.univSheetId +
          '/values/' +
          sheetName +
          '?valueRenderOption=FORMATTED_VALUE&fields=values&key=' +
          Constants.manifest.extra.googleKey
      );
    }
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log(error);
  }
};

export default fetchSheetData;
