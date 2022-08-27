// TODO: deleteTask関数で削除したスケジュールをストレージからも削除する
// スケジュール間にセパレータを追加

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import {
  Ionicons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';

// 外部関数のインポート
import storeArrayData from '../../../commonUtil/storeArrayData';
import commonStyles from '../../../commonStyle/commonStyle';
import readArrayData from '../../../commonUtil/readArrayData';

// 教室名と棟名が空白の場合の処理
function changePlaceName(room, building) {
  const isBuildingExist = building != null;
  const isRoomExist = room != null;
  const isBuildingBlank = building == '';
  const isRoomBlank = room == '';

  if (isBuildingExist && isRoomExist && !isBuildingBlank && !isRoomBlank) {
    return building + '\n' + room;
  } else if (
    isBuildingExist &&
    isRoomExist &&
    isBuildingBlank &&
    !isRoomBlank
  ) {
    return room;
  } else if (
    isBuildingExist &&
    isRoomExist &&
    !isBuildingBlank &&
    isRoomBlank
  ) {
    return building;
  } else {
    return '未定またはオンライン講義です';
  }
}

//授業詳細画面
export default function LectureDetail({ navigation }) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const lectureName = route.params.科目;
  const teacher = route.params.担当;
  const roomName = route.params.教室名;
  const buildingName = route.params.棟名;
  const lectureNumber = route.params.時間割コード;
  const displayedRoomName = changePlaceName(roomName, buildingName);
  const [taskInfo, setTaskInfo] = useState();
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    const loadSchedule = async () => {
      let tmp = await readArrayData(lectureNumber);
      setTaskInfo(tmp);
    };
    loadSchedule();
  }, [isFocused]);

  const HeaderComponent = () => (
    <>
      <View style={styles.headerIconTitleWrapper}>
        <View style={styles.iconFlex}>
          <MaterialIcons name="title" size={24} color="dimgray" />
        </View>
        <View style={styles.textFlex}>
          <Text style={commonStyles.largeFont}>{lectureName}</Text>
        </View>
      </View>
      <View style={styles.headerIconTitleWrapper}>
        <View style={styles.iconFlex}>
          <Ionicons name="person" size={18} color="dimgray" />
        </View>
        <View style={styles.textFlex}>
          <Text style={commonStyles.largeFont}>{teacher}</Text>
        </View>
      </View>
      <View style={styles.headerIconTitleWrapper}>
        <View style={styles.iconFlex}>
          <MaterialIcons name="meeting-room" size={18} color="dimgray" />
        </View>
        <View style={styles.textFlex}>
          <Text style={commonStyles.largeFont}>{displayedRoomName}</Text>
        </View>
      </View>
      <View style={styles.scheduleTitleWrapper}>
        <Text style={commonStyles.largeFont}>スケジュール</Text>
      </View>
    </>
  );

  const investigateIsCheckedAndNavigate = () => {
    if (taskInfo) {
      let checkedItem = taskInfo.filter((task) => {
        return task.checked === true;
      });
      if (checkedItem.length == 1) {
        navigation.navigate('スケジュールの追加・編集', taskInfo);
      } else {
        Alert.alert(
          '',
          '編集したいスケジュールを1つだけ選んでください。',
          [{ text: '戻る' }],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        '',
        '編集したいスケジュールを選んでください。',
        [{ text: '戻る' }],
        { cancelable: false }
      );
    }
  };

  const deleteTask = () => {
    if (taskInfo) {
      let uncheckedItem = taskInfo.filter((task) => {
        return task.checked === false;
      });

      // どれもチェックが付いてない場合
      if (uncheckedItem.length == taskInfo.length) {
        Alert.alert(
          '',
          '削除したいスケジュールを選んでください。',
          [{ text: '戻る' }],
          { cancelable: false }
        );
      }

      // どれかにチェックが付いてる場合
      else {
        setTaskInfo(uncheckedItem);
        storeArrayData(lectureNumber, uncheckedItem);
        setIsDataChanged(!isDataChanged);
      }
    } else {
      Alert.alert(
        '',
        '削除したいスケジュールを選んでください。',
        [{ text: '戻る' }],
        { cancelable: false }
      );
    }
  };

  const arrangeArgument = () => {
    let arg = [];
    if (taskInfo) {
      arg = taskInfo;
      arg.filter((task) => (task.checked = false));
      console.log('taskDataが渡った');
      if (taskInfo.length == 1) {
        arg[0].isFirstData = false;
        arg[0].isSecendData = true;
      } else if (taskInfo.length == 0) {
        console.log('taskInfoの長さ0\n');
        arg = [
          {
            id: lectureNumber,
            title: null,
            startDate: null,
            endDate: null,
            memo: null,
            checked: false,
            isFirstData: true,
          },
        ];
      }
      console.log('中身は:' + JSON.stringify(arg) + '\n');
    } else {
      console.log('argが渡った');
      arg = [
        {
          id: lectureNumber,
          title: null,
          startDate: null,
          endDate: null,
          memo: null,
          checked: false,
          isFirstData: true,
        },
      ];
    }
    navigation.navigate('スケジュールの追加・編集', arg);
  };

  const FotterComponent = () => (
    <>
      <View style={styles.iconWrapper}>
        {/* タッチしたアイコンごとに処理を変更 */}
        {/* 🖊をタップ => 該当するタスクの詳細を編集 */}
        {/* プラスボタンをタップ => 該新しいイベントを追加 */}
        <TouchableOpacity
          style={[
            styles.iconBackCricle,
            styles.buttonShadow,
            commonStyles.bgColorTomato,
          ]}
          onPress={deleteTask}
        >
          <FontAwesome5 name="trash-alt" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconBackCricle,
            styles.buttonShadow,
            commonStyles.bgColorTomato,
          ]}
          onPress={() => investigateIsCheckedAndNavigate()}
        >
          <FontAwesome5 name="pen" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconBackCricle,
            styles.buttonShadow,
            commonStyles.bgColorTomato,
          ]}
          onPress={() => arrangeArgument()}
        >
          <Entypo name="add-to-list" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );

  const ContentWhenNoData = () => (
    <View style={styles.emptyContentWrapper}>
      <Text style={commonStyles.basicFont}>スケジュールを追加できます</Text>
    </View>
  );

  const showHideMemo = (indexNum) => {
    taskInfo[indexNum].showMemo = !taskInfo[indexNum].showMemo;
    setTaskInfo(taskInfo);
    setIsDataChanged(!isDataChanged);
  };

  const checkMark = (indexNum) => {
    taskInfo[indexNum].checked = !taskInfo[indexNum].checked;
    setTaskInfo(taskInfo);
    setIsDataChanged(!isDataChanged);
  };

  async function openUrl(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'エラー',
        'このページを開けませんでした',
        [{ text: '戻る' }],
        { cancelable: true }
      );
    }
  }

  const renderItem = ({ item, index }) => {
    const day1 = new Date(item.startDate);
    const day2 = new Date(item.endDate);
    const from = `${day1.getMonth() + 1} / ${day1.getDate()}`;
    const to = `${day2.getMonth() + 1} / ${day2.getDate()}`;
    return (
      <View style={styles.eachItem}>
        <View style={styles.innerMargin}>
          <View style={styles.checkMark}>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                checked={item.checked}
                onPress={() => {
                  taskInfo && checkMark(index);
                }}
              />
            </View>
          </View>
          <Pressable
            style={styles.periodTitleWrapper}
            onPress={() => {
              taskInfo && showHideMemo(index);
            }}
          >
            <View style={styles.periodWrapper}>
              <Text style={commonStyles.basicFont}>{from}</Text>
              <Ionicons name="chevron-down-outline" size={16} color="black" />
              <Text style={commonStyles.basicFont}>{to}</Text>
            </View>
            <View style={styles.taskTitleWrapper}>
              <Text style={commonStyles.largeFontBold}>{item.title}</Text>
            </View>
            {!item.showMemo && (
              <View style={styles.arrowIcon}>
                <FontAwesome5
                  name="angle-double-down"
                  size={24}
                  color="dimgray"
                />
              </View>
            )}
            {item.showMemo && (
              <View style={styles.arrowIcon}>
                <FontAwesome5
                  name="angle-double-up"
                  size={24}
                  color="dimgray"
                />
              </View>
            )}
          </Pressable>
        </View>
        {item.showMemo && item.memo ? (
          <View style={styles.memoWrapper}>
            <Hyperlink
              linkStyle={[commonStyles.colorBlue, commonStyles.basicFontBold]}
              onPress={(url) => openUrl(url)}
            >
              <Text style={commonStyles.basicFont}>{item.memo}</Text>
            </Hyperlink>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={taskInfo}
        style={[commonStyles.bgColorWhite, commonStyles.viewPageContainer]}
        renderItem={renderItem}
        extraData={isDataChanged}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={ContentWhenNoData}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FotterComponent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // 講義情報について
  headerIconTitleWrapper: {
    marginVertical: 2,
    padding: 5,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  iconFlex: {
    alignItems: 'center',
    flex: 1,
  },
  textFlex: {
    alignSelf: 'flex-start',
    flex: 6,
  },
  // スケジュール関連
  scheduleTitleWrapper: {
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  },
  emptyContentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },

  // 各タスク
  eachItem: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  innerMargin: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  checkBoxWrapper: {
    flex: 1,
  },
  periodTitleWrapper: {
    flex: 10,
    flexDirection: 'row',
    height: '100%',
  },
  periodWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 2,
  },
  taskTitleWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
  },
  arrowIcon: {
    paddingRight: 5,
    justifyContent: 'flex-end',
  },
  memoWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  // アイコン関連
  iconWrapper: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  iconBackCricle: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width * 0.5) / 3,
    height: (Dimensions.get('window').width * 0.5) / 3,
  },
  buttonShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
});
