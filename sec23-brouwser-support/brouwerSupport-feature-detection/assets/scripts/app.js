/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var button = document.querySelector(\"button\");\nvar textParagraph = document.querySelector(\"p\");\nbutton.addEventListener(\"click\", function () {\n  var text = textParagraph.textContent;\n\n  if (navigator.clipboard) {\n    navigator.clipboard.writeText(text).then(function (result) {\n      console.log(result);\n    }).catch(function (error) {\n      console.log(error);\n    });\n  } else {\n    alert(\"Feature not available, please copy manually!\");\n  }\n}); // 만드는 페이지에 원하는 기능을 브라우져가 지원하는지 않아는지에 따라서 동작을 조절하려면\n// feature Detection을 사용한다.\n// 위 처럼 예를 들어서 클립보드 기능을 지원하지 않는 브라우져에 대해서는\n// if 체크를 해서 알람이 뜨도록 조절하여 코드를 짠다.\n// Polyfill\n// 이용을 원하는 브라우져가 지원하지 않는 기능을 사용할 수 있도록 만들어주는 도구\n// https://github.com/github/fetch 에서 fetch api를 예시로 살펴볼 수 있다.\n// https://caniuse.com/ 에서 원하는 기능을 검색후 resources 에 가면 polyfill을 확인할 수 있다.//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcz8xMTEyIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XG5jb25zdCB0ZXh0UGFyYWdyYXBoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInBcIik7XG5cbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCB0ZXh0ID0gdGV4dFBhcmFncmFwaC50ZXh0Q29udGVudDtcbiAgaWYgKG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkXG4gICAgICAud3JpdGVUZXh0KHRleHQpXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkZlYXR1cmUgbm90IGF2YWlsYWJsZSwgcGxlYXNlIGNvcHkgbWFudWFsbHkhXCIpO1xuICB9XG59KTtcblxuLy8g66eM65Oc64qUIO2OmOydtOyngOyXkCDsm5DtlZjripQg6riw64ql7J2EIOu4jOudvOyasOyguOqwgCDsp4Dsm5DtlZjripTsp4Ag7JWK7JWE64qU7KeA7JeQIOuUsOudvOyEnCDrj5nsnpHsnYQg7KGw7KCI7ZWY66Ck66m0XG4vLyBmZWF0dXJlIERldGVjdGlvbuydhCDsgqzsmqntlZzri6QuXG4vLyDsnIQg7LKY65+8IOyYiOulvCDrk6TslrTshJwg7YG066a967O065OcIOq4sOuKpeydhCDsp4Dsm5DtlZjsp4Ag7JWK64qUIOu4jOudvOyasOyguOyXkCDrjIDtlbTshJzripRcbi8vIGlmIOyytO2BrOulvCDtlbTshJwg7JWM656M7J20IOucqOuPhOuhnSDsobDsoIjtlZjsl6wg7L2U65Oc66W8IOynoOuLpC5cblxuLy8gUG9seWZpbGxcbi8vIOydtOyaqeydhCDsm5DtlZjripQg67iM65287Jqw7KC46rCAIOyngOybkO2VmOyngCDslYrripQg6riw64ql7J2EIOyCrOyaqe2VoCDsiJgg7J6I64+E66GdIOunjOuTpOyWtOyjvOuKlCDrj4Tqtaxcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gg7JeQ7IScIGZldGNoIGFwaeulvCDsmIjsi5zroZwg7IK07Y6067O8IOyImCDsnojri6QuXG4vLyBodHRwczovL2Nhbml1c2UuY29tLyDsl5DshJwg7JuQ7ZWY64qUIOq4sOuKpeydhCDqsoDsg4ntm4QgcmVzb3VyY2VzIOyXkCDqsIDrqbQgcG9seWZpbGzsnYQg7ZmV7J247ZWgIOyImCDsnojri6QuXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app.js\n");

/***/ })

/******/ });