import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

// スクリーンの読み込み
import SearchResult from './searchResult';
import LectureScreen from './lectureScreen';
import HomeLectureDetail from './homeLectureDetail';
import EditLectureScreen from './editLectureScreen';

// ナビゲーションの宣言
const Stack = createStackNavigator();

//  時間割管理ホーム画面
function LectureHome() {
  const navigation = useNavigation();
  return <LectureScreen navigation={navigation} />
};

//  ホーム画面での講義情報画面
function LectureHomeDetail() {
  const navigation = useNavigation();
  return <HomeLectureDetail navigation={navigation} />
};

//  検索結果画面
function SearchResultScreen() {
  const navigation = useNavigation();
  return <SearchResult navigation={navigation} />
};

function EditScreen() {
  const navigation = useNavigation();
  return <EditLectureScreen navigation={navigation} />
};

export default function LectureApp() {
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
        component={LectureHome} />
      <Stack.Screen name="講義詳細" component={LectureHomeDetail} />
      <Stack.Screen name="編集画面" component={EditScreen} />
      <Stack.Screen name="検索結果" component={SearchResultScreen} />
    </Stack.Navigator>
  );
}
