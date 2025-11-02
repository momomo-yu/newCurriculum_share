/**
 * ===================================
 * JavaScript Script lesson2
 * ===================================
 */

/**
 * 設定データ - 出力予想問題の正解
 * @type {Object.<string, string>}
 */
window.QUIZ_ANSWERS = {
  q1_1: "b",
  q1_2: "c",
  q2_1: "b",
  q2_2: "b",
  q3_1: "a",
  q3_2: "d",
  q4_1: "d",
  q4_2: "a",
  q5_1: "b",
  q5_2: "b",
  q6_1: "b",
  q6_2: "b",
  q7_1: "b",
  q7_2: "b",
  q8_1: "b",
  q8_2: "b",
  q9_1: "a",
  q9_2: "c",
};

/**
 * 設定データ - コード補完問題の正解
 * @type {Object.<string, {inputs: string[], answers: string[], validation: string}>}
 */
window.BLANK_ANSWERS = {
  11: { inputs: [".js-blank--1", ".js-blank--2", ".js-blank--3"], answers: ["querySelector", '"', '"'], validation: "flexible_quote" },
  12: { inputs: [".js-blank--4", ".js-blank--5"], answers: ["button", "querySelector"], validation: "default" },
  21: { inputs: [".js-blank--7", ".js-blank--8"], answers: ["querySelector", "innerHTML", "textContent"], validation: "multiple_valid_second" },
  22: { inputs: [".js-blank--9", ".js-blank--10"], answers: ["querySelector", "textContent", "innerHTML"], validation: "multiple_valid_second" },
  31: { inputs: [".js-blank--11", ".js-blank--12"], answers: ["getElementsByClassName", "setAttribute"], validation: "default" },
  32: { inputs: [".js-blank--13", ".js-blank--14", ".js-blank--15", ".js-blank--16"], answers: ["target", "_blank", "setAttribute", "getAttribute"], validation: "default" },
  41: { inputs: [".js-blank--19", ".js-blank--20"], answers: ["add", "className", "classList"], validation: "multiple_valid_second" },
  42: { inputs: [".js-blank--21", ".js-blank--22", ".js-blank--23"], answers: ["value", "classList", "contains"], validation: "default" },
  51: { inputs: [".js-blank--26", ".js-blank--27"], answers: ["closest", "remove"], validation: "default" },
  52: { inputs: [".js-blank--30", ".js-blank--31", ".js-blank--32"], answers: ["createElement", "li", "append", "appendChild"], validation: "multiple_valid_third" },
  61: { inputs: [".js-blank--28", ".js-blank--29"], answers: ["1", "checked"], validation: "default" },
  62: { inputs: [".js-blank--62-1", ".js-blank--62-2"], answers: ["getElementById", "value"], validation: "default" },
  71: { inputs: [".js-blank--34"], answers: ["parentElement", "parentNode"], validation: "multiple_valid" },
  72: { inputs: [".js-blank--35", ".js-blank--36"], answers: ["children", "length"], validation: "default" },
  81: { inputs: [".js-blank--39", ".js-blank--40"], answers: ["dataset", "productId"], validation: "default" },
  82: { inputs: [".js-blank--41", ".js-blank--42"], answers: ["dataset", "status"], validation: "default" },
  91: { inputs: [".js-blank--43"], answers: ["createDocumentFragment"], validation: "single" },
  92: { inputs: [".js-blank--44", ".js-blank--45"], answers: ["content", "cloneNode"], validation: "default" },
};
