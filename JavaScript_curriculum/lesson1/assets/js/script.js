/**
 * ===================================
 * JavaScript Setting lesson1
 * ===================================
 */

/**
 * 設定データ - 出力予想問題の正解
 * @type {Object.<string, string>}
 */
window.QUIZ_ANSWERS = {
  q1_1: "b",
  q1_2: "b",
  q2_1: "b",
  q2_2: "b",
  q3_1: "b",
  q3_2: "c",
  q4_1: "b",
  q4_2: "a",
  q5_1: "b",
  q5_2: "b",
  q6_1: "c",
  q6_2: "b",
  q7_1: "a",
  q7_2: "b",
  q8_1: "a",
  q8_2: "b",
  q9_1: "a",
  q9_2: "a",
};

/**
 * 設定データ - コード補完問題の正解
 * @type {Object.<string, {inputs: string[], answers: string[], validation: string}>}
 */
window.BLANK_ANSWERS = {
  11: { inputs: [".js-blank--1", ".js-blank--2", ".js-blank--3"], answers: ["const", '"', '"'], validation: "flexible_quote" },
  12: { inputs: [".js-blank--4", ".js-blank--5", ".js-blank--6"], answers: ["let", '"', '"'], validation: "flexible_quote" },
  21: { inputs: [".js-blank--7", ".js-blank--8"], answers: ["const", "980"], validation: "default" },
  22: { inputs: [".js-blank--9", ".js-blank--10"], answers: ["let", "150"], validation: "default" },
  31: { inputs: [".js-blank--11", ".js-blank--12"], answers: ["const", "1200"], validation: "default" },
  32: { inputs: [".js-blank--13", ".js-blank--14"], answers: ["typeof", "status"], validation: "default" },
  41: { inputs: [".js-blank--15", ".js-blank--16"], answers: ["let", "String"], validation: "default" },
  42: { inputs: [".js-blank--17", ".js-blank--18"], answers: ["let", "Number"], validation: "default" },
  51: { inputs: [".js-blank--19", ".js-blank--20"], answers: ["const", "+"], validation: "default" },
  52: { inputs: [".js-blank--21", ".js-blank--22"], answers: ["const", "%"], validation: "default" },
  61: { inputs: [".js-blank--23", ".js-blank--24"], answers: ["let", "+="], validation: "default" },
  62: { inputs: [".js-blank--25", ".js-blank--26"], answers: ["let", "*="], validation: "default" },
  71: { inputs: [".js-blank--27", ".js-blank--28"], answers: ["const", "+"], validation: "default" },
  72: { inputs: [".js-blank--29", ".js-blank--30"], answers: ["const", "+"], validation: "default" },
  91: { inputs: [".js-blank--31", ".js-blank--32", ".js-blank--33", ".js-blank--34", ".js-blank--35"], answers: ["`", "$", "{", "}", "`"], validation: "template_literal" },
  92: { inputs: [".js-blank--36", ".js-blank--37"], answers: ["greeting", "$"], validation: "default" },
};