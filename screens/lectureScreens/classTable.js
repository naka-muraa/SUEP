import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// 外部関数のインポート
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //曜日ごとに講義データを取り出すための配列
  let mondayItem = new Array;
  let tuesdayItem = new Array;
  let wednesdayItem = new Array;
  let thursdayItem = new Array;
  let fridayItem = new Array;
  let flatlistItem = new Array;
  const [flatlistData, setflatlistData] = useState();

  // 曜日・日時を判別するための配列
  const days = ['月', '火', '水', '木', '金', '他'];
  const time = [1, 3, 5, 7, 9];

  //時間割表のセルタップ時の画面遷移
  const navigatoToDetailScreen = (lectureName) => {
    lectureName.科目 != '' ? navigation.navigate("講義詳細", lectureName) : false;
  }

  //Flatlistに渡す講義データ
  const [dayData, setdayData] = useState([
    { 科目: '', 時間割コード: '00' }, { 科目: '', 時間割コード: '01' }, { 科目: '', 時間割コード: '02' },
    { 科目: '', 時間割コード: '03' }, { 科目: '', 時間割コード: '04' }, { 科目: '', 時間割コード: '05' },
    { 科目: '', 時間割コード: '06' }, { 科目: '', 時間割コード: '07' }, { 科目: '', 時間割コード: '08' },
    { 科目: '', 時間割コード: '09' }, { 科目: '', 時間割コード: '10' }, { 科目: '', 時間割コード: '11' },
    { 科目: '', 時間割コード: '12' }, { 科目: '', 時間割コード: '13' }, { 科目: '', 時間割コード: '14' },
    { 科目: '', 時間割コード: '15' }, { 科目: '', 時間割コード: '16' }, { 科目: '', 時間割コード: '17' },
    { 科目: '', 時間割コード: '18' }, { 科目: '', 時間割コード: '19' }, { 科目: '', 時間割コード: '20' },
    { 科目: '', 時間割コード: '21' }, { 科目: '', 時間割コード: '22' }, { 科目: '', 時間割コード: '23' },
    { 科目: '', 時間割コード: '24' }])
  //登録された授業データを格納するための配列
  let GatherClassdata = [];

  //コマ名の高さを管理するための状態変数
  const [firstRowHeight, setFirstRowHeight] = useState('20%');
  const [secondRowHeight, setSecondRowHeight] = useState('20%');
  const [thirdRowHeight, setThirdRowHeight] = useState('20%');
  const [fourthRowHeight, setFourthRowHeight] = useState('20%');
  const [fifthRowHeight, setFifthRowHeight] = useState('20%');
  //コマ名の高さを更新するための配列, 
  let toChageHeightArray = [];

  //時間割時限名の高さを調節
  function adjustRowHeight(RowNumberData) {
    for (const maxRowNumber of RowNumberData) {
      //WARNING: toChageHeightArray = [１行目, 2行目…, 5行目]; の順で格納
      if (maxRowNumber <= 4) {
        toChageHeightArray.push('15%');
      } else if (maxRowNumber <= 8) {
        toChageHeightArray.push('22.%');
      } else if (maxRowNumber <= 12) {
        toChageHeightArray.push('26%')
      } else {
        toChageHeightArray.push('34.5%')
      }
    }
    setFirstRowHeight(toChageHeightArray[0]);
    setSecondRowHeight(toChageHeightArray[1]);
    setThirdRowHeight(toChageHeightArray[2]);
    setFourthRowHeight(toChageHeightArray[3]);
    setFifthRowHeight(toChageHeightArray[4]);
  }

  function arrangeLectureData(selectedLectures) {
    try {
      days.forEach(day => {
        switch (day) {
          case '月':
            time.forEach(period => {
              // "月1"などを正規表現で定義
              let dayTimeM = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、fridayLecsに順番に挿入
              mondayItem = selectedLectures.filter(lecture => dayTimeM.test((lecture.曜日時限).slice(0, 2)))
                .map(lec => lec);
              if (mondayItem[0] != undefined) { GatherClassdata.push(mondayItem[0]) }
            });
            break;
          case '火':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTimethu = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、fridayLecsに順番に挿入
              tuesdayItem = selectedLectures.filter(lecture => dayTimethu.test((lecture.曜日時限).slice(0, 2)))
                .map(lec => lec);
              if (tuesdayItem[0] != undefined || tuesdayItem[0] != null) { GatherClassdata.push(tuesdayItem[0]) }
            });
            break;
          case '水':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTimeWeb = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、fridayLecsに順番に挿入
              wednesdayItem = selectedLectures.filter(lecture => dayTimeWeb.test((lecture.曜日時限).slice(0, 2)))
                .map(lec => lec);
              if (wednesdayItem[0] != undefined) { GatherClassdata.push(wednesdayItem[0]) }
            });
            break;
          case '木':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTimeTh = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、fridayLecsに順番に挿入
              thursdayItem = selectedLectures.filter(lecture => dayTimeTh.test(lecture.曜日時限))
                .map(lec => lec);
              if (thursdayItem[0] != undefined) { GatherClassdata.push(thursdayItem[0]) }
            });
            break;
          case '金':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTimeF = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、fridayLecsに順番に挿入
              fridayItem = selectedLectures.filter(lecture => dayTimeF.test(lecture.曜日時限))
                .map(lec => lec);
              if (fridayItem[0] != undefined) { GatherClassdata.push(fridayItem[0]) }
            });
            break;
          case '他':
            // '他'を正規表現で定義
            let dayTime = new RegExp(day);
            flatlistItem = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限))
              .map(lec => lec);
            // 該当する講義が無い場合
            if (flatlistItem == undefined) { flatlistItem = [] }
            setflatlistData(flatlistItem)
            break;
          default:
            break;
        }
      }
      )

      //状態変数dayDataを更新するための配列
      let classDataGroup = [
        { 科目: '', 時間割コード: '00' }, { 科目: '', 時間割コード: '01' }, { 科目: '', 時間割コード: '02' },
        { 科目: '', 時間割コード: '03' }, { 科目: '', 時間割コード: '04' }, { 科目: '', 時間割コード: '05' },
        { 科目: '', 時間割コード: '06' }, { 科目: '', 時間割コード: '07' }, { 科目: '', 時間割コード: '08' },
        { 科目: '', 時間割コード: '09' }, { 科目: '', 時間割コード: '10' }, { 科目: '', 時間割コード: '11' },
        { 科目: '', 時間割コード: '12' }, { 科目: '', 時間割コード: '13' }, { 科目: '', 時間割コード: '14' },
        { 科目: '', 時間割コード: '15' }, { 科目: '', 時間割コード: '16' }, { 科目: '', 時間割コード: '17' },
        { 科目: '', 時間割コード: '18' }, { 科目: '', 時間割コード: '19' }, { 科目: '', 時間割コード: '20' },
        { 科目: '', 時間割コード: '21' }, { 科目: '', 時間割コード: '22' }, { 科目: '', 時間割コード: '23' },
        { 科目: '', 時間割コード: '24' }]

      for (const elem of GatherClassdata) {
        let headTwoword = elem.曜日時限.slice(0, 2);
        //WARNING: dayAndPeriodArrayの要素の順番
        let dayAndPeriodArray = ['月1', '火1', '水1', '木1', '金1', '月3', '火3', '水3', '木3', '金3',
          '月5', '火5', '水5', '木5', '金5', '月7', '火7', '水7', '木7', '金7', '月9', '火9', '水9', '木9', '金9'];
        for (const [serialNumber, tmp_day] of dayAndPeriodArray.entries()) {
          headTwoword == tmp_day ? classDataGroup.splice(serialNumber, 1, elem) : false;
        }
      }
      setdayData(classDataGroup);

      //時間割のコマ名の縦幅を調節するための配列
      let indexRowNumber = [0, 5, 10, 15, 20];
      let row_num = [];
      //時間割のコマ名の高さを調節 
      for (const k of indexRowNumber) {
        switch (k) {
          case 0:
            let characterMaxNumber_first = Math.max([...classDataGroup[k].科目].length, [...classDataGroup[k + 1].科目].length,
              [...classDataGroup[k + 2].科目].length, [...classDataGroup[k + 3].科目].length, [...classDataGroup[k + 4].科目].length);
            row_num.push(characterMaxNumber_first);
            break;
          case 5:
            let characterMaxNumber_second = Math.max([...classDataGroup[k].科目].length, [...classDataGroup[k + 1].科目].length,
              [...classDataGroup[k + 2].科目].length, [...classDataGroup[k + 3].科目].length, [...classDataGroup[k + 4].科目].length);
            row_num.push(characterMaxNumber_second);
            break;
          case 10:
            let characterMaxNumber_third = Math.max([...classDataGroup[k].科目].length, [...classDataGroup[k + 1].科目].length,
              [...classDataGroup[k + 2].科目].length, [...classDataGroup[k + 3].科目].length, [...classDataGroup[k + 4].科目].length);
            row_num.push(characterMaxNumber_third);
            break;
          case 15:
            let characterMaxNumber_forth = Math.max([...classDataGroup[k].科目].length, [...classDataGroup[k + 1].科目].length,
              [...classDataGroup[k + 2].科目].length, [...classDataGroup[k + 3].科目].length, [...classDataGroup[k + 4].科目].length);
            row_num.push(characterMaxNumber_forth);
            break;
          case 20:
            let characterMaxNumber_five = Math.max([...classDataGroup[k].科目].length, [...classDataGroup[k + 1].科目].length,
              [...classDataGroup[k + 2].科目].length, [...classDataGroup[k + 3].科目].length, [...classDataGroup[k + 4].科目].length);
            row_num.push(characterMaxNumber_five);
            break;
          default:
            break;
        }
      }
      adjustRowHeight(row_num);
    } catch (error) {
      Sentry.Native.captureException(error);
      console.log('ファイル名：classTable\n' + 'エラー内容：' + error + '\n');
    }
  }

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

  //時間割表の授業名部分
  const Item1 = ({ item }) => (
    <View>
      <Text numberOfLines={4} style={{ fontSize: 16 }}>{item.科目}</Text>
    </View>
  );

  //時間割表授業名セル部分
  const renderItem_timeTable = ({ item }) => (
    <View style={styles.table_cellText}>
      <TouchableOpacity onPress={() => navigatoToDetailScreen(item)}>
        <Item1 item={item} />
      </TouchableOpacity>
    </View>
  );

  //その他の講義部分
  const renderItem_otherLecs = ({ item }) => (
    <View style={{ alignItems: 'center', marginBottom: '2%', borderBottomWidth: 1, borderColor: '#CED0CE' }}>
      <TouchableOpacity style={{ width: '95%', marginBottom: '1%', }} onPress={() => navigation.navigate("講義詳細", item)}>
        <View style={{ flexDirection: 'row', flex: 1, }}>
          <Text style={styles.otherLectureText}>{item.科目}</Text>
          <Text style={styles.otherLectureText}>{item.担当}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      < View style={styles.tableAll} >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '15%' }}>
            {/* 時間割行名部分*/}
            <View style={{ height: '70%' }}>
              <View style={{ borderWidth: 1, borderColor: '#CED0CE', height: '8.2%' }}></View>
              <View style={{ backgroundColor: '#167F92', justifyContent: 'center', borderWidth: 1, borderColor: '#CED0CE', height: firstRowHeight }}>
                <Text style={styles.table_lineTextValue}>1</Text>
                <Text style={styles.table_lineTime}>9:00~10:10</Text>
              </View>
              <View style={{ backgroundColor: '#167F92', justifyContent: 'center', borderWidth: 1, borderColor: '#CED0CE', height: secondRowHeight }}>
                <Text style={styles.table_lineTextValue}>2</Text>
                <Text style={styles.table_lineTime}>10:25~12:05</Text>
              </View>
              <View style={{ backgroundColor: '#167F92', justifyContent: 'center', borderWidth: 1, borderColor: '#CED0CE', height: thirdRowHeight }}>
                <Text style={styles.table_lineTextValue}>3</Text>
                <Text style={styles.table_lineTime}>13:00~14:40</Text>
              </View>
              <View style={{ backgroundColor: '#167F92', justifyContent: 'center', borderWidth: 1, borderColor: '#CED0CE', height: fourthRowHeight }}>
                <Text style={styles.table_lineTextValue}>4</Text>
                <Text style={styles.table_lineTime}>14:55~16:35</Text>
              </View>
              <View style={{ backgroundColor: '#167F92', justifyContent: 'center', borderWidth: 1, borderColor: '#CED0CE', height: fifthRowHeight }}>
                <Text style={styles.table_lineTextValue}>5</Text>
                <Text style={styles.table_lineTime}>16:50~18:30</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "85%" }}>
            {/* 時間割列名部分 */}
            <View style={{ flexDirection: "row" }}>
              <View style={styles.table_colmn}>
                <Text style={styles.table_colmnValue}>月</Text>
              </View>
              <View style={styles.table_colmn}>
                <Text style={styles.table_colmnValue}>火</Text>
              </View>
              <View style={styles.table_colmn}>
                <Text style={styles.table_colmnValue}>水</Text>
              </View>
              <View style={styles.table_colmn}>
                <Text style={styles.table_colmnValue}>木</Text>
              </View>
              <View style={styles.table_colmn}>
                <Text style={styles.table_colmnValue}>金</Text>
              </View>
            </View>
            {/* 時間割セル部分 */}
            <View style={{ width: "100%" }}>
              <FlatList
                data={dayData}
                renderItem={renderItem_timeTable}
                keyExtractor={item => item.時間割コード}
                numColumns={5}
              />
            </View>
          </View>
        </View>

        {/* その他の講義 */}
        <View>
          <Text style={styles.otherLectureTitle}>その他の講義</Text>
          <FlatList
            data={flatlistData}
            renderItem={renderItem_otherLecs}
            keyExtractor={item => item.時間割コード}
            ListFooterComponent={
              <View>
                < TouchableOpacity style={styles.buttomBtn} onPress={() => navigation.navigate("編集画面")}>
                  <Text style={styles.buttomBtntext}>講義の削除・編集</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tableAll: {
    padding: 5,
    backgroundColor: '#fff',
  },
  table_lineTextValue: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: '7%'
  },
  table_lineTime: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
  },
  table_colmn: {
    width: '20%',
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#CED0CE'
  },
  table_colmnValue: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: "black",
  },
  table_cellText: {
    backgroundColor: "white",
    width: "20%",
    paddingVertical: "4.1%",
    justifyContent: 'center',
    borderWidth: 0.6,
    borderColor: '#CED0CE',
  },
  // 集中講義部分のデザイン
  otherLectureText: {
    flex: 1,
    marginHorizontal: '5%',
    fontSize: 17,
  },
  otherLectureTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '2%',
  },
  // ボタンデザイン
  buttomBtntext: {
    textAlign: 'center',
    color: '#4682b4',
    fontSize: 20,
  },
  buttomBtn: {
    marginBottom: '2%',
    marginHorizontal: '5%',
    backgroundColor: '#d7e0ff',
    borderRadius: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
})