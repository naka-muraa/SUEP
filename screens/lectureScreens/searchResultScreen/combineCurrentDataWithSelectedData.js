//TODO: 同じ曜日、時限の科目を削除する機能をこの関数から切り離す
import readTableData from '../../../commonUtil/readTableData'
import * as Sentry from 'sentry-expo';

function deleteDeplicateTableLectureData(
  specificDay,
  specificTime,
  tableData,
  selectedLectures
) {
  // "月1"などを正規表現で定義
  const dayTime = new RegExp(specificDay + String(specificTime));
  tableData.filter((storedData) => {
    selectedLectures.filter((selectedData) => {
      // 曜日が一致した場合storedLectureの該当データをnullへ変換
      if (
        dayTime.test(storedData.曜日時限.slice(0, 2)) &&
        dayTime.test(selectedData.曜日時限.slice(0, 2))
      ) {
        const numArr = tableData.indexOf(storedData);
        delete tableData[numArr];
      }
    });
  });
}

const fetchAllData = (storageKey) => {
  const calledData = readTableData(storageKey);
  return calledData;
};

// 同じデータを追加せず、同じ曜日のデータを上書きし、nullデータを残さない
export default async function CombineCurrentDataWithSelectedData(
  selectedLectures
) {
  try {
    const day = ['月', '火', '水', '木', '金', '他'];
    const time = [1, 3, 5, 7, 9];
    let combinedData = [];
    let storedPlainTableData = [];
    let otherLectureData = [];
    let allStoredLectureData = [];
    const keys = ['plainTableDataKey', 'otherLectureKey'];

    // await Promise.all(引数)で引数の処理が完了するまで処理を止める
    const allData = await Promise.all(keys.map((key) => fetchAllData(key)));
    storedPlainTableData = allData[0];
    otherLectureData = allData[1];

    if (storedPlainTableData == null && otherLectureData == null) {
      combinedData = selectedLectures;
    } else {
      if (otherLectureData != null) {
        otherLectureData = JSON.parse(otherLectureData);
        otherLectureData.filter((lecture) => {
          allStoredLectureData.push(lecture);
        });
      }
      storedPlainTableData = storedPlainTableData
        ? JSON.parse(storedPlainTableData)
        : [];
      if (storedPlainTableData != null) {
        storedPlainTableData.filter((lecture) => {
          allStoredLectureData.push(lecture);
        });
      }

      day.filter((aDay) => {
        switch (aDay) {
          // その他の講義データの処理
          case '他':
            allStoredLectureData.filter((storedData) => {
              selectedLectures.filter((selectedData) => {
                // 以前保存したデータと同じデータを登録しようとした場合、storedPlainTableDataの該当データをnullへ変換
                if (storedData.科目 == selectedData.科目) {
                  const arrayNumber = allStoredLectureData.indexOf(storedData);
                  delete allStoredLectureData[arrayNumber];
                }
              });
            });
            break;

          // 月～金の講義データの処理
          default:
            time.filter((period) => {
              deleteDeplicateTableLectureData(
                aDay,
                period,
                allStoredLectureData,
                selectedLectures
              );
            });
            break;
        }
      });

      // 保存されていたデータと今回選んだデータの両方を連結
      allStoredLectureData.filter((storedLec) => {
        if (storedLec != null) {
          combinedData.push(storedLec);
        }
      });
      selectedLectures.filter((selectedLec) => combinedData.push(selectedLec));
    }
    return combinedData;
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log(
      'ファイル名: CombineTableDataWithSelectedData.js\n' +
        'エラー内容' +
        error +
        '\n'
    );
  }
}
