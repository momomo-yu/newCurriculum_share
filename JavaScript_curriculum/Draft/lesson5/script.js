// ===================================
// JavaScriptイベント処理練習用ファイル - Lesson5
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

// 便利関数：要素の表示・非表示を切り替え
function toggleElementVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle("hidden");
  }
}

// ===================================
// Step1: 基本的なクリック処理
// ===================================

// L5-S1-1: 基本クリック
// id="clickBtn"のボタンがクリックされたら、id="message"の要素に
// 「ボタンがクリックされました」を表示
// ここにコードを書いてください

// L5-S1-2: 色変更
// id="colorBtn"のボタンがクリックされたら、id="colorBox"の要素の背景色を青色に変更
// ここにコードを書いてください

// ===================================
// Step2: いいねボタン機能
// ===================================

// L5-S2-1: いいねカウンター
// 変数名`likeCount`に0を保存
// id="likeBtn"のボタンがクリックされたら、likeCountを1増やして
// id="likeDisplay"の要素に「いいね：X件」の形式で表示
// ここにコードを書いてください

// L5-S2-2: ハートボタン
// 変数名`heartCount`に5を保存
// id="heartBtn"のボタンがクリックされたら、heartCountを1増やし、
// 10件以上になったら「❤️人気投稿」をid="heartStatus"の要素に赤色で表示
// ここにコードを書いてください

// ===================================
// Step3: カウンター機能
// ===================================

// L5-S3-1: プラス・マイナスカウンター
// 変数名`counter`に0を保存
// id="plusBtn"がクリックされたらcounterを1増やし、
// id="minusBtn"がクリックされたらcounterを1減らし、
// id="counterDisplay"の要素に現在の数値を表示
// ここにコードを書いてください

// L5-S3-2: 数量選択
// 変数名`quantity`に1を保存
// id="increaseBtn"がクリックされたらquantityを1増やし、
// id="decreaseBtn"がクリックされたら1減らし（0未満にはしない）、
// id="quantityShow"の要素に「数量：X個」を表示
// ここにコードを書いてください

// ===================================
// Step4: 表示・非表示の切り替え
// ===================================

// L5-S4-1: トグル切り替え
// id="toggleBtn"のボタンがクリックされたら、id="content"の要素の表示・非表示を切り替え
// ここにコードを書いてください

// L5-S4-2: 詳細表示・非表示
// 変数名`isVisible`にfalseを保存
// id="showHideBtn"がクリックされたら、isVisibleの状態に応じて
// id="infoBox"の要素を表示・非表示し、ボタンのテキストを「表示」「非表示」に変更
// ここにコードを書いてください

// ===================================
// Step5: 入力フィールドの処理
// ===================================

// L5-S5-1: リアルタイム入力表示
// id="textInput"の入力フィールドに文字が入力されたら、
// その内容をid="inputDisplay"の要素にリアルタイムで表示
// ここにコードを書いてください

// L5-S5-2: 文字数カウンター
// id="searchInput"の入力フィールドに文字が入力されたら、
// 文字数をカウントしてid="charCount"の要素に「X文字」の形式で表示し、
// 10文字以上なら緑色、5文字以下なら赤色で表示
// ここにコードを書いてください

// ===================================
// Step6: 色変更機能
// ===================================

// L5-S6-1: カラーボタン
// id="redBtn"、id="blueBtn"、id="greenBtn"のボタンがそれぞれクリックされたら、
// id="colorArea"の要素の背景色を対応する色に変更
// ここにコードを書いてください

// L5-S6-2: 色状態表示
// 変数名`currentColor`に「白」を保存
// 色変更ボタンがクリックされたら、currentColorを更新し、
// id="colorStatus"の要素に「現在の色：X」を表示し、変更された色をコンソールに出力
// ここにコードを書いてください

// ===================================
// Step7: リスト追加機能
// ===================================

// L5-S7-1: ToDoリスト
// 変数名`todoList`に空の配列を作成
// id="addBtn"がクリックされたら、id="todoInput"の値が空でない場合のみtodoListに追加し、
// 配列の全内容をid="todoDisplay"の要素に「・項目1・項目2」の形式で表示
// ここにコードを書いてください

// L5-S7-2: ショッピングカート
// 変数名`cartItems`に空の配列を作成
// id="addToCart"がクリックされたら、「商品」+（配列の長さ+1）をcartItemsに追加し、
// カート内容をid="cartList"の要素に番号付きで表示し、アイテム数をコンソールに出力
// ここにコードを書いてください

// ===================================
// Step8: 選択機能
// ===================================

// L5-S8-1: タブ切り替え
// id="tab1"、id="tab2"、id="tab3"のボタンがクリックされたら、
// クリックされたタブの背景色を黄色にし、他のタブは白色にする
// ここにコードを書いてください

// L5-S8-2: オプション選択
// 変数名`selectedItem`に「なし」を保存
// id="option1"、id="option2"、id="option3"のボタンがクリックされたら、
// selectedItemを更新し、id="selectionStatus"の要素に「選択中：X」を表示し、
// 選択されたボタンだけ緑色にする
// ここにコードを書いてください

// ===================================
// Step9: フォーム送信処理
// ===================================

// L5-S9-1: 基本フォーム
// id="submitBtn"がクリックされたら、id="nameInput"とid="emailInput"の値を取得し、
// id="formResult"の要素に「送信完了：名前 (メールアドレス)」の形式で表示
// ここにコードを書いてください

// L5-S9-2: ログインフォーム
// id="loginBtn"がクリックされたら、id="usernameInput"の値をチェックし、
// 空でなければ「ログイン成功：ユーザー名」を緑色で、
// 空なら「ユーザー名を入力してください」を赤色でid="loginStatus"の要素に表示
// ここにコードを書いてください

// ===================================
// Step10: 複合的なインタラクション
// ===================================

// L5-S10-1: ゲーム機能
// 変数名`score`に0、変数名`clickCount`に0を保存
// id="gameBtn"がクリックされたら、clickCountを1増やし、
// クリック数が5の倍数になった時にscoreを10増やし、id="gameStatus"の要素に
// 「スコア：X点 (クリック数：Y回)」を表示し、スコアが30以上なら金色で表示
// ここにコードを書いてください

// L5-S10-2: タスク管理
// 変数名`taskList`に空の配列、変数名`completedCount`に0を保存
// id="addTaskBtn"がクリックされたらid="taskInput"の値が空でない場合のみtaskListに追加し、
// id="completeBtn"がクリックされたら最後のタスクを削除してcompletedCountを1増やし、
// id="taskSummary"の要素に「残りタスク：X件、完了：Y件」を表示し、
// 全て完了したら「🎉全て完了！」を緑色で表示
// ここにコードを書いてください
