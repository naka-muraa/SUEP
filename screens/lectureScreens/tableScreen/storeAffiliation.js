import * as Sentry from 'sentry-expo';
import saveData from './../../../commonUtil/saveData';

// 所属先と参照するファイル名の保存
const storeAffiliation = (facultyName) => {
  try {
    switch (facultyName) {
      case '生物資源科学部':
        // キー, '学部名, 参照するファイル名（複数）'
        saveData(['facultyName', '生物資源科学部, 生物資源, 教養教育']);
        break;
      case '総合理工学部':
        saveData(['facultyName', '総合理工学部, 総合理工, 教養教育']);
        break;
      case '人間科学部':
        saveData([
          'facultyName',
          '人間科学部, 教養教育, 人間科学, 人間社会科学',
        ]);
        break;
      case '教育学部':
        saveData(['facultyName', '教育学部, 教育, 教育学, 教養教育']);
        break;
      case '法文学部':
        saveData(['facultyName', '法文学部, 法文, 教養教育']);
        break;
      case '人文社会科学研究科':
        saveData(['facultyName', '人文社会科学研究科, 人文科学']);
        break;
      case '人間社会科学研究科':
        saveData(['facultyName', '人間社会科学研究科, 人間社会科学']);
        break;
      case '教育学研究科':
        saveData(['facultyName', '教育学研究科, 教育学, 教育学_教職']);
        break;
      case '総合理工学研究科':
        saveData(['facultyName', '総合理工研究科, 総合理工_博士後期']);
        break;
      case '自然科学研究科':
        saveData(['facultyName', '自然科学研究科, 自然科学']);
        break;
      default:
        break;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名:storeAffiliation.js\n' + error + '\n');
  }
};

export default storeAffiliation;
