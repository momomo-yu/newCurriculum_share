/**
 * ===================================
 * JavaScript Curriculum Common Functions
 * ===================================
 */

/**
 * デバッグ用のラベル付きコンソール出力関数
 * @param {string} label - 表示するラベル
 * @param {*} value - 出力する値
 */
function logLabel(label, value) {
  console.log(`${label}: ${value}`);
  console.log(`型: ${typeof value}`);
  console.log("---");
}

/**
 * クラス名による要素取得（単体）
 * @param {string} className - 検索するクラス名（ドットなし）
 * @param {Document|Element} [container=document] - 検索範囲のコンテナ要素
 * @returns {Element|null} 見つかった最初の要素、または null
 */
function getByClass(className, container = document) {
  return container.querySelector(`.${className}`);
}

/**
 * クラス名による要素取得（複数）
 * @param {string} className - 検索するクラス名（ドットなし）
 * @param {Document|Element} [container=document] - 検索範囲のコンテナ要素
 * @returns {NodeList} 見つかった全ての要素のNodeList
 */
function getAllByClass(className, container = document) {
  return container.querySelectorAll(`.${className}`);
}

/**
 * 出力予想問題の答え合わせ
 * @param {string} questionName - 問題のname属性値
 * @param {string} stepQuestionId - ステップと問題番号の組み合わせ
 */
function checkQuiz(questionName, stepQuestionId) {
  const correctAnswer = window.QUIZ_ANSWERS[questionName];
  if (!correctAnswer) {
    console.error(`出力予想問題の設定が見つかりません: ${questionName}`);
    return;
  }

  const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
  const messageSpan = document.querySelector(`.js-quiz-message--${stepQuestionId}`);
  const correctSpan = document.querySelector(`.js-quiz-correct--${stepQuestionId}`);
  const incorrectSpan = document.querySelector(`.js-quiz-incorrect--${stepQuestionId}`);

  // 全て非表示にする
  [messageSpan, correctSpan, incorrectSpan].forEach((element) => {
    if (element) element.classList.add("u-hide");
  });

  if (!selectedAnswer) {
    if (messageSpan) messageSpan.classList.remove("u-hide");
  } else if (selectedAnswer.value === correctAnswer) {
    if (correctSpan) correctSpan.classList.remove("u-hide");
  } else {
    if (incorrectSpan) incorrectSpan.classList.remove("u-hide");
  }
}

/**
 * コード補完問題の答え合わせ
 * @param {string} stepQuestionId - ステップと問題番号の組み合わせ
 */
function checkBlank(stepQuestionId) {
  const config = window.BLANK_ANSWERS[stepQuestionId];
  if (!config) {
    console.error(`コード補完問題の設定が見つかりません: ${stepQuestionId}`);
    return;
  }

  const { inputs, answers, validation } = config;
  const correctSpan = document.querySelector(`.js-blank-correct--${stepQuestionId}`);
  const incorrectSpan = document.querySelector(`.js-blank-incorrect--${stepQuestionId}`);

  // 非表示にする
  if (correctSpan) correctSpan.classList.add("u-hide");
  if (incorrectSpan) incorrectSpan.classList.add("u-hide");

  // 入力値を取得
  const userAnswers = inputs.map((selector) => {
    const element = document.querySelector(selector);
    return element ? element.value.trim() : "";
  });

  // 空欄チェック
  if (userAnswers.some((answer) => answer === "")) {
    if (incorrectSpan) incorrectSpan.classList.remove("u-hide");
    return;
  }

  // 答えを検証
  const isCorrect = validateBlankAnswers(userAnswers, answers, validation);

  if (isCorrect) {
    if (correctSpan) correctSpan.classList.remove("u-hide");
  } else {
    if (incorrectSpan) incorrectSpan.classList.remove("u-hide");
  }
}

/**
 * コード補完問題の答え検証
 * @param {string[]} userAnswers - ユーザーが入力した答えの配列
 * @param {string[]} expectedAnswers - 期待される正解の配列
 * @param {string} validationType - 検証タイプ（default, single, multiple_valid, flexible_quote, etc.）
 * @returns {boolean} 答えが正しければ true、そうでなければ false
 */
function validateBlankAnswers(userAnswers, expectedAnswers, validationType) {
  switch (validationType) {
    case "single":
      return userAnswers[0] === expectedAnswers[0];

    case "multiple_valid":
      // 複数の正解が許可される場合
      return expectedAnswers.includes(userAnswers[0]);

    case "multiple_valid_first":
      // 1番目の要素に複数の正解が許可される場合
      if (userAnswers.length >= 2) {
        const firstCorrect = expectedAnswers.slice(0, -1).includes(userAnswers[0]);
        const secondCorrect = userAnswers[1] === expectedAnswers[expectedAnswers.length - 1];
        return firstCorrect && secondCorrect;
      }
      return false;

    case "multiple_valid_second":
      // 2番目の要素に複数の正解が許可される場合
      if (userAnswers.length >= 2) {
        const firstCorrect = userAnswers[0] === expectedAnswers[0];
        const secondCorrect = expectedAnswers.slice(1).includes(userAnswers[1]);
        return firstCorrect && secondCorrect;
      }
      return false;

    case "multiple_valid_third":
      // 3番目の要素に複数の正解が許可される場合
      if (userAnswers.length >= 3) {
        const firstCorrect = userAnswers[0] === expectedAnswers[0];
        const secondCorrect = userAnswers[1] === expectedAnswers[1];
        const thirdCorrect = expectedAnswers.slice(2).includes(userAnswers[2]);
        return firstCorrect && secondCorrect && thirdCorrect;
      }
      return false;

    case "flexible_quote":
      // 引用符の位置を特定して、"、`、'を受け付ける（開始と終了が一致する必要がある）
      if (userAnswers.length === 2) {
        // 2つの場合：最後の引数が引用符
        const lastIndex = userAnswers.length - 1;
        const isValidQuote = userAnswers[lastIndex] === '"' || userAnswers[lastIndex] === "`" || userAnswers[lastIndex] === "'";
        return userAnswers.slice(0, -1).every((answer, i) => answer === expectedAnswers[i]) && isValidQuote;
      } else if (userAnswers.length === 3) {
        // 3つの場合：2番目と3番目が引用符で、開始と終了が一致する必要がある
        const quote2 = userAnswers[1];
        const quote3 = userAnswers[2];
        const isValidQuote2 = quote2 === '"' || quote2 === "`" || quote2 === "'";
        const isValidQuote3 = quote3 === '"' || quote3 === "`" || quote3 === "'";
        const quotesMatch = quote2 === quote3; // 開始と終了の引用符が一致する必要がある
        return userAnswers[0] === expectedAnswers[0] && isValidQuote2 && isValidQuote3 && quotesMatch;
      }
      return false;

    case "flexible_quote_pairs":
      // 引用符がペアで一致する場合（5つの引数など）
      const quoteIndices = [];
      for (let i = 0; i < expectedAnswers.length; i++) {
        if (expectedAnswers[i] === '"') {
          quoteIndices.push(i);
        } else {
          if (userAnswers[i] !== expectedAnswers[i]) return false;
        }
      }

      // 引用符のペアをチェック
      for (let i = 0; i < quoteIndices.length; i += 2) {
        if (i + 1 < quoteIndices.length) {
          const quote1 = userAnswers[quoteIndices[i]];
          const quote2 = userAnswers[quoteIndices[i + 1]];
          const isValidQuote1 = quote1 === '"' || quote1 === "`" || quote1 === "'";
          const isValidQuote2 = quote2 === '"' || quote2 === "`" || quote2 === "'";
          if (!isValidQuote1 || !isValidQuote2 || quote1 !== quote2) {
            return false;
          }
        }
      }
      return true;

    case "flexible_quote_last":
      // 3つ目の引数が引用符
      const isValidQuoteLast = userAnswers[2] === '"' || userAnswers[2] === "`" || userAnswers[2] === "'";
      return userAnswers[0] === expectedAnswers[0] && userAnswers[1] === expectedAnswers[1] && isValidQuoteLast;

    case "flexible_quote_middle":
      // 2つ目の引数が引用符
      const isValidQuoteMiddle = userAnswers[1] === '"' || userAnswers[1] === "`" || userAnswers[1] === "'";
      return userAnswers[0] === expectedAnswers[0] && isValidQuoteMiddle && userAnswers[2] === expectedAnswers[2];

    case "template_literal":
      // テンプレートリテラル専用（`のみ受け付ける）
      for (let i = 0; i < expectedAnswers.length; i++) {
        const userAnswer = userAnswers[i];
        const expected = expectedAnswers[i];

        if (expected === "`") {
          if (userAnswer !== "`") return false;
        } else {
          if (userAnswer !== expected) return false;
        }
      }
      return true;

    case "flexible_event":
      // eventをeに置き換えても正解とする（event, event.clientX, event.targetなど）
      return userAnswers.every((answer, i) => {
        const expected = expectedAnswers[i];
        const alternativeExpected = expected.replace(/^event/, "e");
        return answer === expected || answer === alternativeExpected;
      });

    case "default":
    default:
      // 完全一致検証
      return userAnswers.every((answer, i) => answer === expectedAnswers[i]);
  }
}

/**
 * タブ切り替え
 * @param {string} tabName - アクティブにするタブの名前
 * @param {Element} stepSection - 対象のステップセクション要素
 */
function switchTab(tabName, stepSection) {
  const tabButtons = stepSection.querySelectorAll(".js-tab-btn");
  const tabContents = stepSection.querySelectorAll(".js-tab-content");

  // 該当ステップ内のタブボタンとコンテンツを非アクティブに
  tabButtons.forEach((btn) => btn.classList.remove("is-active"));
  tabContents.forEach((content) => content.classList.remove("is-active"));

  // 選択されたタブをアクティブに
  const targetTab = stepSection.querySelector(`[data-tab="${tabName}"]`);
  if (targetTab) {
    targetTab.classList.add("is-active");
  }

  // タブに対応するコンテンツを探して表示
  let targetContent = null;

  // data-tab-content属性でマッチするコンテンツを探す
  targetContent = stepSection.querySelector(`[data-tab-content="${tabName}"]`);

  // data-tab-content属性が見つからない場合は従来のロジックを使用
  if (!targetContent) {
    if (tabName.includes("quiz") || tabName === "quiz") {
      targetContent = stepSection.querySelector(".js-tab-content[class*='js-blank']") ? stepSection.querySelectorAll(".js-tab-content")[0] : stepSection.querySelector(".js-tab-content");
    } else if (tabName.includes("blank") || tabName === "blank") {
      targetContent = stepSection.querySelector(".js-tab-content[class*='js-blank']");
    } else if (tabName.includes("task") || tabName === "task") {
      const allContents = stepSection.querySelectorAll(".js-tab-content");
      targetContent = allContents[allContents.length - 1];
    }
  }

  if (targetContent) {
    targetContent.classList.add("is-active");
  }
}

/**
 * 指定されたステップ番号にスクロール
 * @param {number} stepElement - スクロール先のステップ番号
 */
function scrollToStep(stepElement) {
  if (!stepElement) return;
  const elementTop = stepElement.offsetTop;
  window.scrollTo({
    top: elementTop,
    behavior: "smooth",
  });
}

/**
 * ページの最上部にスムーズスクロール
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * テキストをクリップボードにコピー
 * @param {string} text - コピーするテキスト
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("コピーに失敗しました:", err);
    });
  } else {
    // フォールバック方法
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

/**
 * トースト通知表示
 * @param {string} message - 表示するメッセージ
 */
function showToast(message) {
  const toast = getByClass("js-toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("is-show");
    setTimeout(() => {
      toast.classList.remove("is-show");
    }, 3000);
  }
}

/**
 * トースト通知生成
 * @param {string} taskId - コピーされた問題番号
 */
function showCopyToast(taskId) {
  showToast(`問題番号：${taskId}をコピーしました`);
}

/**
 * 出力予想問題の答え合わせボタン
 * @param {Event} event - クリックイベントオブジェクト
 */
function handleQuizCheck(event) {
  const button = event.target;
  const quizId = button.getAttribute("data-quiz-id");
  const stepQuestionId = button.getAttribute("data-step-question-id");

  if (quizId && stepQuestionId) {
    checkQuiz(quizId, stepQuestionId);
  }
}

/**
 * コード補完問題の答え合わせボタン
 * @param {Event} event - クリックイベントオブジェクト
 */
function handleBlankCheck(event) {
  const button = event.target;
  const stepQuestionId = button.getAttribute("data-blank-id");

  if (stepQuestionId) {
    checkBlank(stepQuestionId);
  }
}

/**
 * タブスクロール共通処理
 * @param {*} element - クリック要素
 * @param {*} stepContent - クリック要素のセクション
 */
function handleStepClick(element, stepContent) {
  try {
    if (element.dataset.tab) {
      const stepSection = stepContent.closest(".js-section");
      switchTab(element.dataset.tab, stepSection);
    }
    scrollToStep(stepContent);
  } catch (error) {
    console.error("Tab switch error:", error);
  }
}

/**
 * 共通の初期化処理とイベントリスナー設定
 */
function initializeCurriculum() {
  // タブスクロール
  document.querySelectorAll(".js-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const section = this.closest(".js-tab");
      handleStepClick(this, section);
    });
  });

  // ラジオボタン制御
  document.querySelectorAll('.js-choices input[type="radio"]').forEach((radio) => {
    // タブスクロール
    radio.addEventListener("click", function () {
      const section = this.closest(".js-tab-content");
      handleStepClick(this, section);
    });

    // Enterキー押下時の答え合わせボタン自動実行
    radio.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const quizItem = this.closest(".js-quizItem");
        if (quizItem) {
          const checkButton = quizItem.querySelector("[data-quiz-id], [data-blank-id]");
          if (checkButton) {
            checkButton.click();
          }
        }
      }
    });
  });

  // 出力予想問題の答え合わせ
  document.querySelectorAll("[data-quiz-id]").forEach((button) => {
    button.addEventListener("click", handleQuizCheck);
  });

  // コード補完問題の答え合わせ
  document.querySelectorAll("[data-blank-id]").forEach((button) => {
    button.addEventListener("click", handleBlankCheck);
  });

  // コピー機能とツールチップ
  document.querySelectorAll(".js-tooltip, [data-copy]").forEach((element) => {
    // クリップボードコピー
    if (element.hasAttribute("data-copy")) {
      element.addEventListener("click", function () {
        const taskId = this.textContent.trim();
        copyToClipboard(taskId);
        showToast(`問題番号：${taskId}をコピーしました`);
      });
    }

    // ツールチップ表示処理
    let tooltip = null;
    element.addEventListener("mouseenter", function (event) {
      const tooltipText = this.getAttribute("data-tooltip");
      if (!tooltipText) return;

      tooltip = document.createElement("div");
      tooltip.className = "c-tooltip";
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

      tooltip.style.left = rect.left + scrollX + rect.width / 2 + "px";
      tooltip.style.top = rect.top + scrollY - 8 + "px";
    });

    element.addEventListener("mouseleave", function () {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    });
  });

  // コード補完入力欄キー制御（イベントデリゲーション）
  document.addEventListener("keydown", function (event) {
    // js-blank--で始まるクラスが含まれているかをチェック
    const hasBlankClass = Array.from(event.target.classList).some((cls) => cls.startsWith("js-blank--"));

    if (hasBlankClass) {
      if (event.key === "Enter") {
        // Enterキーで答え合わせボタンを自動実行
        event.preventDefault();
        const blankItem = event.target.closest(".js-blankItem");
        if (blankItem) {
          const checkButton = blankItem.querySelector("[data-blank-id]");
          if (checkButton) {
            checkButton.click();
          }
        }
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown") {
        // 矢印キーでの入力欄間移動
        const target = event.target;
        const isAtEnd = event.key === "ArrowRight" && target.selectionStart === target.value.length;
        const isAtStart = event.key === "ArrowLeft" && target.selectionStart === 0;
        const isUpDown = event.key === "ArrowUp" || event.key === "ArrowDown";

        if (isAtEnd || isAtStart || isUpDown) {
          event.preventDefault();
          const blankItem = target.closest(".js-blankItem");
          if (blankItem) {
            const inputs = Array.from(blankItem.querySelectorAll("input")).filter((input) => Array.from(input.classList).some((cls) => cls.startsWith("js-blank--")));
            const currentIndex = inputs.indexOf(target);

            let nextInput = null;
            if (event.key === "ArrowRight" && currentIndex < inputs.length - 1) {
              nextInput = inputs[currentIndex + 1];
            } else if (event.key === "ArrowLeft" && currentIndex > 0) {
              nextInput = inputs[currentIndex - 1];
            } else if (event.key === "ArrowDown" && currentIndex < inputs.length - 1) {
              nextInput = inputs[currentIndex + 1];
            } else if (event.key === "ArrowUp" && currentIndex > 0) {
              nextInput = inputs[currentIndex - 1];
            }

            if (nextInput) {
              nextInput.focus();
              // カーソル位置を適切に設定
              if (event.key === "ArrowRight") {
                nextInput.setSelectionRange(0, 0);
              } else {
                nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
              }
            }
          }
        }
      }
    }
  });

  // トップへ戻るボタンスクロール
  const scrollBtn = getByClass("js-floating");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", scrollToTop);
  }

  // トップへ戻るボタン表示制御
  window.addEventListener("scroll", function () {
    const scrollToTopBtn = getByClass("js-floating");
    if (scrollToTopBtn) {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("is-show");
      } else {
        scrollToTopBtn.classList.remove("is-show");
      }
    }
  });
}

// DOMContentLoadedで自動初期化
document.addEventListener("DOMContentLoaded", initializeCurriculum);
