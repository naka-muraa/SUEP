import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';

// 外部関数のインポート
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';
import ModalToChangeBelongs from './ModalToChangeBelongs';
import { ShowModalContext } from './ShowModalContext';

// コンポーネントのインポート
import CustomedSearchBar from '../../Components/CustomedSearchBar';
import CustomedButton from '../../Components/CustomedButton';
import CommonStyles from '../../StyleSheet/CommonStyels';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [othreLecsData, setOthreLecsData] = useState(null);

  //状態変数tableDataを更新するための配列
  const defaultTableData = [
    { '曜日': '' }, { '曜日': '月' }, { '曜日': '火' }, { '曜日': '水' }, { '曜日': '木' }, { '曜日': '金' },
    { 'period': '1', 'startTime': '9:30', 'endTime': '10:10', }, {}, {}, {}, {}, {},
    { 'period': '2', 'startTime': '10:25', 'endTime': '12:05', }, {}, {}, {}, {}, {},
    { 'period': '3', 'startTime': '13:00', 'endTime': '14:40', }, {}, {}, {}, {}, {},
    { 'period': '4', 'startTime': '14:55', 'endTime': '16:35', }, {}, {}, {}, {}, {},
    { 'period': '5', 'startTime': '16:50', 'endTime': '18:30', }, {}, {}, {}, {}, {}];

  //Flatlistに渡す講義データ
  const [tableData, setTableData] = useState(defaultTableData);


  function setTableAndOtherLecture(tableLectures, otherLectures) {
    try {
      if (tableLectures != null && otherLectures != null) {
        tableLectures = JSON.parse(tableLectures);
        otherLectures = JSON.parse(otherLectures);
        setTableData(tableLectures);
        setOthreLecsData(otherLectures);
      }
      else if (tableLectures != null && otherLectures == null) {
        tableLectures = JSON.parse(tableLectures);
        setTableData(tableLectures);
      }
      else if (tableLectures == null && otherLectures != null) {
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

  const RenderDayName = ({ prop }) => (
    <Text style={[CommonStyles.basicFontBold, CommonStyles.colorWhite]}>{prop}</Text>
  )

  const RenderFirstColumnItem = ({ prop }) => {
    if (prop == '～') {
      return (
        <Ionicons name="chevron-down-outline" size={16} color="tomato" />
      )
    } else {
      return (<Text style={[CommonStyles.smallFontBold, CommonStyles.colorTomato]}>{prop}</Text>)
    }
  }

  const RenderLectureName = ({ prop }) => (
    <TouchableOpacity onPress={() => navigatoToDetailScreen(prop)}>
      <Text numberOfLines={4} style={CommonStyles.basicFont}>{prop.科目}</Text>
    </TouchableOpacity>
  )

  function stylesDependingOnValue(dayName, number, lectureName) {
    const dayIsIncluded = dayName ? true : false;
    const periodIsIncluded = number ? true : false;
    const lectureIsIncluded = lectureName ? true : false;
    if (dayIsIncluded) {
      return CommonStyles.bgColorTomato
    }
    else if (periodIsIncluded) {
      return CommonStyles.bgColorWhite
    }
    else if (lectureIsIncluded) {
      return CommonStyles.bgColorWhite
    }
  }

  //時間割テーブルのセル部分
  function RenderTable({ tableItem }) {
    const dayName = tableItem.曜日;
    const numberOfLectures = tableItem.period;
    const startTime = tableItem.startTime;
    const endTime = tableItem.endTime;
    const lectureName = tableItem.科目;
    return (
      <View style={[styles.defaltCellStyle, stylesDependingOnValue(dayName, numberOfLectures, lectureName)]}>
        {dayName ? <RenderDayName prop={dayName} /> : null}
        {numberOfLectures ? <RenderFirstColumnItem prop={numberOfLectures} /> : null}
        {startTime ? <RenderFirstColumnItem prop={startTime} /> : null}
        {startTime ? <RenderFirstColumnItem prop='～' /> : null}
        {endTime ? <RenderFirstColumnItem prop={endTime} /> : null}
        {lectureName ? <RenderLectureName prop={tableItem} /> : null}
      </View>
    );
  }

  const HeaderComponent = () => {
    const [inputedKeyWord, setinputedLectureInfo] = useState();
    return (
      <View style={[styles.upperContainer]}>
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
            iconType={'search'}
          />
        </View>
        <View style={styles.headerButtonsWrapper}>
          <View style={styles.editBelongButton}>
            <CustomedButton
              buttonText='所属先の変更'
              onPress={() => setShowModal(true)}
            />
          </View>
          <View style={styles.editLectureButton}>
            <CustomedButton
              buttonText='講義の削除'
              onPress={() => navigation.navigate('編集画面')}
            />
          </View>
        </View>
      </View>
    )
  }

  const OtherLectureContent = ({ displayedItem }) => (
    <>
      {
        displayedItem.map((element, elementNumber) => (
          <ListItem
            key={elementNumber}
            containerStyle={styles.listItemContainer}
          >
            <ListItem.Content >
              <TouchableOpacity onPress={() => navigatoToDetailScreen(displayedItem[elementNumber])}>
                <View style={styles.otherItem}>
                  <View style={styles.othreItemTitle}>
                    <ListItem.Title>
                      <Text style={[CommonStyles.basicFont]}>{element.科目}</Text>
                    </ListItem.Title>
                  </View>
                </View>
              </TouchableOpacity>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </>
  );

  const OtherLectureEmpty = () => (
    <Text style={[CommonStyles.basicFont, styles.textWhenEmpty]}>集中講義などの講義はここに表示されます</Text>
  );

  //その他の講義部分
  const FooterComponent = ({ otherItem }) => (
    <View style={[styles.footerContainer]}>
      <Text style={[CommonStyles.xLargeFontBold, styles.otherLectureTitle]}>その他の講義</Text>
      {otherItem ? <OtherLectureContent displayedItem={otherItem} /> : <OtherLectureEmpty />}
    </View>
  )

  return (
    <>
      {showModal ?
        <ShowModalContext.Provider
          value={{ isVisible: showModal, setIsVisible: setShowModal }}>
          <ModalToChangeBelongs />
        </ShowModalContext.Provider>
        : null}
      <FlatList
        style={[styles.screenContainer, CommonStyles.bgColorWhite]}
        data={tableData}
        renderItem={({ item }) => <RenderTable tableItem={item} />}
        keyExtractor={(item, index) => index}
        numColumns={6}
        ListHeaderComponent={<HeaderComponent />}
        ListFooterComponent={
          <FooterComponent otherItem={othreLecsData} />
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
  },

  // 検索ボタン関連
  upperContainer: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  searchBarWrapper: {
    width: '98%',
  },
  extraSearchBarStyle: {
    marginBottom: 30,
  },
  headerButtonsWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 'auto',
  },
  editBelongButton: {
    marginRight: 5,
  },
  editLectureButton: {
  },

  //時間割表のデザイン
  rotatedStyle: {
    flex: 1,
    transform: [
      { rotate: '90deg' }
    ]
  },
  listItemContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  defaltCellStyle: {
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },

  // その他・集中講義部分のデザイン
  footerContainer: {
    padding: 10,
    marginTop: 10,
  },
  textWhenEmpty: {
    paddingTop: 10,
    alignItems: 'center',
  },
  otherLectureTitle: {
    textAlign: 'center',
  },
  otherItem: {
    width: '92%',
  },
  othreItemTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 2,
  },
})
