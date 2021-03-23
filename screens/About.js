import License from './License'
import * as React from 'react';
import { Text, Button, View, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

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

const Separator = () => (
  <View style={styles.separator} />
);

const Stack = createStackNavigator();

function aboutPage({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Twitterアカウント </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>SUEP（お問い合わせはこちら）</Text>
        <TouchableOpacity
          onPress={() => openUrl("https://twitter.com/SU_EventsPortal")}
        >
          <FontAwesome5 name="twitter-square" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>TAKENOKO_NO_KO （開発者） </Text>
        <TouchableOpacity
          onPress={() => openUrl("https://twitter.com/YabeO")}
        >
          <FontAwesome5 name="twitter-square" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>Nabe-cyan（開発者） </Text>
        <TouchableOpacity
          onPress={() => openUrl("https://twitter.com/n_a_b_e_t_a_s_o")}
        >
          <FontAwesome5 name="twitter-square" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>OSS </Text>
      </View>
      <Button
        title="ReactNative, Expoに関するオープンソースライセンス"
        onPress={() => navigation.navigate('Third-party software notices')}
      />
      <Separator />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Special Thanks</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>web・スマホアプリケーションについて様々な助言を頂いた島根大学ものづくり部Pimの皆さん</Text>
      </View>
    </ScrollView>
  );
}

export default function About() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#ff6347' },
      }}
    >
      <Stack.Screen name="このアプリについて" component={aboutPage} />
      <Stack.Screen name="Third-party software notices" component={License} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  scrollView: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#4788ff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
