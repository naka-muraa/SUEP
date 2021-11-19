import ReadData from './readData.js';

//全角(英数字)→半角に変換
function wordFormatFullTohalfSize(word) {
  let halfWord = word.replace(/[！-～]/g,
    function (word) {
      //UTF-16のコード値を0xFEE0分シフト
      return String.fromCharCode(word.charCodeAt(0) - 0xFEE0);
    }
  );
  return halfWord;
}

//Ⅰ,Ⅱ,Ⅲ など→1,2,3に変換
function changeSymbolToNumber(word) {
  let is_search_Ⅰ = word.search('Ⅰ');
  let is_search_I = word.search('I');
  let is_search_Ｉ = word.search('Ｉ');
  let is_search_Ⅱ = word.search('Ⅱ');
  let is_search_II = word.search('II');
  let is_search_Ⅲ = word.search('Ⅲ');
  let is_search_III = word.search('III');
  let is_search_IV = word.search('IV');
  let is_search_Ⅳ = word.search('Ⅳ');
  let is_search_Ⅴ = word.search('Ⅴ');

  //上から条件の厳しい順　例:IIIがIでヒットするのを防ぐため
  if (is_search_Ⅴ != -1) { return (word.replace('Ⅴ', '5')) };
  if (is_search_IV != -1) { return (word.replace('IV', '4')) };
  if (is_search_Ⅳ != -1) { return (word.replace('Ⅳ', '4')) };
  if (is_search_Ⅲ != -1) { return (word.replace('Ⅲ', '3')) };
  if (is_search_III != -1) { return (word.replace('III', '3')) };
  if (is_search_Ⅱ != -1) { return (word.replace('Ⅱ', '2')) };
  if (is_search_II != -1) { return (word.replace('II', '2')) };
  if (is_search_Ⅰ != -1) { return (word.replace('Ⅰ', '1')) };
  if (is_search_I != -1) { return (word.replace('I', '1')) };
  if (is_search_Ｉ != -1) { return (word.replace('Ｉ', '1')) };
  //どの条件にも該当しない場合
  return word;
}

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
        yearAroundData = require('../../Assets/FirstSemisterLecs/総合理工.json');
        data = require("../../Assets/SecondSemisterLecs/総合理工.json");
        data = await filterYearData(lecsData[0], lecsData[1]);
        break;
      case '教養教育':
        yearAroundData = require('../../Assets/FirstSemisterLecs/教養教育.json');
        data = require("../../Assets/SecondSemisterLecs/教養教育.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '生物資源':
        yearAroundData = require('../../Assets/FirstSemisterLecs/生物資源.json');
        data = require("../../Assets/SecondSemisterLecs/生物資源.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間科学':
        yearAroundData = require('../../Assets/FirstSemisterLecs/人間科学.json');
        data = require("../../Assets/SecondSemisterLecs/人間科学.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間社会科学':
        yearAroundData = require('../../Assets/FirstSemisterLecs/人間社会科学.json');
        data = require("../../Assets/SecondSemisterLecs/人間社会科学.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育':
        yearAroundData = require('../../Assets/FirstSemisterLecs/教育.json');
        data = require("../../Assets/SecondSemisterLecs/教育.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学':
        yearAroundData = require('../../Assets/FirstSemisterLecs/教育学.json');
        data = require("../../Assets/SecondSemisterLecs/教育学.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '法文':
        yearAroundData = require('../../Assets/FirstSemisterLecs/法文.json');
        data = require("../../Assets/SecondSemisterLecs/法文.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '人文社会学研究科':
        yearAroundData = require('../../Assets/FirstSemisterLecs/人文科学.json');
        data = require("../../Assets/SecondSemisterLecs/人文科学.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学_教職':
        yearAroundData = require('../../Assets/FirstSemisterLecs/教育学（教職）.json');
        data = require("../../Assets/SecondSemisterLecs/教育学（教職）.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '自然科学':
        yearAroundData = require('../../Assets/FirstSemisterLecs/自然科学.json');
        data = require("../../Assets/SecondSemisterLecs/自然科学.json");
        data = await filterYearData(yearAroundData, data);
        break;
      case '総合理工_博士後期':
        yearAroundData = require('../../Assets/FirstSemisterLecs/総合理工（博士後期）.json');
        data = require("../../Assets/SecondSemisterLecs/総合理工（博士後期）.json");
        data = await filterYearData(yearAroundData, data);
        break;
      default:
        break;
    }
    return data;
  } catch (error) {
    console.log('エラー箇所： seachLecture.js / importJsonFiles\n' + 'エラー内容：' + error + '\n');
  }
}

// インプットされた文字と学部名から特定の講義を検索
const searchLecture = async (inputedKeyWord) => {
  let removalBlankWords = inputedKeyWord.split(' ');

  //全角(英数字)→半角
  let halfFormatWords = wordFormatFullTohalfSize(removalBlankWords[0]);
  //Ⅰ,Ⅱ,Ⅲなど→1,2,3
  let keyWords = changeSymbolToNumber(halfFormatWords);

  // 複数のキーワード検索を行う
  if (keyWords[0] == inputedKeyWord) {
    keyWords = inputedKeyWord.split('　');
    if (keyWords[0] == inputedKeyWord) {

      // 空白でキーワードが分割されない場合
      keyWords = keyWords[0]
    }
  }

  try {
    let readFacultyInfo = await ReadData('facultyName');

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
    console.log('ファイル名：SearchLecture.js\n' + 'エラー：' + error + '\n');
  }
}

export default searchLecture;
