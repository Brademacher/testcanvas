window.onload = function() {
  document.addEventListener('touchmove', function(e){ e.preventDefault(); });

  var canvas = document.getElementById('main');
  var canvastop = canvas.offsetTop;

  var context = canvas.getContext('2d');

  var lastx;
  var lasty;

  context.strokeStyle = '#000000';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  function clear() {
      context.fillStyle = '#ffffff';
      context.rect(0, 0, 300, 300);
      context.fill();
  }

  function dot(x, y) {
      context.beginPath();
      context.fillStyle = '#000000';
      context.arc(x, y, 1, 0, Math.PI * 2, true);
      context.fill();
      context.stroke();
      context.closePath();
  }

  function line(fromx, fromy, tox, toy) {
      context.beginPath();
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.stroke();
      context.closePath();
  }

  var drawing = false;
  var canvasClicked = function(event) {
      event.preventDefault();
      drawing = true;
      lastx = event.clientX || event.touches[0].clientX;
      lasty = (event.clientY || event.touches[0].clientY) - canvastop;

      dot(lastx, lasty);
  };

  var stopDrawing = function(event) {
    drawing = false;
  }

  canvas.addEventListener('touchstart', canvasClicked);
  canvas.addEventListener('mousedown', canvasClicked);

  var drawCanvas = function(event) {
      event.preventDefault();

      if (drawing) {
          var newx = event.clientX || event.touches[0].clientX;
          var newy = (event.clientY || event.touches[0].clientY) - canvastop;

          line(lastx, lasty, newx, newy);

          lastx = newx;
          lasty = newy;
      }
  };

  canvas.addEventListener('touchmove', drawCanvas);
  canvas.addEventListener('mousemove', drawCanvas);

  canvas.addEventListener('touchend', stopDrawing);
  canvas.addEventListener('mouseup', stopDrawing);

  var clearButton = document.getElementById('clear');
  clearButton.onclick = clear;

  clear();
};