var scroll = window.requestAnimationFrame || function (callback) {
  window.setTimeout(callback, 50 / 3);
};

var element = document.querySelectorAll('.container')[0];

(function loop() {
  var top = element.getBoundingClientRect().top;
  var width = element.clientWidth;
  var height = element.clientHeight;
  var visual = height + top;
  var font = (50 + visual / 30) * (width / 1300);
  element.style.fontSize = font + 'px';
  element.style.letterSpacing = font / 3 * 2 + 'px';
  element.style.paddingTop = (-top) + 'px';
  scroll(loop);
})();
