import * as Sentry from 'sentry-expo';

export default async function separateTableAndLectureData(allLectureData) {
  try {
    const referenceWord = new RegExp('他');
    let tableLectureData = allLectureData
      .filter((lectureData) => !referenceWord.test(lectureData.曜日時限))
      .map((lec) => lec);
    let otherLectureData = allLectureData
      .filter((lectureData) => referenceWord.test(lectureData.曜日時限))
      .map((lec) => lec);
    return [tableLectureData, otherLectureData];
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log(
      'separateTableAndLectureData.js\n' + 'エラー内容：' + error + '\n'
    );
  }
}
