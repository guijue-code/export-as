// import WordExports from "./wordexport/index.js";
const WordExports = require('./wordexport/index.js')
// 获取html
const getHTML = (iframeElem) => {
  if (!iframeElem) {
    return document.documentElement.innerHTML;
  }
  return new Promise((resolve, reject) => {
    // 判断是否是iframe标签
    if (iframeElem.nodeName === "IFRAME") {
      iframeElem.onload = function () {

        const iframeDoc =
          iframeElem.contentDocument || iframeElem.contentWindow.document;
        resolve(iframeDoc);
      };
    } else {
      reject(new Error("please provide an iframe tag"));
    }
  });
};
// 导出word
const exportWord = async (domElem, config) => {
  const wordExports = new WordExports(domElem, config);
  await wordExports.init();
  wordExports.exportWord();
};
// 导出pdf
const exportPdf = () => {};
// 导出excel
const exportExcel = () => {};

const exportAs = {
  word: exportWord,
  pdf: exportPdf,
  excel: exportExcel,
  getHTML,
};
// export default exportAs
module.exports = exportAs;
