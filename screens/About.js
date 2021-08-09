import License from './License'
import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        <Text style={styles.title}>お問い合わせ先と開発者</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>SUEP（お問い合わせはこちら）</Text>
        <TouchableOpacity
          onPress={() => openUrl("https://suep.netlify.app/")}
        >
          <MaterialCommunityIcons name="web" size={24} color="#55c500" />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>Nabe-cyan </Text>
        <TouchableOpacity
          onPress={() => openUrl("https://twitter.com/n_a_b_e_t_a_s_o")}
        >
          <FontAwesome5 name="twitter-square" size={24} color="#00acee" />
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>OSSライセンス一覧</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Third-party software notices')}
      >
        <Text>ReactNative, Expoに関するライセンスについて</Text>
      </TouchableOpacity>
      <Separator />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Special Thanks</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>島根大学ものづくり部Pimの皆さん</Text>
      </View>
    </ScrollView>
  );
}

export default function About() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="about this app." component={aboutPage} />
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
    backgroundColor: 'white',
    padding: 5,
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
