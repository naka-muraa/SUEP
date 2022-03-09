import * as React from 'react';
import { Text, FlatList, View, StyleSheet, Linking, Alert } from 'react-native';
import licenseFile from './assets/license.json';

// スタイルとコンポーネントのインポート
import commonStyles from '../../commonStyle/commonStyle';
import CustomedButton from '../../commonComponent/CustomedButton';

async function openUrl(url) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      'エラー',
      'このページを開ませんでした',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }
}

export default function License() {
  const license = JSON.parse(JSON.stringify(licenseFile));

  const renderItem = ({ item }) => (
    <View style={styles.eachItemContainer}>
      <Text style={commonStyles.largeFontBold}>{item.libraryName}</Text>
      <Text>{!item.version ? 'Not Given' : 'Ver. ' + item.version}</Text>
      <Text style={commonStyles.basicFont}>
        {item._description && item._description}
      </Text>
      <View style={styles.licenseDescriptionWrapper}>
        <Text style={styles.licenseContent}>
          {!item._licenseContent
            ? 'License description is not provided.'
            : item._licenseContent}
        </Text>
      </View>
      {item.homepage && (
        <CustomedButton
          onPress={() => openUrl(item.homepage)}
          buttonText="Home page"
          buttonStyle={[styles.buttonExtraStyle, commonStyles.bgColorTomato]}
        />
      )}
    </View>
  );

  return (
    <View style={[commonStyles.viewPageContainer, commonStyles.bgColorWhite]}>
      <FlatList
        data={license}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 4,
  },
  eachItemContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  licenseDescriptionWrapper: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#e6e6e6',
  },
  buttonExtraStyle: {
    flex: 1,
    paddingHorizontal: '10%',
    alignSelf: 'center',
  },
});
