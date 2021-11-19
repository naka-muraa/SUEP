import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

// スクリーンの読み込み
import SearchResult from './searchResult';
import LectureScreen from './lectureScreen'
import HomeLectureDetail from './homeLectureDetail';
import EditLectureScreen from './editLectureScreen';

// ナビゲーションの宣言
const Stack = createStackNavigator();

//  時間割管理ホーム画面
function lectureHome() {
  const navigation = useNavigation();
  return <LectureScreen navigation={navigation} />
};

//  ホーム画面での講義情報画面
function lectureHomeDetail() {
  const navigation = useNavigation();
  return <HomeLectureDetail navigation={navigation} />
};

//  検索結果画面
function searchResultScreen() {
  const navigation = useNavigation();
  return <SearchResult navigation={navigation} />
};

function editScreen() {
  const navigation = useNavigation();
  return <EditLectureScreen navigation={navigation} />
};

export default function lectureApp() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          color: "black"
        },
      }}
      initialRouteName="時間割表">
      <Stack.Screen
        name="時間割表"
        options={({ navigation }) => ({
          headerLeft: () => (
            <FontAwesome5 name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20, color: "#1DA1F2" }} />
          ),
        })}
        component={lectureHome} />
      <Stack.Screen name="講義詳細" component={lectureHomeDetail} />
      <Stack.Screen name="編集画面" component={editScreen} />
      <Stack.Screen name="検索結果" component={searchResultScreen} />
    </Stack.Navigator>
  );
}
