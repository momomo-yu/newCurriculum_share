🚀 Vite + SCSS (FROCSS 構成) 環境構築手順
🎯 目的
Vite でプロジェクトを立ち上げ、FROCSS の考え方に沿ったディレクトリ構成で .scss ファイルを使えるようにし、保守性の高い CSS 設計を目指します。

🛠️ 環境構築手順

1. プロジェクト作成

# 任意のフォルダで

npm create vite@latest vite_scss_curriculum

# 対話での選択例: Framework: Vanilla, Variant: JavaScript

cd vite_scss_curriculum
npm install

2. Sass のインストール
   Vite は標準で PostCSS に対応しているため、Sass を追加するだけで .scss が使えます。

npm install -D sass

3. FROCSS 構成でディレクトリ作成
   src/styles/ に以下のディレクトリを作成します。

src/
┣ main.js
┗ styles/
    ┣ foundation/     ← リセット CSS・基本設定（normalize など）
    ┣ layout/         ← ヘッダー、フッター、グリッドなど
    ┣ object/
    ┃  ┣ component/   ← ボタン・カードなどの UI 部品
    ┃  ┣ project/     ← ページ固有のセクションスタイル
    ┃  ┗ utility/     ← 汎用的なヘルパークラス
    ┣ setting/        ← 変数・関数・mixin など
    ┗ style.scss      ← 全体の読み込み用メイン SCSS

4. SCSS ファイルのサンプル
   必要な SCSS ファイルを作成し、@use で依存関係を定義します。

src/styles/setting/\_variables.scss

$color-main: #ff6600;
$font-base: 'Noto Sans JP', sans-serif;

src/styles/foundation/\_base.scss

@use '../setting/variables' as \*;

body {
font-family: $font-base;
color: $color-main;
background: #fdfdfd;
}

src/styles/style.scss (メインファイル)

// 1. 設定ファイルの読み込み（全体で利用）
@use 'setting/variables' as \*;

// 2. 基盤・リセット CSS の読み込み
@use 'foundation/base';

// 3. レイアウト、オブジェクトの読み込みを続ける
// @use 'layout/header';
// @use 'object/component/button';
// ...

5. JS で SCSS を読み込む

// src/main.js
import './styles/style.scss';

// 他の JS 処理...

6. 開発サーバー起動と確認

npm run dev

ブラウザで http://localhost:5173 を開き、スタイルが反映されていれば完了です。

⚙️ オプション設定 (自動インポート)
全ての SCSS ファイルで特定のファイル（例：変数ファイル）を自動的にインポートしたい場合は、vite.config.js に以下を追加します。

vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
css: {
preprocessorOptions: {
scss: {
// 全 SCSS ファイルで変数が使えるようになる
additionalData: `@use "src/styles/setting/_variables.scss" as *;`
}
}
}
});

📁 全体構成サンプル
プロジェクトのルートフォルダ名が vite_scss_curriculum になります。

vite_scss_curriculum/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.js
   ├─ styles/
   │  ├─ setting/
   │  │  └─ \_variables.scss
   │  ├─ foundation/
   │  │  └─ \_base.scss
   │  ├─ layout/
   │  ├─ object/
   │  │  ├─ component/
   │  │  ├─ project/
   │  │  └─ utility/
   │  └─ style.scss
   └─ components/  // (例: フレームワーク依存のコンポーネントフォルダ)
