import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchResult from './searchResultScreen/SearchResult';
import TableParent from './tableScreen/TableParent';
import HomeLectureDetail from './lectureDetailScreen/LectureDetail';
import EditSchedule from './editScheduleScreen/EditSchedule';

const Stack = createStackNavigator();

export default function LectureApp() {
  return (
    <Stack.Navigator initialRouteName="時間割表">
      <Stack.Screen
        name="時間割表"
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
        component={TableParent}
      />
      <Stack.Screen name="講義詳細" component={HomeLectureDetail} />
      <Stack.Screen name="検索結果" component={SearchResult} />
      <Stack.Screen name="スケジュールの追加・編集" component={EditSchedule} />
    </Stack.Navigator>
  );
}
