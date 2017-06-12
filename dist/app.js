(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('app', []);class HomeCtrl {
  constructor($rootScope, $scope, $timeout) {

    var permissions = [{
      name: "stream-context-item"
    }];

    let componentManager = new window.ComponentManager(permissions, function () {
      // on ready
    });

    $scope.formData = {};
    let defaultHeight = 56;

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
        $scope.readTime = `${timeInt} ${noun}`;
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
          window.location.href = `mailto:?subject=${$scope.note.content.title}&body=${encodeURIComponent($scope.note.content.text)}`;
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
        console.log("failed to copy", toCopy);
      }

      textarea.remove();
    };
  }
}

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
