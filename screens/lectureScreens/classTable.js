import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Table, Row, Cols, TableWrapper, Col } from 'react-native-table-component';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// 外部関数のインポート
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //テーブル軸の値などの初期化
  const tableHead1 = ['', '月', '火', '水', '木', '金'];
  const tableHead2 = ['1', '2', '3', '4', '5'];
  let mondayLecs = new Array(5);
  let tuesdayLecs = new Array(5);
  let wednesdayLecs = new Array(5);
  let thursdayLecs = new Array(5);
  let fridayLecs = new Array(5);
  const [tableData, settableData] = useState();
  let flatlistItem = new Array;
  const [flatlistData, setflatlistData] = useState();

  // 曜日・日時を判別するための配列
  const days = ['月', '火', '水', '木', '金', '他'];
  const time = [1, 3, 5, 7, 9];

  const navigatoToDetailScreen = (lectureName, selectedLectures) => {
    // lectureDataは配列
    const lectureData = selectedLectures.filter(item => item.科目 == lectureName);
    return (
      <TouchableOpacity onPress={() => navigation.navigate("講義詳細", lectureData[0])}>
        <Text>{lectureName}</Text>
      </TouchableOpacity>
    );
  }

  function arrangeLectureData(selectedLectures) {
    try {
      days.forEach(day => {
        switch (day) {
          case '月':
            time.forEach(period => {
              // "月1"などを正規表現で定義
              let dayTime = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、mondayLecsに順番に挿入
              mondayLecs[time.indexOf(period)] = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限.slice(0, 2)))
                .map(lec => lec.科目);
              // 該当する講義が無い場合
              if (mondayLecs[time.indexOf(period)] == undefined || mondayLecs[time.indexOf(period)] == null) {
                mondayLecs[time.indexOf(period)] = '';
              }
              else if (mondayLecs[time.indexOf(period)] != '') {
                mondayLecs[time.indexOf(period)] = navigatoToDetailScreen(mondayLecs[time.indexOf(period)], selectedLectures);
              }
            });
            break;
          case '火':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTime = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、mondayLecsに順番に挿入
              tuesdayLecs[time.indexOf(period)] = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限.slice(0, 2)))
                .map(lec => lec.科目);
              // 該当する講義が無い場合
              if (tuesdayLecs[time.indexOf(period)] == undefined || mondayLecs[time.indexOf(period)] == null) {
                tuesdayLecs[time.indexOf(period)] = '';
              }
              else if (tuesdayLecs[time.indexOf(period)] != '') {
                tuesdayLecs[time.indexOf(period)] = navigatoToDetailScreen(tuesdayLecs[time.indexOf(period)], selectedLectures);
              }
            });
            break;
          case '水':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTime = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、mondayLecsに順番に挿入
              wednesdayLecs[time.indexOf(period)] = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限.slice(0, 2)))
                .map(lec => lec.科目);
              // 該当する講義が無い場合
              if (wednesdayLecs[time.indexOf(period)] == undefined || mondayLecs[time.indexOf(period)] == null) {
                wednesdayLecs[time.indexOf(period)] = '';
              }
              else if (wednesdayLecs[time.indexOf(period)] != '') {
                wednesdayLecs[time.indexOf(period)] = navigatoToDetailScreen(wednesdayLecs[time.indexOf(period)], selectedLectures);
              }
            });
            break;
          case '木':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTime = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、mondayLecsに順番に挿入
              thursdayLecs[time.indexOf(period)] = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限.slice(0, 2)))
                .map(lec => lec.科目);
              // 該当する講義が無い場合
              if (thursdayLecs[time.indexOf(period)] == undefined || mondayLecs[time.indexOf(period)] == null) {
                thursdayLecs[time.indexOf(period)] = '';
              }
              else if (thursdayLecs[time.indexOf(period)] != '') {
                thursdayLecs[time.indexOf(period)] = navigatoToDetailScreen(thursdayLecs[time.indexOf(period)], selectedLectures);
              }
            });
            break;
          case '金':
            time.forEach(period => {
              // 月1などを正規表現で定義
              let dayTime = new RegExp(day + String(period));
              // 曜日時限の最初の二文字で判別し、mondayLecsに順番に挿入
              fridayLecs[time.indexOf(period)] = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限.slice(0, 2)))
                .map(lec => lec.科目);
              // 該当する講義が無い場合
              if (fridayLecs[time.indexOf(period)] == undefined || mondayLecs[time.indexOf(period)] == null) {
                fridayLecs[time.indexOf(period)] = '';
              }
              else if (fridayLecs[time.indexOf(period)] != '') {
                fridayLecs[time.indexOf(period)] = navigatoToDetailScreen(fridayLecs[time.indexOf(period)], selectedLectures);
              }
            });
            break;
          case '他':
            // '他'を正規表現で定義
            let dayTime = new RegExp(day);
            flatlistItem = selectedLectures.filter(lecture => dayTime.test(lecture.曜日時限))
              .map(lec => lec);
            // 該当する講義が無い場合
            if (flatlistItem == undefined || flatlistItem == null) {
              flatlistItem = [];
            }
            break;
          default:
            break;
        }
      }
      )
      settableData([mondayLecs, tuesdayLecs, wednesdayLecs, thursdayLecs, fridayLecs]);
      setflatlistData(flatlistItem);
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

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', marginBottom: '2%' }}>
      <TouchableOpacity style={{ width: '95%', marginBottom: '1%', }} onPress={() => navigation.navigate("講義の詳細", item)}>
        <View style={{ flexDirection: 'row', flex: 1, }}>
          <Text style={styles.otherLectureText}>{item.科目}</Text>
          <Text style={styles.otherLectureText}>{item.担当}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginHorizontal: '1%',
          backgroundColor: "#CED0CE",
        }}
      />
    )
  }

  return (
    <>
      < View style={styles.tableall} >
        <FlatList
          ListHeaderComponent={
            <View style={styles.tableContainer}>
              {/* 時間割表 */}
              <Table borderStyle={styles.tableborder}>
                <Row data={tableHead1} textStyle={styles.table_dtext} flexArr={[1, 2, 2, 2, 2, 2]} />
                <TableWrapper style={{ flexDirection: 'row' }}>
                  <TableWrapper style={styles.tableLeftwrapper}>
                    <Col data={tableHead2} style={styles.tableSideTitle} textStyle={styles.table_titletext} heightArr={[80, 80, 80, 80, 80]} />
                  </TableWrapper>
                  <TableWrapper style={styles.tableRightwrapper}>
                    <Cols data={tableData} style={styles.tableContent} textStyle={styles.table_itext} heightArr={[80, 80, 80, 80, 80]} />
                  </TableWrapper>
                </TableWrapper>
              </Table>
              <View style={styles.otherLectures}>
                <Text style={styles.otherLectureTitle}>その他の講義</Text>
              </View>
            </View >
          }
          data={flatlistData}
          renderItem={renderItem}
          keyExtractor={item => item.時間割コード}
          ItemSeparatorComponent={itemSeparator}
          ListFooterComponent={
            < TouchableOpacity style={styles.buttonsita} onPress={() => navigation.navigate("編集画面")}>
              <Text style={styles.buttomtext}>講義の削除・編集</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tableContainer: {
  },
  tableall: {
    padding: 5,
    backgroundColor: '#fff',
  },
  tableborder: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  table_dtext: {
    fontSize: 20,
    paddingVertical: '5%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableLeftwrapper: {
    flex: 1,
  },
  tableRightwrapper: {
    flex: 10,
  },
  tableSideTitle: {
    flex: 1,
    backgroundColor: '#167F92',
  },
  tableContent: {
    flex: 5,
  },
  table_titletext: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  table_itext: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // 集中講義部分のデザイン
  otherLectures: {
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
  otherLectureText: {
    flex: 1,
    marginHorizontal: '5%',
    fontSize: 16,
  },
  otherLectureTitle: {
    fontSize: 20,
    marginBottom: '2%',
  },
  // ボタンデザイン
  buttomtext: {
    textAlign: 'center',
    color: '#4682b4',
    fontSize: 20,
  },
  buttonsita: {
    marginBottom: '2%',
    marginHorizontal: '5%',
    backgroundColor: '#d7e0ff',
    borderRadius: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
})
