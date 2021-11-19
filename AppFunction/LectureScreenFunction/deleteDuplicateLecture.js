import { readTableData } from './ReadTableData';

// 同じデータを追加せず、同じ曜日のデータを上書きし、nullデータを残さない
export default async function deleteDuplicateLecture(selectedLectures) {
  try {
    const day = ['月', '火', '水', '木', '金', '他'];
    const time = [1, 3, 5, 7, 9];
    let registeredValue = [];
    let storedLectures = await readTableData('tableKey');
    storedLectures = JSON.parse(storedLectures);

    // 同じ曜日のデータを上書き・異なる曜日のデータを追加
    function filterLectureData(specificDay, specificTime) {
      // "月1"などを正規表現で定義
      let dayTime = new RegExp(specificDay + String(specificTime));
      storedLectures.filter(storedData => {
        selectedLectures.filter(selectedData => {
          // 曜日または科目名が一致した場合storedLectureの該当データをnullへ変換
          if ((storedData.科目 == selectedData.科目) || (dayTime.test(storedData.曜日時限.slice(0, 2)) && dayTime.test(selectedData.曜日時限.slice(0, 2)))) {
            const numArr = storedLectures.indexOf(storedData);
            delete storedLectures[numArr];
          }
        })
      })
    }

    if (storedLectures === null) {
      registeredValue = selectedLectures;
    }
    else {
      day.filter(aDay => {
        switch (aDay) {
          case '他':
            storedLectures.filter(storedData => {
              selectedLectures.filter(selectedData => {
                // 科目名が一致した場合にstoredLecturesの該当データをnullへ変換
                if (storedData.科目 == selectedData.科目) {
                  const numArr = storedLectures.indexOf(storedData);
                  delete storedLectures[numArr];
                }
              })
            })
            break;
          default:
            time.filter(period => {
              filterLectureData(aDay, period);
            })
            break;
        }
      });

      // sotredLecturesのnull以外のデータとselectedLecturesの全データを追加
      storedLectures.filter(storedLec => {
        if (storedLec != null) {
          registeredValue.push(storedLec);
        }
      });
      selectedLectures.filter(selectedLec => registeredValue.push(selectedLec));
    }
    return JSON.stringify(registeredValue);
  } catch (error) {
    console.log('ファイル名：releteDuplicateLecture.js\n' + 'エラー内容' + error + '\n');
  }
}
