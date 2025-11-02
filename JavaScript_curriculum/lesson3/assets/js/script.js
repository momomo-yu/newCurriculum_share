/**
 * ===================================
 * JavaScript Script lesson3
 * ===================================
 */

/**
 * 設定データ - 出力予想問題の正解
 * @type {Object.<string, string>}
 */
window.QUIZ_ANSWERS = {
  q1_1: "a",
  q1_2: "b",
  q2_1: "b",
  q2_2: "c",
  q3_1: "b",
  q3_2: "b",
  q4_1: "a",
  q4_2: "a",
  q5_1: "a",
  q5_2: "a",
  q6_1: "a",
  q6_2: "a",
  q7_1: "a",
  q7_2: "a",
  q8_1: "b",
  q8_2: "b",
  q10_1: "a",
  q10_2: "a",
  q10_3: "a",
  q10_4: "a",
  q10_5: "a",
};

/**
 * 設定データ - コード補完問題の正解
 * @type {Object.<string, {inputs: string[], answers: string[], validation: string}>}
 */
window.BLANK_ANSWERS = {
  11: { inputs: [".js-blank--1", ".js-blank--2"], answers: ["addEventListener", "click"], validation: "default" },
  12: { inputs: [".js-blank--3", ".js-blank--4"], answers: ["mouseenter", "mouseover", "()"], validation: "multiple_valid_first" },
  21: { inputs: [".js-blank--5", ".js-blank--6"], answers: ["onclick", "function"], validation: "default" },
  31: { inputs: [".js-blank--7"], answers: ["focus"], validation: "default" },
  41: { inputs: [".js-blank--8", ".js-blank--9", ".js-blank--10"], answers: ["event", "event.clientX", "event.clientY"], validation: "default" },
  51: { inputs: [".js-blank--11"], answers: ["stopPropagation"], validation: "default" },
  61: { inputs: [".js-blank--12", ".js-blank--13"], answers: ["submit", "preventDefault"], validation: "default" },
  71: { inputs: [".js-blank--14", ".js-blank--15", ".js-blank--16"], answers: ["removeEventListener", "click", "handleClick"], validation: "default" },
  81: { inputs: [".js-blank--17", ".js-blank--18"], answers: ["target", "tagName"], validation: "default" },
};

/**
 * 設定データ - ステップ毎のコード補完の検証
 * @type {Object.<string, Function>}
 */
window.VALIDATION_FUNCTIONS = {
  flexible_quote: (userAnswer, correctAnswer) => {
    const normalizedUser = userAnswer.replace(/['"]/g, "");
    const normalizedCorrect = correctAnswer.replace(/['"]/g, "");
    return normalizedUser === normalizedCorrect;
  },
  multiple_valid_first: (userAnswer, correctAnswers) => {
    return correctAnswers.includes(userAnswer);
  },
  multiple_valid_second: (userAnswer, correctAnswers) => {
    return correctAnswers.includes(userAnswer);
  },
  default: (userAnswer, correctAnswer) => {
    return userAnswer === correctAnswer;
  },
};
