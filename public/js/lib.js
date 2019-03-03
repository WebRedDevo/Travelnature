"use strict";

(function () {
  var buttonClose = document.querySelector('.close');

  if (buttonClose) {
    buttonClose.addEventListener('click', function () {
      window.history.go(-1);
    });
  }
})();

var articlePost = document.getElementsByClassName('article-post');

for (var i = 0, max = articlePost.length; i < max; i += 1) {
  articlePost[i].onclick = function () {
    return false;
  };

  articlePost[i].addEventListener('click', function () {
    ajaxNews({
      mode: 'on',
      link: this.getElementsByTagName('a')[0].href
    });
  });
}
"use strict";

function ajaxNews(settings) {
  if (settings.mode === 'on') {
    var xhr = new XMLHttpRequest();
    var parser = new DOMParser();
    var dom;
    var loc = window.location.href;
    history.pushState(null, null, settings.link);
    xhr.open('GET', settings.link, true);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        dom = parser.parseFromString(xhr.responseText, 'text/html');
        dom = dom.querySelector('article');
        dom.classList.add('fixed');

        if (document.querySelector('.modalera')) {
          document.querySelector('.modalera').appendChild(dom);
        } else {
          var div = document.createElement('div');
          div.className = 'modalera';
          document.querySelector('main').after(div);
          document.querySelector('.modalera').appendChild(dom);
        }

        setTimeout(function () {
          document.body.className = 'mode-read';
          document.querySelector('.modalera').scrollTo(0, 0);
        }, 90);
        document.querySelector('.modalera').addEventListener('click', function (e) {
          var target = e.target;

          if (target.className === 'modalera') {
            history.pushState(null, null, loc);
            document.body.className = '';
            target.innerHTML = '';
          }
        });
      }
    };
  }
}
"use strict";

;

(function (window, document) {
  var file = 'images/svg/sprite.svg',
      revision = 1;
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;

  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
      request,
      data,
      insertIT = function insertIT() {
    document.body.insertAdjacentHTML('afterbegin', data);
  },
      insert = function insert() {
    if (document.body) insertIT();else document.addEventListener('DOMContentLoaded', insertIT);
  };

  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');

    if (data) {
      insert();
      return true;
    }
  }

  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();

        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    };

    request.send();
  } catch (e) {}
})(window, document);