// 日にちの参照にはhttps://github.com/mmazzarolo/react-native-modal-datetime-picker
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// スタイルのインポート
import CommonStyles from '../../StyleSheet/CommonStyels';

export default function TaskEdit({ navigation }) {
  const [title, setTitle] = useState();
  const [memoText, setMemoText] = useState();
  const route = useRoute();
  if (route.params) {
    setTitle(route.params.title);
    setMemoText(route.params.memo);
    setFrom(route.params.from);
    setTo(route.params.to);
  }
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [fromDate, setFrom] = useState();
  const [toDate, setTo] = useState();

  useEffect(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const fullDate = `${year} / ${month} / ${date}`;
    setFrom(fullDate);
    setTo(fullDate);
  }, [])

  const MemoSpace = () => (
    <View>
      <View style={styles.titleTextMargin}>
        <Text>メモ</Text>
      </View>
      <View style={styles.memoInput}>
        <TextInput
          style={styles.memoInputSpaceDesign}
          value={memoText}
          autoCapitalize='none'
          onChangeText={setMemoText}
          placeholder='メモ欄'
          multiline={true}
        />
      </View>
    </View>
  );

  // 新しいスケジュールをasyncstorageで保存 + 画面遷移
  const DoneEditButton = () => (
    <View style={styles.editDoneWrapper}>
      <TouchableOpacity
        style={styles.editDoneButton}
        onPress={() => navigation.goBack()}>
        <Text>完了</Text>
        <Ionicons name='checkmark-done' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );

  const handleConfirmTo = (date) => {
    setTo(arrangeDate(date));
    hideDatePicker('to');
  };

  const hideDatePicker = (criteria) => {
    if (criteria == 'from') {
      setFromDatePickerVisibility(false);
    } else {
      setToDatePickerVisibility(false);
    }
  }

  const handleComfirmFrom = (date) => {
    setFrom(arrangeDate(date))
    hideDatePicker('from');
  };

  const showDatePicker = (criteria) => {
    if (criteria == 'from') {
      setFromDatePickerVisibility(true);
    } else {
      setToDatePickerVisibility(true);
    }
  }

  return (
    <ScrollView style={CommonStyles.viewPageContainer}>
      <TextInput
        style={styles.titleTextInput}
        placeholder='タイトルを記入'
        onChangeText={setTitle}
        value={title}
        multiline={true}
      />
      <View style={styles.titleTextMargin}>
        <Text>開始</Text>
      </View>
      <View>
        <TouchableOpacity onPress={showDatePicker('from')}>
          <Text>{fromDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isFromDatePickerVisible}
          mode='date'
          onConfirm={handleComfirmFrom}
          onCancel={hideDatePicker('from')}
        />
      </View>
      <View style={styles.titleTextMargin}>
        <Text>終了</Text>
      </View>
      <View>
        <TouchableOpacity onPress={showDatePicker('to')}>
          <Text>{toDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isToDatePickerVisible}
          mode='date'
          onConfirm={handleConfirmTo}
          onCancel={hideDatePicker('To')}
        />
      </View>
      <MemoSpace />
      <DoneEditButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 各項目のタイトル
  titleTextMargin: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
  },
  titleTextInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
  // 日にち記入欄
  periodInputAreaContainer: {
    flexDirection: 'row',
    height: 100,
  },
  yearMonthDayWrapper: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  waveWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  yearInputWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  yearInputFlex: {
    flex: 4,
  },
  yearTextFlex: {
    flex: 1,
  },
  monthDayInputWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  monthDayInputFlex: {
    flex: 1,
  },
  monthTextFlex: {
    flex: 1,
  },
  // メモ記入欄
  memoInput: {
    width: '100%',
  },
  memoInputSpaceDesign: {
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
  },
  // 編集完了ボタン
  editDoneWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  editDoneButton: {
    backgroundColor: '#CED0CE',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width * 0.5) / 3,
    height: (Dimensions.get('window').width * 0.5) / 3,
  },
});
