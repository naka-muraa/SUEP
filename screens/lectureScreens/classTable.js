import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import * as Sentry from 'sentry-expo';

// 外部関数のインポート
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

// コンポーネントのインポート
import CustomedSearchBar from '../../Components/CustomedSearchBar';
import CustomedButton from '../../Components/CustomedButton';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [othreLecsData, setOthreLecsData] = useState([]);

  //状態変数tableDataを更新するための配列
  const defaultTableData = [
    { '曜日': '', 時間割コード: 'row0' }, { '曜日': '月', 時間割コード: 'column1' }, { '曜日': '火', 時間割コード: 'column2' },
    { '曜日': '水', 時間割コード: 'column3' }, { '曜日': '木', 時間割コード: 'column4' }, { '曜日': '金', 時間割コード: 'column5' },
    //1行目
    { 'コマ': '1', '開始時間': '9:30', '終了時間': '10:10', 時間割コード: 'row1' },
    { 科目: '', 時間割コード: '00' }, { 科目: '', 時間割コード: '01' }, { 科目: '', 時間割コード: '02' },
    { 科目: '', 時間割コード: '03' }, { 科目: '', 時間割コード: '04' },
    //2行目
    { 'コマ': '2', '開始時間': '10:25', '終了時間': '12:05', 時間割コード: 'row2' },
    { 科目: '', 時間割コード: '05' }, { 科目: '', 時間割コード: '06' }, { 科目: '', 時間割コード: '07' },
    { 科目: '', 時間割コード: '08' }, { 科目: '', 時間割コード: '09' },
    //3行目
    { 'コマ': '3', '開始時間': '13:00', '終了時間': '14:40', 時間割コード: 'row3' },
    { 科目: '', 時間割コード: '10' }, { 科目: '', 時間割コード: '11' }, { 科目: '', 時間割コード: '12' },
    { 科目: '', 時間割コード: '13' }, { 科目: '', 時間割コード: '14' },
    //4行目
    { 'コマ': '4', '開始時間': '14:55', '終了時間': '16:35', 時間割コード: 'row4' },
    { 科目: '', 時間割コード: '15' }, { 科目: '', 時間割コード: '16' }, { 科目: '', 時間割コード: '17' },
    { 科目: '', 時間割コード: '18' }, { 科目: '', 時間割コード: '19' },
    //5行目
    { 'コマ': '5', '開始時間': '16:50', '終了時間': '18:30', 時間割コード: 'row5' },
    { 科目: '', 時間割コード: '20' }, { 科目: '', 時間割コード: '21' }, { 科目: '', 時間割コード: '22' },
    { 科目: '', 時間割コード: '23' }, { 科目: '', 時間割コード: '24' }];

  //Flatlistに渡す講義データ
  const [tableData, setTableData] = useState(defaultTableData);


  function setTableAndOtherLecture(tableLectures, otherLectures) {
    try {
      if (tableLectures != null && tableLectures != undefined && otherLectures != null && otherLectures != undefined) {
        console.log('executed here!');
        tableLectures = JSON.parse(tableLectures);
        otherLectures = JSON.parse(otherLectures);
        setTableData(tableLectures);
        setOthreLecsData(otherLectures);
      }
      else if ((tableLectures != null && tableLectures != undefined) && (otherLectures == null || otherLectures == undefined)) {
        console.log('executed here!!');
        tableLectures = JSON.parse(tableLectures);
        setTableData(tableLectures);
      }
      else if ((tableLectures == null || tableLectures == undefined) && (otherLectures != null || otherLectures != undefined)) {
        console.log('executed here!!!');
        otherLectures = JSON.parse(otherLectures);
        setOthreLecsData(otherLectures);
      }
    } catch (error) {
      Sentry.Native.captureException(error);
      console.log('関数名:setTableAndOtherLecture\n' + error + '\n');
    }
  }

  // 初回描画時に実行
  useEffect(() => {
    const fetchAllData = (storageKey) => {
      const calledData = readTableData(storageKey);
      return calledData
    }
    const arrangeFunc = async () => {
      const keys = ['tableKey', 'otherLectureKey'];

      // await Promise.all(引数)で引数の処理が完了するまで処理を止める
      const allData = await Promise.all(keys.map(fetchAllData))
      setTableAndOtherLecture(allData[0], allData[1]);
    }
    arrangeFunc();
  }, [isFocused])


  //時間割表のセルタップ時の画面遷移
  const navigatoToDetailScreen = (lecsData) => {
    if (lecsData != null && lecsData != undefined) {
      navigation.navigate('講義詳細', lecsData);
    }
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

    //時間割行名セルとそれ以外のセルstyle変更のための配列
    let rowNumber = ['row1', 'row2', 'row3', 'row4', 'row5']

    function changeCellTextStyle(cellItem) {
      let cellTextStyle;
      let columnArr = ['column1', 'column2', 'column3', 'column4', 'column5'];

      //列名の変更
      if (((rowNumber.indexOf(cellItem) == -1) && (columnArr.indexOf(cellItem) != -1)) == true) {
        cellTextStyle = styles.changedColumnStyle;
        //行名の変更
      } else if (((rowNumber.indexOf(cellItem) != -1) && (columnArr.indexOf(cellItem) == -1)) == true) {
        cellTextStyle = styles.changedRowStyle;
        //セル内のテキストの変更
      } else {
        cellTextStyle = styles.defaultTextStyle;
      }
      return cellTextStyle
    }

    const RenderDetail = ({ prop }) => {
      if (prop == '～') {
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

    //時間割表セルのstyle変更
    function changeCellStyle(cellItem) {
      let cellStyle;
      rowNumber.indexOf(cellItem) != -1 ? cellStyle = styles.tableRowCell : cellStyle = styles.defaltCellStyle;
      return cellStyle
    }

    return (
      <View style={changeCellStyle(timeCode)}>
        {timePeriod ? <RenderDetail prop={timePeriod} /> : null}
        {day ? <RenderDetail prop={day} /> : null}
        {period ? <RenderDetail prop={period} /> : null}
        {startTime ? <RenderDetail prop={startTime} /> : null}
        {startTime ? <RenderDetail prop='～' /> : null}
        {endTime ? <RenderDetail prop={endTime} /> : null}
        <TouchableOpacity onPress={() => navigatoToDetailScreen(itemData)}>
          {lectureName ? <RenderDetail prop={lectureName} /> : null}
        </TouchableOpacity>
      </View>
    );
  }

  const HeaderComponent = () => {
    const [inputedKeyWord, setinputedLectureInfo] = useState();
    return (
      <View style={styles.upperContainer}>
        <View style={styles.searchBarWrapper}>
          <CustomedSearchBar
            onChangeText={text => { setinputedLectureInfo(text) }}
            onEndEditing={() => {
              navigation.navigate('検索結果', { keyWord: inputedKeyWord });
            }}
            value={inputedKeyWord}
            placeholder='授業科目検索'
            onTapIcon={() => { setinputedLectureInfo('') }}
            style={styles.extraSearchBarStyle}
          />
        </View>
        <View style={styles.editBarWrapper}>
          <CustomedButton
            buttonText='講義の削除'
            onPress={() => navigation.navigate('編集画面')}
          />
        </View>
      </View>
    )
  }

  //その他の講義部分
  const FooterComponent = ({ otherItem }) => (
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
                <View style={styles.othreItemTitle}>
                  <ListItem.Title>
                    <Text style={styles.otherItemText}>{element.科目}</Text>
                  </ListItem.Title>
                </View>
              </View>
            </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )

  return (
    <>
      < View style={styles.tableContainer} >
        <FlatList
          data={tableData}
          renderItem={({ item }) => <RenderTable timePeriod={item.コマ} day={item.曜日} period={item.時限} lectureName={item.科目}
            startTime={item.開始時間} endTime={item.終了時間} timeCode={item.時間割コード} itemData={item} />}
          keyExtractor={(item, index) => index}
          numColumns={6}
          ListHeaderComponent={<HeaderComponent />}
          ListFooterComponent={
            <FooterComponent otherItem={othreLecsData} />
          }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  // 検索ボタン関連
  upperContainer: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchBarWrapper: {
    width: '98%',
  },
  extraSearchBarStyle: {
    marginBottom: 10,
  },
  editBarWrapper: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-end'
  },

  //時間割表のデザイン
  tableContainer: {
    padding: 5,
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  rotatedStyle: {
    transform: [
      { rotate: '90deg' }
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
    marginHorizontal: '4%',
  },
  othreItemTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 2,
  },
  othreItemTeacher: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 2,
  },
  otherItemText: {
    fontSize: 18,
    color: 'black',
  },
})
