import * as Sentry from 'sentry-expo';

export default async function ConvertDataForTableScreen(
  lecturesToBeDisplayedOnTable
) {
  try {
    const firstRowItem = [
      { 曜日: '' },
      { 曜日: '月' },
      { 曜日: '火' },
      { 曜日: '水' },
      { 曜日: '木' },
      { 曜日: '金' },
    ];
    let secondRowItem = [
      { period: '1', startTime: '9:30', endTime: '10:10' },
      {},
      {},
      {},
      {},
      {},
    ];
    let thirdRowItem = [
      { period: '2', startTime: '10:25', endTime: '12:05' },
      {},
      {},
      {},
      {},
      {},
    ];
    let fourthRowItem = [
      { period: '3', startTime: '13:00', endTime: '14:40' },
      {},
      {},
      {},
      {},
      {},
    ];
    let fifthRowItem = [
      { period: '4', startTime: '14:55', endTime: '16:35' },
      {},
      {},
      {},
      {},
      {},
    ];
    let sixthRowItem = [
      { period: '5', startTime: '16:50', endTime: '18:30' },
      {},
      {},
      {},
      {},
      {},
    ];
    let allRowItems = [];
    let convertedData = [];
    let jsonFormatedData = [];
    const days = ['月', '火', '水', '木', '金'];
    const periods = [1, 3, 5, 7, 9];
    if (
      lecturesToBeDisplayedOnTable != null &&
      lecturesToBeDisplayedOnTable != undefined
    ) {
      lecturesToBeDisplayedOnTable.filter((lectureData) => {
        periods.filter((period) => {
          for (const [dayNumber, day] of days.entries()) {
            const dayAndTime = new RegExp(day + String(period));
            const dayTimeIsIncluded = dayAndTime.test(lectureData.曜日時限);
            if (dayTimeIsIncluded) {
              let periodOneIsTrulyIncluded;

              //当てはまる要素を特定の行のアイテムに追加
              switch (period) {
                case 1:
                  periodOneIsTrulyIncluded = dayAndTime.test(
                    lectureData.曜日時限.slice(0, 2)
                  );
                  if (periodOneIsTrulyIncluded) {
                    secondRowItem[dayNumber + 1] = lectureData;
                  }
                  break;
                case 3:
                  thirdRowItem[dayNumber + 1] = lectureData;
                  break;
                case 5:
                  fourthRowItem[dayNumber + 1] = lectureData;
                  break;
                case 7:
                  fifthRowItem[dayNumber + 1] = lectureData;
                  break;
                case 9:
                  sixthRowItem[dayNumber + 1] = lectureData;
                  break;
                default:
                  break;
              }
            }
          }
        });
      });
      allRowItems = [
        firstRowItem,
        secondRowItem,
        thirdRowItem,
        fourthRowItem,
        fifthRowItem,
        sixthRowItem,
      ];
      allRowItems.filter((tableRowItem) => {
        tableRowItem.filter((eachItem) => jsonFormatedData.push(eachItem));
      });
      convertedData = JSON.stringify(jsonFormatedData);
      return convertedData;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名: ConvertDataForTableScreen.js\n' + error + '\n');
  }
}
