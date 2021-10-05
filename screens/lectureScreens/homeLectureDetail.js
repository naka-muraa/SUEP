import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

// 教室名と棟名が空白の場合の処理
function changeName(rName, bName,) {
  if (rName == '' || bName == '') {
    return '未定またはオンライン講義です';
  }
  else if (bName != '' && rName == '') {
    return bName;
  }
  else if (bName == '' && rName != '') {
    return rName;
  }
  else if (bName != '' && rName != '') {
    return bName + '\n' + rName;
  }
};

//授業詳細画面
export default function lectureDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const lectureName = route.params.科目;
  const teacher = route.params.担当;
  const dayTime = route.params.曜日時限;
  let roomName = route.params.教室名;
  let buildingName = route.params.棟名;
  let buildName = route.params.棟;
  let displayedRoomName = '';

  if (buildingName == undefined && buildName != undefined) {
    displayedRoomName = changeName(roomName, buildName);
  }
  else if (buildingName != undefined && buildName == undefined) {
    displayedRoomName = changeName(roomName, buildingName);
  }

  const classDayTime = dayTime.split(',')
  const daytime_1 = classDayTime[0] + 'コマ';
  const daytime_2 = classDayTime[1] + 'コマ';
  const showDaytime = daytime_1 + '・' + daytime_2;

  return (
    <ScrollView>
      <View style={styles.containerClass}>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>講義名</Text>
          <Text style={styles.classTapText}>{lectureName}</Text>
        </View>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>担当者</Text>
          <Text style={styles.classTapText}>{teacher}</Text>
        </View>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>曜日・時限</Text>
          <Text style={styles.classTapText}>{showDaytime}</Text>
        </View>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>棟名・教室名</Text>
          <View style={styles.buildingRoom}>
          <Text style={styles.classTapText}>{displayedRoomName}</Text>
          </View>
        </View>
        <View style={styles.ctTuikaContainer}>
          <TouchableOpacity style={styles.ctTuikaBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.ctTuikaBtnText}>戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 全体のコンテナ
  containerClass: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 各情報について
  classTapframe: {
    width: '100%',
    backgroundColor: '#78bbc7',
  },
  classTapHeader: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  classTapText: {
    padding: 5,
    textAlign: 'center',
    width: '100%',
    fontSize: 22,
    backgroundColor: '#e6f2f5',
    color: 'black',
  },
  buildingRoom: {
    marginTop: '2%'
  },
  // 追加ボタン関連
  ctTuikaContainer: {
    width: '30%',
    alignItems: 'center',
    marginTop: 30,
  },
  ctTuikaBtn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    backgroundColor: '#78bbc7'
  },
  ctTuikaBtnText: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});
