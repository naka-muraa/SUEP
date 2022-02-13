import License from './License'
import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// スタイル・コンポーネントのインポート
import CustomedButton from '../../Components/CustomedButton'
import CommonStyles from '../../StyleSheet/CommonStyels'

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

function AboutPage({ navigation }) {
  return (
    <ScrollView style={CommonStyles.scrollViewPadding}>
      <View style={styles.titleContainer}>
        <Text style={CommonStyles.largeFontBold}>お問い合わせ先と開発者</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={CommonStyles.basicFont}>SUEP（お問い合わせはこちら）</Text>
        <TouchableOpacity
          onPress={() => openUrl("https://suep.netlify.app/")}
        >
          <MaterialCommunityIcons name="web" size={24} color="#55c500" />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={CommonStyles.basicFont}>Nabe-cyan（プログラマ・UIデザイン） </Text>
        <TouchableOpacity
          onPress={() => openUrl("https://twitter.com/n_a_b_e_t_a_s_o")}
        >
          <FontAwesome5 name="twitter-square" size={24} color="#00acee" />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <Text style={CommonStyles.basicFont}>中村優利（プログラマ）</Text>
      </View>
      <Separator />
      <CustomedButton
        onPress={() => navigation.navigate('Third-party software notices')}
        buttonText='ReactNative, Expoに関するライセンス'
      />
      <Separator />
      <View style={styles.titleContainer}>
        <Text style={CommonStyles.largeFontBold}>Special Thanks</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={CommonStyles.basicFont}>島根大学ものづくり部Pimの皆さん</Text>
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
      <Stack.Screen name="about this app." component={AboutPage} />
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
  separator: {
    marginVertical: 10,
  },
});
