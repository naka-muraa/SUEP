import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput, Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// 外部関数のインポート
import arrangeDate from '../../AppFunction/LectureScreenFunction/arrangeDate';
import { saveData } from '../../AppFunction/LectureScreenFunction/saveData';

// スタイルとコンポーネントのインポート
import CommonStyles from '../../StyleSheet/CommonStyels';
import CustomedButton from '../../Components/CustomedButton';

export default function TaskEdit({ navigation }) {
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
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
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
          return task
        }
      });

      if (checkedItem.length == 1) {
        checkedItem = checkedItem[0];
        setModify(true);
        setItem(checkedItem);
        setLectureId(checkedItem.id);
        setTitle(checkedItem.title);
        setMemoText(checkedItem.memo);
        setStartDateString(checkedItem.startDate);
        setendDateString(checkedItem.endDate);
      }
      else {

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
        }
        else {
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
    if (isModify) {
      let allData = taskInfo;
      let shcheduleData = item;
      shcheduleData.title = title;
      shcheduleData.startDate = startDateString;
      shcheduleData.endDate = endDateString;
      shcheduleData.memo = memoText ? memoText : null;
      shcheduleData.checked = false;
      allData[elementIndex] = shcheduleData;
      console.log('全てのタスク:' + allData);
      allData = JSON.stringify(allData);
      saveData([lectureId, allData]);
      navigation.goBack();
    } else {
      const day1 = plainStartDate.getFullYear() + plainStartDate.getMonth() + plainStartDate.getDate();
      const day2 = plainEndDate.getFullYear() + plainEndDate.getMonth() + plainEndDate.getDate()
      if (day2 < day1) {
        Alert.alert(
          '日にちの修正が必要です',
          '終了日は開始日と同じかそれより後にしてください。',
          [
            { text: '戻る' },
          ],
          { cancelable: true }
        );
      } else {
        let shcheduleData = [
          {
            id: lectureId ? lectureId : null,
            title: title ? title : 'No title',
            startDate: startDateString,
            endDate: endDateString,
            memo: memoText ? memoText : null,
            checked: false,
          }
        ];
        if (isFirstSchedule) {
          console.log('isFirstScheduleはtrueです')
          console.log('保存に使うキー' + lectureId);
          shcheduleData = JSON.stringify(shcheduleData);
          saveData([lectureId, shcheduleData]);
        } else {
          let allData = taskInfo;
          allData.push(shcheduleData[0]);
          allData = JSON.stringify(allData);
          saveData([lectureId, allData]);
        }
        navigation.goBack();
      }
    }
  }

  // 新しいスケジュールをasyncstorageで保存 + 画面遷移
  const DoneEditButton = () => (
    <View style={styles.editDoneWrapper}>
      <CustomedButton
        onPress={verifyDate}
        buttonStyle={CommonStyles.bgColorTomato}
        buttonText={<><Text>完了 </Text><Ionicons name='checkmark-done' size={24} color='white' /></>}
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
    setStartDateString(arrangeDate(date))
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
    <ScrollView style={[CommonStyles.viewPageContainer, CommonStyles.bgColorWhite]}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.leftBorder}>
            <TextInput
              style={[styles.titleTextInput, CommonStyles.basicFont]}
              placeholder='タイトルを記入'
              onChangeText={setTitle}
              value={title}
              multiline={true}
            />
          </View>
        </View>
        <View style={styles.dateWrapper}>
          <Text style={[CommonStyles.basicFont, CommonStyles.colorTomato]}>開始</Text>
          <View>
            <TouchableOpacity onPress={() => showDatePicker('from')}>
              <Text style={CommonStyles.xLargeFont}>{startDateString}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode='date'
            onConfirm={confirmStartDate}
            onCancel={() => hideDatePicker('from')}
          />
        </View>
        <View style={styles.dateWrapper}>
          <Text style={[CommonStyles.basicFont, CommonStyles.colorTomato]}>終了</Text>
          <View>
            <TouchableOpacity onPress={() => showDatePicker('to')}>
              <Text style={CommonStyles.xLargeFont}>{endDateString}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode='date'
            onConfirm={confirmEndDate}
            onCancel={() => hideDatePicker('To')}
          />
        </View>
        <View style={styles.memoWrapper}>
          <View>
            <Text style={[CommonStyles.basicFont, CommonStyles.colorTomato]}>メモ</Text>
            <View style={styles.memoInput}>
              <TextInput
                style={[styles.memoInputSpaceDesign, CommonStyles.basicFont]}
                value={memoText}
                autoCapitalize='none'
                onChangeText={setMemoText}
                placeholder='スケジュールに関する情報を入力'
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
