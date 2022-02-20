import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import * as Sentry from 'sentry-expo';

// 外部関数のインポート
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

// コンポーネントのインポート
import CustomedSearchBar from '../../Components/CustomedSearchBar';
import CustomedButton from '../../Components/CustomedButton';
import CommonStyles from '../../StyleSheet/CommonStyels';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [othreLecsData, setOthreLecsData] = useState([]);

  //状態変数tableDataを更新するための配列
  const defaultTableData = [
    { '曜日': '' }, { '曜日': '月' }, { '曜日': '火' }, { '曜日': '水' }, { '曜日': '木' }, { '曜日': '金' },
    //1行目
    { 'period': '1', 'startTime': '9:30', 'endTime': '10:10', }, {}, {}, {}, {}, {},
    //2行目
    { 'period': '2', 'startTime': '10:25', 'endTime': '12:05', }, {}, {}, {}, {}, {},
    //3行目
    { 'period': '3', 'startTime': '13:00', 'endTime': '14:40', }, {}, {}, {}, {}, {},
    //4行目
    { 'period': '4', 'startTime': '14:55', 'endTime': '16:35', }, {}, {}, {}, {}, {},
    //5行目
    { 'period': '5', 'startTime': '16:50', 'endTime': '18:30', }, {}, {}, {}, {}, {}];

  //Flatlistに渡す講義データ
  const [tableData, setTableData] = useState(defaultTableData);


  function setTableAndOtherLecture(tableLectures, otherLectures) {
    try {
      if (tableLectures != null && otherLectures != null ) {
        console.log('executed here!');
        tableLectures = JSON.parse(tableLectures);
        otherLectures = JSON.parse(otherLectures);
        setTableData(tableLectures);
        setOthreLecsData(otherLectures);
      }
      else if (tableLectures != null && otherLectures == null) {
        console.log('executed here!!');
        tableLectures = JSON.parse(tableLectures);
        setTableData(tableLectures);
      }
      else if (tableLectures == null && otherLectures != null) {
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
      const keys = ['formattedTableDataKey', 'otherLectureKey'];

      // await Promise.all(引数)で引数の処理が完了するまで処理を止める
      const allData = await Promise.all(keys.map(fetchAllData))
      setTableAndOtherLecture(allData[0], allData[1]);
    }
    arrangeFunc();
  }, [isFocused])


  //時間割表のセルタップ時の画面遷移
  const navigatoToDetailScreen = (lecsData) => {
    if (lecsData != null) {
      navigation.navigate('講義詳細', lecsData);
    }
  }

  const RenderDetail = ({ prop }) => {
    if (prop == '～') {
      return (
        <View style={styles.rotatedStyle}>
          <View >
            <Text style={CommonStyles.smallFont}>{prop}</Text>
          </View>
        </View>
      )
    } else {
      return (<Text numberOfLines={4} style={CommonStyles.basicFont }>{prop}</Text>)
    }
  }

  //時間割テーブルのセル部分
  function RenderTable({ tableItem}) {
    const numberOfLectures = tableItem.period;
    const day = tableItem.曜日;
    const period = tableItem.時限;
    const startTime = tableItem.startTime;
    const endTime = tableItem.endTime;
    const lectureName = tableItem.科目;
    return (
      <View style={styles.defaltCellStyle}>
        {numberOfLectures ? <RenderDetail prop={numberOfLectures} /> : null}
        {day ? <RenderDetail prop={day} /> : null}
        {period ? <RenderDetail prop={period} /> : null}
        {startTime ? <RenderDetail prop={startTime} /> : null}
        {startTime ? <RenderDetail prop='～' /> : null}
        {endTime ? <RenderDetail prop={endTime} /> : null}
        {lectureName &&
          <TouchableOpacity onPress={() => navigatoToDetailScreen(tableItem)}>
            {lectureName ? <RenderDetail prop={lectureName} /> : null}
          </TouchableOpacity>
        }
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
          renderItem={({ item }) => <RenderTable tableItem={item}/>}
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
    justifyContent: 'center',
    flexDirection: 'column',
  },
  rotatedStyle: {
    transform: [
      { rotate: '90deg' }
    ]
  },
  listItemContainer: {
    width: '100%',
  },
  defaltCellStyle: {
    width: '16%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
  otherItemText: {
    fontSize: 18,
    color: 'black',
  },
})
