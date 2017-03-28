$(document).ready(function() {

    Contr.play();

});

var Vw = {

    flags: 10,
    grid: [],



    generateGrid: function(dim) {

        for (var i = 1; i <= dim; i++) {

            $('.grid').append('<div id="s-' + i + '"><span></span></div>');
            Vw.grid.push(i);
        }


        $('.grid').css({
            top: '2px',
            right: '0.5px'
        });
        $('.grid').hover(function() {
            $(this).addClass('cursor')
        });


        $('#gameOver, #flagging').css('display', 'none');
        $('#replay').show();
    },

    mineCount: function() {

        $('#mines').text(Vw.flags);
        $('#mines').addClass('MineCounter');
    },


}

var Mod = {

    mines: { total: 10, fields: [
            []
        ] },
    square: { fields: [], adj: [] },
    adj: [-10, -9, -8, -1, 1, 8, 9, 10],


    generateMines: function() {

        for (var m = 1; m <= Mod.mines.total; m++) {
            var mine = Math.floor(Math.random() * 81 + 1);
            Mod.mines.fields.push([mine]);

                    }


    },

    adjacentSquares: function() {



        $.each(Mod.mines.fields, function(i, mineVal) {
            /* iterate through Mine array */
            var minesc = '#s-' + mineVal[0];
            $(minesc).addClass('isMine');
            $.each(Mod.adj, function(index, val) {
                /* iterate through array or object */


                if (mineVal[0] + val > 0 && mineVal[0] + val <= 81) {

                    var adjElements = mineVal[0] + val;


                    Mod.square.adj.push(adjElements);
                }


            });



        });

    },

    //counting mines
    countMines: function() {

        counts = {};

        jQuery.each(Mod.square.adj, function(key, value) {
            if (!counts.hasOwnProperty(value)) {
                counts[value] = 1;
            } else {
                counts[value]++;
            }
        });


        $.each(counts, function(indx, value) {
            /* iterate through array or object */

            if (!($('#s-' + indx).hasClass('isMine'))) {

                if (value == 1) { countAdj = 1; } else if (value == 2) { countAdj = 2; } else if (value == 3) { countAdj = 3; }


                Mod.square.fields.push([indx, countAdj]);
            }
        });

        //for(var j=0;j<Model.square.fields.length;j++){console.log(Model.square.fields[j]);}
        //for(var j=0;j<Model.mines.fields.length;j++){console.log(Model.mines.fields[j]);}


    },
    win: function() {

        var divs = $(".grid").find("div.revealed").length;
        console.log(divs);
        if (divs == 71) {
            var $dialog = $('<div id="message" title="Message"><p>You won!</p></div>');
            $('.minesweeper').append($dialog);


            $("#message").dialog({

                position: { my: 'top-150', at: 'center+10' },
                show: 'blind',
                hide: 'blind',
                width: 600,


            });
            Contr.resetBoard();

        }

    }

};

var Contr = {

    play: function() {

        Vw.generateGrid(81);
        Mod.generateMines();
        Mod.adjacentSquares();
        Mod.countMines();
        Contr.revealFlag();
        Contr.revealingAdj();
        Vw.mineCount();


        $('.grid').find('div').click(function() {
            var div = this.id;
            var numDiv = +div.replace(/[^\d.]/g, '');
            Contr.revealSquare(numDiv);
            $(this).addClass('revealed');
            Mod.win();

        });

        $('#replay, #gameOver').click(function(event) {
            Contr.resetBoard();

        });

        $('.minesweeper').click(function(event) {
            gameTime();
            $(this).off();
        });

    },

    revealingAdj: function() {

        $.each(Mod.square.fields, function(index, val) {
            var adjDIV = '#s-' + val[0];
            $(adjDIV).find('span').text(val[1]);
            $(adjDIV).addClass('adj');

            if ($(adjDIV).text() == 2) { $(adjDIV).addClass('red'); } else if ($(adjDIV).text() == 3) { $(adjDIV).addClass('green') }
            if ($(adjDIV).hasClass('adj')) { $(adjDIV).find('span').hide(); }

        });
    },
    revealSquare: function(square) {

        //creating the reveal logic. will loop through View.allDivs
        //console.log('clicked square is:'+square);
        var div = '#s-' + square;
        var $div = $(div).find('span');



        if (!($(div).hasClass('isMine'))) {

            if ($div.text() == '') {

                Contr.revealEmptyCells(square);
            } else if ($div.text() == 1 || $div.text() == 2 || $div.text() == 3) {
                $div.show();
                $div.css({
                    border: '4px solid #d4d4d3',


                });

            }
        } else {
            $('#replay').hide();
            $('#gameOver').show();
            $('.grid > div').each(function() {
                if ($(this).hasClass('isMine')) {
                    $(this).addClass('mine');
                }
            });
            $('.grid >div').off();
            clearInterval(interval);
        }





    },

    revealEmptyCells: function(clickDiv) {

        $.each(Mod.adj, function(index, val) {

            if (val + clickDiv > 0 && val + clickDiv <= 81) {

                var adjElements = val + clickDiv;
                $('#s-' + adjElements).add('#s-' + clickDiv).css({
                    border: '4px solid #d4d4d3',
                });
                $('#s-' + adjElements).find('span').show();
                $('#s-' + adjElements).addClass('revealed');
            }

        });
    },


    revealFlag: function() {
        $('.grid').find('div').mousedown(function(event) {
            if (event.which == 3) {
                $('#flagging').show().delay(5).fadeOut();
                if (Vw.flags > 0) {
                    if (!($(this).hasClass('flag'))) {
                        Vw.flags--;
                        Vw.mineCount();
                        $(this).addClass('flag');
                    } else { $(this).removeClass('flag');
                        Vw.flags++;
                        Vw.mineCount(); }
                } else { event.preventDefault(); }
            }

        });


    },

    resetBoard: function() {

        clearInterval(interval);
        location.reload();
    }

}

var interval;

function gameTime() {
    var sec = 0;
    interval = setInterval(function() {
        document.getElementById("timer").innerHTML = ++sec;

    }, 1000)
};
