"use strict";

// import WordExports from "./wordexport/index.js";
var WordExports = require('./wordexport/index.js'); // 获取html


var getHTML = function getHTML(iframeElem) {
  if (!iframeElem) {
    return document.documentElement.innerHTML;
  }

  return new Promise(function (resolve, reject) {
    // 判断是否是iframe标签
    if (iframeElem.nodeName === "IFRAME") {
      iframeElem.onload = function () {
        var iframeDoc = iframeElem.contentDocument || iframeElem.contentWindow.document;
        resolve(iframeDoc);
      };
    } else {
      reject(new Error("please provide an iframe tag"));
    }
  });
}; // 导出word


var exportWord = function exportWord(domElem, config) {
  var wordExports;
  return regeneratorRuntime.async(function exportWord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wordExports = new WordExports(domElem, config);
          _context.next = 3;
          return regeneratorRuntime.awrap(wordExports.init());

        case 3:
          wordExports.exportWord();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // 导出pdf


var exportPdf = function exportPdf() {
  window.print();
}; // 导出excel


var exportExcel = function exportExcel() {};

var exportAs = {
  word: exportWord,
  pdf: exportPdf,
  excel: exportExcel,
  getHTML: getHTML
}; // export default exportAs

module.exports = exportAs;