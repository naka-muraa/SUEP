//TODO:  Flatlistのパフォーマンス改善
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// 外部関数のインポート
import searchLecture from './searchLecture';
import storeData from '../../../commonUtil/storeData';
import combineCurrentDataWithSelectedData from './combineCurrentDataWithSelectedData';
import convertDataForTableScreen from './convertDataForTable';
import separateTableAndLectureData from './separateTableAndLectureData';

// スタイルとコンポーネントのインポート
import CustomedButton from '../../../commonComponent/CustomedButton';
import CustomedIndicator from '../../../commonComponent/CustomedIndicator';
import commonStyles from '../../../commonStyle/commonStyle';

export default function SearchScreen({ navigation }) {
  const [searchResultsData, setsearchResultsData] = useState();
  const [isChecked, setisChecked] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const route = useRoute();
  const getListData = async () => {
    // 検索実行
    const searchedLecture = await searchLecture(route.params.keyWord);
    searchedLecture.forEach((value) => (value.checked = false));
    setsearchResultsData(searchedLecture);
  };

  // マウント時のみ実行される
  useEffect(() => {
    const getAsyncData = async () => {
      route.params.keyWord && (await getListData());
      setisLoading(false);
    };
    getAsyncData();
  }, []);

  // チェックマークを付けたデータで 'check' = true or falseを設定
  const checkMark = (classId) => {
    const classIdNumber = searchResultsData.findIndex(
      (id) => id.時間割コード == classId
    );
    let newData = searchResultsData;
    newData[classIdNumber].checked = !newData[classIdNumber].checked;
    setsearchResultsData(newData);
  };

  // 重複するデータを削除し、ストレージへ必要なデータを保存する
  async function storeFilteredData() {
    let selectedLectures = searchResultsData.filter(
      (lecture) => lecture.checked
    );
    if (selectedLectures != null) {
      // 曜日・時限が重複するデータがある場合にアラート表示
      let isDuplicate = false;
      selectedLectures.filter((lecture1) => {
        selectedLectures.filter((lecture2) => {
          if (
            lecture1 != lecture2 &&
            lecture1.曜日時限.slice(0, 1) != '他' &&
            lecture1.曜日時限.slice(0, 2) == lecture2.曜日時限.slice(0, 2)
          ) {
            isDuplicate = true;
          }
        });
      });
      if (isDuplicate) {
        Alert.alert(
          '同じ曜日・時限の科目が複数選択されています。',
          '選択する科目を訂正してください。',
          [{ text: '戻る' }]
        );
      } else {
        // 時間割表のデータ・その他のデータを分割、整形、保存
        const allLectureData = await combineCurrentDataWithSelectedData(
          selectedLectures
        );
        let [lectureTableData, otherLectureData] =
          await separateTableAndLectureData(allLectureData);
        storeData('plainTableDataKey', lectureTableData);
        const tableFormattedData = await convertDataForTableScreen(
          lectureTableData
        );
        const keyValueSet = [
          {
            key: 'formattedTableDataKey',
            value: tableFormattedData,
          },
          {
            key: 'otherLectureKey',
            value: otherLectureData,
          },
        ];
        await Promise.all(
          keyValueSet.map((item) => storeData(item.key, item.value))
        );
        navigation.navigate('時間割表');
      }
    }
  }

  if (isLoading) {
    return (
      <View style={commonStyles.viewPageContainer}>
        <CustomedIndicator />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.resultItemContainer}>
      <View style={styles.kindsMarkWrapper}>
        <View style={styles.kindFlex}>
          <Text style={[styles.kindsText, commonStyles.smallFont]}>
            {item.時間割所属}
          </Text>
        </View>
        <View style={styles.codeWrapper}>
          <Text style={[styles.codeText, commonStyles.smallFont]}>
            コード： {item.時間割コード}
          </Text>
        </View>
      </View>
      <View style={styles.nameWrapper}>
        <Text style={commonStyles.xLargeFontBold}>{item.科目}</Text>
      </View>
      <View style={styles.iconTextWrapper}>
        <View style={styles.iconWrapper}>
          <Ionicons name="person" size={18} color="dimgray" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={commonStyles.basicFont}>{item.担当}</Text>
        </View>
      </View>
      <View style={styles.iconTextWrapper}>
        <View style={styles.iconWrapper}>
          <Ionicons name="ios-calendar-sharp" size={18} color="dimgray" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={commonStyles.basicFont}>{item.曜日時限}</Text>
        </View>
      </View>
      <View style={styles.iconTextWrapper}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="meeting-room" size={18} color="dimgray" />
        </View>
        <View style={styles.textWrapper}>
          {item.棟名 != '' ? (
            <Text style={commonStyles.basicFont}>
              {item.棟名 + ' ' + item.教室名}
            </Text>
          ) : (
            <Text style={commonStyles.basicFont}>
              未定またはオンライン講義です
            </Text>
          )}
        </View>
      </View>
      <View style={styles.checkBoxWrapper}>
        <Text style={commonStyles.basicFont}>追加：</Text>
        <CheckBox
          checked={item.checked}
          onPress={() => {
            checkMark(item.時間割コード);
            setisChecked(!isChecked);
          }}
        />
      </View>
    </View>
  );

  const flatListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={commonStyles.basicFont}>
        「{route.params.keyWord}」での検索結果
      </Text>
    </View>
  );

  return (
    <>
      <View style={commonStyles.viewPageContainer}>
        <FlatList
          ListHeaderComponent={flatListHeader}
          data={searchResultsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.時間割コード}
          ListEmptyComponent={
            <View style={commonStyles.viewPageContainer}>
              <Text style={commonStyles.largeFont}>該当データがありません</Text>
            </View>
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomedButton
          onPress={() => {
            if (searchResultsData) {
              storeFilteredData();
            }
          }}
          buttonText="時間割に追加"
          buttonStyle={styles.extraButtonStyle}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // 検索画面ヘッダー関連
  headerContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
  },

  // flatList内アイテムのデザイン
  resultItemContainer: {
    marginVertical: 5,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  //時間割所属
  kindsMarkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  kindFlex: {
    flex: 1,
    marginRight: 10,
  },
  kindsText: {
    backgroundColor: '#d3d3d3',
  },
  codeWrapper: {
    paddingVertical: 5,
    alignItems: 'flex-end',
  },
  codeText: {
    color: 'dimgray',
  },

  // 科目名
  nameWrapper: {
    marginVertical: 10,
  },

  // チェックマーク
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  //共通
  iconTextWrapper: {
    flex: 1,
    marginBottom: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textWrapper: {
    flex: 8,
  },

  // 画面下の追加ボタンデザイン
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 25,
  },
  extraButtonStyle: {
    marginVertical: 10,
  },
});
