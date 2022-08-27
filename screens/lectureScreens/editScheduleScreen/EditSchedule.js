import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import arrangeDate from './arrangeDate';
import storeArrayData from './../../../commonUtil/storeArrayData';
import commonStyles from '../../../commonStyle/commonStyle';
import CustomedButton from '../../../commonComponent/CustomedButton';

export default function EditSchedule({ navigation }) {
  let taskInfo = useRoute().params;
  const [item, setItem] = useState();
  const [lectureId, setLectureId] = useState();
  const [title, setTitle] = useState();
  const [memoText, setMemoText] = useState();

  // String型の日時
  const [startDateString, setStartDateString] = useState();
  const [endDateString, setendDateString] = useState();

  // Date型の日時
  const [plainStartDate, setPlainStartDate] = useState();
  const [plainEndDate, setPlainEndDate] = useState();

  // モーダルの出現・消滅を制御
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  // 既存のデータの編集に利用
  const [isModify, setModify] = useState(false);
  const [elementIndex, setElementIndex] = useState();

  // 最初のデータかどうか
  const [isFirstSchedule, setIsFirstSchedule] = useState(false);

  // 日付などの初期化
  useEffect(() => {
    function initialize() {
      let checkedItem = taskInfo.filter((task, index) => {
        if (task.checked) {
          setElementIndex(index);
          return task;
        }
      });

      if (checkedItem.length == 1) {
        checkedItem = checkedItem[0];
        setModify(true);
        setItem(checkedItem);
        setLectureId(checkedItem.id);
        setTitle(checkedItem.title);
        setMemoText(checkedItem.memo);
        const dateFrom = new Date(checkedItem.startDate);
        const dateTo = new Date(checkedItem.endDate);
        setPlainStartDate(dateFrom);
        setPlainEndDate(dateTo);
        setStartDateString(arrangeDate(dateFrom));
        setendDateString(arrangeDate(dateTo));
      } else {
        // 最初のデータかどうか
        if (taskInfo[0].isFirstData && !taskInfo[0].isSecondData) {
          setIsFirstSchedule(true);
          setItem(taskInfo);
          const today = new Date();
          setPlainStartDate(today);
          setPlainEndDate(today);
          const date = today.getDate();
          const month = today.getMonth() + 1;
          const year = today.getFullYear();
          const fullDate = `${year} / ${month} / ${date}`;
          setStartDateString(fullDate);
          setendDateString(fullDate);
          setLectureId(taskInfo[0].id);
          setTitle(taskInfo[0].title);
          setMemoText(taskInfo[0].memo);
        } else {
          setItem(taskInfo);
          const today = new Date();
          setPlainStartDate(today);
          setPlainEndDate(today);
          const date = today.getDate();
          const month = today.getMonth() + 1;
          const year = today.getFullYear();
          const fullDate = `${year} / ${month} / ${date}`;
          setStartDateString(fullDate);
          setendDateString(fullDate);
          setLectureId(taskInfo[0].id);
          setTitle(null);
          setMemoText(null);
        }
      }
    }
    initialize();
  }, []);

  const verifyDate = () => {
    const day1 = new Date(
      plainStartDate.getFullYear(),
      plainStartDate.getMonth(),
      plainStartDate.getDate()
    );
    const day2 = new Date(
      plainEndDate.getFullYear(),
      plainEndDate.getMonth(),
      plainEndDate.getDate()
    );
    if (day2 < day1) {
      Alert.alert(
        '日にちの修正が必要です',
        '終了日は開始日と同じかそれより後にしてください。',
        [{ text: '戻る' }],
        { cancelable: true }
      );
    } else {
      if (isModify) {
        let allData = taskInfo;
        let shcheduleData = item;
        shcheduleData.title = title;
        shcheduleData.startDate = plainStartDate;
        shcheduleData.endDate = plainEndDate;
        shcheduleData.memo = memoText ? memoText : null;
        shcheduleData.checked = false;
        allData[elementIndex] = shcheduleData;
        storeArrayData(lectureId, allData);
        navigation.goBack();
      } else {
        let shcheduleData = [
          {
            id: lectureId ? lectureId : null,
            title: title ? title : 'No title',
            startDate: plainStartDate,
            endDate: plainEndDate,
            memo: memoText ? memoText : null,
            checked: false,
          },
        ];
        if (isFirstSchedule) {
          storeArrayData(lectureId, shcheduleData);
        } else {
          let allData = taskInfo;
          allData.push(shcheduleData[0]);
          storeArrayData(lectureId, allData);
        }
        navigation.goBack();
      }
    }
  };

  // 新しいスケジュールをasyncstorageで保存 + 画面遷移
  const DoneEditButton = () => (
    <View style={styles.editDoneWrapper}>
      <CustomedButton
        onPress={verifyDate}
        buttonStyle={commonStyles.bgColorTomato}
        buttonText={
          <>
            <Text>完了 </Text>
            <Ionicons name="checkmark-done" size={24} color="white" />
          </>
        }
      />
    </View>
  );

  const confirmEndDate = (date) => {
    setPlainEndDate(date);
    setendDateString(arrangeDate(date));
    hideDatePicker('to');
  };

  const hideDatePicker = (criteria) => {
    if (criteria == 'from') {
      setStartDatePickerVisibility(false);
    } else {
      setEndDatePickerVisibility(false);
    }
  };

  const confirmStartDate = (date) => {
    setPlainStartDate(date);
    setStartDateString(arrangeDate(date));
    hideDatePicker('from');
  };

  const showDatePicker = (criteria) => {
    if (criteria == 'from') {
      setStartDatePickerVisibility(true);
    } else {
      setEndDatePickerVisibility(true);
    }
  };

  return (
    <ScrollView
      style={[commonStyles.viewPageContainer, commonStyles.bgColorWhite]}
    >
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.leftBorder}>
            <TextInput
              style={[styles.titleTextInput, commonStyles.basicFont]}
              placeholder="タイトルを記入"
              onChangeText={setTitle}
              value={title}
              multiline={true}
            />
          </View>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={[commonStyles.basicFont, commonStyles.colorTomato]}>
            開始
          </Text>
          <View>
            <TouchableOpacity onPress={() => showDatePicker('from')}>
              <Text style={commonStyles.xLargeFont}>{startDateString}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={confirmStartDate}
            onCancel={() => hideDatePicker('from')}
          />
        </View>
        <View style={styles.dateWrapper}>
          <Text style={[commonStyles.basicFont, commonStyles.colorTomato]}>
            終了
          </Text>
          <View>
            <TouchableOpacity onPress={() => showDatePicker('to')}>
              <Text style={commonStyles.xLargeFont}>{endDateString}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={confirmEndDate}
            onCancel={() => hideDatePicker('To')}
          />
        </View>
        <View style={styles.memoWrapper}>
          <View>
            <Text style={[commonStyles.basicFont, commonStyles.colorTomato]}>
              メモ
            </Text>
            <View style={styles.memoInput}>
              <TextInput
                style={[styles.memoInputSpaceDesign, commonStyles.basicFont]}
                value={memoText}
                autoCapitalize="none"
                onChangeText={setMemoText}
                placeholder="スケジュールに関する情報を入力"
                multiline={true}
              />
            </View>
          </View>
        </View>
        <DoneEditButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleWrapper: {
    paddingVertical: 10,
    marginTop: 10,
  },
  leftBorder: {
    borderLeftColor: 'tomato',
    borderLeftWidth: 3,
  },
  titleTextInput: {
    padding: 10,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  dateWrapper: {
    paddingVertical: 15,
    marginVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  memoWrapper: {
    paddingVertical: 15,
    marginVertical: 10,
  },
  memoInput: {
    width: '100%',
  },
  memoInputSpaceDesign: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  editDoneWrapper: {
    justifyContent: 'center',
    marginVertical: 10,
  },
});
