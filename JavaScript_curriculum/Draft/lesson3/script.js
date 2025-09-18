// ===================================
// JavaScript条件分岐・ループ練習用ファイル
// ===================================

// ===================================
// 3段階学習システム
// ===================================

// タブ切り替え機能
function switchTab(tabName, stepSection) {
  // 該当ステップ内のタブボタンとコンテンツのみを操作
  const sectionElement = stepSection || document.querySelector(`[data-tab="${tabName}"]`).closest(".section");
  const tabButtons = sectionElement.querySelectorAll(".tab-btn");
  const tabContents = sectionElement.querySelectorAll(".tab-content");

  // 該当ステップ内のタブボタンとコンテンツを非アクティブに
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));

  // 選択されたタブをアクティブに
  const targetStep = sectionElement.querySelector(`[data-tab="${tabName}"]`).dataset.step;
  sectionElement.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
  sectionElement.querySelector(`[data-step="${targetStep}"][data-tab="${tabName}"]`).classList.add("active");
}

// タブボタンのイベントリスナー設定
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const stepSection = this.closest(".section");
      switchTab(this.dataset.tab, stepSection);

      // タブをクリックした時にそのStepにスクロール
      const sections = document.querySelectorAll(".content .section");
      const sectionIndex = Array.from(sections).indexOf(stepSection);
      if (sectionIndex !== -1) {
        scrollToStep(sectionIndex + 1);
      }
    });
  });

  // ラジオボタンのイベントリスナー設定
  document.querySelectorAll('.choices input[type="radio"]').forEach((radio) => {
    radio.addEventListener("click", function () {
      const stepSection = this.closest(".section");
      const sections = document.querySelectorAll(".content .section");
      const sectionIndex = Array.from(sections).indexOf(stepSection);
      if (sectionIndex !== -1) {
        scrollToStep(sectionIndex + 1);
      }
    });
  });

  // スクロール監視でトップへ戻るボタンの表示切り替え
  window.addEventListener("scroll", function () {
    const scrollToTopBtn = document.getElementById("scrollToTop");
    if (scrollToTopBtn) {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    }
  });

  // トップへ戻るボタンのクリックイベント
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", scrollToTop);
  }
});

// トップへ戻る機能
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Step内の要素にスクロールする関数
function scrollToStep(stepNumber) {
  const sections = document.querySelectorAll(".content .section");
  const stepElement = sections[stepNumber - 1]; // 1ベースから0ベースに変換

  if (stepElement) {
    const elementTop = stepElement.offsetTop;
    const offset = 80; // 80px下にオフセット

    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });
  }
}

// ===================================
// 出力予想機能 - 汎用関数
// ===================================

// 出力予想の答え合わせ（汎用）
function checkQuiz(questionName, correctAnswer, resultId) {
  const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
  const resultDiv = document.getElementById(resultId);

  if (!selectedAnswer) {
    resultDiv.innerHTML = '<span style="color: orange;">選択肢を選んでください</span>';
    return;
  }

  if (selectedAnswer.value === correctAnswer) {
    resultDiv.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    // エラーメッセージは各問題に応じてカスタマイズ
    let errorMessage = "";

    // Step1の出力予想
    if (questionName === "q1-1") {
      errorMessage = "不正解。正解は「大人です」です。age = 20は18以上なので条件を満たします。";
    } else if (questionName === "q1-2") {
      errorMessage = "不正解。正解は「何も表示されない」です。score = 70は80未満なので条件を満たしません。";
    }
    // Step2の出力予想
    else if (questionName === "q2-1") {
      errorMessage = "不正解。正解は「ログイン中」です。isLoggedIn = trueなのでif文が実行されます。";
    } else if (questionName === "q2-2") {
      errorMessage = '不正解。正解は「晴れではありません」です。weather = "rain"なのでelse文が実行されます。';
    }
    // Step3の出力予想
    else if (questionName === "q3-1") {
      errorMessage = "不正解。正解は「良好」です。score = 85は90未満だが80以上なのでelse ifが実行されます。";
    } else if (questionName === "q3-2") {
      errorMessage = "不正解。正解は「午後」です。time = 14は12以上18未満なのでelse ifが実行されます。";
    }
    // Step4の出力予想
    else if (questionName === "q4-1") {
      errorMessage = '不正解。正解は「成人」です。age = 20は18以上なので条件演算子で"成人"が選ばれます。';
    } else if (questionName === "q4-2") {
      errorMessage = '不正解。正解は「不合格」です。score = 60は70未満なので条件演算子で"不合格"が選ばれます。';
    }
    // Step5の出力予想
    else if (questionName === "q5-1") {
      errorMessage = '不正解。正解は「月曜日」です。day = "月"がcase "月"にマッチするためです。';
    } else if (questionName === "q5-2") {
      errorMessage = '不正解。正解は「良好普通」です。case "B"にbreakがないため次のcase "C"も実行されます。';
    }
    // Step6の出力予想
    else if (questionName === "q6-1") {
      errorMessage = "不正解。正解は「0 1 2」です。i = 0から始まり、i < 3の間実行されます。";
    } else if (questionName === "q6-2") {
      errorMessage = "不正解。正解は「Hello（2回）」です。i = 1から始まり、i <= 2の間実行されます。";
    }
    // Step7の出力予想
    else if (questionName === "q7-1") {
      errorMessage = "不正解。正解は「0 1」です。count = 0から始まり、count < 2の間実行されます。";
    } else if (questionName === "q7-2") {
      errorMessage = "不正解。正解は「実行中（2回）」です。number = 10から始まり、10 > 5、7 > 5で2回実行されます。";
    }
    // Step8の出力予想
    else if (questionName === "q8-1") {
      errorMessage = "不正解。正解は「実行（1回）」です。do-while文は条件に関係なく最低1回は実行されます。";
    } else if (questionName === "q8-2") {
      errorMessage = "不正解。正解は「0 1」です。count = 0から始まり、実行後count < 2の間繰り返されます。";
    }
    // Step9の出力予想
    else if (questionName === "q9-1") {
      errorMessage = "不正解。正解は「2 4」です。1から5まで繰り返し、偶数（i % 2 === 0）のみ表示されます。";
    } else if (questionName === "q9-2") {
      errorMessage = "不正解。正解は「0 1 3」です。i = 2の時にcontinue文で次の繰り返しにスキップされます。";
    }

    resultDiv.innerHTML = `<span style="color: #ff7b54;">✗ ${errorMessage}</span>`;
  }
}

// ===================================
// コード補完問題機能 - 汎用関数
// ===================================

// コード補完問題の答え合わせ（汎用）
function checkBlank(inputIds, correctAnswers, resultId) {
  const resultDiv = document.getElementById(resultId);
  let allCorrect = true;
  let feedback = "";

  for (let i = 0; i < inputIds.length; i++) {
    const input = document.getElementById(inputIds[i]);
    const userAnswer = input ? input.value.trim() : "";

    if (userAnswer !== correctAnswers[i]) {
      allCorrect = false;
      feedback += `${i + 1}つ目は「${correctAnswers[i]}」 `;
    }
  }

  if (allCorrect) {
    resultDiv.innerHTML = '<span style="color: green;">✓ 正解！</span>';
  } else {
    resultDiv.innerHTML = `<span style="color: #ff7b54;">✗ 不正解。${feedback}です。</span>`;
  }
}
