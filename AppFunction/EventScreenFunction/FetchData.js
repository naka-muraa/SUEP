import Constants from 'expo-constants';

const DataAPI = async (sheetName) => {
  try {
    if (sheetName == "Clubs") {
      var data = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/" + Constants.manifest.extra.clubsSheetId + "/values/" + sheetName + "?valueRenderOption=FORMATTED_VALUE&fields=values&key=" + Constants.manifest.extra.googleKey
      );
    }
    else if (sheetName == "Community") {
      var data = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/" + Constants.manifest.extra.commSheetId + "/values/" + sheetName + "?valueRenderOption=FORMATTED_VALUE&fields=values&key=" + Constants.manifest.extra.googleKey
      );
    }
    else {
      var data = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/" + Constants.manifest.extra.univSheetId + "/values/" + sheetName + "?valueRenderOption=FORMATTED_VALUE&fields=values&key=" + Constants.manifest.extra.googleKey
      );
    }
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch {
    console.log("Error");
  }
};
export default DataAPI;
