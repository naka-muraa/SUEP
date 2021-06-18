import About from './screens/About';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Terms from './screens/termsOfService';
import Clubs from './screens/Clubs';
import Univ from './screens/University';
import Community from "./screens/Community";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

const CommunityStackScreen = ({ navigation }) => {
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
          name="コミュニティアカウント"
          component={Community}
          options={{
            headerLeft: () => (
              <FontAwesome5 name="bars" size={24} style={{ paddingLeft: 20 }} color="white" onPress={() => navigation.openDrawer()} />
            ),
          }} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const UnivStackScreen = ({ navigation }) => {
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
          component={Univ}
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

const privacyStackScreen = ({ navigation }) => {
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

const aboutStackScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <About />
    </SafeAreaView>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Comm.') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Clubs') {
            iconName = focused ? 'school' : 'school-outline';
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Univ.') {
            // You can return any component that you like here!
            return <FontAwesome5 name="university" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Clubs" component={ClubsStackScreen} />
      <Tab.Screen name="Comm." component={CommunityStackScreen} />
      <Tab.Screen name="Univ." component={UnivStackScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    < NavigationContainer >
      <Drawer.Navigator>
        <Drawer.Screen name="ホーム" component={BottomTabNavigator} />
        <Drawer.Screen name="利用規約" component={TermsStackScreen} />
        <Drawer.Screen name="プライバシーポリシー" component={privacyStackScreen} />
        <Drawer.Screen name="このアプリについて" component={aboutStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
