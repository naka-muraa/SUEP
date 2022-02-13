import * as React from 'react';
import { Text, FlatList, View, StyleSheet, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import licenseFile from '../../AppFunction/EventScreenFunction/license.json';

// スタイルとコンポーネントのインポート
import CommonStyles from '../../StyleSheet/CommonStyels';
import CustomedButton from '../../Components/CustomedButton'

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
      <Text style={CommonStyles.largeFontBold}>{item.libraryName}
      </Text>
      <Text >{!item.version ? 'Not Given' : 'Ver. ' + item.version}</Text>
      <Text style={CommonStyles.basicFont}>{item._description && item._description}</Text>
      <View style={styles.licenseDescriptionWrapper}>
        <Text style={styles.licenseContent}>{!item._licenseContent ? 'License description is not provided.' : item._licenseContent}</Text>
      </View>
      {item.homepage &&
      <CustomedButton
        onPress={() => openUrl(item.homepage)}
        buttonText='Home page'
        />
      }
    </View >
  );

  return (
    <SafeAreaView style={CommonStyles.pagePadding}>
      <View style={styles.allContentWrapper}>
      <FlatList
        data={license}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  allContentWrapper: {
  },
  rowContainer: {
    marginTop: 4,
  },
  eachItemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  licenseDescriptionWrapper: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#e6e6e6',
  },
});
