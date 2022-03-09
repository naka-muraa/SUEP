import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import CustomedButton from '../../../commonComponent/CustomedButton';
import commonStyles from '../../../commonStyle/commonStyle';
import saveData from './../../../commonUtil/saveData';

// 学部名の保存＋初回起動フラグの設定
function storeFacultyData(facultyName) {
  try {
    switch (facultyName) {
      case '生物資源科学部':
        // キー, '学部名, 参照するファイル名'
        saveData(['facultyName', '生物資源科学部, 生物資源, 教養教育']);
        break;
      case '総合理工学部':
        saveData(['facultyName', '総合理工学部, 総合理工, 教養教育']);
        break;
      case '人間科学部':
        saveData([
          'facultyName',
          '人間科学部, 教養教育, 人間科学, 人間社会科学',
        ]);
        break;
      case '教育学部':
        saveData(['facultyName', '教育学部, 教育, 教育学, 教養教育']);
        break;
      case '法文学部':
        saveData(['facultyName', '法文学部, 法文, 教養教育']);
        break;
      case '人文社会科学研究科':
        saveData(['facultyName', '人文社会科学研究科, 人文科学']);
        break;
      case '人間社会科学研究科':
        saveData(['facultyName', '人間社会科学研究科, 人間社会科学']);
        break;
      case '教育学研究科':
        saveData(['facultyName', '教育学研究科, 教育学, 教育学_教職']);
        break;
      case '総合理工学研究科':
        saveData(['facultyName', '総合理工研究科, 総合理工_博士後期']);
        break;
      case '自然科学研究科':
        saveData(['facultyName', '自然科学研究科, 自然科学']);
        break;
      default:
        break;
    }

    // 初回起動フラグの記録
    saveData(['firstLaunch', 'alreadyLaunched']);
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log(`ファイル名:homeScreenPopup.js\n${error}\n`);
  }
}

// 初回起動時ポップアップの内容とデザイン
export default function homeScreenProp() {
  const [modalVisible, setModalVisible] = useState(true);
  const facultyNameArray = [
    { name: '生物資源科学部' },
    { name: '総合理工学部' },
    { name: '人間科学部' },
    { name: '教育学部' },
    { name: '法文学部' },
    { name: '人文社会科学研究科' },
    { name: '人間社会科学研究科' },
    { name: '教育学研究科' },
    { name: '総合理工学研究科' },
    { name: '自然科学研究科' },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('', '必ず所属先を選んでください');
        setModalVisible(true);
      }}
    >
      <View
        style={[
          styles.centeredView,
          modalVisible && { backgroundColor: 'rgba(0,0,0,0.5)' },
        ]}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.contentWrapper}>
            <View style={styles.eachItem}>
              <Text style={commonStyles.basicFontBold}>はじめまして</Text>
              <Text style={commonStyles.basicFont}>
                所属先を選んでください。
              </Text>
            </View>
            {facultyNameArray.map((value, index) => (
              <View key={index} style={styles.eachItem}>
                <CustomedButton
                  buttonText={value.name}
                  onPress={() => {
                    storeFacultyData(value.name);
                    setModalVisible(!modalVisible);
                  }}
                  buttonStyle={commonStyles.bgColorTomato}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: '75%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentWrapper: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'column',
  },
  eachItem: {
    paddingHorizontal: '10%',
    marginBottom: '10%',
  },
});
