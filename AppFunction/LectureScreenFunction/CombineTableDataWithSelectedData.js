import { readTableData } from './ReadTableData';
import * as Sentry from 'sentry-expo';

function filterLectureData(specificDay, specificTime, storedTableData, selectedLectures) {

  // "月1"などを正規表現で定義
  const dayTime = new RegExp(specificDay + String(specificTime));
  storedTableData.filter(storedData => {
    selectedLectures.filter(selectedData => {

      // 曜日が一致した場合storedLectureの該当データをnullへ変換
      if (dayTime.test(storedData.曜日時限.slice(0, 2)) && dayTime.test(selectedData.曜日時限.slice(0, 2))) {
        const numArr = storedTableData.indexOf(storedData);
        delete storedTableData[numArr];
      }
    })
  })
}

const fetchAllData = (storageKey) => {
  const calledData = readTableData(storageKey);
  return calledData
}

// 同じデータを追加せず、同じ曜日のデータを上書きし、nullデータを残さない
export default async function CombineTableDataWithSelectedData(selectedLectures) {
  console.log('combineファイルの引数:' + JSON.stringify(selectedLectures));
  try {
    const day = ['月', '火', '水', '木', '金', '他'];
    const time = [1, 3, 5, 7, 9];
    let dataTobeRegistered = [];
    let storedTableData = [];
    let otherLectureData = [];
    const keys = ['tableKey', 'otherLectureKey'];

    // await Promise.all(引数)で引数の処理が完了するまで処理を止める
    const allData = await Promise.all(keys.map(key => fetchAllData(key)));
    storedTableData = allData[0];
    otherLectureData = allData[1];
    console.log('テーブルデータ:' + storedTableData + '\n')
    console.log('他データ:' + otherLectureData + '\n');

      if ((storedTableData == null || storedTableData == undefined) && (otherLectureData == null || otherLectureData == undefined)) {
        dataTobeRegistered = selectedLectures;
      }
      else {
        otherLectureData = JSON.parse(otherLectureData);
        storedTableData = JSON.parse(storedTableData);
        otherLectureData.filter(lecture => {
          storedTableData.push(lecture)
        });

        day.filter(aDay => {
          switch (aDay) {
            case '他':
              storedTableData.filter(storedData => {
                selectedLectures.filter(selectedData => {

                  // 科目名が一致した場合にstoredTableDataの該当データをnullへ変換
                  if (storedData.科目 == selectedData.科目) {
                    const numArr = storedTableData.indexOf(storedData);
                    delete storedTableData[numArr];
                  }
                })
              })
              break;
            default:
              time.filter(period => {

                // 同じ曜日のデータを上書き
                filterLectureData(aDay, period, storedTableData, selectedLectures);
              })
              break;
          }
        });

        // sotredLecturesのnull以外のデータとselectedLecturesの全データを追加
        storedTableData.filter(storedLec => {
          if (storedLec != null) {
            dataTobeRegistered.push(storedLec);
          }
        });

        selectedLectures.filter(selectedLec => dataTobeRegistered.push(selectedLec));
      }
      return dataTobeRegistered;
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: CombineTableDataWithSelectedData.js\n' + 'エラー内容' + error + '\n');
  }
}
