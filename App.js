import HomeScreen from "./screens/Home";
import Clubs from "./screens/Clubs";
import Terms from "./screens/termsOfService";
import LicensePage from "./screens/License";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView, Button, ScrollView, Text, TouchableHighlight, View, Alert, Linking } from 'react-native';
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

{/*Aboutページだけここに記載 */ }
function AboutPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Twitterアカウント </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.description}>SUEP（お問い合わせはこちら）  </Text>
          <TouchableHighlight
            onPress={() => openUrl("https://twitter.com/SU_EventsPortal")}
          >
            <FontAwesome5 name="twitter-square" size={24} color="black" />
          </TouchableHighlight>
        </View>
        <View style={styles.devRowContainer}>
          <TouchableHighlight
            onPress={() => openUrl("https://twitter.com/YabeO")}
            style={styles.touch}
          >
            <Text style={styles.description}>TAKENOKO_NO_KO (開発者) </Text>
          </TouchableHighlight>
          <FontAwesome5 name="twitter-square" size={24} color="black" />
        </View>
        <View style={styles.devRowContainer}>
          <TouchableHighlight
            onPress={() => openUrl("https://twitter.com/n_a_b_e_t_a_s_o")}
            style={styles.touch}
          >
            <Text style={styles.description}>Nabe-cyan(開発者) </Text>
          </TouchableHighlight>
          <FontAwesome5 name="twitter-square" size={24} color="black" />
        </View>
        <View style={styles.titleContainer}></View>
        <Text style={styles.title}>Special Thanks</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.description}>web・スマホアプリケーションについて色々な知識・アドバイスを頂いた島根大学ものづくり部Pimの皆さん</Text>
        </View>
        <Button
          title="ReactNative, Expoに関するライセンスはこちら"
          onPress={() => navigation.navigate('LISENCE Copyright')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


{/* 大学公式アカウントからの掲載許可待ち */ }
const HomeStackScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#ff6347' },
        }}
      >
        <Stack.Screen
          name="大学公式アカウント"
          component={HomeScreen}
          options={{
            headerLeft: () => (
              <FontAwesome5 name="bars" size={24} style={{ paddingLeft: 20 }} color="white" onPress={() => navigation.openDrawer()} />
            ),
          }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const TermsStackScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#ff6347' },
        }}
      >
        <Stack.Screen
          name="利用規約"
          component={Terms}
          options={{
            headerLeft: () => (
              <FontAwesome5 name="bars" size={24} style={{ paddingLeft: 20 }} color="white" onPress={() => navigation.openDrawer()} />
            ),
          }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const ClubsStackScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#ff6347' },
        }}
      >
        <Stack.Screen
          name="サークルアカウント"
          component={Clubs}
          options={{
            headerLeft: () => (
              <FontAwesome5 name="bars" size={24} style={{ paddingLeft: 20 }} color="white" onPress={() => navigation.openDrawer()} />
            ),
          }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const privacyStackScree = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#ff6347' },
        }}
      >
        <Stack.Screen
          name="プライバシーポリシー"
          component={PrivacyPolicy}
          options={{
            headerLeft: () => (
              <FontAwesome5 name="bars" size={24} style={{ paddingLeft: 20 }} color="white" onPress={() => navigation.openDrawer()} />
            ),
          }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const aboutStackScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#ff6347' },
        }}
      >
        <Stack.Screen
          name="このアプリについて"
          component={AboutPage}
          options={{
            headerLeft: () => (
              <FontAwesome5 name="bars" size={24} style={{ paddingLeft: 20 }} color="white" onPress={() => navigation.openDrawer()} />
            ),
          }} />
        <Stack.Screen name="LISENCE Copyright" component={LicensePage} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Univ.') {
            iconName = 'university';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Clubs') {
            iconName = focused ? 'ios-people-circle' : 'ios-people-circle-outline';
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Clubs" component={ClubsStackScreen} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="サークルアカウント" component={BottomTabNavigator} />
      <Drawer.Screen name="利用規約" component={TermsStackScreen} />
      <Drawer.Screen name="プライバシーポリシー" component={privacyStackScree} />
      <Drawer.Screen name="このアプリについて" component={aboutStackScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    < NavigationContainer >
      <DrawerNavigator />
    </NavigationContainer >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 15,
  },
  devRowContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  titleContainer: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 24,
  },
  scrollView: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  title: {
    fontSize: 30,
  },
  description: {
    fontSize: 18
  },
  twitterText: {
    color: '#ffffff',
  },
  touch: {
    marginBottom: 10,
    marginTop: 10,
  },
});
