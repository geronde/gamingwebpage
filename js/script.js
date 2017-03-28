

$('#prj1,#prj2,#prj3,#prj4,#prj5,#abt,#cntact').click(function() {

    $(".container h1").css('visibility', 'hidden');
})

$('.games-list a').hover(function(event) {
        /* Act on the event */
        $(this).find('.pointer').css({
            visibility: 'visible',
            opacity:1
        });

    },
    function() {
        $(this).find('.pointer').css({
            visibility: 'hidden'
        });
    }
);

$(".nav li").hover(function() {
    $(this).find('.menupointer').css({
        visibility: 'visible'
    });
}, function() {
    $(this).find('.menupointer').css({
        visibility: 'hidden'
    });
});
//animate the games list figures
TweenMax.staggerTo(".games-list figure img", 1, {
    scale: 1.1,
    marginBottom: 8,
    delay:4,
    ease: Circ.easeOut
}, 0.5);
//animating the social media icons with TweenMax
function AnimateSocialIcons() {
    TweenMax.from(".bubble", 1, {
        autoAlpha: 0,
        ease: Back.easeOut
    })
    TweenMax.from(".social a", 1, {
        opacity: 0,
        scale: 0,
        ease: Back.easeOut,
        delay: 1

    }, 0.25);
    TweenMax.staggerFrom(".pin", 1, {
        opacity: 0,
        right: 10,
        top: 10,
        delay: 1,
        ease: Power2.easeInOut
    }, .25);
    TweenMax.to(".social a", 1, {
        rotation: 15,
        transformOrigin: "left top",
        delay: 1.8,
    }, 0.25)
}
// animating the page on click 
function backToMain() {
    TweenMax.to(".container", 1, {
        ease: Back.easeIn
    })
}
//-----------------------------------------------------------//
//Sketch//
//-----------------------------------------------------------//
$(document).ready(function() {
    GenerateGrid(10);
    PaintGrid();
});

function randomColor() {
    var $randColor = ['gray', 'lightblue', 'red', 'purple', 'cyan'];
    var rand = $randColor[Math.floor(Math.random() * $randColor.length)];
    $("div[class^='s-block'], div[class^='s-block']").hover(function() {
        $(this).css('background-color', rand);
    })
}

//Generate a grid. 

function GenerateGrid(dimension) {

    for (var i = 1; i <= dimension * dimension; i++) {
        $('.sketchgrid').append('<div class="s-block-' + i + '"></div>')
    }
}


//paint function
function PaintGrid() {
    $("div[class^='s-block'], div[class*='s-block']").hover(function() {
        $(this).css("background-color", "#7EC0EE")
    });
}

//reset grid
function ResetGrid() {
    $("div[class^='s-block'], div[class*='s-block']").css("background-color", "white");
}



