'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPinElement = map.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;

  var getRelCoordinates = function (point) {
    var mapOffsets = getElementAbsCoords(map);
    return {
      x: point.x + window.pageXOffset - mapOffsets.left,
      y: point.y + window.pageYOffset - mapOffsets.top
    };
  };

  var getElementAbsCoords = function (element) {
    var box = element.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  };

  var getMainPinRelCordinates = function () {
    var box = mainPinElement.getBoundingClientRect();
    var mapOffsets = getElementAbsCoords(map);

    return {
      x: box.left + window.pageXOffset + (MAIN_PIN_WIDTH / 2) - mapOffsets.left,
      y: box.top + window.pageYOffset + (MAIN_PIN_HEIGHT / 2) - mapOffsets.top
    };
  };

  window.utils = {
    getRelCoordinates: getRelCoordinates,
    getElementAbsCoords: getElementAbsCoords,
    getMainPinRelCordinates: getMainPinRelCordinates,
    convertToPointerCoordinates: function (x, y) {
      return {
        x: x,
        y: y + (MAIN_PIN_HEIGHT / 2) + MAIN_PIN_POINTER
      };
    },
    ajax: function (requestType, url, paramObj, callbackSucess, callbackError) {
      var ActiveXObject = ActiveXObject ? ActiveXObject : 'undefined';

      function getXmlHttp() {
        var xmlhttp;
        try {
          xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
          try {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
          } catch (E) {
            xmlhttp = false;
          }
        }
        if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
          xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
      }

      var xmlhttp = getXmlHttp();
      var params = '';

      requestType = requestType.toUpperCase();
      for (var key in paramObj) {
        if (paramObj[key]) {
          var val = paramObj[key];
          params += key + '=' + encodeURIComponent(val) + '&';
        }
      }
      params = params.slice(0, -1);

      if (requestType === 'POST') {
        xmlhttp.open('POST', url, true);
      } else if (requestType === 'GET') {
        xmlhttp.open('GET', url + '?' + params, true);
      } else {
        return;
      }

      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            callbackSucess(JSON.parse(xmlhttp.responseText));
          } else {
            callbackError(xmlhttp.responseText);
          }
        }
      };

      if (requestType === 'POST') {
        xmlhttp.send(params);
      } else {
        xmlhttp.send(null);
      }
    }
  };
})();
