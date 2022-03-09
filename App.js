import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';

// スクリーンのインポート
import About from './screens/otherScreens/About';
import PrivacyPolicy from './screens/otherScreens/PrivacyPolicy';
import TermsOfService from './screens/otherScreens/termsOfService';
import Clubs from './screens/eventScreens/Clubs';
import Community from './screens/eventScreens/Community';
import University from './screens/eventScreens/University';
import LectureApp from './screens/lectureScreens/lectureApp';

Sentry.init({
  dsn: 'https://469ba9b84acd4a2f8809380fbe6275b3@o1070044.ingest.sentry.io/6086543',
  enableInExpoDevelopment: false, // If 'true', all your dev/local errors will be reported to Sentry
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'black',
        },
        headerLeft: () => (
          <FontAwesome5
            name="bars"
            size={24}
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{ paddingLeft: 20, color: '#1DA1F2' }}
          />
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
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
      <Tab.Screen name="大学オフィシャル" component={University} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="時間割ホーム"
          component={LectureApp}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="イベント情報"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="利用規約"
          component={TermsOfService}
          options={({ navigation }) => ({
            headerLeft: () => (
              <FontAwesome5
                name="bars"
                size={24}
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{ paddingLeft: 20, color: '#1DA1F2' }}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="プライバシーポリシー"
          component={PrivacyPolicy}
          options={({ navigation }) => ({
            headerLeft: () => (
              <FontAwesome5
                name="bars"
                size={24}
                onPress={() => {
                  navigation.openDrawer();
                }}
                style={{ paddingLeft: 20, color: '#1DA1F2' }}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="このアプリについて"
          component={About}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
