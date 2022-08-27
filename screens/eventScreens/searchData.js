const searchData = async (data, InputtedText) => {
  let Data = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (data[i][j].match(InputtedText)) {
        Data.push(data[i]);
        break;
      }
    }
  }
  return Data;
};

export default searchData;
