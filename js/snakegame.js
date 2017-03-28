jQuery(document).ready(function($) {
    init();
});

var move;
function init() {
    board.initBoard();
    createSnake();
    food.createFood();
}

function play() {
    $('.new_game').hide();
    $('.play_game').hide();
    moveSnake();
    getSnakeDir();
}

function gameover() {
    clearTimeout(move);
    $('.new_game').show();
}

function playGame() {
    $('#gameboard').empty();
    $('.new_game').hide();
    init();
    play();
}

var board = {
    DIM: 30,
    initBoard: function() {
        for (var i = 0; i < board.DIM; i++) {
            var row = $('<div class="snake_row-' + i + '"></div>');
            
            for (var j = 0; j < board.DIM; j++) {
                var col = ('<div class="snake_col-' + j + '-' + i + '"></div>');
                $(row).append(col);
            }
            $("#gameboard").append(row);
        }
    }
}

var snake = {
    position: ['10-10', '10-11', '10-12'],
    direction: 'r',
    speed: 200,
};

function createSnake() {
    $('.snake_col-10-10').addClass('snake');
    $('.snake_col-11-10').addClass('snake');
    snake.position = ['10-10', '10-11', '10-12'];
}

function getSnakeDir() {
    $(document).keydown(function(event) {
        //event.preventDefault();
        if (event.which == 38) {
            snake.direction = 'u';
        } else if (event.which == 39) {
            snake.direction = 'r';
        } else if (event.which == 40) {
            snake.direction = 'd';
        } else if (event.which == 37) {
            snake.direction = 'l';
        }
    });
}

function moveSnake() {
    var tail = snake.position.pop();
    $('.snake_col-' + tail).removeClass('snake');

    var coords = snake.position[0].split('-');
    var x = parseInt(coords[0]);
    var y = parseInt(coords[1]);

    if (snake.direction == 'r') {
        x = x + 1;
    } else if (snake.direction == 'd') {
        y = y + 1;
    } else if (snake.direction == 'l') {
        x = x - 1;
    } else if (snake.direction == 'u') {
        y = y - 1;
    }
    
    var currentcoords = x + '-' + y;
    snake.position.unshift(currentcoords);

    $('.snake_col-' + currentcoords).addClass('snake');

    //when snake eats food
    if (currentcoords == food.coords) {
        console.log('true');
        $('.snake_col-' + food.coords).removeClass('food');
        snake.position.push(tail);
        food.createFood();
    }

    //game over
    if (x < 0 || y < 0 || x > board.DIM || y > board.DIM) {
        gameover();
        return;
    
    }

    //if snake touch itself
    if (hitItself(snake.position) == true) {
        gameover();
        return;
    }
    
    move=setTimeout(moveSnake, 200);
}

var food = {
    coords: "",

    createFood: function() {
        var x = Math.floor(Math.random() * (board.DIM-1)) + 1;
        var y = Math.floor(Math.random() * (board.DIM-1)) + 1;
        var fruitCoords = x + '-' + y;
        $('.snake_col-' + fruitCoords).addClass('food');
        food.coords = fruitCoords;
    },
}

function hitItself(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}