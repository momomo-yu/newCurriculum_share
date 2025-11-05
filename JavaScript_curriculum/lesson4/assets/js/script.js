/**
 * Lesson4: 条件分岐 - 解答設定
 */

// クイズの正解を定義
window.QUIZ_ANSWERS = {
  // Step1: if文の基本
  q1_1: "c", // 成人です 処理終了
  q1_2: "b", // 終了

  // Step2: if-else文
  q2_1: "b", // 奇数
  q2_2: "b", // 未ログイン

  // Step3: else if（複数条件分岐）
  q3_1: "b", // 良
  q3_2: "a", // 午前

  // Step4: 比較演算子
  q4_1: "d", // false true
  q4_2: "a", // true

  // Step5: 論理演算子
  q5_1: "a", // 運転できます
  q5_2: "a", // 編集可能

  // Step6: switch文
  q6_1: "b", // 青
  q6_2: "b", // 2 3

  // Step7: 三項演算子
  q7_1: "a", // 成人
  q7_2: "b", // 不合格
};

// 穴埋め問題の正解を定義
window.BLANK_ANSWERS = {
  // Step1: if文の基本
  11: {
    inputs: [".js-blank--1", ".js-blank--2"],
    answers: ["if", ">="],
    validation: "default",
  },
  12: {
    inputs: [".js-blank--3", ".js-blank--4"],
    answers: ["if", "60"],
    validation: "default",
  },

  // Step2: if-else文
  21: {
    inputs: [".js-blank--5", ".js-blank--6"],
    answers: ["===", "else"],
    validation: "default",
  },
  22: {
    inputs: [".js-blank--7", ".js-blank--8"],
    answers: ["成人", "未成年"],
    validation: "flexible_quote",
  },

  // Step3: else if（複数条件分岐）
  31: {
    inputs: [".js-blank--9", ".js-blank--10"],
    answers: ["else", "if"],
    validation: "default",
  },
  32: {
    inputs: [".js-blank--11", ".js-blank--12"],
    answers: ["おはよう", "こんにちは"],
    validation: "flexible_quote",
  },

  // Step4: 比較演算子
  41: {
    inputs: [".js-blank--13"],
    answers: ["==="],
    validation: "default",
  },
  42: {
    inputs: [".js-blank--14", ".js-blank--15"],
    answers: [">=", "<="],
    validation: "default",
  },

  // Step5: 論理演算子
  51: {
    inputs: [".js-blank--16"],
    answers: ["&&"],
    validation: "default",
  },
  52: {
    inputs: [".js-blank--17"],
    answers: ["||"],
    validation: "default",
  },

  // Step6: switch文
  61: {
    inputs: [".js-blank--18", ".js-blank--19", ".js-blank--20", ".js-blank--21"],
    answers: ["switch", "case", "break", "default"],
    validation: "default",
  },
  62: {
    inputs: [".js-blank--22", ".js-blank--23"],
    answers: ["月曜日", "火曜日"],
    validation: "flexible_quote",
  },

  // Step7: 三項演算子
  71: {
    inputs: [".js-blank--24", ".js-blank--25"],
    answers: ["?", ":"],
    validation: "default",
  },
  72: {
    inputs: [".js-blank--26", ".js-blank--27"],
    answers: ["active", "inactive"],
    validation: "flexible_quote",
  },
};
