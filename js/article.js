'use strict';

(function () {
  var articleElement;

  var showArticle = function (flag) {
    articleElement.style.display = flag ? 'block' : 'none';
  };

  var initCloseHandler = function () {
    var closeElement = articleElement.querySelector('.popup__close');

    closeElement.addEventListener('mouseup', function (event) {
      event.stopPropagation();
      showArticle(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        showArticle(false);
      }
    });
  };

  window.article = {
    initModal: function (artElement, map) {
      articleElement = artElement;
      showArticle(false);
      initCloseHandler();
      map.appendChild(articleElement);
    },
    insertData: function (articleData) {
      articleElement.querySelector('h3').textContent = articleData.offer.title;
      articleElement.querySelector('h3 + p').textContent = articleData.offer.address;
      articleElement.querySelector('.popup__price').textContent = articleData.offer.price + ' ' + '\u20BD/ночь';
      articleElement.querySelector('h4').textContent = articleData.offer.type.rus;
      articleElement.querySelector('h4 + p').textContent = articleData.offer.rooms + ' комнаты для ' + articleData.offer.guests + ' гостей';
      articleElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + articleData.offer.checkin + ', выезд до ' + articleData.offer.checkout;
      articleElement.querySelector('.popup__features + p').textContent = articleData.offer.description;

      var features = articleElement.querySelector('.popup__features');
      while (features.lastChild) {
        features.removeChild(features.lastChild);
      }

      for (i = 0; i < articleData.offer.features.length; i++) {
        var featuresElement = document.createElement('li');
        featuresElement.className = 'feature feature--' + articleData.offer.features[i];
        features.appendChild(featuresElement);
      }

      var photoList = articleElement.querySelector('.popup__pictures');
      photoList.innerHTML = '';
      for (var i = 0; i < articleData.offer.photos.length; i++) {
        var photoElement = document.createElement('img');
        var photoContainer = document.createElement('li');
        photoContainer.appendChild(photoElement);

        photoElement.style.width = '50px';
        photoElement.style.height = '50px';
        photoElement.src = articleData.offer.photos[i];

        photoList.appendChild(photoElement);
      }

      showArticle(true);
    },
    showArticle: showArticle
  };
})();
