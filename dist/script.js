/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var msg = "Ts file compiled!";
alert(msg);
var styles = {
  style1: "style.css",
  style2: "style2.css",
  style3: "style3.css"
};
var updateStyle = function updateStyle(styleName) {
  var style = styles[styleName];
  var linkElement = document.getElementById("stylesheet");
  linkElement.href = style;
};
var generateStyleLinks = function generateStyleLinks() {
  var container = document.getElementById("style-links");
  Object.keys(styles).forEach(function (styleName) {
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = "Switch to ".concat(styleName);
    link.style.marginRight = "10px";
    link.style.backgroundColor = "white";
    link.addEventListener("click", function (event) {
      updateStyle(styleName);
    });
    container === null || container === void 0 ? void 0 : container.appendChild(link);
  });
};
generateStyleLinks();
/******/ })()
;