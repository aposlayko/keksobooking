'use strict';

(function () {
  window.backend = {
    getPins: function (url, onLoad, onError) {
      window.utils.ajax('get', url, null, onLoad, onError);
    },
    savePin: function (url, data, onLoad, onError) {
      window.utils.ajax('post', url, data, onLoad, onError);
    }
  };
})();
