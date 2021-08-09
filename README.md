## SUEP
## 島根大学生に関わるイベント情報などを表示するAndroidアプリ
### Webサイト
<a href="https://suep.netlify.app/" target="_blank">SUEP</a>
### 主な機能
- 学内情報
各サークル・部活動が予定しているイベントの情報をTwitterから自動で取得・表示します。
- 学外情報
地域コミュニティが主催する、島根大学の学生もターゲットにしたイベントをTwitterから自動で取得・表示します。
### 仕様
- インストール要件
推奨バージョン Android 5.0 (Lollipop) 以上
### 開発環境・使用ライブラリ
- 開発言語/フレームワーク JavaScript/React Native & Expo
- 開発環境 PowerShell
- 使用ライブラリ<br>

<a href="https://github.com/babel/babel/tree/master/packages/babel-core" target="_blank">babel/packages/babel-core at master · babel/babel · GitHub</a><br>
<a href="https://github.com/react-native-async-storage/async-storage.git" target="_blank">react-native-async-storage/async-storage: An asynchronous, persistent, key-value storage system for React Native.</a><br>
<a href="https://github.com/react-native-community/react-native-masked-view.git" target="_blank">react-native-masked-view/masked-view: React Native Masked View Library</a><br>
<a href="https://github.com/react-navigation/react-navigation.git" target="_blank">@react-navigation/bottom-tabs</a><br>
<a href="https://github.com/react-navigation/react-navigation.git" target="_blank">@react-navigation/drawer</a><br>
<a href="https://github.com/react-navigation/react-navigation.git" target="_blank">@react-navigation/native</a><br>
<a href="https://github.com/react-navigation/react-navigation.git" target="_blank">@react-navigation/stack</a><br>
<a href="https://github.com/expo/expo.git" target="_blank">expo/expo: An open-source platform for making universal native apps with React. Expo runs on Android, iOS, and the web.</a><br>
<a href="https://github.com/expo/expo.git" target="_blank">expo-constants</a><br>
<a href="https://github.com/expo/expo.git" target="_blank">expo-splash-screen</a><br>
<a href="https://github.com/expo/expo.git" target="_blank">expo-status-bar</a><br>
<a href="https://github.com/facebook/react.git" target="_blank">facebook/react: A declarative, efficient, and flexible JavaScript library for building user interfaces.</a><br>
<a href="https://github.com/facebook/react.git" target="_blank">react-dom</a><br>
<a href="https://github.com/facebook/react-native#readme" target="_blank">react-native</a><br>
<a href="https://github.com/software-mansion/react-native-gesture-handler.git" target="_blank">software-mansion/react-native-gesture-handler: Declarative API exposing platform native touch and gesture system to React Native.</a><br>
<a href="https://github.com/jsdf/react-native-htmlview" target="_blank">GitHub - jsdf/react-native-htmlview: A React Native component which renders HTML content as native views</a><br>
<a href="https://github.com/software-mansion/react-native-reanimated.git" target="_blank">software-mansion/react-native-reanimated: React Native&#39;s Animated library reimplemented</a><br>
<a href="https://github.com/th3rdwave/react-native-safe-area-context.git" target="_blank">th3rdwave/react-native-safe-area-context: A flexible way to handle safe area insets in JS. Also works on Android and Web!</a><br>
<a href="https://github.com/kmagiera/react-native-screens.git" target="_blank">software-mansion/react-native-screens: Native navigation primitives for your React Native app.</a><br>
<a href="https://github.com/necolas/react-native-web#readme" target="_blank">necolas/react-native-web: React Native Components and APIs for the Web</a><br>

### バグ（訂正済み）
- 各アカウントが定めたキーワードに対して、重複したツイートの情報を取得・表示していた。
- 2021/4/1 データベース側で日数調整を行うプログラムがあったが、閏年の年度とそれ以外の年度で上手くデータの処理が出来ていなかった。

### 未実装（実装予定）
- 初回起動時のユーザー情報の登録画面/機能
- 検索したいときにだけ現れる検索バー
- お気に入り設定機能
- 島大生向け求人・インターンシップ情報掲載機能
- 島根大学の時間割と教室配当表を参照してユーザーごとの時間割を表示
- 各団体の年度ごとの実績をイベント情報のツイートから抜粋・表示

### ライセンス
© 2021 Hiroshi TANABE<br>
特定のライセンスには基づきませんが、以下の事項に従って下さい。
- 意図的/偶発的に関わらず、APIキーを悪用しサーバーへ負荷をかける行為
- 商用利用を禁止
- ソースコードまたはビルドデータの二次配布を禁止
