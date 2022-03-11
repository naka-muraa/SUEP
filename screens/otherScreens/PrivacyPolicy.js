import * as React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

// スタイルとコンポーネントのインポート
import commonStyles from '../../commonStyle/commonStyle';
import CustomedButton from '../../commonComponent/CustomedButton';
import openUrl from './../../commonUtil/openUrl';

export default function PrivacyPolicy() {
  return (
    <ScrollView
      style={[commonStyles.viewPageContainer, commonStyles.bgColorWhite]}
    >
      <View style={[styles.pageContainer]}>
        <Text style={[commonStyles.basicFont]}>
          {`このプライバシーポリシーは、開発者がこのアプリケーション上で提供するサービス（以下、「本サービス」といいます。）を運用する際に得られた個人情報を私がどのように扱うか示しています。利用者の皆さま（以下、「ユーザー」といいます。）が本サービスをご利用いただく場合、以下のプライバシーポリシーに同意したものとみなします。\n
1.  個人情報の利用目的\n
 本サービスでは、お問い合わせの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。取得した個人情報は、お問い合わせに対する回答をご連絡する場合に利用させていただくものであり、この目的以外では利用いたしません。\n
2.  Twitter, Inc. が提供するサービスを利用する際のプライバシーポリシー\n
 本サービスではTwitter APIを利用しコンテンツを表示しています。ユーザーがTwitter, Inc.が提供するサービスを利用する際には、ユーザーはTwitterのプライバシーポリシーにも同意しているものとみなします。詳しくは下のリンクからご確認ください。
`}
        </Text>
        <CustomedButton
          buttonText="「Twitterのプライバシーポリシー」はこちらから"
          onPress={() =>
            openUrl(
              'https://cdn.cms-twdigitalassets.com/content/dam/legal-twitter/site-assets/privacy-june-18th-2020/Twitter_Privacy_Policy_JA.pdf'
            )
          }
          buttonStyle={[styles.buttonExtraStyle, commonStyles.bgColorTomato]}
        />
        <Text style={[commonStyles.basicFont]}>
          {`3.  Googleが提供するサービスを利用する際のプライバシーポリシー\n
 本アプリケーションについての問い合わせにはGoogleフォームを用いる場合があります。Googleのサービスを利用する場合にはGoogle独自のプライバシーポリシーが適用されます。詳しくは下に示したリンク先でご確認いただけます。
`}
        </Text>
        <CustomedButton
          buttonText="「Googleのプライバシーポリシーと利用規約」はこちらから"
          onPress={() => openUrl('https://policies.google.com/terms?hl=ja')}
          buttonStyle={[styles.buttonExtraStyle, commonStyles.bgColorTomato]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  buttonExtraStyle: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
