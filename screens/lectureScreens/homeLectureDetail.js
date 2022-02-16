import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

// スタイルとコンポーネントのインポート
import CustomedButton from '../../Components/CustomedButton';
import CommonStyles from '../../StyleSheet/CommonStyels';

// 教室名と棟名が空白の場合の処理
function changePlaceName(room, building,) {
  if (room == '' || building == '') {
    return '未定またはオンライン講義です';
  }
  else if (building != '' && room == '') {
    return building;
  }
  else if (building == '' && room != '') {
    return room;
  }
  else if (building != '' && room != '') {
    return building + '\n' + room;
  }
};

//授業詳細画面
export default function lectureDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const lectureName = route.params.科目;
  const teacher = route.params.担当;
  let roomName = route.params.教室名;
  let buildingName = route.params.棟名;
  let displayedRoomName = '';

  displayedRoomName = changePlaceName(roomName, buildingName);

  return (
    <View style={CommonStyles.viewPageContainer}>
      <View style={[CommonStyles.bgColorWhite, styles.separatedItemContainer]}>
        <View style={styles.headerInfoLabelWrapper}>
          <View style={styles.iconFlex}>
            <MaterialIcons name="title" size={24} color="dimgray" />
          </View>
          <View style={styles.textFlex}>
            <Text style={styles.infoText}>{lectureName}</Text>
          </View>
        </View>
        <View style={styles.headerInfoLabelWrapper}>
          <View style={styles.iconFlex}>
            <Ionicons name="person" size={18} color="dimgray" />
          </View>
          <View style={styles.textFlex}>
            <Text style={styles.infoText}>{teacher}</Text>
          </View>
        </View>
        <View style={styles.headerInfoLabelWrapper}>
          <View style={styles.iconFlex}>
            <MaterialIcons name="meeting-room" size={18} color="dimgray" />
          </View>
          <View style={styles.textFlex}>
            <Text style={styles.infoText}>{displayedRoomName}</Text>
          </View>
        </View>
      </View>
      <View style={[CommonStyles.bgColorWhite, styles.separatedItemContainer]}>
        <View style={styles.scheduleTitleWrapper}>
          <Text style={styles.scheduleTitleText}>スケジュール</Text>
        </View>
      </View>
      <View style={[CommonStyles.bgColorWhite, styles.separatedItemContainer]}>
        <CustomedButton
          buttonStyle={styles.extraButtonStyle}
          buttonText='戻る'
          onPress={() => { navigation.goBack(); }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 全体のコンテナ
  container: {
    justifyContent: 'center',
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separatedItemContainer: {
    marginVertical: 10,
  },
  // 講義情報について
  headerInfoLabelWrapper: {
    paddingHorizontal: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconFlex: {
    alignItems: 'center',
    flex: 1,
  },
  textFlex: {
    alignSelf: 'flex-start',
    flex: 6,
  },
  infoText: {
    width: '100%',
    fontSize: 18,
  },
  // スケジュール関連
  scheduleTitleWrapper: {
    marginLeft: 10,
    width: '100%',
  },
  scheduleTitleText: {
    fontSize: 18,
  },
  listRowWrapper: {},
  innerMargin: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  checkBoxWrapper: {
    flex: 1,
  },
  periodTitleWrapper: {
    flex: 10,
    flexDirection: 'row',
    height: '100%',
  },
  periodWrapper: {
    height: '100%',
    justifyContent: 'center',
    flex: 4,
  },
  taskTitleWrapper: {
    height: '100%',
    justifyContent: 'center',
    flex: 6,
  },
  arrowIcon: {
    paddingRight: 5,
    justifyContent: 'flex-end',
  },
  memoWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  separator: {
    height: 1,
    marginHorizontal: '1%',
    backgroundColor: '#CED0CE',
  },
  // アイコン関連
  iconWrapper: {
    marginTop: 20,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  iconBackCricle: {
    backgroundColor: '#F8F8F8',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width * 0.5) / 3,
    height: (Dimensions.get('window').width * 0.5) / 3,
  },
  // 追加ボタン関連
  goBackButtonWrapper: {
    margin: 30,
    alignItems: 'center',
  },
  goBackButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    backgroundColor: '#78bbc7',
    padding: 5,
    width: '30%',
  },
  goBackButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
