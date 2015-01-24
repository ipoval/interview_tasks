"use strict";

var canvas = document.getElementById('canvas');
canvas.initialize = function() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
}

var context = canvas.getContext('2d');
context.initialize = function() {
  this.fillStyle = 'green';
  this.fillRect(0, 0, canvas.width, canvas.height);
}

var ball = {}, rackets = [2], which_racket = false;

jQuery(function($) {
  canvas.initialize();

  function Racket(the_position) {
    this.h = 15;
    this.w = 1000;
    this.position = the_position;
    this.x = canvas.width / 2 - this.w / 2;
    this.y = (this.position == 'u') ? 0 : canvas.height - this.h;
    this.color = (this.position == 'u') ? 'red' : 'blue'
  }
  rackets.push(new Racket('u'));
  rackets.push(new Racket('d'));

  ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 15,
    color: 'white',
    dx: 5,
    dy: 9,

    draw: function() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      context.fill();
    }
  };

  function refresh_animation() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    racket1 = rackets[1];
    racket2 = rackets[2];

    if (ball_hits_racket(racket1)) {
      after_ball_hits(racket1);
    }
    else if (ball_hits_racket(racket2)) {
      after_ball_hits(racket2);
    }
    else {
      // horizontal
      if (ball.y + ball.r > canvas.height) {
        ball.y = canvas.height - ball.r;
      }
      else if (ball.y < 0) {
        ball.y = ball.r;
      }

      // vertical
      if (ball.x + ball.r > canvas.width) {
        ball.dx = -ball.dx;
        ball.x = canvas.width - ball.r;
      }
      else if (ball.x -ball.r < 0) {
        ball.dx = -ball.dx;
        ball.x = ball.r;
      }
    }

  }

  function ball_hits_racket(racket) {
    if (ball.x + ball.r >= racket.x && ball.x - ball.r <= racket.x + racket.w) {
      if (ball.y >= (racket.y - racket.h) && racket.y > 0) {
        which_racket = 1;
        return true;
      }
      else if (ball.y <= racket.h && racket.y == 0) {
        which_racket = 2;
        return true;
      }
      else return false;
    }
  }

  function after_ball_hits(racket) {
    ball.dy = -ball.dy;

    if (which_racket == 1) {
      ball.y = racket.y - racket.h;
    }
    else if (which_racket == 2) {
      ball.y = racket.h + ball.r;
    }
  }

  function draw_animation() {
    context.initialize();

    rackets.forEach(function(racket) {
      context.fillStyle = racket.color;
      context.fillRect(racket.x, racket.y, racket.w, racket.h);
    });

    ball.draw();
    refresh_animation();
  }

  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, canvas);
    draw_animation();
  }());

});
