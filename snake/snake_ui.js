(function(root) {
  var SnakeGame = root.SnakeGame = ( root.SnakeGame || {} );

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
  }

  View.prototype.start = function(){
    this.board = new SnakeGame.Board();
    this.handleKeyEvent();
    // this.step.bind(this)();
    this.TIMER = setInterval(this.step.bind(this), 250);
  }

  View.prototype.step = function(){
    this.board.snake.move();
    this.board.eatApple();
    if (this.board.hitWall()){
      alert("You are dead.");
      clearInterval(this.TIMER);
    } else {
     this.render();
    }
  }

  View.prototype.render = function(){
    $('.cell').remove();
    this.board.changeGrid().forEach( function(row) {
      row.forEach(function(char){
        var cell = $('<div class="cell"></div>');
        if (char === "S") {
          cell.addClass("snake");
        } else if (char === "A") {
          cell.addClass("apple");
        }
        $('.board').append(cell);
      })
    });
  }

  View.prototype.handleKeyEvent = function(event) {
    var snake = this.board.snake
    key('up', function(){
      snake.turn('N');
    });
    key('down', function(){
      snake.turn('S');
    });
    key('left', function(){
      snake.turn('W');
    });
    key('right', function(){
      snake.turn('E');
    });
  }

})(this);

$(function(){
  v = new SnakeGame.View($('.board'))
  v.start();
})