import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// 教室名と棟名が空白の場合の処理
function changeName(roomeName, buildingName,) {
  if (roomeName == '' || buildingName == '') {
    return '未定またはオンライン講義です';
  }
  else if (buildingName != '' && roomeName == '') {
    return buildingName;
  }
  else if (buildingName == '' && roomeName != '') {
    return roomeName;
  }
  else if (buildingName != '' && roomeName != '') {
    return buildingName + '\n' + roomeName;
  }
};

//授業詳細画面
export default function classDetails({ navigation, lectureInfo }) {
  const { 科目 } = lectureInfo.params;
  const { 担当 } = lectureInfo.params;
  const { 教室名 } = lectureInfo.params;
  const { 棟名 } = lectureInfo.params;
  const { 棟 } = lectureInfo.params;
  const { 曜日時限 } = lectureInfo.params;
  let displayedRoomName = '';

  if (棟名 == undefined && 棟 != undefined) {
    displayedRoomName = changeName(教室名, 棟);
  }
  else if (棟名 != undefined && 棟 == undefined) {
    displayedRoomName = changeName(教室名, 棟名);
  }

  //全角・半角空白除去処理
  let dayTime = null;
  if (曜日時限.search(/..\s+/g) != -1) {
    dayTime = 曜日時限.replace(/\s+/g, '');
  } else {
    dayTime = 曜日時限;
  }

  //, ・除去
  let classDayTime = null;
  if (dayTime.indexOf(',')) {
    classDayTime = dayTime.split(',');
  } else if (dayTime.indexOf('・')) {
    classDayTime = dayTime.split('・')
  }

  //曜日時限 表示 （↓の処理はもっと簡潔にしてください）
  let showDayTime = '';
  const DaytimeLength = classDayTime.length;
  if (曜日時限 == '他' || 曜日時限.match('Thursday') || 曜日時限.length >= 24) {
    showDayTime = 曜日時限;
  } else if (2 <= DaytimeLength <= 8) {
    for (const CDT of classDayTime) {
      const CDT1 = CDT + 'コマ ';
      showDayTime = showDayTime + CDT1;
    }
  }

  return (
    <ScrollView>
      <View style={styles.containerClass}>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>講義名</Text>
          <Text style={styles.classTapText}>{科目}</Text>
        </View>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>担当者</Text>
          <Text style={styles.classTapText}>{担当}</Text>
        </View>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>曜日・時限</Text>
          <Text style={styles.classTapText}>{showDayTime}</Text>
        </View>
        <View style={styles.classTapframe}>
          <Text style={styles.classTapHeader}>教室名</Text>
          <Text style={styles.classTapText}>{displayedRoomName}</Text>
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
