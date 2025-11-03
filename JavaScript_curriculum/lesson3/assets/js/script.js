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
  31: { inputs: [".js-blank--7", ".js-blank--7-2"], answers: ["inputFocus", "focus"], validation: "default" },
  32: { inputs: [".js-blank--21", ".js-blank--21-2"], answers: ["addEventListener", "blur"], validation: "default" },
  41: { inputs: [".js-blank--8", ".js-blank--9"], answers: ["event.clientX", "event.clientY"], validation: "default" },
  42: { inputs: [".js-blank--22", ".js-blank--23"], answers: ["e", "target"], validation: "default" },
  51: { inputs: [".js-blank--11"], answers: ["stopPropagation"], validation: "single" },
  52: { inputs: [".js-blank--24"], answers: ["currentTarget"], validation: "single" },
  61: { inputs: [".js-blank--12", ".js-blank--13"], answers: ["submit", "preventDefault"], validation: "default" },
  62: { inputs: [".js-blank--25", ".js-blank--26"], answers: ["event", "event"], validation: "default" },
  71: { inputs: [".js-blank--14", ".js-blank--15", ".js-blank--16"], answers: ["removeEventListener", "click", "handleClick"], validation: "default" },
  72: { inputs: [".js-blank--27"], answers: ["once"], validation: "single" },
  81: { inputs: [".js-blank--17", ".js-blank--18"], answers: ["target", "tagName"], validation: "default" },
  82: { inputs: [".js-blank--28", ".js-blank--29"], answers: ["target", "closest"], validation: "default" },
};
