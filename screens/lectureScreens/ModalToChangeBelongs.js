import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';

// 外部関数のインポート
import { saveData } from '../../AppFunction/LectureScreenFunction/saveData';
import ReadData from '../../AppFunction/LectureScreenFunction/ReadData';

// コンポーネント、スタイルのインポート
import CustomedButton from '../../Components/CustomedButton';
import CommonStyles from '../../StyleSheet/CommonStyels';

// contextのみのファイルのインストール
import { ShowModalContext } from './ShowModalContext';

// 学部名の保存
function storeFacultyData(facultyName) {
  try {
    switch (facultyName) {
      case '生物資源科学部':

        // キー, '学部名, 参照するファイル名（複数）'
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
      case '人文社会科学研究科':
        saveData(['facultyName', '人文社会科学研究科, 人文科学'])
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
    console.log('ファイル名:ModalToChangeBelongs.js\n' + error + '\n');
  }
};

// 初回起動時ポップアップの内容とデザイン
export default function ModalToChangeBelongs() {
  const [stringFacultyName, setStringFacultyName] = useState();

  useEffect(() => {
    const getFacultyNameData = async () => {
      const stringFacultyAndFilesName = await ReadData('facultyName');
      const facultyAndFilesNameArray = stringFacultyAndFilesName.split(',');
      setStringFacultyName(facultyAndFilesNameArray[0].replace(/'|"/g, ''));
    }
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
      animationType='none'
      transparent={true}
      onRequestClose={() => {
        context.setIsVisible(!context.isVisible);
      }}
    >
      <View style={[styles.centeredView, context.isVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '']}>
        <View style={styles.modalView}>
          <ScrollView style={styles.contentWrapper}>
            <View style={styles.eachItem}>
              <Text style={CommonStyles.basicFontBold}>所属先を変更できます</Text>
              <Text style={CommonStyles.basicFont}>現在の所属先は{stringFacultyName}です。</Text>
            </View>
            {facultyNameArray.map((value, index) => (
              <View
                key={index}
                style={styles.eachItem}
              >
                <CustomedButton
                  buttonText={value.name}
                  onPress={() => { context.setIsVisible(!context.isVisible); storeFacultyData(value.name); }}
                  buttonStyle={value.name == stringFacultyName ? CommonStyles.bgColorLightGray : CommonStyles.bgColorDarkTomato  }
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
};

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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  contentWrapper: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'column',
  },
  eachItem: {
    paddingHorizontal: '10%',
    marginBottom: '10%'
  },
});
