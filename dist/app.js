(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    var ComponentManager = function () {
      function ComponentManager(permissions, onReady) {
        _classCallCheck(this, ComponentManager);

        this.sentMessages = [];
        this.messageQueue = [];
        this.permissions = permissions;
        this.loggingEnabled = false;
        this.onReadyCallback = onReady;

        window.addEventListener("message", function (event) {
          if (this.loggingEnabled) {
            console.log("Components API Message received:", event.data);
          }
          this.handleMessage(event.data);
        }.bind(this), false);
      }

      _createClass(ComponentManager, [{
        key: "handleMessage",
        value: function handleMessage(payload) {
          if (payload.action === "component-registered") {
            this.sessionKey = payload.sessionKey;
            this.componentData = payload.componentData;
            this.onReady();

            if (this.loggingEnabled) {
              console.log("Component successfully registered with payload:", payload);
            }
          } else if (payload.action === "themes") {
            this.activateThemes(payload.data.themes);
          } else if (payload.original) {
            // get callback from queue
            var originalMessage = this.sentMessages.filter(function (message) {
              return message.messageId === payload.original.messageId;
            })[0];

            if (originalMessage.callback) {
              originalMessage.callback(payload.data);
            }
          }
        }
      }, {
        key: "onReady",
        value: function onReady() {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.messageQueue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var message = _step.value;

              this.postMessage(message.action, message.data, message.callback);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          this.messageQueue = [];

          if (this.onReadyCallback) {
            this.onReadyCallback();
          }
        }
      }, {
        key: "setComponentDataValueForKey",
        value: function setComponentDataValueForKey(key, value) {
          this.componentData[key] = value;
          this.postMessage("set-component-data", { componentData: this.componentData }, function (data) {});
        }
      }, {
        key: "clearComponentData",
        value: function clearComponentData() {
          this.componentData = {};
          this.postMessage("set-component-data", { componentData: this.componentData }, function (data) {});
        }
      }, {
        key: "componentDataValueForKey",
        value: function componentDataValueForKey(key) {
          return this.componentData[key];
        }
      }, {
        key: "postMessage",
        value: function postMessage(action, data, callback) {
          if (!this.sessionKey) {
            this.messageQueue.push({
              action: action,
              data: data,
              callback: callback
            });
            return;
          }

          var message = {
            action: action,
            data: data,
            messageId: this.generateUUID(),
            sessionKey: this.sessionKey,
            permissions: this.permissions,
            api: "component"
          };

          var sentMessage = JSON.parse(JSON.stringify(message));
          sentMessage.callback = callback;
          this.sentMessages.push(sentMessage);

          if (this.loggingEnabled) {
            console.log("Posting message:", message);
          }

          window.parent.postMessage(message, '*');
        }
      }, {
        key: "setSize",
        value: function setSize(type, width, height) {
          this.postMessage("set-size", { type: type, width: width, height: height }, function (data) {});
        }
      }, {
        key: "streamItems",
        value: function streamItems(callback) {
          this.postMessage("stream-items", { content_types: ["Tag"] }, function (data) {
            var tags = data.items;
            callback(tags);
          }.bind(this));
        }
      }, {
        key: "streamContextItem",
        value: function streamContextItem(callback) {
          this.postMessage("stream-context-item", null, function (data) {
            var item = data.item;
            callback(item);
          }.bind(this));
        }
      }, {
        key: "selectItem",
        value: function selectItem(item) {
          this.postMessage("select-item", { item: this.jsonObjectForItem(item) });
        }
      }, {
        key: "createItem",
        value: function createItem(item) {
          this.postMessage("create-item", { item: this.jsonObjectForItem(item) }, function (data) {
            var item = data.item;
            this.associateItem(item);
          }.bind(this));
        }
      }, {
        key: "associateItem",
        value: function associateItem(item) {
          this.postMessage("associate-item", { item: this.jsonObjectForItem(item) });
        }
      }, {
        key: "deassociateItem",
        value: function deassociateItem(item) {
          this.postMessage("deassociate-item", { item: this.jsonObjectForItem(item) });
        }
      }, {
        key: "clearSelection",
        value: function clearSelection() {
          this.postMessage("clear-selection", { content_type: "Tag" });
        }
      }, {
        key: "deleteItem",
        value: function deleteItem(item) {
          this.deleteItems([item]);
        }
      }, {
        key: "deleteItems",
        value: function deleteItems(items) {
          var params = {
            items: items.map(function (item) {
              return this.jsonObjectForItem(item);
            }.bind(this))
          };
          this.postMessage("delete-items", params);
        }
      }, {
        key: "saveItem",
        value: function saveItem(item) {
          this.saveItems([item]);
        }
      }, {
        key: "saveItems",
        value: function saveItems(items) {
          items = items.map(function (item) {
            return this.jsonObjectForItem(item);
          }.bind(this));

          this.postMessage("save-items", { items: items }, function (data) {});
        }
      }, {
        key: "jsonObjectForItem",
        value: function jsonObjectForItem(item) {
          var copy = Object.assign({}, item);
          copy.children = null;
          copy.parent = null;
          return copy;
        }

        /* Themes */

      }, {
        key: "activateThemes",
        value: function activateThemes(urls) {
          this.deactivateAllCustomThemes();

          if (this.loggingEnabled) {
            console.log("Activating themes:", urls);
          }

          if (!urls) {
            return;
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = urls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var url = _step2.value;

              if (!url) {
                continue;
              }

              var link = document.createElement("link");
              link.href = url;
              link.type = "text/css";
              link.rel = "stylesheet";
              link.media = "screen,print";
              link.className = "custom-theme";
              document.getElementsByTagName("head")[0].appendChild(link);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: "deactivateAllCustomThemes",
        value: function deactivateAllCustomThemes() {
          var elements = document.getElementsByClassName("custom-theme");

          [].forEach.call(elements, function (element) {
            if (element) {
              element.disabled = true;
              element.parentNode.removeChild(element);
            }
          });
        }

        /* Utilities */

      }, {
        key: "generateUUID",
        value: function generateUUID() {
          var crypto = window.crypto || window.msCrypto;
          if (crypto) {
            var buf = new Uint32Array(4);
            crypto.getRandomValues(buf);
            var idx = -1;
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              idx++;
              var r = buf[idx >> 3] >> idx % 8 * 4 & 15;
              var v = c == 'x' ? r : r & 0x3 | 0x8;
              return v.toString(16);
            });
          } else {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
              d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
              return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
            return uuid;
          }
        }
      }]);

      return ComponentManager;
    }();

    window.ComponentManager = ComponentManager;
  }, {}] }, {}, [1]);
;'use strict';

angular.module('app', []);
var HomeCtrl = function HomeCtrl($rootScope, $scope, $timeout) {
  _classCallCheck(this, HomeCtrl);

  var permissions = [{
    name: "stream-context-item"
  }];

  var componentManager = new window.ComponentManager(permissions, function () {
    // on ready
  });
  componentManager.loggingEnabled = false;

  $scope.formData = {};
  var defaultHeight = 56;

  $scope.analyzeNote = function () {
    var text = $scope.note.content.text;
    $scope.wordCount = countWords(text);
    $scope.paragraphCount = text.replace(/\n$/gm, '').split(/\n/).length;
    $scope.characterCount = text.length;

    var timeToRead = $scope.wordCount / 200;
    var timeInt = Math.round(timeToRead);
    if (timeInt == 0) {
      $scope.readTime = "< 1 minute";
    } else {
      var noun = timeInt == 1 ? "minute" : "minutes";
      $scope.readTime = timeInt + " " + noun;
    }

    $scope.note.created_at = new Date($scope.note.created_at).toLocaleString();
    $scope.note.updated_at = new Date($scope.note.updated_at).toLocaleString();
  };

  componentManager.streamContextItem(function (item) {
    $timeout(function () {
      $scope.note = item;
      $scope.analyzeNote();
    });
  });

  componentManager.setSize("container", "100%", defaultHeight);

  $scope.buttonPressed = function (action) {
    switch (action) {
      case "duplicate":
        var copy = JSON.parse(JSON.stringify($scope.note));
        copy.content.title += " (copy)";
        copy.created_at = new Date();
        copy.updated_at = new Date();
        copy.uuid = null;
        componentManager.createItem(copy);
        break;
      case "copy":
        $scope.copyNoteToClipboard();
        break;
      case "save":
        downloadText($scope.note.content.title, $scope.note.content.text);
        break;
      case "email":
        window.location.href = "mailto:?subject=" + $scope.note.content.title + "&body=" + encodeURIComponent($scope.note.content.text);
        break;

    }
  };

  $scope.copyNoteToClipboard = function () {
    var body = angular.element(document.body);
    var textarea = angular.element('<textarea/>');
    textarea.css({
      position: 'fixed',
      opacity: '0'
    });

    textarea.val($scope.note.content.text);
    body.append(textarea);
    textarea[0].select();

    try {
      var successful = document.execCommand('copy');
      if (!successful) throw successful;
      $scope.copied = true;
      $timeout(function () {
        $scope.copied = false;
      }, 1000);
    } catch (err) {
      console.error("Failed to copy", toCopy);
    }

    textarea.remove();
  };
};

function countWords(s) {
  s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
  s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
  return s.split(' ').length;
}

function downloadText(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

// required for firefox
HomeCtrl.$$ngIsClass = true;

angular.module('app').controller('HomeCtrl', HomeCtrl);


},{}]},{},[1]);
