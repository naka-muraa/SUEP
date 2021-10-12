import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// スクリーンのインポート
import About from './screens/eventScreens/About';
import PrivacyPolicy from './screens/eventScreens/PrivacyPolicy';
import Terms from './screens/eventScreens/termsOfService';
import Clubs from './screens/eventScreens/Clubs';
import Univ from './screens/eventScreens/University';
import Community from "./screens/eventScreens/Community";
import lectureApp from './screens/lectureScreens/lectureApp';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          color: 'black'
        },
        headerLeft: () => (
          <FontAwesome5 name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20, color: "#1DA1F2"}} />
        ),
        "tabBarActiveTintColor": "tomato",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [{ "display": "flex" }, null],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'コミュニティ') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'サークル') {
            iconName = focused ? 'school' : 'school-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === '大学オフィシャル') {
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
      <Drawer.Navigator >
        <Drawer.Screen name="時間割ホーム" component={lectureApp}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen name="イベント情報" component={BottomTabNavigator} options={{
          headerShown: false,
        }}/>
        <Drawer.Screen name="利用規約" component={Terms} />
        <Drawer.Screen name="プライバシーポリシー" component={PrivacyPolicy} />
        <Drawer.Screen name="このアプリについて" component={About} />
      </Drawer.Navigator>
    </NavigationContainer >
  );
}
