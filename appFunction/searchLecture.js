import ReadData from './readData.js';

// 通年講義のみ抽出
async function filterYearData(firstData, secondData) {
  const allYearLecture = await firstData.filter(item => item.開講 == "通年");
  return secondData.concat(allYearLecture);
}


// 通年講義と後期のJSONファイルのインポート
async function importJsonFiles(lectureFileName) {
  lectureFileName = lectureFileName.replace(/"/g, '');
  lectureFileName = lectureFileName.trim();
  let data;
  let yearAroundData;

  try {

    // 文字列を動的に変化させてrequireすることは不可能なので仕方なくswitch文
    switch (lectureFileName) {
      case '総合理工':
        yearAroundData = require('../assets/firstSemisterLecs/総合理工.json');
        data = require("../assets/secondSemisterLecs/総合理工 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教養教育':
        yearAroundData = require('../assets/firstSemisterLecs/教養教育.json');
        data = require("../assets/secondSemisterLecs/教養教育 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '生物資源':
        yearAroundData = require('../assets/firstSemisterLecs/生物資源.json');
        data = require("../assets/secondSemisterLecs/生物資源 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間科学':
        yearAroundData = require('../assets/firstSemisterLecs/人間科学.json');
        data = require("../assets/secondSemisterLecs/人間科学 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間社会科学':
        yearAroundData = require('../assets/firstSemisterLecs/人間社会科学.json');
        data = require("../assets/secondSemisterLecs/人間社会科学  .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育':
        yearAroundData = require('../assets/firstSemisterLecs/教育.json');
        data = require("../assets/secondSemisterLecs/教育 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学':
        yearAroundData = require('../assets/firstSemisterLecs/教育学.json');
        data = require("../assets/secondSemisterLecs/教育学.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '法文':
        yearAroundData = require('../assets/firstSemisterLecs/法文.json');
        data = require("../assets/secondSemisterLecs/法文 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '人文社会学研究科':
        yearAroundData = require('../assets/firstSemisterLecs/人文科学.json');
        data = require("../assets/secondSemisterLecs/人文科学 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学_教職':
        yearAroundData = require('../assets/firstSemisterLecs/教育学（教職）.json');
        data = require("../assets/secondSemisterLecs/教育学（教職）.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '自然科学':
        yearAroundData = require('../assets/firstSemisterLecs/自然科学.json');
        data = require("../assets/secondSemisterLecs/自然科学 .json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '総合理工_博士後期':
        yearAroundData = require('../assets/firstSemisterLecs/総合理工（博士後期）.json');
        data = require("../assets/secondSemisterLecs/総合理工（博士後期） .json");
        data = await filterYearData(yearAroundData, data);
        break;
      default:
        break;
    }
    return data;
  } catch (error) {
  }
}

// インプットされた文字と学部名から特定の講義を検索
const searchLecture = async (inputedKeyWord) => {
  let keyWords = inputedKeyWord.split(' ');

  // 複数のキーワード検索を行う
  if (keyWords[0] == inputedKeyWord) {
    keyWords = inputedKeyWord.split('　');
    if (keyWords[0] == inputedKeyWord) {

      // 空白でキーワードが分割されない場合
      keyWords = keyWords[0]
    }
  }

  try {
    let readFacultyInfo =  await ReadData('facultyName');

    // readFacultyInfoを文字列 => 配列変更
    readFacultyInfo = readFacultyInfo.split(',');
    let readFileName = [];
    readFacultyInfo.forEach(fileInfo => {
      readFileName.push(fileInfo.replace(/'/g, ''));
    });

    //  readFileName[0]は学部名
    readFileName.shift();
    let lectureData = [];
    let lectureFile;

    // for.. of 内ではawait処理を行える
    for (const fileName of readFileName) {
      lectureFile = await importJsonFiles(fileName);
      for (const word of keyWords) {
        lectureFile = await lectureFile.filter(function (item) {
          return item.科目.match(word) || item.担当.match(word);
        })
      }
      for (let lectureNumber = 0; lectureNumber < lectureFile.length; lectureNumber++) {
        lectureData.push(lectureFile[lectureNumber]);
      }
    }
    return lectureData;
  } catch (error) {
    console.log('ファイル名：seachLecture.js\n' + 'エラー：' + error + '\n');
  }
}

export default searchLecture;
