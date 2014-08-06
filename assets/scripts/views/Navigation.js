define(['Backbone','../modules/toggles'], function(Backbone, Toggles){

    return Backbone.View.extend({
        initialize: function(){
        	
            this.tog = new Toggles();

            if ($(window).width() >= 569) {
                $('.home-body').fadeIn(800);
                $('.home-body').css('overflow', 'hidden');
                $('.js-header').css('height', $(window).height() + 'px');
            }

            setTimeout(function(){
                $('.js-header-title').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)'
                }, 1500);
            }, 600);

            setTimeout(function(){
                $('.js-header').addClass('header--grow');

                if ($(window).width() >= 569) {
                    $('.home-body').css('overflow', 'visible');
                }
            }, 4000);

            setTimeout(function(){
                $('.js-header-subtitle').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)'
                }, 1500);
            }, 1400);

            setTimeout(function(){
                $('.js-header').addClass('header--animate');
            }, 2000);

        },
        
        el: $('body'),
        
        events: {
            'click .js-toggle': 'toggle_nav'
        },

        toggle_nav: function(e) {
            var element = $(e.target);

            this.tog.slideToggle(element);

            e.preventDefault();
        }
        
    });
});