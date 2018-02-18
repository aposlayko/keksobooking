'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var myNoticeForm = notice.querySelector('.notice__form');
  var formInputs = notice.querySelectorAll('fieldset');
  var addressField = notice.querySelector('#address');

  window.form = {
    activateForm: function () {
      myNoticeForm.classList.remove('notice__form--disabled');
    },
    makeFormFieldsDisabled: function (flag) {
      for (var i = 0; i < formInputs.length; i++) {
        if (flag) {
          formInputs[i].setAttribute('disabled', 'disabled');
        } else {
          formInputs[i].removeAttribute('disabled');
        }
      }
    },
    setAdress: function (x, y) {
      addressField.value = x + ', ' + y;
    }
  }
})();
