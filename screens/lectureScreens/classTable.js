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
import { saveData } from '../../AppFunction/LectureScreenFunction/saveData';

// コンポーネントのインポート
import CustomedSearchBar from '../../Components/CustomedSearchBar';
import CustomedButton from '../../Components/CustomedButton';
import CommonStyles from '../../StyleSheet/CommonStyels';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [otherLecsData, setOtherLecsData] = useState(null);
  const [isReadyToDelete, setIsReadyToDelete] = useState(false);
  const [numberOfLecturesDeleted, setNumberOfLecturesDeleted] = useState();

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
        setOtherLecsData(otherLectures);
      }
      else if (tableLectures != null && otherLectures == null) {
        tableLectures = JSON.parse(tableLectures);
        setTableData(tableLectures);
      }
      else if (tableLectures == null && otherLectures != null) {
        otherLectures = JSON.parse(otherLectures);
        setOtherLecsData(otherLectures);
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
    <Text style={[CommonStyles.basicFontBold, CommonStyles.colorBlack]}>{prop}</Text>
  )

  const RenderFirstColumnItem = ({ prop }) => {
    if (prop == '～') {
      return (
        <Ionicons name="chevron-down-outline" size={16} color="black" />
      )
    } else {
      return (<Text style={[CommonStyles.smallFont, CommonStyles.colorBlack]}>{prop}</Text>)
    }
  }

  function changeFlatListValue(itemIndex) {
    if (tableData[itemIndex].selected == true) {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted - 1);
      let tmp = tableData;
      tmp[itemIndex].selected = false;
      setTableData(tmp);
    }
    else {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted + 1);
      let tmp = tableData;
      tmp[itemIndex].selected = true;
      setTableData(tmp);
    }
  }

  const RenderLectureName = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        isReadyToDelete ?
          changeFlatListValue(index)
          :
          navigatoToDetailScreen(item)
      }}
    >
      <Text numberOfLines={4} style={CommonStyles.basicFont}>{item.科目}</Text>
    </TouchableOpacity>
  )

  function stylesDependingOnValue(dayName) {
    const dayIsIncluded = dayName ? true : false;
    const today = new Date();
    const numberOfDay = today.getDay();
    const dayOfWeekArray = ['日', '月', '火', '水', '木', '金', '土'];
    if (dayIsIncluded && (dayOfWeekArray[numberOfDay] == dayName)) {
      return { borderBottomColor: 'tomato', borderBottomWidth: 3 }
    }
    else {
      return {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
      }
    }
  }

  function stylesDependingOnStateToDelteLectures(name) {
    const nameIsIncluded = name ? true : false;
    if (nameIsIncluded) {
      return { borderBottomColor: '#FFA595', borderBottomWidth: 2, }
    }
  }

  //時間割テーブルのセル部分
  function RenderTable({ tableItem, itemIndex }) {
    const dayName = tableItem.曜日;
    const numberOfLectures = tableItem.period;
    const startTime = tableItem.startTime;
    const endTime = tableItem.endTime;
    const lectureName = tableItem.科目;
    return (
      <View style={
        [
          styles.defaltCellStyle,
          stylesDependingOnValue(dayName),
          isReadyToDelete && (
            tableItem.selected ?
              CommonStyles.bgColorLightGray
              :
              stylesDependingOnStateToDelteLectures(lectureName)
          )
        ]
      }>
        {dayName ? <RenderDayName prop={dayName} /> : null}
        {numberOfLectures ? <RenderFirstColumnItem prop={numberOfLectures} /> : null}
        {startTime ? <RenderFirstColumnItem prop={startTime} /> : null}
        {startTime ? <RenderFirstColumnItem prop='～' /> : null}
        {endTime ? <RenderFirstColumnItem prop={endTime} /> : null}
        {lectureName ? <RenderLectureName item={tableItem} index={itemIndex} /> : null}
      </View>
    );
  }

  function initializeStateToDeleteLectures() {
    setNumberOfLecturesDeleted(0);
    setIsReadyToDelete(true);
  }

  async function deleteSelectedLectures() {
    let tmp = otherLecsData.filter(item => !item.selected)
    setOtherLecsData(tmp);
    tmp = tableData;
    tmp.filter((item, index) => {
      if (item.selected == true) {
        tmp[index] = {};
      }
    })
    setTableData(tmp);
    setIsReadyToDelete(false);
    const keyValueSet = [
      {
        key: 'formattedTableDataKey',
        value: JSON.stringify(tableData),
      },
      {
        key: 'otherLectureKey',
        value: JSON.stringify(otherLecsData),
      }
    ];
    await Promise.all(
      keyValueSet.map(item =>
        saveData([item.key, item.value]
        )
      ));
  }

  const HeaderComponent = () => {
    const [inputedKeyWord, setinputedLectureInfo] = useState();
    return (
      <View style={[styles.upperContainer]}>
        <View style={styles.searchBarWrapper}>
          <CustomedSearchBar
            onChangeText={text => { setinputedLectureInfo(text) }}
            onSubmitEditing={() => {
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
          {!isReadyToDelete ?
            <>
              <View style={styles.headerButtonWrapper}>
                <CustomedButton
                  buttonText='所属先の変更'
                  onPress={() => setShowModal(true)}
                />
              </View>
              <View style={styles.headerButtonWrapper}>
                <CustomedButton
                  buttonText='講義の削除'
                  onPress={() => initializeStateToDeleteLectures()}
                />
              </View>
            </>
            :
            <View style={styles.headerButtonWrapper}>
              <CustomedButton
                buttonText={numberOfLecturesDeleted + '個の講義を削除'}
                buttonStyle={CommonStyles.bgColorTomato}
                onPress={() => { deleteSelectedLectures(); }}
              />
            </View>
          }
        </View>
      </View>
    )
  }

  function changeValueOfOtherLectures(itemIndex) {
    if (otherLecsData[itemIndex].selected == true) {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted - 1);
      let tmp = otherLecsData;
      tmp[itemIndex].selected = false;
      setOtherLecsData(tmp);
    }
    else {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted + 1);
      let tmp = otherLecsData;
      tmp[itemIndex].selected = true;
      setOtherLecsData(tmp);
    }
  }

  const OtherLectureContent = ({ displayedItem }) => (
    <>
      {
        displayedItem.map((element, elementNumber) => (
          <ListItem
            key={elementNumber}
            containerStyle={
              [
                styles.listItemContainer,
                isReadyToDelete && (element.selected ?
                  CommonStyles.bgColorLightGray
                  :
                  styles.listItemContainerToDelete),
              ]
            }
          >
            <ListItem.Content >
              <TouchableOpacity
                onPress={() => isReadyToDelete ?
                  changeValueOfOtherLectures(elementNumber)
                  :
                  navigatoToDetailScreen(displayedItem[elementNumber])
                }
              >
                <View style={styles.otherItem}>
                  <View style={styles.otherItemTitle}>
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
      {showModal &&
        <ShowModalContext.Provider
          value={{ isVisible: showModal, setIsVisible: setShowModal }}>
          <ModalToChangeBelongs />
        </ShowModalContext.Provider>
      }
      <FlatList
        style={[CommonStyles.viewPageContainer, CommonStyles.bgColorWhite]}
        data={tableData}
        renderItem={({ item, index }) => <RenderTable tableItem={item} itemIndex={index} />}
        keyExtractor={(item, index) => index}
        numColumns={6}
        ListHeaderComponent={<HeaderComponent />}
        ListFooterComponent={
          <FooterComponent otherItem={otherLecsData} />
        }
      />
    </>
  )
}

const styles = StyleSheet.create({

  // 検索ボタン関連
  upperContainer: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchBarWrapper: {
    width: '98%',
  },
  extraSearchBarStyle: {
    marginBottom: 40,
  },
  headerButtonsWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
    marginRight: 5,
    alignSelf: 'flex-end',
  },
  headerButtonWrapper: {
    marginHorizontal: 10,
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
  listItemContainerToDelete: {
    borderBottomWidth: 2,
    borderColor: '#FFA595',
  },
  defaltCellStyle: {
    paddingVertical: 2,
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },

  // その他・集中講義部分のデザイン
  footerContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
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
  otherItemTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 2,
  },
})
