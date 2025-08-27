// ===================================
// JavaScript変数・データ型・演算子練習用ファイル
// ===================================

// 便利関数：コンソール出力用
function logWithLabel(label, value) {
  console.log(`${label}: ${value}`);
  console.log(`型: ${typeof value}`);
  console.log('---');
}

// ===================================
// 3段階学習システム
// ===================================

// タブ切り替え機能
function switchTab(tabName, stepSection) {
  // 該当ステップ内のタブボタンとコンテンツのみを操作
  const sectionElement = stepSection || document.querySelector(`#${tabName}`).closest('.section');
  const tabButtons = sectionElement.querySelectorAll('.tab-btn');
  const tabContents = sectionElement.querySelectorAll('.tab-content');
  
  // 該当ステップ内のタブボタンとコンテンツを非アクティブに
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
  
  // 選択されたタブをアクティブに
  sectionElement.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
}

// タブボタンのイベントリスナー設定
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const stepSection = this.closest('.section');
      switchTab(this.dataset.tab, stepSection);
      
      // タブをクリックした時にそのStepにスクロール
      const sections = document.querySelectorAll('.content .section');
      const sectionIndex = Array.from(sections).indexOf(stepSection);
      if (sectionIndex !== -1) {
        scrollToStep(sectionIndex + 1);
      }
    });
  });

  // ラジオボタンのイベントリスナー設定
  document.querySelectorAll('.choices input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', function() {
      const stepSection = this.closest('.section');
      const sections = document.querySelectorAll('.content .section');
      const sectionIndex = Array.from(sections).indexOf(stepSection);
      if (sectionIndex !== -1) {
        scrollToStep(sectionIndex + 1);
      }
    });
  });

  // 統合ボタンイベントハンドラー
  document.querySelectorAll('[data-handler]').forEach(button => {
    button.addEventListener('click', function() {
      const handlerName = this.getAttribute('data-handler');
      if (typeof window[handlerName] === 'function') {
        window[handlerName]();
      }
    });
  });

  // トップへ戻るボタンのイベントリスナー
  document.getElementById('scroll-to-top').addEventListener('click', scrollToTop);

  // スクロール監視でトップへ戻るボタンの表示切り替え
  window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
});

// トップへ戻る機能
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Step内の要素にスクロールする関数
function scrollToStep(stepNumber) {
  const sections = document.querySelectorAll('.content .section');
  const stepElement = sections[stepNumber - 1]; // 1ベースから0ベースに変換
  
  if (stepElement) {
    const elementTop = stepElement.offsetTop;
    const offset = 80; // 80px下にオフセット
    
    window.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth'
    });
  }
}


// Step1 Q1の答え合わせ
function checkQuizAnswer1() {
  const q1Selected = document.querySelector('input[name="q1"]:checked');
  const result1Div = document.getElementById('quiz-result1');
  
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'b') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「山田太郎」です。変数userNameの値が出力されます。</span>';
  }
}

// Step1 Q2の答え合わせ
function checkQuizAnswer2() {
  const q2Selected = document.querySelector('input[name="q2"]:checked');
  const result2Div = document.getElementById('quiz-result2');
  
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'b') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「HelloWorld」です。文字列結合の結果です。</span>';
  }
}

// コード補完の答え合わせ（Q1）
function checkFillBlank1() {
  const blank1 = document.getElementById('blank1').value.trim();
  const blank2 = document.getElementById('blank2').value.trim();
  const blank3 = document.getElementById('blank3').value.trim();
  const result1Div = document.getElementById('fillblank-result1');
  
  const correct1 = blank1 === 'const';
  const correct2 = blank2 === '"';
  const correct3 = blank3 === '"';
  
  if (correct1 && correct2 && correct3) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「const」 ';
    if (!correct2) {
      if (blank2 === '"') {
        feedback += '2つ目は全角ではなく半角の「"」 ';
      } else {
        feedback += '2つ目は「"」 ';
      }
    }
    if (!correct3) {
      if (blank3 === '"') {
        feedback += '3つ目は全角ではなく半角の「"」 ';
      } else {
        feedback += '3つ目は「"」 ';
      }
    }
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
  
}

// コード補完の答え合わせ（Q2）- Step1
function checkFillBlank2() {
  const blank4 = document.getElementById('blank4').value.trim();
  const blank5 = document.getElementById('blank5').value.trim();
  const blank6 = document.getElementById('blank6').value.trim();
  const result2Div = document.getElementById('fillblank-result2');
  
  const correct4 = blank4 === 'let';
  const correct5 = blank5 === '"';
  const correct6 = blank6 === '"';
  
  if (correct4 && correct5 && correct6) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct4) feedback += '1つ目は「let」 ';
    if (!correct5) {
      if (blank5 === '"') {
        feedback += '2つ目は全角ではなく半角の「"」 ';
      } else {
        feedback += '2つ目は「"」 ';
      }
    }
    if (!correct6) {
      if (blank6 === '"') {
        feedback += '3つ目は全角ではなく半角の「"」 ';
      } else {
        feedback += '3つ目は「"」 ';
      }
    }
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
  
}


// Step2 Q1の答え合わせ
function checkQuiz2_1() {
  const q1Selected = document.querySelector('input[name="q2_1"]:checked');
  const result1Div = document.getElementById('quiz2-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'b') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「25」です。const age = 25の出力結果は25です。</span>';
  }
}

// Step2 Q2の答え合わせ
function checkQuiz2_2() {
  const q2Selected = document.querySelector('input[name="q2_2"]:checked');
  const result2Div = document.getElementById('quiz2-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'b') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「15」です。変数numの値「10」 + 5 = 15です。</span>';
  }
}

// Step2コード補完の答え合わせ（Q1）
function checkFillBlank2_1() {
  const blank1 = document.getElementById('blank2_1').value.trim();
  const blank2 = document.getElementById('blank2_2').value.trim();
  const result1Div = document.getElementById('fillblank2-result1');
  
  const correct1 = blank1 === 'const';
  const correct2 = blank2 === '980';
  
  if (correct1 && correct2) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「const」 ';
    if (!correct2) feedback += '2つ目は「980」 ';
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
  
}

// Step2コード補完の答え合わせ（Q2）
function checkFillBlank2_2() {
  const blank3 = document.getElementById('blank2_3').value.trim();
  const blank4 = document.getElementById('blank2_4').value.trim();
  const result2Div = document.getElementById('fillblank2-result2');
  
  const correct3 = blank3 === 'let';
  const correct4 = blank4 === '150';
  
  if (correct3 && correct4) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct3) feedback += '1つ目は「let」 ';
    if (!correct4) feedback += '2つ目は「150」 ';
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
  
}


// Step3 Q1の答え合わせ
function checkQuiz3_1() {
  const q1Selected = document.querySelector('input[name="q3_1"]:checked');
  const result1Div = document.getElementById('quiz3-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'b') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「"string"」です。typeof演算子は文字列を返します。</span>';
  }
}

// Step3 Q2の答え合わせ
function checkQuiz3_2() {
  const q2Selected = document.querySelector('input[name="q3_2"]:checked');
  const result2Div = document.getElementById('quiz3-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'c') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「string」です。typeof演算子の結果が出力されます。</span>';
  }
}

// Step3コード補完の答え合わせ（Q1）
function checkFillBlank3_1() {
  const blank1 = document.getElementById('blank3_1').value.trim();
  const result1Div = document.getElementById('fillblank3-result1');
  
  const correct1 = blank1 === 'typeof';
  
  if (correct1) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「typeof」です。</span>';
  }
  
}

// Step3コード補完の答え合わせ（Q2）
function checkFillBlank3_2() {
  const blank2 = document.getElementById('blank3_2').value.trim();
  const result2Div = document.getElementById('fillblank3-result2');
  
  const correct2 = blank2 === 'typeof';
  
  if (correct2) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「typeof」です。</span>';
  }
  
}


// Step4 Q1の答え合わせ
function checkQuiz4_1() {
  const q1Selected = document.querySelector('input[name="q4_1"]:checked');
  const result1Div = document.getElementById('quiz4-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'b') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「true」です。let isLoggedIn = trueの出力結果はtrueです。</span>';
  }
}

// Step4 Q2の答え合わせ
function checkQuiz4_2() {
  const q2Selected = document.querySelector('input[name="q4_2"]:checked');
  const result2Div = document.getElementById('quiz4-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'a') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「"undefined"」です。未定義変数のtypeof結果は文字列「undefined」です。</span>';
  }
}

// Step4コード補完の答え合わせ（Q1）
function checkFillBlank4_1() {
  const blank1 = document.getElementById('blank4_1').value.trim();
  const blank2 = document.getElementById('blank4_2').value.trim();
  const result1Div = document.getElementById('fillblank4-result1');
  
  const correct1 = blank1 === 'const';
  const correct2 = blank2 === 'Number';
  
  if (correct1 && correct2) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「const」 ';
    if (!correct2) feedback += '2つ目は「Number」 ';
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
}

// Step4コード補完の答え合わせ（Q2）
function checkFillBlank4_2() {
  const blank3 = document.getElementById('blank4_3').value.trim();
  const blank4 = document.getElementById('blank4_4').value.trim();
  const result2Div = document.getElementById('fillblank4-result2');
  
  const correct3 = blank3 === 'let';
  const correct4 = blank4 === 'null';
  
  if (correct3 && correct4) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct3) feedback += '1つ目は「let」 ';
    if (!correct4) feedback += '2つ目は「null」 ';
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
}


// Step5 Q1の答え合わせ
function checkQuiz5_1() {
  const q1Selected = document.querySelector('input[name="q5_1"]:checked');
  const result1Div = document.getElementById('quiz5-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'b') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「13」です。a = 10、b = 3 なので 10 + 3 = 13です。</span>';
  }
}

// Step5 Q2の答え合わせ
function checkQuiz5_2() {
  const q2Selected = document.querySelector('input[name="q5_2"]:checked');
  const result2Div = document.getElementById('quiz5-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'b') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「1」です。x = 7、y = 2 なので 7 % 2 = 1です。</span>';
  }
}

// Step5コード補完の答え合わせ（Q1）
function checkFillBlank5_1() {
  const blank1 = document.getElementById('blank5_1').value.trim();
  const blank2 = document.getElementById('blank5_2').value.trim();
  const result1Div = document.getElementById('fillblank5-result1');
  
  const correct1 = blank1 === 'const';
  const correct2 = blank2 === '+';
  
  if (correct1 && correct2) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「const」 ';
    if (!correct2) feedback += '2つ目は「+」 ';
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
}

// Step5コード補完の答え合わせ（Q2）
function checkFillBlank5_2() {
  const blank3 = document.getElementById('blank5_3').value.trim();
  const blank4 = document.getElementById('blank5_4').value.trim();
  const result2Div = document.getElementById('fillblank5-result2');
  
  const correct3 = blank3 === 'const';
  const correct4 = blank4 === '%';
  
  if (correct3 && correct4) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct3) feedback += '1つ目は「const」 ';
    if (!correct4) feedback += '2つ目は「%」 ';
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
}


// Step6 Q1の答え合わせ
function checkQuiz6_1() {
  const q1Selected = document.querySelector('input[name="q6_1"]:checked');
  const result1Div = document.getElementById('quiz6-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'c') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「80」です。score += 30 は score = score + 30 と同じで、50 + 30 = 80です。</span>';
  }
}

// Step6 Q2の答え合わせ
function checkQuiz6_2() {
  const q2Selected = document.querySelector('input[name="q6_2"]:checked');
  const result2Div = document.getElementById('quiz6-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'b') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「12」です。count = 4; count *= 3 で 4 * 3 = 12 が出力されます。</span>';
  }
}

// Step6コード補完の答え合わせ（Q1）
function checkFillBlank6_1() {
  const blank1 = document.getElementById('blank6_1').value.trim();
  const blank2 = document.getElementById('blank6_2').value.trim();
  const result1Div = document.getElementById('fillblank6-result1');
  
  const correct1 = blank1 === 'let';
  const correct2 = blank2 === '+=';
  
  if (correct1 && correct2) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「let」 ';
    if (!correct2) feedback += '2つ目は「+=」 ';
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
}

// Step6コード補完の答え合わせ（Q2）
function checkFillBlank6_2() {
  const blank3 = document.getElementById('blank6_3').value.trim();
  const blank4 = document.getElementById('blank6_4').value.trim();
  const result2Div = document.getElementById('fillblank6-result2');
  
  const correct3 = blank3 === 'let';
  const correct4 = blank4 === '*=';
  
  if (correct3 && correct4) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct3) feedback += '1つ目は「let」 ';
    if (!correct4) feedback += '2つ目は「*=」 ';
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
}


// Step7 Q1の答え合わせ
function checkQuiz7_1() {
  const q1Selected = document.querySelector('input[name="q7_1"]:checked');
  const result1Div = document.getElementById('quiz7-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'a') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「Hello World」です。文字列結合の結果が出力されます。</span>';
  }
}

// Step7 Q2の答え合わせ
function checkQuiz7_2() {
  const q2Selected = document.querySelector('input[name="q7_2"]:checked');
  const result2Div = document.getElementById('quiz7-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'b') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「価格: 500円」です。数値と文字列を+で結合すると文字列になります。</span>';
  }
}

// Step7コード補完の答え合わせ（Q1）
function checkFillBlank7_1() {
  const blank1 = document.getElementById('blank7_1').value.trim();
  const blank2 = document.getElementById('blank7_2').value.trim();
  const result1Div = document.getElementById('fillblank7-result1');
  
  const correct1 = blank1 === 'const';
  const correct2 = blank2 === '+';
  
  if (correct1 && correct2) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「const」 ';
    if (!correct2) feedback += '2つ目は「+」 ';
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
}

// Step7コード補完の答え合わせ（Q2）
function checkFillBlank7_2() {
  const blank3 = document.getElementById('blank7_3').value.trim();
  const blank4 = document.getElementById('blank7_4').value.trim();
  const result2Div = document.getElementById('fillblank7-result2');
  
  const correct3 = blank3 === 'const';
  const correct4 = blank4 === '+';
  
  if (correct3 && correct4) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct3) feedback += '1つ目は「const」 ';
    if (!correct4) feedback += '2つ目は「+」 ';
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
}


// Step8 Q1の答え合わせ
function checkQuiz8_1() {
  const q1Selected = document.querySelector('input[name="q8_1"]:checked');
  const result1Div = document.getElementById('quiz8-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'a') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「10」です。ブロック内のconstが外側の変数をシャドーイングします。</span>';
  }
}

// Step8 Q2の答え合わせ
function checkQuiz8_2() {
  const q2Selected = document.querySelector('input[name="q8_2"]:checked');
  const result2Div = document.getElementById('quiz8-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'b') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「10」です。ブロック外のconsole.logは外側のlet x = 10を出力します。</span>';
  }
}




// Step9 Q1の答え合わせ
function checkQuiz9_1() {
  const q1Selected = document.querySelector('input[name="q9_1"]:checked');
  const result1Div = document.getElementById('quiz9-result1');
  
  // Q1の答え合わせ
  if (!q1Selected) {
    result1Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q1Selected.value === 'a') {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result1Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「Hello 世界」です。テンプレートリテラルの実行結果です。</span>';
  }
}

// Step9 Q2の答え合わせ
function checkQuiz9_2() {
  const q2Selected = document.querySelector('input[name="q9_2"]:checked');
  const result2Div = document.getElementById('quiz9-result2');
  
  // Q2の答え合わせ
  if (!q2Selected) {
    result2Div.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
  } else if (q2Selected.value === 'a') {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    result2Div.innerHTML = '<span style="color: #ff7b54;">✗ 不正解。正解は「こんにちは田中さん」です。console.logでテンプレートリテラルが出力されます。</span>';
  }
}

// Step9コード補完の答え合わせ（Q1）
function checkFillBlank9_1() {
  const blank1 = document.getElementById('blank9_1').value.trim();
  const blank2 = document.getElementById('blank9_2').value.trim();
  const blank3 = document.getElementById('blank9_3').value.trim();
  const blank4 = document.getElementById('blank9_4').value.trim();
  const blank5 = document.getElementById('blank9_5').value.trim();
  const result1Div = document.getElementById('fillblank9-result1');
  
  const correct1 = blank1 === 'const';
  const correct2 = blank2 === '`';
  const correct3 = blank3 === '${';
  const correct4 = blank4 === '}';
  const correct5 = blank5 === '`';
  
  if (correct1 && correct2 && correct3 && correct4 && correct5) {
    result1Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct1) feedback += '1つ目は「const」 ';
    if (!correct2) feedback += '2つ目は「`」 ';
    if (!correct3) feedback += '3つ目は「${」 ';
    if (!correct4) feedback += '4つ目は「}」 ';
    if (!correct5) feedback += '5つ目は「`」 ';
    feedback += 'です。</span>';
    result1Div.innerHTML = feedback;
  }
}

// Step9コード補完の答え合わせ（Q2）
function checkFillBlank9_2() {
  const blank6 = document.getElementById('blank9_6').value.trim();
  const blank7 = document.getElementById('blank9_7').value.trim();
  const blank8 = document.getElementById('blank9_8').value.trim();
  const blank9 = document.getElementById('blank9_9').value.trim();
  const blank10 = document.getElementById('blank9_10').value.trim();
  const blank11 = document.getElementById('blank9_11').value.trim();
  const blank12 = document.getElementById('blank9_12').value.trim();
  const result2Div = document.getElementById('fillblank9-result2');
  
  const correct6 = blank6 === 'let';
  const correct7 = blank7 === '`';
  const correct8 = blank8 === '${';
  const correct9 = blank9 === '}';
  const correct10 = blank10 === '${';
  const correct11 = blank11 === '}';
  const correct12 = blank12 === '`';
  
  if (correct6 && correct7 && correct8 && correct9 && correct10 && correct11 && correct12) {
    result2Div.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    let feedback = '<span style="color: #ff7b54;">✗ 不正解。';
    if (!correct6) feedback += '1つ目は「let」 ';
    if (!correct7) feedback += '2つ目は「`」 ';
    if (!correct8) feedback += '3つ目は「${」 ';
    if (!correct9) feedback += '4つ目は「}」 ';
    if (!correct10) feedback += '5つ目は「${」 ';
    if (!correct11) feedback += '6つ目は「}」 ';
    if (!correct12) feedback += '7つ目は「`」 ';
    feedback += 'です。</span>';
    result2Div.innerHTML = feedback;
  }
}


