//enhancing the first version of the code

$(function() {

//configuration
var slides=$(".slides .slide");
var dots=$(".indicators .circle");
var interval;
var slide_index=slideIndex();

//get current slide index;
function slideIndex() {
var slide_index=$("#carousel .slides .active").index();
return slide_index;
}

//slide image initiation
function slide_image(n){

sliding(slide_index+=n)
}


//adding key events
$(document).keydown(function(e){
		if(e.keyCode=="39") {slide_image(+1);nav_dots()}
		else if(e.keyCode=="37") {slide_image(-1);nav_dots()} 
	});

$("#next").click(function(){slide_image(+1);nav_dots()});
$("#prev").click(function(){slide_image(-1);nav_dots()});
$("#carousel").on("mouseenter", stop_slide).on("mouseleave",animate_slide);

dots.click(function () {  
	                      var indeX=$(this).index();
                          var currentSlide=slides.eq(indeX);
                          currentSlide.addClass('active');
                          $(this).addClass('blip');   

                          slides.not(currentSlide).removeClass('active');

                          $(".circle").not(this).removeClass('blip');

});

//animate and stop animation

function animate_slide() {
interval=setInterval(function(){slide_image(+1);nav_dots()}, 5000);
}

function stop_slide() {
	clearInterval(interval);
}


//function that slides the images
function sliding(inDex){

var currentSlide=slideIndex();
var nextSlide=slides.eq(inDex);
slides.eq(currentSlide).removeClass('active');
nextSlide.addClass('active');
 
               
               if(inDex>=slides.length) {
               	var new_inDex=inDex-(slides.length);
               	sliding(new_inDex);
               }
 console.log(inDex)
}

//slide the navigation dots
function nav_dots() {	
	
	var i=slideIndex();
	var divDot=dots.eq(i);
	divDot.addClass('blip');
	dots.not(divDot).removeClass('blip');

}

});