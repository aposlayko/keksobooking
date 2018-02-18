'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapPinTemplate = template.querySelector('.map__pin');
  var mapArticleTemplate = template.querySelector('.map__card');
  var mapPinConteiner = document.querySelector('.map__pins');
  var mainPinElement = map.querySelector('.map__pin--main');
  var pinElements = [];

  var createPinElement = function (pinData) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = pinData.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pinData.location.y - PIN_HEIGHT + 'px';
    pinElement.children[0].src = pinData.author.avatar;

    return pinElement;
  };

  var initPinClickHandler = function (pinElement, pinData) {
    pinElement.addEventListener('mouseup', function () {
      window.article.insertData(pinData);
    });
  };

  var initMainPinHandlers = function () {
    mainPinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var relEventCoordinates = window.utils.getRelCoordinates({x: evt.clientX, y: evt.clientY});
      var relMainPinCoordinates = window.utils.getMainPinRelCordinates();

      var shift = {
        x: relEventCoordinates.x - relMainPinCoordinates.x,
        y: relEventCoordinates.y - relMainPinCoordinates.y
      };
      console.log(shift);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var relEventCoordinates = window.utils.getRelCoordinates({x: moveEvt.clientX, y: moveEvt.clientY});
        var converted = window.utils.convertToPointerCoordinates(relEventCoordinates.x - shift.x, relEventCoordinates.y - shift.y);
        console.log(converted);
        mainPinElement.style.left = (converted.x) + 'px';
        mainPinElement.style.top = (converted.y) + 'px';

        // describeBorderBehavior();
        window.form.setAdress(relEventCoordinates.x, relEventCoordinates.y);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.map = {
    renderArticleModal: function () {
      window.article.initModal(mapArticleTemplate.cloneNode(true), map);
    },
    activateMap: function () {
      map.classList.remove('map--faded');
    },
    renderPins: function (pinsData) {
      var fragmentPin = document.createDocumentFragment();

      pinElements = pinsData.map(createPinElement);

      for (var i = 0; i < pinElements.length; i++) {
        initPinClickHandler(pinElements[i], pinsData[i]);
        fragmentPin.appendChild(pinElements[i]);
      }
      mapPinConteiner.appendChild(fragmentPin);
    },
    initMainPinHandlers: initMainPinHandlers
  };
})();
