'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPinElement = map.querySelector('.map__pin--main');

  var fetchPins = function () {
    window.backend.getPins('https://js.dump.academy/keksobooking/data', function (data) {
      window.map.renderPins(data);
    }, function (error) {
      console.log(error);
    });
  };

  var initApp = function () {
    window.map.activateMap();
    window.map.renderArticleModal();
    window.map.initMainPinHandlers();
    window.form.activateForm();
    window.form.makeFormFieldsDisabled(false);

    fetchPins();

    mainPinElement.removeEventListener('mouseup', initApp);
  };

  mainPinElement.addEventListener('mouseup', initApp);
})();
