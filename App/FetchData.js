import Constants from 'expo-constants';

const DataAPI = async (sheetName) => {
  try {
    let data = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/" + Constants.manifest.extra.sheetId + "/values/" + sheetName + "?valueRenderOption=FORMATTED_VALUE&fields=values&key=" + Constants.manifest.extra.googleKey
    );
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => data);
    return Data;
  } catch {
    console.log("Error");
  }
};
export default DataAPI;
