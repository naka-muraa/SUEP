const searchData = async (data, InputtedText) => {
  let jsonData = data._W;
  let Data = [];
  for (var i = 0; i < jsonData.length; i++) {
    for (var j = 0; j < jsonData[i].length; j++) {
      if (jsonData[i][j].match(InputtedText)) {
        Data.push(jsonData[i]);
        break;
      }
    }
  }
  return Data;
};

export default searchData;
