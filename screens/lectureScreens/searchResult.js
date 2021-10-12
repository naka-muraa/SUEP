// Flatlistのパフォーマンス改善が必須
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';

// 外部汎用関数のインポート
import SearchLecture from '../../appFunction/searchLecture';
import { saveData } from '../../appFunction/saveData';
import DeleteDuplicateLecture from '../../appFunction/deleteDuplicateLecture';

export default function searchScreen() {

  // searchResultsData: 検索結果が入る
  const [searchResultsData, setsearchResultsData] = useState();
  const [isChecked, setisChecked] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  getListData = async () => {
    // 検索実行
    const searchedLecture = await SearchLecture(route.params.keyWord);
    // "check" = falseの項を追加
    searchedLecture.forEach(value => value.checked = false);
    setsearchResultsData(searchedLecture);
  }

  // マウント時のみ実行される
  useEffect(() => {
    route.params.keyWord && getListData();
    setisLoading(false);
  }, []);

  // チェックマークを付けたデータで "check" = true or falseを設定
  const checkMark = (classId) => {
    const classIdNumber = searchResultsData.findIndex((id) => id.時間割コード == classId);
    let newData = searchResultsData;
    newData[classIdNumber].checked = !newData[classIdNumber].checked;
    setsearchResultsData(newData);
  }

  const Item = ({ 科目, 担当 }) => (
    <View style={styles.itemSearch}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{科目}</Text>
        <Text style={styles.teacher}>{担当}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <TouchableHighlight style={{ width: '80%' }} onPress={() => navigation.navigate("講義の詳細", item)}>
        <Item 科目={item.科目} 担当={item.担当} />
      </TouchableHighlight>
      <View style={{ borderWidth: 1, borderColor: '#dcdcdc', width: '100%', height: '100%' }}>
        <CheckBox
          checked={item.checked}
          onPress={() => { checkMark(item.時間割コード); setisChecked(!isChecked); }}
        />
      </View>
    </View>
  );

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
            { text: '戻る', onPress: () => console.log("戻る Pressed")},
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

  if (!searchResultsData) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color="rgba(137,232,207,100)"
        />
    );
  }

  return (
    <SafeAreaView style={styles.containerSearch}>
      <View style={styles.headerContainer}>
        <View style={styles.h2}>
          <Text style={styles.headerText}>科目</Text>
        </View>
        <View style={styles.h3}>
          <Text style={styles.headerText}>担当</Text>
        </View>
        <View style={styles.h4}>
          <Text style={styles.headerText}>追加</Text>
        </View>
      </View>
      <FlatList
        data={searchResultsData}
        renderItem={renderItem}
        keyExtractor={item => item.時間割コード}
        ListEmptyComponent={<Text>該当データがありません</Text>}
      />
      <View style={styles.searchTuikacontainer}>
        <TouchableOpacity style={styles.searchTuikaBtn} onPress={() => { storeFilteredData(); }}>
          <Text style={styles.searchTuikaBtnText}>時間割に追加</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 検索結果一覧のデザイン
  itemSearch: {
    backgroundColor: '#167F92',
    flexDirection: 'row'
  },
  title: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    width: '50%',
  },
  teacher: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    width: '50%',
  },
  // 画面下の追加ボタンデザイン
  searchTuikaBtn: {
    width: '50%',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#78bbc7'
  },
  searchTuikacontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  searchTuikaBtnText: {
    fontSize: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  // 検索画面ヘッダー関連
  containerSearch: {
    marginHorizontal: 5,
    marginVertical: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h3: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h4: {
    width: '20%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
