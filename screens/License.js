import * as React from 'react';
import { Text, FlatList, View, StyleSheet, SafeAreaView } from "react-native";
import LICENSE_FILE from "../App/license.json";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title.libraryName}</Text>
    <Text style={styles.paragragh}>{title._description && title._description}</Text>
    <Text style={styles.licenseContent}>{!title._licenseContent ? "License description is not provided." : title._licenseContent}</Text>
    <View style={styles.rowContainer}>
      <Text style={styles.version}>{!title.version ? "Not Given" : "Ver. " + title.version}</Text>
      <Text style={styles.license}>{!title._license ? "Not Given" : title._license + " License"}</Text>
    </View>
  </View >
);

export default function License() {
  const license = JSON.parse(JSON.stringify(LICENSE_FILE));
  const renderItem = ({ item }) => <Item title={item} />;
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
});
