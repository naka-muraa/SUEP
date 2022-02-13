import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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
  const { 時間割コード } = lectureInfo.params;
  const { 時間割所属 } = lectureInfo.params;
  const { 学年 } = lectureInfo.params;
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
        <View style={styles.kindsCodeContainer}>
          <View style={styles.kindsFlex}>
            <Text style={styles.kindsText}>{時間割所属}</Text>
          </View>
          <View style={styles.codeFlex}>
            <Text style={styles.codeText}>コード： {時間割コード}</Text>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{科目}</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemWrapper}>
            <View style={styles.iconFlex}><MaterialIcons name="people-alt" size={24} color="dimgray" /></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.descriptionText}>対象学年</Text>
            </View>
          </View>
          <View style={styles.secondItemWrapper}>
            <View style={styles.iconFlex}></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.itemText}>{学年 + ' 生'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemWrapper}>
            <View style={styles.iconFlex}><Ionicons name="person" size={24} color="dimgray" /></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.descriptionText}>担当者</Text>
            </View>
          </View>
          <View style={styles.secondItemWrapper}>
            <View style={styles.iconFlex}></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.itemText}>{担当}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemWrapper}>
            <View style={styles.iconFlex}><Ionicons name="ios-calendar-sharp" size={24} color="dimgray" /></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.descriptionText}>曜日・時限</Text>
            </View>
          </View>
          <View style={styles.secondItemWrapper}>
            <View style={styles.iconFlex}></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.itemText}>{showDayTime}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemWrapper}>
            <View style={styles.iconFlex}><MaterialIcons name="meeting-room" size={24} color="dimgray" /></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.descriptionText}>講義棟・教室</Text>
            </View>
          </View>
          <View style={styles.secondItemWrapper}>
            <View style={styles.iconFlex}></View>
            <View style={styles.descriptionFlex}>
              <Text style={styles.itemText}>{displayedRoomName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backButtonWrapper} onPress={() => { navigation.goBack(); }}>
            <Text style={styles.backButtonText}>戻る</Text>
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
    flexDirection: 'column',
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: 'white',
  },

  // 講義情報
  kindsCodeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  kindsFlex: {
    flex: 1,
  },
  kindsText: {
    fontSize: 20,
  },
  codeFlex: {
    flex: 1,
  },
  codeText: {
    fontSize: 20,
  },
  nameContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 2,
    backgroundColor: 'lightgray',
  },
  secondItemWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 2,
  },
  descriptionFlex: {
    flex: 7,
  },
  descriptionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconFlex: {
    paddingHorizontal: 9,
    flex: 1,
  },
  itemTextFlex: {
    alignSelf: 'center',
    flex: 1,
  },
  itemText: {
    fontSize: 24,
  },

  //ボタン
  backContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '40%',
  },
  backButtonWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    backgroundColor: '#78bbc7',
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
  }
});
