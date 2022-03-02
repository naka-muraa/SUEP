import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

// スクリーンの読み込み
import SearchResult from './searchResult';
import LectureScreen from './lectureScreen';
import HomeLectureDetail from './homeLectureDetail';
import EditLectureScreen from './editLectureScreen';
import TaskEditScreen from './taskEditScreen';

// ナビゲーションの宣言
const Stack = createStackNavigator();

export default function LectureApp() {
  return (
    <Stack.Navigator
      initialRouteName="時間割表">
      <Stack.Screen
        name="時間割表"
        options={({ navigation }) => ({
          headerLeft: () => (
            <FontAwesome5 name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20, color: "#1DA1F2" }} />
          ),
        })}
        component={LectureScreen} />
      <Stack.Screen name="講義詳細" component={HomeLectureDetail} />
      <Stack.Screen name="編集画面" component={EditLectureScreen} />
      <Stack.Screen name="検索結果" component={SearchResult} />
      <Stack.Screen name="スケジュールの追加・編集" component={TaskEditScreen} />
    </Stack.Navigator>
  );
}
