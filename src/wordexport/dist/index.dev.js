"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import saveAs from 'file-saver'
// import html2canvas from 'html2canvas';
// import wordexport from './wordExport';
var saveAs = require("file-saver");

var html2canvas = require("html2canvas");

var wordexport = require("./wordExport");

var WordExports =
/*#__PURE__*/
function () {
  function WordExports(wordDom) {
    var _config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, WordExports);

    var defaultConfig = {
      addStyle: true,
      fileName: new Date().toLocaleString(),
      hearderAlign: "center",
      footerAlign: "center",
      headerName: "my name is header",
      maxWidth: 624,
      toImg: "",
      landscape: true,
      suffix: "doc",
      success: function success() {}
    };
    this.config = {};
    this.dom = wordDom;
    this.c_dom = wordDom.cloneNode(true);
    this.config = _objectSpread({}, defaultConfig, {}, _config);
  }

  _createClass(WordExports, [{
    key: "init",
    value: function init() {
      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 将所有样式转换为行内样式
              this.config.addStyle && this.sheetToSelf(this.c_dom); // 将所有图片转化为base64

              _context.next = 3;
              return regeneratorRuntime.awrap(this.sheetToImg());

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(this.domToCanvas());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sheetToImg",
    value: function sheetToImg() {
      var img_doms, c_img_doms, i;
      return regeneratorRuntime.async(function sheetToImg$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              img_doms = this.dom.querySelectorAll("img");
              c_img_doms = this.c_dom.querySelectorAll("img");
              i = 0;

            case 3:
              if (!(i < img_doms.length)) {
                _context2.next = 11;
                break;
              }

              _context2.next = 6;
              return regeneratorRuntime.awrap(this.toBase64(img_doms[i]));

            case 6:
              c_img_doms[i].src = _context2.sent;
              this.imgStyleReset(c_img_doms[i], img_doms[i]);

            case 8:
              i++;
              _context2.next = 3;
              break;

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "domToCanvas",
    value: function domToCanvas() {
      var str, canvas_doms, canvas_dom_clone, i, src, img;
      return regeneratorRuntime.async(function domToCanvas$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              str = this.config.toImg;

              if (str.length) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return");

            case 3:
              canvas_doms = this.dom.querySelectorAll(str);
              canvas_dom_clone = this.c_dom.querySelectorAll(str);
              i = 0;

            case 6:
              if (!(i < canvas_doms.length)) {
                _context3.next = 18;
                break;
              }

              _context3.next = 9;
              return regeneratorRuntime.awrap(this.toBase64(canvas_doms[i]));

            case 9:
              src = _context3.sent;
              img = new Image();
              img.src = src;
              this.imgStyleReset(img, canvas_doms[i]);
              canvas_dom_clone[i].innerHTML = "";
              canvas_dom_clone[i].appendChild(img);

            case 15:
              i++;
              _context3.next = 6;
              break;

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "exportWord",
    value: function exportWord() {
      saveAs(wordexport(this.c_dom, this.config), this.config.fileName + ".doc");
      this.config.success();
    }
  }, {
    key: "sheetToSelf",
    value: function sheetToSelf(dom) {
      var sheets = document.styleSheets;
      var $dom = dom;

      function cssTextToJSON(cssText) {
        var arr = cssText.split(";");
        arr.splice(arr.length - 1, 1);
        var obj = {};
        arr.forEach(function (item) {
          var attrName = item.split(":")[0];
          obj[attrName.replace(/ /g, "")] = item.split(":").map(function (i, index) {
            return index ? i : "";
          }).join("");
        });
        return obj;
      }

      for (var i = 0, l = sheets.length; i < l; i++) {
        try {
          sheets[i].rules || sheets[i].cssRules;
        } catch (e) {
          console.warn("Can't read the css rules of: " + sheets[i].href, e);
          continue;
        }

        var _sheets$i = sheets[i],
            rules = _sheets$i.rules,
            cssRules = _sheets$i.cssRules;
        var rulesArry = Array.from(rules || cssRules || []);
        rulesArry.forEach(function (rule) {
          var selectorText = rule.selectorText,
              style = rule.style;

          if (selectorText !== "*") {
            try {
              var select = $dom.querySelectorAll(selectorText);
              select.forEach(function (dom) {
                if (dom.style.cssText) {
                  var oldCssText = cssTextToJSON(dom.style.cssText);
                  var newCssText = cssTextToJSON(style.cssText);

                  for (var _i in newCssText) {
                    oldCssText[_i] = newCssText[_i];
                  }

                  for (var _i2 in oldCssText) {
                    dom.style[_i2] = oldCssText[_i2];
                  }
                } else {
                  dom.style.cssText = style.cssText;
                }
              });
            } catch (e) {
              console.log("转换成行内样式失败", e);
            }
          }
        });
      }
    }
  }, {
    key: "imgStyleReset",
    value: function imgStyleReset(dom, coverDom) {
      var maxWidth = this.config.maxWidth;
      var width = Math.min(coverDom.clientWidth, maxWidth);
      var height = coverDom.clientHeight * width / coverDom.clientWidth;
      dom.width = width;
      dom.height = height;
      return dom;
    }
  }, {
    key: "toBase64",
    value: function toBase64(element) {
      return new Promise(function (resolve) {
        html2canvas(element).then(function (canvas) {
          var data = canvas.toDataURL("image/jpeg", 1.0);
          resolve(data);
        });
      });
    }
  }]);

  return WordExports;
}(); // export default WordExports;


module.exports = WordExports;