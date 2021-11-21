//TODO:  Flatlistのパフォーマンス改善
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// 外部関数のインポート
import SearchLecture from '../../AppFunction/LectureScreenFunction/SearchLecture';
import { saveData } from '../../AppFunction/LectureScreenFunction/saveData';
import DeleteDuplicateLecture from '../../AppFunction/LectureScreenFunction/deleteDuplicateLecture';

export default function searchScreen() {
  const [searchResultsData, setsearchResultsData] = useState();
  const [isChecked, setisChecked] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  getListData = async () => {

    // 検索実行
    const searchedLecture = await SearchLecture(route.params.keyWord);
    searchedLecture.forEach(value => value.checked = false);
    setsearchResultsData(searchedLecture);
  }

  // マウント時のみ実行される
  useEffect(() => {
    const getAsyncData = async () => {
      route.params.keyWord && await getListData();
      setisLoading(false);
    }
    getAsyncData();
  }, []);

  // チェックマークを付けたデータで "check" = true or falseを設定
  const checkMark = (classId) => {
    const classIdNumber = searchResultsData.findIndex((id) => id.時間割コード == classId);
    let newData = searchResultsData;
    newData[classIdNumber].checked = !newData[classIdNumber].checked;
    setsearchResultsData(newData);
  }

  // 重複するデータを削除し、ストレージへ必要なデータを保存する
  const storeFilteredData = async () => {
    if (searchResultsData != null && searchResultsData != undefined) {
      let selectedLectures = searchResultsData.filter((lecture) => lecture.checked);

      // 曜日・時限が重複するデータがある場合にアラート表示
      let duplicateFlag = false;
      selectedLectures.filter(lecture1 => {
        selectedLectures.filter(lecture2 => {
          if ((lecture1 != lecture2) && (lecture1.曜日時限.slice(0, 1) != '他') && (lecture1.曜日時限.slice(0, 2) == lecture2.曜日時限.slice(0, 2))) {
            duplicateFlag = true;
          }
        })
      });
      if (duplicateFlag) {
        Alert.alert(
          '同じ曜日・時限の科目が複数選択されています。',
          '選択する科目を訂正してください。',
          [
            { text: '戻る', onPress: () => console.log("戻る Pressed") },
          ],
          { cancelable: false });
      }
      else {
        selectedLectures = await DeleteDuplicateLecture(selectedLectures);
        await saveData(['tableKey', selectedLectures]);
        navigation.navigate('時間割表');
      }
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color="rgba(137,232,207,100)"
      />
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.resultItemContainer}>
      <View style={styles.kindsMarkWrapper}>
        <View style={styles.kindFlex}>
          <Text style={styles.kindsText}>{item.時間割所属}</Text>
        </View>
        <View style={styles.codeWrapper}>
          <Text style={styles.codeText}>コード： {item.時間割コード}</Text>
        </View>
      </View>
      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{item.科目}</Text>
      </View>
      <View style={styles.iconTextWrapper}>
        <View style={styles.iconWrapper}>
          <Ionicons name="person" size={18} color="dimgray" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.descriptionText}>{item.担当}</Text>
        </View>
      </View>
      <View style={styles.iconTextWrapper}>
        <View style={styles.iconWrapper}>
          <Ionicons name="ios-calendar-sharp" size={18} color="dimgray" />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.descriptionText}>{item.曜日時限}</Text>
        </View>
      </View>
      <View style={styles.iconTextWrapper}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="meeting-room" size={18} color="dimgray" />
        </View>
        <View style={styles.textWrapper}>
          {item.棟名 != "" ? <Text style={styles.descriptionText}>{item.棟名 + ' ' + item.教室名}</Text> : <Text style={styles.descriptionText}>未定またはオンライン講義です</Text>}
        </View>
      </View>
      <View style={styles.checkBoxWrapper}>
        <Text style={styles.descriptionText}>追加：</Text>
        <CheckBox
          checked={item.checked}
          onPress={() => { checkMark(item.時間割コード); setisChecked(!isChecked); }}
        />
      </View>
    </View>
  );

  const flatListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>「{route.params.keyWord}」での検索結果</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.containerSearch}>
        <FlatList
          ListHeaderComponent={flatListHeader}
          data={searchResultsData}
          renderItem={renderItem}
          keyExtractor={item => item.時間割コード}
          ListEmptyComponent={<View style={styles.emptyTextWrapper}><Text style={styles.emptyText}>該当データがありません</Text></View>}
        />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButtonWrapper} onPress={() => { storeFilteredData(); }}>
          <Text style={styles.addButtonText}>時間割に追加</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerSearch: {
    marginHorizontal: 5,
    marginTop: 10,
    flex: 1,
  },

  // 検索画面ヘッダー関連
  headerContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 16,
  },

  // flatList内アイテムのデザイン
  resultItemContainer: {
    marginVertical: 5,
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  emptyTextWrapper: {
    marginVertical: "10%",
    marginHorizontal: "10%",
  },
  emptyText: {
    fontSize: 18,
  },

  //時間割所属
  kindsMarkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
  },
  kindFlex: {
    flex: 1,
    marginRight: 10,
  },
  kindsText: {
    backgroundColor: "#d3d3d3",
    fontSize: 14,
  },
  codeWrapper: {
    paddingVertical: 5,
    alignItems: "flex-end",
  },
  codeText: {
    fontSize: 14,
    color: "dimgray",
  },

  // 科目名
  nameWrapper: {
    marginVertical: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // チェックマーク
  checkBoxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },

  //共通
  iconTextWrapper: {
    flex: 1,
    marginBottom: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  iconWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textWrapper: {
    flex: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "dimgray",
  },

  // 画面下の追加ボタンデザイン
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 25,
  },
  addButtonWrapper: {
    marginHorizontal: 4,
    marginTop: 4,
    marginBottom: 8,
    width: '50%',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#78bbc7'
  },
  addButtonText: {
    fontSize: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
})
