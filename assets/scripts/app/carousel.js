define(['jquery','bxslider'], function () {

	var carousel = $('.js-carousel');

	carousel.fadeIn(1000);

    carousel.bxSlider({
    	//controls: false,
        //pager: false,
        slideMargin: 10
    });

    window.onorientationchange = function(){
        window.location.reload();
    }
});