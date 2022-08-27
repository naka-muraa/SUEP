import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';

import ModalToChangeBelongs from './ModalToChangeBelongs';
import { ShowModalContext } from './ShowModalContext';
import storeArrayData from './../../../commonUtil/storeArrayData';
import readArrayData from './../../../commonUtil/readArrayData';
import CustomedSearchBar from './../../../commonComponent/CustomedSearchBar';
import CustomedButton from '../../../commonComponent/CustomedButton';
import commonStyles from '../../../commonStyle/commonStyle';

export default function homeScreenProp() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [otherLecsData, setOtherLecsData] = useState(null);
  const [isReadyToDelete, setIsReadyToDelete] = useState(false);
  const [numberOfLecturesDeleted, setNumberOfLecturesDeleted] = useState();

  //状態変数tableDataを更新するための配列
  const defaultTableData = [
    { 曜日: '' },
    { 曜日: '月' },
    { 曜日: '火' },
    { 曜日: '水' },
    { 曜日: '木' },
    { 曜日: '金' },
    { period: '1', startTime: '9:30', endTime: '10:10' },
    {},
    {},
    {},
    {},
    {},
    { period: '2', startTime: '10:25', endTime: '12:05' },
    {},
    {},
    {},
    {},
    {},
    { period: '3', startTime: '13:00', endTime: '14:40' },
    {},
    {},
    {},
    {},
    {},
    { period: '4', startTime: '14:55', endTime: '16:35' },
    {},
    {},
    {},
    {},
    {},
    { period: '5', startTime: '16:50', endTime: '18:30' },
    {},
    {},
    {},
    {},
    {},
  ];

  //Flatlistに渡す講義データ
  const [tableData, setTableData] = useState(defaultTableData);

  function setTableAndOtherLecture(tableLectures, otherLectures) {
    try {
      if (tableLectures != null && otherLectures != null) {
        setTableData(tableLectures);
        setOtherLecsData(otherLectures);
      } else if (tableLectures != null && otherLectures == null) {
        setTableData(tableLectures);
      } else if (tableLectures == null && otherLectures != null) {
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
      const calledData = readArrayData(storageKey);
      return calledData;
    };
    const arrangeFunc = async () => {
      const keys = ['formattedTableDataKey', 'otherLectureKey'];

      // await Promise.all(引数)で引数の処理が完了するまで処理を止める
      const allData = await Promise.all(keys.map(fetchAllData));
      setTableAndOtherLecture(allData[0], allData[1]);
    };
    arrangeFunc();
  }, [isFocused]);

  //時間割表のセルタップ時の画面遷移
  const navigatoToDetailScreen = (lecsData) => {
    if (lecsData != null) {
      navigation.navigate('講義詳細', lecsData);
    }
  };

  const RenderDayName = ({ prop }) => (
    <Text style={[commonStyles.basicFontBold, commonStyles.colorBlack]}>
      {prop}
    </Text>
  );

  const RenderFirstColumnItem = ({ prop }) => {
    if (prop == '～') {
      return <Ionicons name="chevron-down-outline" size={16} color="black" />;
    } else {
      return (
        <Text style={[commonStyles.smallFont, commonStyles.colorBlack]}>
          {prop}
        </Text>
      );
    }
  };

  function makeSameItemSelected(allData, index) {
    const selectedLecture = allData[index];
    const lectureCode = selectedLecture.時間割コード;
    if (lectureCode != null) {
      let tmp = allData;
      tmp.filter((item) => {
        if (item.時間割コード == lectureCode) {
          item.selected = !item.selected;
        }
      });
      return tmp;
    }
  }

  function toggleItemSelected(itemIndex) {
    if (tableData[itemIndex].selected == true) {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted - 1);
      const tmp = makeSameItemSelected(tableData, itemIndex);
      setTableData(tmp);
    } else {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted + 1);
      const tmp = makeSameItemSelected(tableData, itemIndex);
      setTableData(tmp);
    }
  }

  const RenderLectureName = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        isReadyToDelete
          ? toggleItemSelected(index)
          : navigatoToDetailScreen(item);
      }}
    >
      <Text numberOfLines={4} style={commonStyles.basicFont}>
        {item.科目}
      </Text>
    </TouchableOpacity>
  );

  function stylesDependingOnValue(dayName) {
    const dayIsIncluded = dayName ? true : false;
    const today = new Date();
    const numberOfDay = today.getDay();
    const dayOfWeekArray = ['日', '月', '火', '水', '木', '金', '土'];
    if (dayIsIncluded && dayOfWeekArray[numberOfDay] == dayName) {
      return { borderBottomColor: 'tomato', borderBottomWidth: 3 };
    } else {
      return {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
      };
    }
  }

  function stylesDependingOnStateToDelteLectures(name) {
    const nameIsIncluded = name ? true : false;
    if (nameIsIncluded) {
      return { borderBottomColor: '#FFA595', borderBottomWidth: 2 };
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
      <View
        style={[
          styles.defaltCellStyle,
          stylesDependingOnValue(dayName),
          isReadyToDelete &&
            (tableItem.selected
              ? commonStyles.bgColorLightGray
              : stylesDependingOnStateToDelteLectures(lectureName)),
        ]}
      >
        {dayName ? <RenderDayName prop={dayName} /> : null}
        {numberOfLectures ? (
          <RenderFirstColumnItem prop={numberOfLectures} />
        ) : null}
        {startTime ? <RenderFirstColumnItem prop={startTime} /> : null}
        {startTime ? <RenderFirstColumnItem prop="～" /> : null}
        {endTime ? <RenderFirstColumnItem prop={endTime} /> : null}
        {lectureName ? (
          <RenderLectureName item={tableItem} index={itemIndex} />
        ) : null}
      </View>
    );
  }

  function initializeStateToDeleteLectures() {
    setNumberOfLecturesDeleted(0);
    setIsReadyToDelete(true);
  }

  async function deleteDataFromPlainTableData(selectedLecture) {
    let tablePlainData = await readArrayData('plainTableDataKey');
    let arrayNumberToDelete = [];
    tablePlainData.filter((item, index) => {
      selectedLecture.filter((selectedItem) => {
        if (item.科目 == selectedItem.科目) {
          arrayNumberToDelete.push(index);
        }
      });
    });
    for (let itr = 0; itr < arrayNumberToDelete.length; itr++) {
      tablePlainData.splice(arrayNumberToDelete[itr], 1);
    }
    storeArrayData('plainTableDataKey', tablePlainData);
  }

  async function deleteSelectedLectures() {
    if (numberOfLecturesDeleted > 0) {
      // その他の講義の削除
      const selectedOthers = otherLecsData.filter((item) => !item.selected);
      setOtherLecsData(selectedOthers);

      // 時間割表用の素のデータから削除
      const selectedLectureInfo = tableData.filter((item) => item.selected);
      deleteDataFromPlainTableData(selectedLectureInfo);

      // 時間割表用データから削除
      let selectedTableLecture = tableData;
      selectedTableLecture.filter((item, index) => {
        if (item.selected == true) {
          selectedTableLecture[index] = {};
        }
      });
      setTableData(selectedTableLecture);

      // 削除後のデータの保存
      const keyValueSet = [
        {
          key: 'formattedTableDataKey',
          value: selectedTableLecture,
        },
        {
          key: 'otherLectureKey',
          value: selectedOthers,
        },
      ];
      await Promise.all(
        keyValueSet.map((item) => storeArrayData(item.key, item.value))
      );
    }
    setIsReadyToDelete(false);
  }

  const HeaderComponent = () => {
    const [inputedKeyWord, setinputedLectureInfo] = useState();
    return (
      <View style={[styles.upperContainer]}>
        <View style={styles.searchBarWrapper}>
          <CustomedSearchBar
            onChangeText={(text) => {
              setinputedLectureInfo(text);
            }}
            onSubmitEditing={() => {
              navigation.navigate('検索結果', { keyWord: inputedKeyWord });
            }}
            value={inputedKeyWord}
            placeholder="授業科目検索"
            onTapIcon={() => {
              setinputedLectureInfo('');
            }}
            style={styles.extraSearchBarStyle}
            iconType={'search'}
          />
        </View>
        <View style={styles.headerButtonsWrapper}>
          {!isReadyToDelete ? (
            <>
              <View style={styles.headerButtonWrapper}>
                <CustomedButton
                  buttonText="所属先の変更"
                  onPress={() => setShowModal(true)}
                />
              </View>
              <View style={styles.headerButtonWrapper}>
                <CustomedButton
                  buttonText="講義の削除"
                  onPress={() => initializeStateToDeleteLectures()}
                />
              </View>
            </>
          ) : (
            <View style={styles.headerButtonWrapper}>
              <CustomedButton
                buttonText={numberOfLecturesDeleted + '個の講義を削除'}
                buttonStyle={commonStyles.bgColorTomato}
                onPress={() => {
                  deleteSelectedLectures();
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  function changeValueOfOtherLectures(itemIndex) {
    if (otherLecsData[itemIndex].selected == true) {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted - 1);
      let tmp = otherLecsData;
      tmp[itemIndex].selected = false;
      setOtherLecsData(tmp);
    } else {
      setNumberOfLecturesDeleted(numberOfLecturesDeleted + 1);
      let tmp = otherLecsData;
      tmp[itemIndex].selected = true;
      setOtherLecsData(tmp);
    }
  }

  const OtherLectureContent = ({ displayedItem }) => (
    <>
      {displayedItem.map((element, elementNumber) => (
        <ListItem
          key={elementNumber}
          containerStyle={[
            styles.listItemContainer,
            isReadyToDelete &&
              (element.selected
                ? commonStyles.bgColorLightGray
                : styles.listItemContainerToDelete),
          ]}
        >
          <ListItem.Content>
            <TouchableOpacity
              style={styles.otherItem}
              onPress={() =>
                isReadyToDelete
                  ? changeValueOfOtherLectures(elementNumber)
                  : navigatoToDetailScreen(displayedItem[elementNumber])
              }
            >
              <View>
                <View style={styles.otherItemTitle}>
                  <ListItem.Title>
                    <Text style={[commonStyles.basicFont]}>{element.科目}</Text>
                  </ListItem.Title>
                </View>
              </View>
            </TouchableOpacity>
          </ListItem.Content>
        </ListItem>
      ))}
    </>
  );

  const OtherLectureEmpty = () => (
    <View style={styles.footerEmptyContentWrapper}>
      <Text style={[commonStyles.basicFont, styles.textWhenEmpty]}>
        集中講義などの講義はここに表示されます
      </Text>
    </View>
  );

  //その他の講義部分
  const FooterComponent = ({ otherItem }) => (
    <View style={[styles.footerContainer]}>
      <Text style={[commonStyles.xLargeFontBold, styles.otherLectureTitle]}>
        その他の講義
      </Text>
      {otherItem ? (
        <OtherLectureContent displayedItem={otherItem} />
      ) : (
        <OtherLectureEmpty />
      )}
    </View>
  );

  return (
    <>
      {showModal && (
        <ShowModalContext.Provider
          value={{ isVisible: showModal, setIsVisible: setShowModal }}
        >
          <ModalToChangeBelongs />
        </ShowModalContext.Provider>
      )}
      <FlatList
        style={[commonStyles.viewPageContainer, commonStyles.bgColorWhite]}
        data={tableData}
        renderItem={({ item, index }) => (
          <RenderTable tableItem={item} itemIndex={index} />
        )}
        keyExtractor={(item, index) => index}
        numColumns={6}
        ListHeaderComponent={<HeaderComponent />}
        ListFooterComponent={<FooterComponent otherItem={otherLecsData} />}
      />
    </>
  );
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
    transform: [{ rotate: '90deg' }],
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
    marginVertical: 10,
    backgroundColor: 'white',
  },
  textWhenEmpty: {
    paddingTop: 10,
    alignItems: 'center',
  },
  footerEmptyContentWrapper: {
    marginVertical: 20,
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
});
