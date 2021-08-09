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

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        "tabBarActiveTintColor": "tomato",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [{ "display": "flex" }, null],
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'コミュニティ') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'サークル') {
            iconName = focused ? 'school' : 'school-outline';
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === '大学オフィシャル') {
            // You can return any component that you like here!
            return <FontAwesome5 name="university" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="サークル" component={Clubs} />
      <Tab.Screen name="コミュニティ" component={Community} />
      <Tab.Screen name="大学オフィシャル" component={Univ} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    < NavigationContainer >
      <Drawer.Navigator
      screenOptions={{
        headerStyle: {
            backgroundColor: 'tomato',
          },
      }}
      >
        <Drawer.Screen name="ホーム" component={BottomTabNavigator} />
        <Drawer.Screen name="利用規約" component={Terms} />
        <Drawer.Screen name="プライバシーポリシー" component={PrivacyPolicy } />
        <Drawer.Screen name="このアプリについて" component={About} />
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
