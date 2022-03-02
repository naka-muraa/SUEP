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
import saveData from '../../AppFunction/LectureScreenFunction/saveData';

// スタイルとコンポーネントのインポート
import CommonStyles from '../../StyleSheet/CommonStyels';
import CustomedButton from '../../Components/CustomedButton';

export default function TaskEdit({ navigation }) {
  const [title, setTitle] = useState();
  const [memoText, setMemoText] = useState();
  const route = useRoute();
  const [starDateString, setStartDateString] = useState();
  const [endDateString, setendDateString] = useState();
  const [plainStartDate, setPlainStartDate] = useState();
  const [plainEndDate, setPlainEndDate] = useState();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (route.params) {
      setTitle(route.params.title);
      setStartDateString(route.params.from);
      setendDateString(route.params.to);
    }
    else {
      const today = new Date();
      setPlainStartDate(today);
      setPlainEndDate(today);
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const fullDate = `${year} / ${month} / ${date}`;
      setStartDateString(fullDate);
      setendDateString(fullDate);
    }
  }, [])

  const MemoSpace = () => {
    return (
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
    );
  };

  const verifyDate = () => {
    if ((plainEndDate < plainStartDate) && (plainEndDate.getDate() != plainStartDate.getDate())) {
      Alert.alert(
        '日にちの修正が必要です',
        '終了日は開始日と同じかそれより後にしてください。',
        [
          { text: '戻る' },
        ],
        { cancelable: true }
      );
    } else {
      const shcheduleData = {
        title: title ? title : 'No title',
        startDate: starDateString,
        endDate: endDateString,
        note: memoText ? memoText : null,
      };
//      saveData([科目, JSON.stringfy(shcheduleData)]);
      navigation.goBack()
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
  }

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
  }

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
            <Text style={CommonStyles.xLargeFont}>{starDateString}</Text>
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
        <MemoSpace />
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
    paddingVertical:15,
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
