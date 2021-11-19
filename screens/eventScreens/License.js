import * as React from 'react';
import { Text, FlatList, View, StyleSheet, SafeAreaView, Linking, TouchableOpacity } from "react-native";
import LICENSE_FILE from "../../AppFunction/EventScreenFunction/license.json";

async function openUrl(url) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      "エラー",
      "このページを開ませんでした",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
}

export default function License() {
  const license = JSON.parse(JSON.stringify(LICENSE_FILE));

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.libraryName}</Text>
      <Text style={styles.paragragh}>{item._description && item._description}</Text>
      <Text style={styles.licenseContent}>{!item._licenseContent ? "License description is not provided." : item._licenseContent}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.version}>{!item.version ? "Not Given" : "Ver. " + item.version}</Text>
        <Text style={styles.license}>{!item._license ? "Not Given" : item._license + " License"}</Text>
      </View>
      <View style={styles.homepage}>
        <Text style={styles.version}>Home page: </Text>
        <TouchableOpacity onPress={() => openUrl(item.homepage)}>
          <Text>{!item.homepage ? "Not Given" : item.homepage}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={license} renderItem={renderItem} keyExtractor={(item, index) => item + index} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notice: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  item: {
    backgroundColor: '#ddd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    borderBottomWidth: 0.8,
    borderBottomColor: 'gray',
  },
  paragragh: {
    fontSize: 20,
    marginTop: 6,
    marginBottom: 6,
  },
  version: {
    flex: 1,
  },
  license: {
    flex: 1,
  },
  licenseContent: {
    backgroundColor: 'white',
  },
  homepage: {
    backgroundColor: "white",
  }
});
