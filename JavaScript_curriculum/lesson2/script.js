// ===================================
// JavaScript DOM操作練習用ファイル
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
// 出力予想機能 - DOM操作用
// ===================================

// 出力予想の答え合わせ（DOM操作用）
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
      errorMessage = '不正解。正解は「document.getElementById("message")」です。IDで要素を取得する基本的なメソッドです。';
    } else if (questionName === "q1-2") {
      errorMessage = '不正解。正解は「document.querySelector(".button")」です。クラス名で要素を取得する際は先頭にドット(.)が必要です。';
    }
    // Step2の出力予想
    else if (questionName === "q2-1") {
      errorMessage = "不正解。正解は「textContent」です。要素のテキスト内容を安全に変更するプロパティです。";
    } else if (questionName === "q2-2") {
      errorMessage = "不正解。正解は「innerHTML」です。HTMLタグを含む内容を設定する際に使用します。";
    }
    // Step3の出力予想
    else if (questionName === "q3-1") {
      errorMessage = "不正解。正解は「getAttribute()」です。要素の属性値を取得するメソッドです。";
    } else if (questionName === "q3-2") {
      errorMessage = "不正解。正解は「setAttribute()」です。要素の属性を設定するメソッドです。";
    }
    // Step4の出力予想
    else if (questionName === "q4-1") {
      errorMessage = '不正解。正解は「element.style.backgroundColor = "red"」です。CSS背景色プロパティはbackgroundColorです。';
    } else if (questionName === "q4-2") {
      errorMessage = "不正解。正解は「classList.add()」です。CSSクラスを追加するメソッドです。";
    }
    // Step5の出力予想
    else if (questionName === "q5-1") {
      errorMessage = "不正解。正解は「addEventListener()」です。イベントリスナーを追加する標準的なメソッドです。";
    } else if (questionName === "q5-2") {
      errorMessage = '不正解。正解は「element.addEventListener("click", function)」です。イベント名は"click"（小文字）です。';
    }
    // Step6の出力予想
    else if (questionName === "q6-1") {
      errorMessage = "不正解。正解は「createElement()」です。新しいDOM要素を作成するメソッドです。";
    } else if (questionName === "q6-2") {
      errorMessage = "不正解。正解は「appendChild()」です。子要素を親要素に追加するメソッドです。";
    }
    // Step7の出力予想
    else if (questionName === "q7-1") {
      errorMessage = "不正解。正解は「value」です。入力フィールドの値を取得・設定するプロパティです。";
    } else if (questionName === "q7-2") {
      errorMessage = "不正解。正解は「checked」です。チェックボックスの選択状態を調べるプロパティです。";
    }
    // Step8の出力予想
    else if (questionName === "q8-1") {
      errorMessage = '不正解。正解は「display = "none"」です。要素を非表示にするCSSプロパティです。';
    } else if (questionName === "q8-2") {
      errorMessage = '不正解。正解は「display = "block"」です。要素を表示するCSSプロパティです。';
    }
    // Step9の出力予想
    else if (questionName === "q9-1") {
      errorMessage = "不正解。正解は「forEach()」です。配列の各要素に対して処理を実行するメソッドです。";
    } else if (questionName === "q9-2") {
      errorMessage = "不正解。正解は「querySelectorAll()」です。複数の要素を一度に取得するメソッドです。";
    }
    // Step10の出力予想
    else if (questionName === "q10-1") {
      errorMessage = "不正解。正解は「element !== null」です。要素が存在するかをnullと比較してチェックします。";
    } else if (questionName === "q10-2") {
      errorMessage = "不正解。正解は「stopPropagation()」です。イベントの伝播（バブリング）を停止するメソッドです。";
    }

    resultDiv.innerHTML = `<span style="color: #ff7b54;">✗ ${errorMessage}</span>`;
  }
}

// ===================================
// コード補完問題機能 - DOM操作用
// ===================================

// コード補完問題の答え合わせ（DOM操作用）
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
