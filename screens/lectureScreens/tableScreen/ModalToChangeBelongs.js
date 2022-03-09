import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';
import { ShowModalContext } from './ShowModalContext';
import ReadData from '../../../commonUtil/ReadData';
import saveData from './../../../commonUtil/saveData';
import commonStyles from '../../../commonStyle/commonStyle';
import CustomedButton from './../../../commonComponent/CustomedButton';

// 学部名の保存
function storeFacultyData(facultyName) {
  try {
    switch (facultyName) {
      case '生物資源科学部':
        // キー, '学部名, 参照するファイル名（複数）'
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
  } catch (error) {
    Sentry.Native.captureException(error);
    console.log('ファイル名:ModalToChangeBelongs.js\n' + error + '\n');
  }
}

// 初回起動時ポップアップの内容とデザイン
export default function ModalToChangeBelongs() {
  const [stringFacultyName, setStringFacultyName] = useState();

  useEffect(() => {
    const getFacultyNameData = async () => {
      const stringFacultyAndFilesName = await ReadData('facultyName');
      const facultyAndFilesNameArray = stringFacultyAndFilesName.split(',');
      setStringFacultyName(facultyAndFilesNameArray[0].replace(/'|"/g, ''));
    };
    getFacultyNameData();
  }, []);

  const context = useContext(ShowModalContext);
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
      animationType="none"
      transparent={true}
      onRequestClose={() => {
        context.setIsVisible(!context.isVisible);
      }}
    >
      <View
        style={[
          styles.centeredView,
          context.isVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '',
        ]}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.contentWrapper}>
            <View style={styles.modalTitle}>
              <Text style={commonStyles.basicFont}>所属先を変更できます</Text>
            </View>
            {facultyNameArray.map((value, index) => (
              <View key={index} style={styles.eachItem}>
                <CustomedButton
                  buttonText={value.name}
                  onPress={() => {
                    context.setIsVisible(!context.isVisible);
                    storeFacultyData(value.name);
                  }}
                  buttonStyle={
                    value.name == stringFacultyName
                      ? commonStyles.bgColorLightGray
                      : commonStyles.bgColorDarkTomato
                  }
                />
              </View>
            ))}
            <View style={{ marginTop: 20 }}></View>
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
    height: '60%',
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
  },
  contentWrapper: {
    width: '100%',
    paddingTop: 20,
    flexDirection: 'column',
  },
  modalTitle: {
    paddingHorizontal: '10%',
    marginBottom: 20,
  },
  eachItem: {
    paddingHorizontal: '20%',
    marginBottom: 20,
  },
});
