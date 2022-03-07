import License from './License'
import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Entypo, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';

// スタイル・コンポーネントのインポート
import CommonStyles from '../../StyleSheet/CommonStyels'

async function openUrl(url) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      'エラー',
      'このページを開けませんでした',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }
}

const Stack = createStackNavigator();

function AboutPage({ navigation }) {
  return (
    <ScrollView style={[CommonStyles.viewPageContainer, CommonStyles.bgColorWhite]}>
      {/* お問い合わせ */}
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          onPress={() => openUrl('https://suep.netlify.app/')}
          style={styles.iconTitleRow}
        >
          <MaterialCommunityIcons name="head-question-outline" size={24} color="black" />
          <Text style={CommonStyles.largeFontBold}> お問い合わせ ＞</Text>
        </TouchableOpacity>
      </View>
      {/* ライセンス */}
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Third-party software notices')}
          style={styles.iconTitleRow}
        >
        <Entypo name="text-document" size={24} color="black" />
          <Text style={CommonStyles.largeFontBold}> オープンソースライセンス ＞</Text>
        </TouchableOpacity>
      </View>
      {/* 開発者 */}
      <View style={styles.contentWrapper}>
        <View style={styles.iconTitleRow}>
          <MaterialIcons name="computer" size={24} color="black" />
          <Text style={CommonStyles.largeFontBold}> Developper</Text>
        </View>
        <View style={styles.sentenceWrapper}>
          <View style={styles.nameIconRow}>
            <View style={styles.nameWrapper}>
              <Text style={CommonStyles.basicFont}>Nabe-cyan</Text>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity
                onPress={() => openUrl('https://twitter.com/n_a_b_e_t_a_s_o')}
                style={styles.touchableSpace}
              >
                <FontAwesome5 name='twitter-square' size={28} color='#00acee' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openUrl('https://github.com/htnabe')}
              >
                <FontAwesome5 name="github-square" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nameIconRow}>
            <View style={styles.nameWrapper}>
              <Text style={CommonStyles.basicFont}>中村優利</Text>
            </View>
            <View style={styles.iconWrapper}>
            </View>
          </View>
        </View>
      </View>
      {/* スペシャルサンクス */}
      <View style={styles.specialThanksWrapper}>
        <View style={styles.iconTitleRow}>
          <MaterialIcons name="celebration" size={24} color="black" />
          <Text style={CommonStyles.largeFontBold}> Special Thanks</Text>
        </View>
        <View style={styles.sentenceWrapper}>
          <Text style={CommonStyles.basicFont}>島根大学ものづくり部Pimの皆さん</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function About() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='アプリについて' component={AboutPage}
        options={({ navigation }) => ({
          headerLeft: () => (
            <FontAwesome5 name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20, color: "#1DA1F2" }} />
          ),
        })}/>
      <Stack.Screen name='Third-party software notices' component={License} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  specialThanksWrapper: {
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  sentenceWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  nameIconRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  nameWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: '10%',
  },
  touchableSpace: {
  marginHorizontal: '20%'
  },
  iconTitleRow: {
  flexDirection: 'row',
  },
});
