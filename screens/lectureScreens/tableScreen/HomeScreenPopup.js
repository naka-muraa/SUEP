import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomedButton from '../../../commonComponent/CustomedButton';
import commonStyles from '../../../commonStyle/commonStyle';
import storeStringData from './../../../commonUtil/storeStringData';
import storeAffiliation from './storeAffiliation';

// 初回起動時ポップアップの内容とデザイン
export default function HomeScreenPopup() {
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
                    storeAffiliation(value.name);
                    storeStringData('firstLaunch', 'alreadyLaunched');
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
