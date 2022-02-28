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
import { ScrollView } from 'react-native-gesture-handler';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// スタイルのインポート
import CommonStyles from '../../StyleSheet/CommonStyels';

export default function TaskEdit({ navigation }) {
  const route = useRoute();
  let isPassedItemExist = false;
  if (route.params) {
    isPassedItemExist = true;
  }
  const [title, setTitle] = useState(
    isPassedItemExist ? route.params.title : null
  );
  const [startYear, setStartYear] = useState(
    isPassedItemExist ? route.params.startYear : null
  );
  const [startMonth, setStartMonth] = useState(
    isPassedItemExist ? route.params.startMonth : null
  );
  const [startDay, setStartDay] = useState(
    isPassedItemExist ? route.params.startDay : null
  );
  const [endYear, setEndYear] = useState(
    isPassedItemExist ? route.params.endYear : null
  );
  const [endMonth, setEndMonth] = useState(
    isPassedItemExist ? route.params.endMonth : null
  );
  const [endDay, setEndDay] = useState(
    isPassedItemExist ? route.params.endDay : null
  );
  const [content, setContent] = useState(
    isPassedItemExist ? route.params.content : null
  );
  const [memoText, setMemoText] = useState(
    isPassedItemExist ? route.params.memo : null
  );

  const StartYearMonthDayInputSpace = () => (
    <View style={styles.yearMonthDayWrapper}>
      <View style={styles.yearInputWrapper}>
        <View style={styles.yearInputFlex}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setStartYear(text);
            }}
            value={startYear}
          />
        </View>
        <View style={styles.yearTextFlex}>
          <Text>年</Text>
        </View>
      </View>
      <View style={styles.monthDayInputWrapper}>
        <View style={styles.monthDayInputFlex}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setStartMonth(text);
            }}
            value={startMonth}
          />
        </View>
        <View style={styles.monthTextFlex}>
          <Text>月</Text>
        </View>
        <View style={styles.monthDayInputFlex}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setStartDay(text);
            }}
            value={startDay}
          />
        </View>
        <View style={styles.monthTextFlex}>
          <Text>日</Text>
        </View>
      </View>
    </View>
  );

  const EndYearMonthDayInputSpace = () => (
    <View style={styles.yearMonthDayWrapper}>
      <View style={styles.yearInputWrapper}>
        <View style={styles.yearInputFlex}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setEndYear(text);
            }}
            value={endYear}
          />
        </View>
        <View style={styles.yearTextFlex}>
          <Text>年</Text>
        </View>
      </View>
      <View style={styles.monthDayInputWrapper}>
        <View style={styles.monthDayInputFlex}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setEndMonth(text);
            }}
            value={endMonth}
          />
        </View>
        <View style={styles.monthTextFlex}>
          <Text>月</Text>
        </View>
        <View style={styles.monthDayInputFlex}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setEndDay(text);
            }}
            value={endDay}
          />
        </View>
        <View style={styles.monthTextFlex}>
          <Text>日</Text>
        </View>
      </View>
    </View>
  );

  const WaveSpace = () => (
    <View style={styles.waveWrapper}>
      <Text> ~ </Text>
    </View>
  );

  const MemoSpace = () => (
    <View>
      <View style={styles.titleTextMargin}>
        <Text>説明</Text>
      </View>
      <View style={styles.memoInput}>
        <TextInput
          style={styles.memoInputSpaceDesign}
          value={memoText}
          autoCapitalize="none"
          onChangeText={setMemoText}
          placeholder="メモ欄"
          multiline={true}
        />
      </View>
    </View>
  );

  // 新しいスケジュールを追加したらasyncstorageで保存して画面遷移の必要あり
  const DoneEditButton = () => (
    <View style={styles.editDoneWrapper}>
      <TouchableOpacity
        style={styles.editDoneButton}
        onPress={() => navigation.goBack()}>
        <Text>完了</Text>
        <Ionicons name="checkmark-done" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={CommonStyles.viewPageContainer}>
      <TextInput
        style={styles.titleTextInput}
        placeholder="タイトルを記入"
        onChangeText={setTitle}
        value={title}
        multiline={true}
      />
      <View style={styles.titleTextMargin}>
        <Text>期間</Text>
      </View>
      <View style={styles.periodInputAreaContainer}>
        <StartYearMonthDayInputSpace />
        <WaveSpace />
        <EndYearMonthDayInputSpace />
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
