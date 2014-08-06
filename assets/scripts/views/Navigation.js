define(['Backbone','../modules/toggles'], function(Backbone, Toggles){

    return Backbone.View.extend({
        initialize: function(){
        	
            this.tog = new Toggles();

            if ($(window).width() >= 569) {
                $('.js-header').css('height', $(window).height() + 'px');
            }

            setTimeout(function(){
                $('.js-header-title').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)'
                }, 1500);
            }, 400);

            setTimeout(function(){
                $('.js-header').addClass('header--grow');
            }, 3800);

            setTimeout(function(){
                $('.js-header-subtitle').animate({
                    'opacity': '1',
                    'filter': 'alpha(opacity=100)'
                }, 1500);
            }, 1200);

            setTimeout(function(){
                $('.js-header').addClass('header--animate');
            }, 1800);

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