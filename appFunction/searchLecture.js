import ReadData from './readData.js';

// JSONファイルのインポート
function importJsonFiles(lectureFileName) {
  lectureFileName = lectureFileName.replace(/"/g, '');
  lectureFileName = lectureFileName.trim();
  let data;

  try {

    // 文字列を動的に変化させてrequireすることは不可能なので仕方なくswitch文
    switch (lectureFileName) {
      case '総合理工':
        data = require('../assets/firstSemisterLecs/総合理工.json');
        break;
      case '教養教育':
        data = require('../assets/firstSemisterLecs/教養教育.json');
        break;
      case '生物資源':
        data = require('../assets/firstSemisterLecs/生物資源.json');
        break;
      case '人間科学':
        data = require('../assets/firstSemisterLecs/人間科学.json');
        break;
      case '人間社会科学':
        data = require('../assets/firstSemisterLecs/人間社会科学.json');
        break;
      case '教育':
        data = require('../assets/firstSemisterLecs/教育.json');
        break;
      case '教育学':
        data = require('../assets/firstSemisterLecs/教育学.json');
        break;
      case '法文':
        data = require('../assets/firstSemisterLecs/法文.json');
        break;
      case '人文社会学研究科':
        // ここは訂正が必要かも
        data = require('../assets/firstSemisterLecs/人間社会科学.json');
        break;
      case '教育学_教職':
        data = require('../assets/firstSemisterLecs/教育学（教職）.json');
        break;
      case '自然科学':
        data = require('../assets/firstSemisterLecs/自然科学.json');
        break;
      case '総合理工_博士後期':
        data = require('../assets/firstSemisterLecs/総合理工（博士後期）.json');
        break;
      default:
        break;
    }
    console.log('ファイル名： seachLecture.js\n' + lectureFileName + 'のjsonファイルを読み込み\n');
    return data;
  } catch (error) {
    console.log('エラー箇所： seachLecture.js / importJsonFiles\n' + 'エラー内容：' + error + '\n');
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
      lectureFile = importJsonFiles(fileName);
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
