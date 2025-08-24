// ===================================
// JavaScriptフォーム操作練習用ファイル - Lesson6
// ===================================

// 便利関数：要素を更新してアニメーション効果を追加
function updateElement(elementId, content, type = "default") {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = content;
    element.classList.add("updated");

    // 結果の種類に応じてスタイルを変更
    element.classList.remove("success", "warning", "error", "info");
    if (type !== "default") {
      element.classList.add(type);
    }

    setTimeout(() => {
      element.classList.remove("updated");
    }, 600);
  } else {
    console.error(`要素が見つかりません: ${elementId}`);
  }
}

// 便利関数：要素の色を変更
function changeElementColor(elementId, color) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.color = color;
  }
}

// 便利関数：要素の背景色を変更
function changeElementBackgroundColor(elementId, color) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundColor = color;
  }
}

// ===================================
// Step1: 基本的な入力値取得
// ===================================

// L6-S1-1: 名前入力
// id="nameInput"のテキストフィールドから値を取得し、
// id="nameDisplay"の要素に「こんにちは、○○さん」の形式で表示
function checkName() {
  // ここにコードを書いてください
}

// L6-S1-2: メッセージ入力
// id="messageInput"のテキストエリアから値を取得し、文字数をカウントして
// id="charCounter"の要素に「○文字入力中」を表示
function countChars() {
  // ここにコードを書いてください
}

// ===================================
// Step2: 入力値の基本チェック
// ===================================

// L6-S2-1: メール入力チェック
// id="emailInput"の値をチェックし、空でなければ「入力OK」を緑色で、
// 空なら「メールアドレスを入力してください」を赤色でid="emailStatus"の要素に表示
function checkEmail() {
  // ここにコードを書いてください
}

// L6-S2-2: パスワード強度チェック
// id="passwordInput"の値をチェックし、6文字以上なら「パスワードOK」を緑色で、
// 未満なら「6文字以上入力してください」を赤色でid="passwordStatus"の要素に表示
function checkPassword() {
  // ここにコードを書いてください
}

// ===================================
// Step3: 数値入力の処理
// ===================================

// L6-S3-1: 年齢判定
// id="ageInput"の値を数値として取得し、18以上なら「成人です」、
// 未満なら「未成年です」をid="ageResult"の要素に表示
function checkAge() {
  // ここにコードを書いてください
}

// L6-S3-2: 税込価格計算
// id="priceInput"の値を取得し、税込価格（×1.1）を計算して
// id="taxIncluded"の要素に「税込：○円」の形式で表示
function calculateTax() {
  // ここにコードを書いてください
}

// ===================================
// Step4: ラジオボタンの処理
// ===================================

// L6-S4-1: 性別選択
// name="gender"のラジオボタンで選択された値を取得し、
// id="genderResult"の要素に「選択：○○」を表示
function checkGender() {
  // ここにコードを書いてください
}

// L6-S4-2: 配送方法選択
// name="shipping"のラジオボタンで選択された値をチェックし、
// 「速達」なら「+500円」、「通常」なら「送料無料」をid="shippingCost"の要素に表示
function checkShipping() {
  // ここにコードを書いてください
}

// ===================================
// Step5: チェックボックスの処理
// ===================================

// L6-S5-1: 利用規約同意
// id="agreeCheck"のチェックボックスがチェックされているかを確認し、
// チェック済みなら「同意済み」、未チェックなら「利用規約に同意してください」を
// id="agreeStatus"の要素に表示
function checkAgree() {
  // ここにコードを書いてください
}

// L6-S5-2: オプション選択
// name="options"のチェックボックスで選択された項目数をカウントし、
// id="optionCount"の要素に「○個選択中」を表示し、
// 3個以上選択されていたら緑色で表示
function countOptions() {
  // ここにコードを書いてください
}

// ===================================
// Step6: セレクトボックスの処理
// ===================================

// L6-S6-1: 都道府県選択
// id="prefectureSelect"で選択された都道府県を
// id="selectedPref"の要素に「選択地域：○○」の形式で表示
function checkPrefecture() {
  // ここにコードを書いてください
}

// L6-S6-2: カテゴリ選択
// id="categorySelect"で選択されたカテゴリに応じて、
// 「技術」なら「💻」、「ビジネス」なら「💼」、「趣味」なら「🎨」のアイコンを
// id="categoryIcon"の要素に表示
function checkCategory() {
  // ここにコードを書いてください
}

// ===================================
// Step7: 複数項目の組み合わせ
// ===================================

// L6-S7-1: 氏名組み合わせ
// id="firstName"とid="lastName"の値を取得し、
// id="fullName"の要素に「氏名：○○ ○○」の形式で表示
function combineNames() {
  // ここにコードを書いてください
}

// L6-S7-2: 注文情報
// id="productSelect"で選択された商品とid="quantityInput"で入力された数量を組み合わせ、
// id="orderSummary"の要素に「注文：○○ × ○個」を表示
function createOrder() {
  // ここにコードを書いてください
}

// ===================================
// Step8: リアルタイム入力チェック
// ===================================

// L6-S8-1: ユーザー名リアルタイムチェック
// id="usernameInput"に入力されるたびに文字数をチェックし、
// 3文字以上なら「使用可能」を緑色で、未満なら「3文字以上入力」を赤色で
// id="usernameCheck"の要素に表示
// ここにイベントリスナーを設定してください

// L6-S8-2: メール形式チェック
// id="emailCheck"に入力されるたびに「@」が含まれているかチェックし、
// 含まれていれば「✅」、含まれていなければ「❌」を
// id="emailValidation"の要素に表示
// ここにイベントリスナーを設定してください

// ===================================
// Step9: フォーム送信前の総合チェック
// ===================================

// L6-S9-1: 基本送信チェック
// id="submitForm"ボタンがクリックされたら、id="requiredName"とid="requiredEmail"の
// 両方に値が入力されているかチェックし、全て入力済みなら「送信完了」、
// 未入力があれば「必須項目を入力してください」をid="submitResult"の要素に表示
// ここにイベントリスナーを設定してください

// L6-S9-2: 総合登録チェック
// フォーム送信時に、名前（3文字以上）、メール（@を含む）、年齢（18以上）の
// 条件をすべて満たしているかチェックし、全て満たしていれば「✅登録完了」を緑色で、
// そうでなければ「❌入力内容を確認してください」を赤色で
// id="registrationStatus"の要素に表示
function validateRegistration() {
  // ここにコードを書いてください
}

// ===================================
// Step10: 動的フォーム機能
// ===================================

// L6-S10-1: フォームデータ管理
// 変数名`formData`に空のオブジェクトを作成
// id="nameField"、id="emailField"、id="phoneField"から値を取得してformDataに保存し、
// id="formPreview"の要素に「名前：○○、メール：○○、電話：○○」の形式で表示
function updateFormData() {
  // ここにコードを書いてください
}

// L6-S10-2: 動的項目追加
// 変数名`fieldCounter`に0を保存
// id="addFieldBtn"がクリックされるたびにfieldCounterを1増やし、
// id="fieldCount"の要素に「追加項目：○個」を表示し、
// 5個以上になったら「⚠️項目が多すぎます」を黄色で
// id="warningMessage"の要素に表示
// ここにイベントリスナーを設定してください
