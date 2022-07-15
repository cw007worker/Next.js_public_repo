# Pantrii Webclient 👋
<img width="649" alt="image" src="https://user-images.githubusercontent.com/45778163/159008308-3bc83e48-8d37-4591-8192-ab0d5a3b56ce.png">


# 環境構築 🚀
```bash
$ cp .env.development.local.sample .env.development.local
```

```bash:
## .env.local.developmentの値は、@riku1027 に聞いてください
FIREBASE_SERVICE_ACCOUNT_KEY_PROJECT_ID=""
FIREBASE_SERVICE_ACCOUNT_KEY_PRIVATE_KEY=""
FIREBASE_SERVICE_ACCOUNT_KEY_CLIENT_EMAIL=""
SENDGRID_API_KEY=""
```


##### packageのinstall
```bash
$ yarn
```

##### 立ち上げ
```bash
$ yarn dev
$ open https://localhost:8080
```

# コーディング規約 🙋🏻‍♀️
https://github.com/parchiee/pantry_webclient/discussions/48

# ディレクトリ構成 🏠
```
pantry-webclient/
 ├── public/
 └── src/
    ├── libs/
    ├── pages/
    ├── components/
    ├── hooks/
    ├── context/
    ├── reducer/
    ├── repositries/
    ├── influstructure/
    ├── utils/          
    └── types/
```

`pages`

- Nextjsでルーティングされるページコンポーネントを配置する

`components`

- スタイルに関わるコンポーネント群を配置する
 - 原則として、componentsディレクトリ配下の関数にロジックは持たせない
- また、components配下のディレクトリは、Atomic Designの切り分け方を採用した

    ```yaml
    ├── components/
    │   ├── atoms/
    │   ├── molecules/
    │   ├── organisms/ 
    │   └── templates/
    ```

`hooks`

- カスタムフックを配置する
    - pagesに紐づくロジックは、`hooks/pages/use〇〇Page.ts`という形で配置
    - それ以外は、`hooks`配下に配置

`context`

- Contextを配置する
    - グローバルに扱う状態を、各コンポーネントに配信する役割を担う
      - ex.. APIから返却された認証情報（ユーザー情報）とかを、配下のコンポーネントに渡したり。

`reducer`

- reducerを配置する
    - stateとactionを引数に受け取って、contextで定義されている状態を更新する役割を担う
      - ※ ゆーて全然使ってなくて、`auth.ts`とかは死んでる

`repositries`

- APIエンドポイントへのリクエスト処理を配置する
    ```yaml
    ├── repositries/
    │   ├── fixture/      ## mockデータを配置
    │   ├── toViewModel/  ## フェッチしたデータからアプリケーションで使う形に変換を行う
    │   ├── validator/    ## レスポンスのvalidationを行う（zodを使用）
    │   ├── ...
    │   └── 〇〇.ts        ## HTTP通信を行う関数はここに配置
    ```

`influstructure`

- HTTPリクエスト関連の共通処理を配置する
    - ex. axiosを抽象化したクラスとか


`libs`

- 使用しているライブラリ固有のコードで、初期化や設定のコードなど、データ取得に絡まないコードはここに配置。
    - ex.  `firebase` の設定値や初期化コードはここに書く
- また、ライブラリごとにディレクトリを分ける
    - ex.  `libs/firebase`

`utils`

- グローバルで使える便利な関数を配置する
    - ex. 文字列の加工とか、cookie, ローカルストレージへの値の保存等..

`type`

- 型定義ファイルを配置する
    ```yaml
    ├── type/
    │   ├── common/      ## 共通で使う型を配置
    │   ├── request/     ## request の際の型を配置
    │   ├── response/    ## response の型を配置
    │   ├── utis/        ## 型定義周りの便利関数を配置
    │   └── viewModel/   ## repositories で使用する models の型を配置
    ```
