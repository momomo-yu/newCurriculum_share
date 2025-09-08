/**
 * ===================================
 * JavaScript Setting lesson1
 * ===================================
 */

/**
 * 便利関数：コンソール出力用
 */
function logWithLabel(label, value) {
  console.log(`${label}: ${value}`);
  console.log(`型: ${typeof value}`);
  console.log("---");
}

/**

 * 便利関数：クラスベースの要素取得
 * @param {*} className
 * @param {*} container
 * @returns
 */
function getByClass(className, container = document) {
  return container.querySelector(`.${className}`);
}

function getAllByClass(className, container = document) {
  return container.querySelectorAll(`.${className}`);
}

/**
 * 汎用的なクイズ答え合わせ関数
 * @param {*} stepNum
 * @param {*} questionNum
 * @param {*} correctValue
 * @param {*} explanation
 */
function checkQuizGeneric(stepNum, questionNum, correctValue, explanation) {
  const namePattern = stepNum ? `q${stepNum}_${questionNum}` : `q${questionNum}`;
  const classPattern = stepNum ? `js-quiz-result--${stepNum}${questionNum}` : `js-quiz-result--${questionNum}`;
  const selectedAnswer = document.querySelector(`input[name="${namePattern}"]:checked`);
  const resultDisplay = getByClass(classPattern);

  if (!selectedAnswer) {
    resultDisplay.innerHTML = '<span class="u-color-text">選択肢を選んでください</span>';
  } else if (selectedAnswer.value === correctValue) {
    resultDisplay.innerHTML = '<span class="u-color-normal">〇 正解！</span>';
  } else {
    resultDisplay.innerHTML = `<span class="u-color-warning">✗ 不正解。${explanation}</span>`;
  }
}

/**
 * 汎用的な穴埋め答え合わせ関数
 * @param {*} stepNum
 * @param {*} questionNum
 * @param {*} blankNumbers
 * @param {*} expectedAnswers
 */
function checkBlankGeneric(stepNum, questionNum, blankNumbers, expectedAnswers) {
  const isTemplateLiteral = stepNum === "9"; // Step9はテンプレートリテラル
  const stepClass = stepNum ? `js-blank-${stepNum}` : "js-blank-1";
  const container = getByClass(stepClass);
  const inputs = [];

  // blank番号を使用して入力を取得
  for (let i = 0; i < blankNumbers.length; i++) {
    const blankClass = stepNum ? `js-blank--${stepNum}${blankNumbers[i]}` : `js-blank--${blankNumbers[i]}`;
    const input = container.querySelector(`.${blankClass}`);
    inputs.push(input ? input.value.trim() : "");
  }

  const resultClass = stepNum ? `js-blank-result--${stepNum}${questionNum}` : `js-blank-result--${questionNum}`;
  const resultDisplay = container.querySelector(`.${resultClass}`);

  // 全角・半角変換マップ
  const zenkakuToHankaku = {
    'ｃ': 'c', 'ｏ': 'o', 'ｎ': 'n', 'ｓ': 's', 'ｔ': 't',
    'ｌ': 'l', 'ｅ': 'e', 
    '０': '0', '１': '1', '２': '2', '３': '3', '４': '4', 
    '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
    '"': '"', "'": "'", '（': '(', '）': ')'
  };

  // 引用符のペア判定用（問題ごとに引用符の開始位置を記録）
  const quoteCheckResults = [];
  let quoteStartIndexes = [];
  
  const results = inputs.map((input, index) => {
    let isCorrect = false;
    let isZenkakuError = false;
    let isQuoteMismatch = false;
    
    // 引用符のペア判定
    if (Array.isArray(expectedAnswers[index]) && expectedAnswers[index].includes('"') || expectedAnswers[index].includes("'") || expectedAnswers[index].includes('`')) {
      // 引用符の場合、開始位置を記録
      if (input === '"' || input === "'" || input === '`') {
        if (quoteStartIndexes.length === 0) {
          // 最初の引用符（開始）
          quoteStartIndexes.push({ index, quote: input });
        } else {
          // 2番目以降の引用符（終了）
          const startQuote = quoteStartIndexes[quoteStartIndexes.length - 1];
          if (startQuote.quote !== input) {
            isQuoteMismatch = true;
          }
          // ペアが完成したら記録をクリア
          quoteStartIndexes = [];
        }
      }
    }
    
    if (Array.isArray(expectedAnswers[index])) {
      isCorrect = expectedAnswers[index].includes(input);
    } else {
      isCorrect = input === expectedAnswers[index];
    }

    // 全角文字チェック（正解でない場合）
    if (!isCorrect) {
      const convertedInput = input.split('').map(char => zenkakuToHankaku[char] || char).join('');
      if (Array.isArray(expectedAnswers[index])) {
        if (expectedAnswers[index].includes(convertedInput)) {
          isZenkakuError = true;
        }
      } else {
        if (convertedInput === expectedAnswers[index]) {
          isZenkakuError = true;
        }
      }
    }

    return { correct: isCorrect, zenkakuError: isZenkakuError, quoteMismatch: isQuoteMismatch };
  });

  // 引用符のペア整合性をチェック
  const hasQuoteMismatch = results.some(r => r.quoteMismatch);
  
  if (results.every((r) => r.correct) && !hasQuoteMismatch) {
    resultDisplay.innerHTML = '<span class="u-color-normal">〇 正解！</span>';
  } else {
    let feedback = '<span class="u-color-warning">✕ 不正解。';
    
    if (hasQuoteMismatch) {
      feedback += '引用符の開始と終了は同じ記号を使用してください（"と"、\'と\'、`と`）。';
    } else {
      results.forEach((result, index) => {
        if (!result.correct) {
          if (result.zenkakuError) {
            if (Array.isArray(expectedAnswers[index])) {
              if (isTemplateLiteral) {
                feedback += `${index + 1}つ目はテンプレートリテラル用の半角文字のバッククォート（\`） `;
              } else {
                feedback += `${index + 1}つ目は半角文字の引用符（"、'、\`）のいずれか `;
              }
            } else {
              feedback += `${index + 1}つ目は半角文字の「${expectedAnswers[index]}」 `;
            }
          } else {
            if (Array.isArray(expectedAnswers[index])) {
              if (isTemplateLiteral) {
                feedback += `${index + 1}つ目はテンプレートリテラル用のバッククォート（\`） `;
              } else {
                feedback += `${index + 1}つ目は引用符（"、'、\`）のいずれか `;
              }
            } else {
              if (isTemplateLiteral && expectedAnswers[index] === '`') {
                feedback += `${index + 1}つ目はテンプレートリテラル用のバッククォート（\`） `;
              } else {
                feedback += `${index + 1}つ目は「${expectedAnswers[index]}」 `;
              }
            }
          }
        }
      });
    }
    
    feedback += "です。</span>";
    resultDisplay.innerHTML = feedback;
  }
}

/**
 * タブ切り替え機能
 * @param {*} tabName
 * @param {*} stepSection
 */
function switchTab(tabName, stepSection) {
  // 該当ステップ内のタブボタンとコンテンツのみを操作
  const sectionElement = stepSection;
  const tabButtons = sectionElement.querySelectorAll(".js-tab-btn");
  const tabContents = sectionElement.querySelectorAll(".js-tab-content");

  // 該当ステップ内のタブボタンとコンテンツを非アクティブに
  tabButtons.forEach((btn) => btn.classList.remove("is-active"));
  tabContents.forEach((content) => content.classList.remove("is-active"));

  // 選択されたタブをアクティブに
  const targetTab = sectionElement.querySelector(`[data-tab="${tabName}"]`);
  if (targetTab) {
    targetTab.classList.add("is-active");
  }

  // タブに対応するコンテンツを探して表示
  let targetContent = null;

  // 各stepのタブコンテンツを探す
  if (tabName.includes("quiz") || tabName === "quiz") {
    // Quiz用のタブコンテンツ（最初のタブコンテンツ）
    targetContent = sectionElement.querySelectorAll(".js-tab-content")[0];
  } else if (tabName.includes("blank") || tabName === "blank") {
    // blank用のタブコンテンツ（js-blankクラスを持つもの）
    targetContent = sectionElement.querySelector(".js-tab-content[class*='js-blank']");
  } else if (tabName.includes("task") || tabName === "task") {
    // Drill用のタブコンテンツ（最後のタブコンテンツ）
    const allContents = sectionElement.querySelectorAll(".js-tab-content");
    targetContent = allContents[allContents.length - 1];
  }

  if (targetContent) {
    targetContent.classList.add("is-active");
  }
}

/**
 * タブボタンのイベントリスナー設定
 */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      try {
        const stepSection = this.closest(".js-section");
        console.log('Tab clicked:', this.dataset.tab, 'Section:', stepSection);
        switchTab(this.dataset.tab, stepSection);

        // タブをクリックした時にそのStepにスクロール
        const sections = document.querySelectorAll(".js-section");
        const sectionIndex = Array.from(sections).indexOf(stepSection);
        if (sectionIndex !== -1) {
          scrollToStep(sectionIndex + 1);
        }
      } catch (error) {
        console.error('Tab switch error:', error);
      }
    });
  });

  // ラジオボタンのイベントリスナー設定
  document.querySelectorAll('.js-choices input[type="radio"]').forEach((radio) => {
    radio.addEventListener("click", function () {
      const stepSection = this.closest(".js-section");
      const sections = document.querySelectorAll(".js-section");
      const sectionIndex = Array.from(sections).indexOf(stepSection);
      if (sectionIndex !== -1) {
        scrollToStep(sectionIndex + 1);
      }
    });

    // ラジオボタンでEnterキー押下時の処理
    radio.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        
        // 該当する問題の答えを確認ボタンを見つけて押下
        const quizItem = this.closest(".p-quiz__item");
        if (quizItem) {
          const checkButton = quizItem.querySelector("[data-handler]");
          if (checkButton) {
            checkButton.click();
          }
        }
      }
    });
  });

  // 統合ボタンイベントハンドラー
  document.querySelectorAll("[data-handler]").forEach((button) => {
    button.addEventListener("click", function () {
      const handlerName = this.getAttribute("data-handler");
      if (typeof window[handlerName] === "function") {
        window[handlerName]();
      }
    });
  });

  // トップへ戻るボタンのイベントリスナー
  getByClass("js-scrollBtn").addEventListener("click", scrollToTop);

  // c-tagコピー機能
  document.querySelectorAll(".js-copyable").forEach((tag) => {
    tag.addEventListener("click", function () {
      const taskId = this.textContent;
      copyToClipboard(taskId);
      showCopyToast(taskId);
    });
  });

  // コード補完入力欄でキー操作時の処理
  document.querySelectorAll(".js-tab-content .c-input").forEach((input) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        
        // 該当する問題の答えを確認ボタンを見つけて押下
        const blankItem = this.closest(".p-blank__item");
        if (blankItem) {
          const checkButton = blankItem.querySelector("[data-handler]");
          if (checkButton) {
            checkButton.click();
          }
        }
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        // 現在の入力欄が問題内の最後の文字位置かチェック
        const isAtEnd = (event.key === "ArrowRight" && this.selectionStart === this.value.length);
        const isAtStart = (event.key === "ArrowLeft" && this.selectionStart === 0);
        
        if (isAtEnd || isAtStart) {
          event.preventDefault();
          
          // 同じ問題内の入力欄を取得
          const blankItem = this.closest(".p-blank__item");
          if (blankItem) {
            const inputs = Array.from(blankItem.querySelectorAll(".c-input"));
            const currentIndex = inputs.indexOf(this);
            
            let nextInput = null;
            if (event.key === "ArrowRight" && currentIndex < inputs.length - 1) {
              nextInput = inputs[currentIndex + 1];
            } else if (event.key === "ArrowLeft" && currentIndex > 0) {
              nextInput = inputs[currentIndex - 1];
            }
            
            if (nextInput) {
              nextInput.focus();
              // カーソルを適切な位置に配置
              if (event.key === "ArrowRight") {
                nextInput.setSelectionRange(0, 0);
              } else {
                nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
              }
            }
          }
        }
      }
    });
  });

  // スクロール監視でトップへ戻るボタンの表示切り替え
  window.addEventListener("scroll", function () {
    const scrollToTopBtn = getByClass("js-scrollBtn");
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("is-show");
    } else {
      scrollToTopBtn.classList.remove("is-show");
    }
  });
});

/**
 * トップへ戻る機能
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Step内の要素にスクロールする関数
 * @param {*} stepNumber
 */
function scrollToStep(stepNumber) {
  const sections = document.querySelectorAll(".js-section");
  const stepElement = sections[stepNumber - 1];

  if (stepElement) {
    const elementTop = stepElement.offsetTop;
    const offset = 80;

    window.scrollTo({
      top: elementTop - offset,
      behavior: "smooth",
    });
  }
}

/**
 * クリップボードにコピーする関数
 * @param {*} text
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
 * コピー完了のトースト通知を表示
 * @param {*} taskId
 */
function showCopyToast(taskId) {
  const toast = getByClass("js-toastContainer");
  toast.textContent = `問題番号「${taskId}」をコピーしました`;
  toast.classList.add("is-show");

  setTimeout(() => {
    toast.classList.remove("is-show");
  }, 3000);
}

/**
 * Step1 Q1の答え合わせ
 */
function checkQuizAnswer1() {
  checkQuizGeneric("", "1", "b", "正解は「山田太郎」です。変数userNameの値が出力されます。");
}

/**
 * Step1 Q2の答え合わせ
 */
function checkQuizAnswer2() {
  checkQuizGeneric("", "2", "b", "正解は「変更」です。変数messageの値が再代入により変更されます。");
}

/**
 * コード補完の答え合わせ（Q1）
 */
function checkBlank1() {
  checkBlankGeneric("", "1", [1, 2, 3], ["const", ['"', "'", "`"], ['"', "'", "`"]]);
}

/**
 * コード補完の答え合わせ（Q2）- Step1
 */
function checkBlank2() {
  checkBlankGeneric("", "2", [4, 5, 6], ["let", ['"', "'", "`"], ['"', "'", "`"]]);
}

/**
 * Step2 Q1の答え合わせ
 */
function checkQuiz2_1() {
  checkQuizGeneric("2", "1", "b", "正解は「25」です。const age = 25の出力結果は25です。");
}

/**
 * Step2 Q2の答え合わせ
 */
function checkQuiz2_2() {
  checkQuizGeneric("2", "2", "b", "正解は「15」です。変数numの値「10」 + 5 = 15です。");
}

/**
 * Step2コード補完の答え合わせ（Q1）
 */
function checkBlank2_1() {
  checkBlankGeneric("2", "1", [1, 2], ["const", "980"]);
}

/**
 * Step2コード補完の答え合わせ（Q2）
 */
function checkBlank2_2() {
  checkBlankGeneric("2", "2", [3, 4], ["let", "150"]);
}

/**
 * Step3 Q1の答え合わせ
 */
function checkQuiz3_1() {
  checkQuizGeneric("3", "1", "b", '正解は「"string"」です。typeof演算子は文字列を返します。');
}

/**
 * Step3 Q2の答え合わせ
 */
function checkQuiz3_2() {
  checkQuizGeneric("3", "2", "c", '正解は「"number"」です。typeof演算子の結果が出力されます。');
}

/**
 * Step3コード補完の答え合わせ（Q1）
 */
function checkBlank3_1() {
  checkBlankGeneric("3", "1", [1, 2], ["const", "1200"]);
}

/**
 * Step3コード補完の答え合わせ（Q2）
 */
function checkBlank3_2() {
  checkBlankGeneric("3", "2", [3, 4], ["typeof", "status"]);
}

/**
 * Step4 Q1の答え合わせ
 */
function checkQuiz4_1() {
  checkQuizGeneric("4", "1", "b", "正解は「true」です。let isLoggedIn = trueの出力結果はtrueです。");
}

/**
 * Step4 Q2の答え合わせ
 */
function checkQuiz4_2() {
  checkQuizGeneric("4", "2", "a", '正解は「"undefined"」です。未定義変数のtypeof結果は文字列「undefined」です。');
}

/**
 * Step4コード補完の答え合わせ（Q1）
 */
function checkBlank4_1() {
  checkBlankGeneric("4", "1", [1, 2], ["let", "String"]);
}

/**
 * Step4コード補完の答え合わせ（Q2）
 */
function checkBlank4_2() {
  checkBlankGeneric("4", "2", [3, 4], ["let", "Number"]);
}

/**
 * Step5 Q1の答え合わせ
 */
function checkQuiz5_1() {
  checkQuizGeneric("5", "1", "b", "正解は「13」です。a = 10、b = 3 なので 10 + 3 = 13です。");
}

/**
 * Step5 Q2の答え合わせ
 */
function checkQuiz5_2() {
  checkQuizGeneric("5", "2", "b", "正解は「1」です。x = 7、y = 2 なので 7 % 2 = 1です。");
}

/**
 * Step5コード補完の答え合わせ（Q1）
 */
function checkBlank5_1() {
  checkBlankGeneric("5", "1", [1, 2], ["const", "+"]);
}

/**
 * Step5コード補完の答え合わせ（Q2）
 */
function checkBlank5_2() {
  checkBlankGeneric("5", "2", [3, 4], ["const", "%"]);
}

/**
 * Step6 Q1の答え合わせ
 */
function checkQuiz6_1() {
  checkQuizGeneric("6", "1", "c", "正解は「80」です。score += 30 は score = score + 30 と同じで、50 + 30 = 80です。");
}

/**
 * Step6 Q2の答え合わせ
 */
function checkQuiz6_2() {
  checkQuizGeneric("6", "2", "b", "正解は「12」です。count = 4; count *= 3 で 4 * 3 = 12 が出力されます。");
}

/**
 * Step6コード補完の答え合わせ（Q1）
 */
function checkBlank6_1() {
  checkBlankGeneric("6", "1", [1, 2], ["let", "+="]);
}

/**
 * Step6コード補完の答え合わせ（Q2）
 */
function checkBlank6_2() {
  checkBlankGeneric("6", "2", [3, 4], ["let", "*="]);
}

/**
 * Step7 Q1の答え合わせ
 */
function checkQuiz7_1() {
  checkQuizGeneric("7", "1", "a", "正解は「Hello World」です。文字列結合の結果が出力されます。");
}

/**
 * Step7 Q2の答え合わせ
 */
function checkQuiz7_2() {
  checkQuizGeneric("7", "2", "b", "正解は「価格: 500円」です。数値と文字列を+で結合すると文字列になります。");
}

/**
 * Step7コード補完の答え合わせ（Q1）
 */
function checkBlank7_1() {
  checkBlankGeneric("7", "1", [1, 2], ["const", "+"]);
}

/**
 * Step7コード補完の答え合わせ（Q2）
 */
function checkBlank7_2() {
  checkBlankGeneric("7", "2", [3, 4], ["const", "+"]);
}

/**
 * Step8 Q1の答え合わせ
 */
function checkQuiz8_1() {
  checkQuizGeneric("8", "1", "a", "正解は「10」です。ブロック内のconstが外側の変数をシャドーイングします。");
}

/**
 * Step8 Q2の答え合わせ
 */
function checkQuiz8_2() {
  checkQuizGeneric("8", "2", "b", "正解は「10」です。ブロック外のconsole.logは外側のlet x = 10を出力します。");
}

/**
 * Step9 Q1の答え合わせ
 */
function checkQuiz9_1() {
  checkQuizGeneric("9", "1", "a", "正解は「Hello 世界」です。テンプレートリテラルの実行結果です。");
}

/**
 * Step9 Q2の答え合わせ
 */
function checkQuiz9_2() {
  checkQuizGeneric("9", "2", "a", "正解は「こんにちは田中さん」です。console.logでテンプレートリテラルが出力されます。");
}

/**
 * Step9コード補完の答え合わせ（Q1）
 */
function checkBlank9_1() {
  checkBlankGeneric("9", "1", [1, 2, 3, 4], ["const", "`", "${", "}`"]);
}

/**
 * Step9コード補完の答え合わせ（Q2）
 */
function checkBlank9_2() {
  checkBlankGeneric("9", "2", [6, 7, 8, 9], ["const", "`", "${", "}`"]);
}
