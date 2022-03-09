import ReadData from '../../../commonUtil/ReadData';
import * as Sentry from 'sentry-expo';

//全角(英数字)→半角に変換
function convertWordsFullToHalfSize(words) {
  let halfSizeWords = [];
  for (const word of words) {
    if (word) {
      const tmp = word.replace(/[！-～]/g, function (word) {
        //UTF-16のコード値を0xFEE0分シフト
        return String.fromCharCode(word.charCodeAt(0) - 0xfee0);
      });
      halfSizeWords.push(tmp);
    }
  }
  return halfSizeWords;
}

function changeSymbolToNumber(searchedWords) {
  let retChangedWords = [];
  for (let selectedWord of searchedWords) {
    // 条件の厳しい順例:IIIがIでヒットするのを防ぐため
    const fiveToBeChangedFromAndTo = [['Ⅴ'], '5'];
    const fourToBeChangedFromAndTo = [['IV', 'Ⅳ'], '4'];
    const threeToBeChangedFromAndTo = [['Ⅲ', 'III'], '3'];
    const twoToBeChangedFromAndTo = [['Ⅱ', 'II'], '2'];
    const oneToBeChangedFromAndTo = [['Ⅰ', 'I', 'Ｉ'], '1'];
    const wordsTobeChangedFromAndTo = [
      fiveToBeChangedFromAndTo,
      fourToBeChangedFromAndTo,
      threeToBeChangedFromAndTo,
      twoToBeChangedFromAndTo,
      oneToBeChangedFromAndTo,
    ];
    for (let wordsArray of wordsTobeChangedFromAndTo) {
      for (let symbolicNumber of wordsArray[0]) {
        const regWord = new RegExp(symbolicNumber);
        const isSymbolicNumberExist = regWord.test(selectedWord);
        if (isSymbolicNumberExist) {
          selectedWord = selectedWord.replace(symbolicNumber, wordsArray[1]);
        }
      }
    }
    retChangedWords.push(selectedWord);
  }
  return retChangedWords;
}

// 通年講義のみ抽出
async function filterYearData(firstData, secondData) {
  const allYearLecture = await firstData.filter((item) => item.開講 == '通年');
  return secondData.concat(allYearLecture);
}

// 通年講義と後期のJSONファイルのインポート
async function loadLectureJSONFiles(lectureFileName) {
  lectureFileName = lectureFileName.replace(/"/g, '');
  lectureFileName = lectureFileName.trim();
  let data;
  let yearAroundData;

  try {
    // 文字列を動的に変化させてrequireすることは不可能なので仕方なくswitch文
    switch (lectureFileName) {
      case '総合理工':
        yearAroundData = require('./assets/FirstSemisterLecs/総合理工.json');
        data = require('./assets/SecondSemisterLecs/総合理工.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教養教育':
        yearAroundData = require('./assets/FirstSemisterLecs/教養教育.json');
        data = require('./assets/SecondSemisterLecs/教養教育.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '生物資源':
        yearAroundData = require('./assets/FirstSemisterLecs/生物資源.json');
        data = require('./assets/SecondSemisterLecs/生物資源.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間科学':
        yearAroundData = require('./assets/FirstSemisterLecs/人間科学.json');
        data = require('./assets/SecondSemisterLecs/人間科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間社会科学':
        yearAroundData = require('./assets/FirstSemisterLecs/人間社会科学.json');
        data = require('./assets/SecondSemisterLecs/人間社会科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育':
        yearAroundData = require('./assets/FirstSemisterLecs/教育.json');
        data = require('./assets/SecondSemisterLecs/教育.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学':
        yearAroundData = require('./assets/FirstSemisterLecs/教育学.json');
        data = require('./assets/SecondSemisterLecs/教育学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '法文':
        yearAroundData = require('./assets/FirstSemisterLecs/法文.json');
        data = require('./assets/SecondSemisterLecs/法文.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '人文科学':
        yearAroundData = require('./assets/FirstSemisterLecs/人文科学.json');
        data = require('./assets/SecondSemisterLecs/人文科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学_教職':
        yearAroundData = require('./assets/FirstSemisterLecs/教育学（教職）.json');
        data = require('./assets/SecondSemisterLecs/教育学（教職）.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '自然科学':
        yearAroundData = require('./assets/FirstSemisterLecs/自然科学.json');
        data = require('./assets/SecondSemisterLecs/自然科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '総合理工_博士後期':
        yearAroundData = require('./assets/FirstSemisterLecs/総合理工（博士後期）.json');
        data = require('./assets/SecondSemisterLecs/総合理工（博士後期）.json');
        data = await filterYearData(yearAroundData, data);
        break;
      default:
        break;
    }
    return data;
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log(
      'エラー箇所: seachLecture.js / loadLectureJSONFiles\n' + error + '\n'
    );
  }
}

// インプットされた文字と学部名から特定の講義を検索
const searchLecture = async (inputedKeyWord) => {
  // 複数のキーワードでの検索に対応, wordsToSearchForは配列の場合有り
  let wordsToSearchFor = '';
  const halfWidthSpace = new RegExp(' ');
  const fullWidthSpace = new RegExp('　');
  if (halfWidthSpace.test(inputedKeyWord)) {
    wordsToSearchFor = inputedKeyWord.split(halfWidthSpace);
  } else if (fullWidthSpace.test(inputedKeyWord)) {
    wordsToSearchFor = inputedKeyWord.split(fullWidthSpace);
  } else {
    wordsToSearchFor = inputedKeyWord;
  }

  //全角(英数字)→半角
  const halfConvertedWords = convertWordsFullToHalfSize(wordsToSearchFor);
  //Ⅰ,Ⅱ,Ⅲなど→1,2,3
  wordsToSearchFor = changeSymbolToNumber(halfConvertedWords);

  try {
    let facultyAndFilesName = await ReadData('facultyName');

    // facultyAndFilesNameを文字列 => 配列変更
    facultyAndFilesName = facultyAndFilesName.split(',');
    let tmp = [];
    facultyAndFilesName.forEach((fileInfo) => {
      tmp.push(fileInfo.replace(/'/g, ''));
    });

    //  tmp[0]にある学部名を削除
    tmp.shift();
    const jsonFileNames = tmp;
    let lectureData = [];
    let lectureFile;

    // for.. of 内ではawait処理を行える
    for (const fileName of jsonFileNames) {
      lectureFile = await loadLectureJSONFiles(fileName);
      for (const word of wordsToSearchFor) {
        lectureFile = await lectureFile.filter(function (item) {
          return item.科目.match(word) || item.担当.match(word);
        });
      }
      for (
        let lectureNumber = 0;
        lectureNumber < lectureFile.length;
        lectureNumber++
      ) {
        lectureData.push(lectureFile[lectureNumber]);
      }
    }
    return lectureData;
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: SearchLecture.js\n' + error + '\n');
  }
};

export default searchLecture;
