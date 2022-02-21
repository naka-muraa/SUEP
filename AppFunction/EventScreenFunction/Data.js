import SearchData from './SearchData';
import FetchData from './FetchData';
import StoreData from './storeData';
import GetStoredData from './GetStoredData';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, Linking, FlatList, View, Image, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';

// 画像素材のインポート
import reply from '../../Assets/reply.png';
import retweet from '../../Assets/retweet.png';
import like from '../../Assets/like.png';
import TwitterLogo from '../../Assets/2021Twitterlogo-blue.png';

// コンポーネントとスタイルのインポート
import CustomedSearchBar from '../../Components/CustomedSearchBar';
import CustomedIndicator from '../../Components/CustomedIndicator';
import CommonStyles from '../../StyleSheet/CommonStyels'

async function openUrl(url) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      'エラー',
      'このページを開ませんでした',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }
}

const fetchStorage = async () => {
  const storagedData = await GetStoredData();
  return storagedData;
}

export default function Data(props) {
  const [InputtedText, setInputtedText] = useState();
  const [searching, setSearching] = useState(false);
  const [value, setValue] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [storageData, setStorage] = useState();

  {/* 画面引き下げ時のデータ読み込み処理 */ }
  useEffect(() => {
    if (refreshing) {
      let data = async () => {
        const fetchedData = await FetchData(props.sheetName, props.key);
        setValue(fetchedData);
        return fetchedData;
      };
      data().then((fData) => StoreData(fData).then(() => setStorage(fetchStorage())));
    }
    setRefreshing(false);
  }, [refreshing]);

  {/* 検索語の読み込み処理 */ }
  useEffect(() => {
    if (searching) {
      let data = async () => {
        setValue(await SearchData(storageData, InputtedText));
      };
      data();
    }
    setSearching(false);
  }, [searching]);

  if (!value) {
    return (
      <View style={CommonStyles.viewPageContainer}>
        <CustomedIndicator />
      </View>
    );
  }

  return (
    <View style={[CommonStyles.viewPageContainer, CommonStyles.bgColorWhite]}>
      <CustomedSearchBar
        onChangeText={text => { setInputtedText(text) }}
        onEndEditing={() => { setSearching(true) }}
        value={InputtedText}
        placeholder='Search'
        onTapIcon={() => { setInputtedText(''), setValue(storageData._W) }}
        showShadow={true}
      />
      <FlatList
        data={value}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
        }
        }
        ListEmptyComponent={
          < View >
            <Text style={{ fontSize: 16, padding: 32 }}>
              該当するアイテムがありません
            </Text>
          </View >
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => openUrl('https://twitter.com/' + item[6] + '/status/' + item[2])}>
              <View style={styles.wrapTitleIcon}>
                <TouchableOpacity style={styles.Icon} onPress={() => openUrl('https://twitter.com/' + item[6])}>
                  <Image source={{ uri: item[4] }} style={styles.Icon} />
                </TouchableOpacity>
                <View style={styles.wrapTitleID}>
                  <TouchableOpacity style={styles.listTitle} onPress={() => openUrl('https://twitter.com/' + item[6])}>
                    <Text style={styles.listTitle}>{!item[3] ? 'Not Provided' : item[3]}</Text>
                  </TouchableOpacity>
                  <Text style={CommonStyles.smallFont}>{!item[6] ? 'Not Provided' : '@' + item[6]}</Text>
                </View>
                <Image source={TwitterLogo} style={styles.logo} />
              </View>
              <View style={styles.content}>
                <HTMLView
                  value={item[5]}
                  stylesheet={styles}
                />
              </View>
              <View style={styles.wrapFooter}>
                <View style={styles.wrapUtil}>
                  <TouchableOpacity activeOpacity={1.0} style={styles.Utility} onPress={() => openUrl('https://twitter.com/intent/tweet?in_reply_to=' + item[2])}>
                    <Image source={reply} style={styles.Utility} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Utility} onPress={() => openUrl('https://twitter.com/intent/retweet?tweet_id=' + item[2])}>
                    <Image source={retweet} style={styles.Utility} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Utility} onPress={() => openUrl('https://twitter.com/intent/like?tweet_id=' + item[2])}>
                    <Image source={like} style={styles.Utility} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.wrappostedAt} onPress={() => openUrl('https://twitter.com/' + item[6] + '/status/' + item[2])}>
                  <Text style={styles.postedAt}>{!item[1] ? 'Not Provided' : item[1]}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )
        }
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Icon: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  logo: {
    flex: 1,
    height: 25,
    resizeMode: 'contain',
  },
  Utility: {
    height: 20,
    resizeMode: 'contain',
  },
  listItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 14,
    marginBottom: 8,
  },
  p: {
    fontSize: 16,
  },
  listTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  wrapTitleIcon: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapTitleID: {
    flex: 3,
    flexDirection: 'column',
    marginBottom: 8,
    marginTop: 8,
  },
  wrapUtil: {
    flex: 2,
    flexDirection: 'row',
    marginVertical: 8,
  },
  wrappostedAt: {
    marginVertical: 8,
  },
  postedAt: {
    flex: 3,
    textAlign: 'right',
    fontSize: 12,
    color: 'gray',
  },
  wrapFooter: {
    flexDirection: 'row',
  },
});
