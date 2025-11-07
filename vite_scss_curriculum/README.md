# 🚀 Vite + SCSS (FROCSS 構成) 環境構築ガイド

## 📋 目次

- [概要](#概要)
- [環境構築手順](#環境構築手順)
- [FROCSS 構成](#frocss構成)
- [ディレクトリ構造](#ディレクトリ構造)
- [サンプルコード](#サンプルコード)
- [オプション設定](#オプション設定)

## 概要

Vite でプロジェクトをセットアップし FROCSS（Foundation, Reset, Object, Component, Scope, State）の考え方に沿ったディレクトリ構成で、保守性の高い CSS 設計を実現します。

## 環境構築手順

### 1️⃣ プロジェクト作成

```bash
# Viteプロジェクトを新規作成
npm create vite@latest vite_scss_curriculum

# 対話での選択
# → Framework: Vanilla
# → Variant: JavaScript

# プロジェクトディレクトリへ移動
cd vite_scss_curriculum

# 依存関係をインストール
npm install
```

### 2️⃣ Sass のインストール

```bash
# Sassを開発依存としてインストール
npm install -D sass
```

### 3️⃣ SCSS ファイルの読み込み設定

`src/main.js`でメインの SCSS ファイルを読み込みます：

```javascript
// src/main.js
import "./styles/style.scss";
```

### 4️⃣ 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いて動作確認します。

## FROCSS 構成

FROCSS の考え方に基づいた各ディレクトリの役割：

| 階層             | ディレクトリ  | 役割                                     | ファイル例                          |
| ---------------- | ------------- | ---------------------------------------- | ----------------------------------- |
| **設定**         | `setting/`    | 変数、関数、Mixin など全体で利用する設定 | `_variables.scss`<br>`_mixins.scss` |
| **基盤**         | `foundation/` | リセット CSS、基本スタイル定義           | `_base.scss`<br>`_reset.scss`       |
| **レイアウト**   | `layout/`     | ページ全体の構造に関わるスタイル         | `_header.scss`<br>`_footer.scss`    |
| **オブジェクト** | `object/`     | 具体的な UI 部品の集合                   | -                                   |
| ├ コンポーネント | `component/`  | 汎用的な UI 部品                         | `_button.scss`<br>`_card.scss`      |
| ├ プロジェクト   | `project/`    | ページ固有のセクション                   | `_hero.scss`<br>`_contact.scss`     |
| └ ユーティリティ | `utility/`    | 汎用的なヘルパークラス                   | `_spacing.scss`<br>`_text.scss`     |

## ディレクトリ構造

```
vite_scss_curriculum/
├── 📄 index.html
├── 📄 package.json
├── 📄 vite.config.js
└── 📁 src/
    ├── 📄 main.js
    ├── 📁 styles/
    │   ├── 📁 setting/
    │   │   └── _variables.scss
    │   ├── 📁 foundation/
    │   │   └── _base.scss
    │   ├── 📁 layout/
    │   │   ├── _header.scss
    │   │   └── _footer.scss
    │   ├── 📁 object/
    │   │   ├── 📁 component/
    │   │   │   ├── _button.scss
    │   │   │   └── _card.scss
    │   │   ├── 📁 project/
    │   │   │   └── _hero.scss
    │   │   └── 📁 utility/
    │   │       └── _spacing.scss
    │   └── 📄 style.scss
    └── 📁 components/
```

## サンプルコード

### 📝 `src/styles/setting/_variables.scss`

```scss
// カラーパレット
$color-main: #ff6600;
$color-sub: #0066ff;
$color-text: #333333;
$color-bg: #fdfdfd;

// フォント設定
$font-base: "Noto Sans JP", sans-serif;
$font-heading: "Montserrat", sans-serif;

// ブレークポイント
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;

// スペーシング
$spacing-unit: 8px;
```

### 📝 `src/styles/foundation/_base.scss`

```scss
@use "../setting/variables" as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%; // 1rem = 10px
}

body {
  font-family: $font-base;
  font-size: 1.6rem;
  line-height: 1.6;
  color: $color-text;
  background-color: $color-bg;
}

a {
  text-decoration: none;
  color: inherit;

  &:hover {
    opacity: 0.7;
  }
}

img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
```

### 📝 `src/styles/style.scss` (メインファイル)

```scss
// ========================================
// 1. 設定ファイルの読み込み
// ========================================
@use "setting/variables" as *;

// ========================================
// 2. 基盤スタイルの読み込み
// ========================================
@use "foundation/base";

// ========================================
// 3. レイアウトの読み込み
// ========================================
// @use 'layout/header';
// @use 'layout/footer';
// @use 'layout/sidebar';

// ========================================
// 4. オブジェクトの読み込み
// ========================================
// Component
// @use 'object/component/button';
// @use 'object/component/card';
// @use 'object/component/modal';

// Project
// @use 'object/project/hero';
// @use 'object/project/contact';

// Utility
// @use 'object/utility/spacing';
// @use 'object/utility/text';
```

## オプション設定

### 🔧 自動インポート設定 (`vite.config.js`)

全 SCSS ファイルで変数を自動的に利用可能にする設定：

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 全SCSSファイルで変数が自動的に利用可能に
        additionalData: `@use "src/styles/setting/_variables.scss" as *;`,
      },
    },
  },
});
```

### 🔧 パスエイリアス設定（オプション）

インポートパスを簡潔にする設定：

```javascript
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/setting/_variables.scss" as *;`,
      },
    },
  },
});
```

## 🎯 ベストプラクティス

### 命名規則

- **BEM 記法**を推奨

  ```scss
  .block {
  }
  .block__element {
  }
  .block--modifier {
  }
  ```

- **プレフィックス**の活用
  ```scss
  .l-header {
  } // Layout
  .c-button {
  } // Component
  .p-hero {
  } // Project
  .u-mt-20 {
  } // Utility
  ```

### ファイル分割の目安

- 1 ファイル = 1 コンポーネント/1 セクション
- 200 行を超えたら分割を検討
- 関連性の高いスタイルは同じファイルに

### パフォーマンス最適化

- 不要なネストを避ける（3 階層まで）
- `@extend`より`@mixin`を推奨
- 使用しないスタイルはコメントアウトではなく削除

## 📚 参考資料

- [Vite 公式ドキュメント](https://vitejs.dev/)
- [Sass 公式ドキュメント](https://sass-lang.com/)
- [FROCSS 設計について](https://github.com/hiloki/flocss)

## 📄 ライセンス

MIT

---

**Created with ❤️ using Vite + SCSS**
