import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

// 外部関数のインポート
import { saveData } from '../../AppFunction/LectureScreenFunction/saveData';
import { readTableData } from '../../AppFunction/LectureScreenFunction/ReadTableData';

export default function EditLectureScreen({ navigation }) {
  const [registeredData, setRegisteredData] = useState();
  const [isChecked, setisChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultyNames, setFacultyNames] = useState(
    [{ label: '生物資源科学部', value: '生物資源科学部' },
    { label: '総合理工学部', value: '総合理工学部' },
    { label: '人間科学部', value: '人間科学部' },
    { label: '教育学部', value: '教育学部' },
    { label: '法文学部', value: '法文学部' },
    { label: '人文社会学研究科', value: '人文社会学研究科' },
    { label: '人間社会科学研究科', value: '人間社会科学研究科' },
    { label: '教育学研究科', value: '教育学研究科' },
    { label: '総合理工学研究科', value: '総合理工学研究科' },
    { label: '自然科学研究科', value: '自然科学研究科' },
    ]
  );


  // 初回描画時に実行
  useEffect(() => {
    const arrangeFunc = async () => {
      let storedLectureData = await readTableData('tableKey');
      storedLectureData = JSON.parse(storedLectureData);
      if (storedLectureData != null) {
        storedLectureData.filter(value => value.checked = false);
        setRegisteredData(storedLectureData);
      }
    }
    arrangeFunc();
  }, [])


  // チェックマークを付けたデータで "check" = true or falseを設定
  const checkMark = (classId) => {
    const classIdNumber = registeredData.findIndex((id) => id.時間割コード == classId);
    let newData = registeredData;
    newData[classIdNumber].checked = !newData[classIdNumber].checked;
    setRegisteredData(newData);
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <View style={{ width: '80%' }} >
        <View style={styles.itemSearch}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>{item.科目}</Text>
            <Text style={styles.teacher}>{item.担当}</Text>
          </View>
        </View>
      </View>
      <View style={{ borderWidth: 1, borderColor: '#dcdcdc', width: '100%', height: '100%' }}>
        <CheckBox
          checked={item.checked}
          onPress={() => { checkMark(item.時間割コード); setisChecked(!isChecked); }}
        />
      </View>
    </View>
  );

  // 学部名の保存＋初回起動フラグの設定
  function storeFacultyData(facultyName) {
    try {
      switch (facultyName) {
        case '生物資源科学部':
          // キー, '学部名, 参照するファイル名'
          saveData(['facultyName', '生物資源科学部, 生物資源, 教養教育']);
          break;
        case '総合理工学部':
          saveData(['facultyName', '総合理工学部, 総合理工, 教養教育'])
          break;
        case '人間科学部':
          saveData(['facultyName', '人間科学部, 教養教育, 人間科学, 人間社会科学'])
          break;
        case '教育学部':
          saveData(['facultyName', '教育学部, 教育, 教育学, 教養教育'])
          break;
        case '法文学部':
          saveData(['facultyName', '法文学部, 法文, 教養教育'])
          break;
        case '人文社会学研究科':
          saveData(['facultyName', '人文社会学研究科, 人文社会学研究科'])
          break;
        case '人間社会科学研究科':
          saveData(['facultyName', '人間社会科学研究科, 人間社会科学'])
          break;
        case '教育学研究科':
          saveData(['facultyName', '教育学研究科, 教育学, 教育学_教職'])
          break;
        case '総合理工学研究科':
          saveData(['facultyName', '総合理工研究科, 総合理工_博士後期'])
          break;
        case '自然科学研究科':
          saveData(['facultyName', '自然科学研究科, 自然科学'])
          break;
        default:
          break;
      }
    } catch (error) {
      Sentry.Native.captureException(error);
      console.log('ファイル名：editLectureScreen.js\n' + 'エラー：' + error + '\n');
    }
  };

  const headerComponent = () => (
    <>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>登録済みの情報を編集・削除できます。</Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.h2}>
          <Text style={styles.headerText}>科目</Text>
        </View>
        <View style={styles.h3}>
          <Text style={styles.headerText}>担当</Text>
        </View>
        <View style={styles.h4}>
          <Text style={styles.headerText}>削除</Text>
        </View>
      </View>
    </>
  )

  const deleteResisteredData = async () => {
    storeFacultyData(selectedFaculty);
    if (registeredData != null && registeredData != undefined) {
      let selectedLectures = registeredData.filter((lecture) => !lecture.checked);
      selectedLectures = JSON.stringify(selectedLectures);
      await saveData(['tableKey', selectedLectures]);
    }
    navigation.navigate('時間割表');
  }

  return (
    <View style={{flex: 1,}}>
      <FlatList
        style={styles.flatlistContainer}
        ListHeaderComponent={headerComponent}
        data={registeredData}
        renderItem={renderItem}
        keyExtractor={item => item.時間割コード}
        ListEmptyComponent={<View style={styles.emptyItemCentered}><Text style={styles.emptyText}>該当データがありません</Text></View>}
      />
      <DropDownPicker
        style={styles.dropDown}
        open={open}
        value={selectedFaculty}
        items={facultyNames}
        placeholder="正しい所属先に変更できます"
        setValue={setSelectedFaculty}
        setOpen={setOpen}
      />
      <View style={styles.searchTuikacontainer}>
        <TouchableOpacity style={styles.searchTuikaBtn} onPress={() => { deleteResisteredData(); }}>
          <Text style={styles.searchTuikaBtnText}>登録情報を変更</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // 検索結果一覧のデザイン
  flatlistContainer: {
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
  },
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
  emptyItemCentered: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  emptyText: {
    fontSize: 16,
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
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  searchTuikaBtnText: {
    fontSize: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  // 検索画面ヘッダー関連
  dropDown: {
  },
  containerSearch: {
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
  descriptionContainer: {
    backgroundColor: 'white',
    margin: 5,
    padding: 5,
  },
  description: {
    fontSize: 20,
    color: '#4682b4',
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
