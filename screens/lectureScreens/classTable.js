//TODO 時間割表のデータemptyコンポーネントの表示
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

// 外部関数のインポート
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //曜日・その他の授業ごとに講義データを取り出すための配列
  let dateItem = new Array;
  let thursdayItem = new Array;
  let flatlistItem = new Array;
  const [othrelecsdata, setothrelecsdata] = useState([]);
  //授業科目検索に使用するデータ
  const [inputedKeyWord, setinputedLectureInfo] = useState();

  //曜日・日時を判別するための配列

  const time = [1, 3, 5, 7, 9];

  //Flatlistに渡す講義データ
  const [dayData, setdayData] = useState([])

  //flatlistの更新の際に曜日時限を区別するための配列
  const firstRowArr = ['月1', '火1', '水1', '木1', '金1'];
  const secondRowArr = ['月3', '火3', '水3', '木3', '金3'];
  const thirdRowArr = ['月5', '火5', '水5', '木5', '金5'];
  const fourthRowArr = ['月7', '火7', '水7', '木7', '金7'];
  const fifthRowArr = ['月9', '火9', '水9', '木9', '金9'];
  const allRowArr = [firstRowArr, secondRowArr, thirdRowArr, fourthRowArr, fifthRowArr];

  //登録された授業データを格納するための配列
  let gatherClassdata = [];

  //時間割表のセルタップ時の画面遷移
  const navigatoToDetailScreen = (lecsData) => {
    ((lecsData != '') && (lecsData != undefined) && (lecsData != null)) == true ? navigation.navigate("講義詳細", lecsData) : false;
  }

  //曜日時限データ取り出し & gatherClassdataに追加
  function fetchClassData(recordClassData) {
    let registedLecs = recordClassData[0];
    let dayName = recordClassData[1];

    time.forEach(period => {
      // "月1"などを正規表現で定義
      let dayAndClassTime = new RegExp(dayName + String(period));
      // 曜日時限の最初の二文字で判別しdateItemに順番に挿入
      dateItem = registedLecs.filter(lecture => dayAndClassTime.test((lecture.曜日時限).slice(0, 2)))
        .map(lec => lec);
      if (dateItem[0] != undefined || dateItem[0] != null) { gatherClassdata.push(dateItem[0]) }
    });
  }

  //その他の講義の講義名部分
  const OtherItemText = ({ lecsProp }) => (
    <Text style={styles.otherItemText}>{lecsProp}</Text>
  );


  //その他の講義部分
  const RenderOtherItem = ({ otherItem }) => (
    <View>
      <Text style={styles.otherLectureTitle}>その他の講義</Text>
      {otherItem.map((element, elementNumber) => (
        <ListItem
          key={elementNumber}
          containerStyle={styles.listItemContainer}
        >
          <ListItem.Content >
            <TouchableOpacity onPress={() => navigatoToDetailScreen(otherItem[elementNumber])}>
              <View style={styles.otherItem}>
                <View style={styles.otherhalfItem}>
                  <ListItem.Title>
                    <OtherItemText lecsProp={element.科目} />
                  </ListItem.Title>
                </View>
                <View style={styles.otherhalfItem}>
                  <ListItem.Title>
                    <OtherItemText lecsProp={element.担当} />
                  </ListItem.Title>
                </View>
              </View>
            </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )

  function arrangeLectureData(selectedLectures) {
    const days = ['月', '火', '水', '木', '金', '他'];
    try {
      days.forEach(day => {
        switch (day) {
          case '月':
            fetchClassData([selectedLectures, day]);
            break;
          case '火':
            fetchClassData([selectedLectures, day]);
            break;
          case '水':
            fetchClassData([selectedLectures, day]);
            break;
          case '木':
            fetchClassData([selectedLectures, day]);
            break;
          case '金':
            fetchClassData([selectedLectures, day]);
            break;
          case '他':
            // '他'を正規表現で定義
            let dayTime = new RegExp(day);
            flatlistItem = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限))
              .map(lec => lec);
            // 該当する講義が無い場合
            if (flatlistItem == undefined || thursdayItem[0] != null) { flatlistItem = [] }
            setothrelecsdata(flatlistItem)
            break;
          default:
            break;
        }
      }
      )
      //状態変数dayDataを更新するための配列
      let classDataGroup = [
        { "曜日": "", 時間割コード: 'row0' }, { "曜日": "月", 時間割コード: 'column1' }, { "曜日": "火", 時間割コード: 'column2' },
        { "曜日": "水", 時間割コード: 'column3' }, { "曜日": "木", 時間割コード: 'column4' }, { "曜日": "金", 時間割コード: 'column5' },
        //1行目
        { "コマ": "1", "開始時間": "9:30", "終了時間": "10:10", 時間割コード: 'row1' },
        { 科目: '', 時間割コード: '00' }, { 科目: '', 時間割コード: '01' }, { 科目: '', 時間割コード: '02' },
        { 科目: '', 時間割コード: '03' }, { 科目: '', 時間割コード: '04' },
        //2行目
        { "コマ": "2", "開始時間": "10:25", "終了時間": "12:05", 時間割コード: 'row2' },
        { 科目: '', 時間割コード: '05' }, { 科目: '', 時間割コード: '06' }, { 科目: '', 時間割コード: '07' },
        { 科目: '', 時間割コード: '08' }, { 科目: '', 時間割コード: '09' },
        //3行目
        { "コマ": "3", "開始時間": "13:00", "終了時間": "14:40", 時間割コード: 'row3' },
        { 科目: '', 時間割コード: '10' }, { 科目: '', 時間割コード: '11' }, { 科目: '', 時間割コード: '12' },
        { 科目: '', 時間割コード: '13' }, { 科目: '', 時間割コード: '14' },
        //4行目
        { "コマ": "4", "開始時間": "14:55", "終了時間": "16:35", 時間割コード: 'row4' },
        { 科目: '', 時間割コード: '15' }, { 科目: '', 時間割コード: '16' }, { 科目: '', 時間割コード: '17' },
        { 科目: '', 時間割コード: '18' }, { 科目: '', 時間割コード: '19' },
        //5行目
        { "コマ": "5", "開始時間": "16:50", "終了時間": "18:30", 時間割コード: 'row5' },
        { 科目: '', 時間割コード: '20' }, { 科目: '', 時間割コード: '21' }, { 科目: '', 時間割コード: '22' },
        { 科目: '', 時間割コード: '23' }, { 科目: '', 時間割コード: '24' }];

      for (const elem of gatherClassdata) {
        let headTwoword = elem.曜日時限.slice(0, 2);
        //行ごとでclassDataGroupを更新
        for (const [serialNumber, rowArr] of allRowArr.entries()) {
          switch (serialNumber) {
            case 0:
              for (const [firstIndexNum, firstRowElem] of rowArr.entries()) {
                let firstInitNum = 7;
                headTwoword == firstRowElem ? classDataGroup.splice(firstInitNum + firstIndexNum, 1, elem) : false;
              }
              break;
            case 1:
              for (const [secondIndexNum, secondRowElem] of rowArr.entries()) {
                let secondInitNum = 13;
                headTwoword == secondRowElem ? classDataGroup.splice(secondInitNum + secondIndexNum, 1, elem) : false;
              }
              break;
            case 2:
              for (const [thirdIndexNum, thirdRowElem] of rowArr.entries()) {
                let thirdInitNum = 19;
                headTwoword == thirdRowElem ? classDataGroup.splice(thirdInitNum + thirdIndexNum, 1, elem) : false;
              }
              break;
            case 3:
              for (const [fourthIndexNum, fourthRowElem] of rowArr.entries()) {
                let fourthInitNum = 25;
                headTwoword == fourthRowElem ? classDataGroup.splice(fourthInitNum + fourthIndexNum, 1, elem) : false;
              }
              break;
            case 4:
              for (const [fifthIndexNum, fifthRowElem] of rowArr.entries()) {
                let fifthInitNum = 31;
                headTwoword == fifthRowElem ? classDataGroup.splice(fifthInitNum + fifthIndexNum, 1, elem) : false;
              }
              break;
            default:
              break;
          }
        }
      }
      setdayData(classDataGroup);
    } catch (error) {
      Sentry.Native.captureException(error);
      console.log('ファイル名：classTable\n' + 'エラー内容：' + error + '\n');
    }
  }

  //時間割行名セルとそれ以外のセルstyle変更のための配列
  let rowTimeArr = ['row1', 'row2', 'row3', 'row4', 'row5']
  let colmnArr = ['column1', 'column2', 'column3', 'column4', 'column5'];
  let cellStyle;

  //時間割表セルのstyle変更
  function changeCellStyle(cellItem) {
    rowTimeArr.indexOf(cellItem) != -1 ? cellStyle = styles.tableRowCell : cellStyle = styles.defaltCellStyle;
    return cellStyle
  }

  //時間割表セルTextのstyle変更のための配列
  let cellTextStyle;

  //時間割表セルTextのstyleを変更
  function changeCellTextStyle(cellItem) {
    //列名の変更
    if (((rowTimeArr.indexOf(cellItem) == -1) && (colmnArr.indexOf(cellItem) != -1)) == true) {
      cellTextStyle = styles.changedColumnStyle;
      //行名の変更
    } else if (((rowTimeArr.indexOf(cellItem) != -1) && (colmnArr.indexOf(cellItem) == -1)) == true) {
      cellTextStyle = styles.changedRowStyle;
      //セル内のテキストの変更
    } else {
      cellTextStyle = styles.defaultTextStyle;
    }
    return cellTextStyle
  }

  //時間割テーブルのセル部分
  function RenderTable(props) {
    const {
      timePeriod,
      day,
      period,
      lectureName,
      startTime,
      endTime,
      timeCode,
      itemData,
    } = props;

    const RenderDetail = ({ prop }) => {
      if (prop == "～") {
        return (
          <View style={styles.rotatedStyle}>
            <View >
              <Text style={styles.titleStyle}>{prop}</Text>
            </View>
          </View>
        )
      } else {
        return (<Text numberOfLines={4} style={changeCellTextStyle(timeCode)}>{prop}</Text>)
      }
    }

    return (
      <View style={changeCellStyle(timeCode)}>
        {timePeriod ? <RenderDetail prop={timePeriod} /> : null}
        {day ? <RenderDetail prop={day} /> : null}
        {period ? <RenderDetail prop={period} /> : null}
        {startTime ? <RenderDetail prop={startTime} /> : null}
        {startTime ? <RenderDetail prop="～" /> : null}
        {endTime ? <RenderDetail prop={endTime} /> : null}
        <TouchableOpacity onPress={() => navigatoToDetailScreen(itemData)}>
          {lectureName ? <RenderDetail prop={lectureName} /> : null}
        </TouchableOpacity>
      </View>
    );
  }

  const HeaderComponent = () => (
    <View>
      <View style={styles.upperContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="授業科目検索"
          onChangeText={text => { setinputedLectureInfo(text) }}
          value={inputedKeyWord}
        >
        </TextInput>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('検索結果', { keyWord: inputedKeyWord });
          }}
        >
          <Text style={styles.searchTextStyle}>検索</Text>
        </TouchableOpacity>
      </View>
      < TouchableOpacity style={styles.buttomBtn} onPress={() => navigation.navigate("編集画面")}>
        <Text style={styles.buttomBtntext}>講義の削除・編集</Text>
      </TouchableOpacity>
    </View>
  )

  // 初回描画時に実行
  useEffect(() => {
    const arrangeFunc = async () => {
      let storedLectureData = await readTableData('tableKey');
      storedLectureData = JSON.parse(storedLectureData);
      if (storedLectureData != null) {
        await new Promise(() => arrangeLectureData(storedLectureData));
      }
    }
    arrangeFunc();
  }, [isFocused])

  return (
    <>
      < View style={styles.tableContainer} >
        <FlatList
          //時間割表
          data={dayData}
          renderItem={({ item }) => <RenderTable timePeriod={item.コマ} day={item.曜日} period={item.時限} lectureName={item.科目}
            startTime={item.開始時間} endTime={item.終了時間} timeCode={item.時間割コード} itemData={item} />}
          keyExtractor={(item, index) => index}
          numColumns={6}
          //講義削除・返信ボタン
          ListHeaderComponent={
            <HeaderComponent />
          }
          //その他の講義
          ListFooterComponent={
            <RenderOtherItem otherItem={othrelecsdata} />
          }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  // 検索ボタン関連
  upperContainer: {
    width: "100%",
    marginBottom: '7%',
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    flex: 2,
    marginHorizontal: '1%',
    borderWidth: 1,
    color: 'black',
    fontSize: 20,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 12,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: '1%',
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#d7e0ff",
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTextStyle: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold'
  },

  //時間割表のデザイン
  tableContainer: {
    padding: 5,
    backgroundColor: '#fff',
    width: '100%'
  },
  rotatedStyle: {
    transform: [
      { rotate: "90deg" }
    ]
  },
  defaultTextStyle: {
    textAlign: 'left',
    fontSize: 16,
    color: 'black',
  },
  changedRowStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 13.5,
    fontWeight: 'bold'
  },
  changedColumnStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold'
  },
  listItemContainer: {
    width: '100%',
    borderBottomWidth: 1.5,
  },
  titleStyle: {
    textAlign: 'center',
    color: 'white'
  },
  defaltCellStyle: {
    width: '16.66%',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 0.75,
    borderColor: '#CED0CE'
  },
  tableRowCell: {
    width: '16.66%',
    color: 'white',
    backgroundColor: '#167F92',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 0.6,
    borderColor: '#CED0CE'
  },

  // その他・集中講義部分のデザイン
  otherLectureTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '7%',
    marginBottom: '2%',
  },
  otherItem: {
    flexDirection: 'row',
    width: '92%',
    padding: '1%',
    marginHorizontal: '4%'
  },
  otherhalfItem: {
    width: '50%',
    textAlign: 'center',
  },
  otherItemText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center'
  },

  // ボタンデザイン
  buttomBtntext: {
    textAlign: 'center',
    color: '#4682b4',
    fontSize: 20,
  },
  buttomBtn: {
    marginBottom: '7%',
    marginHorizontal: '5%',
    backgroundColor: '#d7e0ff',
    borderRadius: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
})