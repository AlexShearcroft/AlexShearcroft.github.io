define(['jquery'], function(){

    function HomeLoad () {

        this.$headerClass = $('.js-header');
        this.$headerTitle = $('.js-header-title');
        this.$headerSubTitle = $('.js-header-subtitle');

        this.initate();

    }

    HomeLoad.prototype.initate = function () {

        this.loadHeader();
        this.loadMainTitle();
        this.loadSubTitle();

    }

    HomeLoad.prototype.loadHeader = function () {

        if ($(window).width() >= 569) {
            $('.home-body').fadeIn(800);
            $('.home-body').css('overflow', 'hidden');
            $('.js-header').css('height', $(window).height() + 'px');
        }

    }

    HomeLoad.prototype.loadHeader = function () {

        var $bodyClass = $('.home-body');

        if ($(window).width() >= 569) {
            $bodyClass.fadeIn(800);
            $bodyClass.css('overflow', 'hidden');
            $('.js-header').css('height', $(window).height() + 'px');
        }

        setTimeout(function(){
            $('.js-header').addClass('header--animate');
        }, 2000);

        setTimeout(function(){
            $('.js-header').addClass('header--grow');

            if ($(window).width() >= 569) {
                $bodyClass.css('overflow', 'visible');
            }
        }, 4000);

    }

    HomeLoad.prototype.loadMainTitle = function () {

        setTimeout(function(){
            $('.js-header-title').animate({
                'opacity': '1',
                'filter': 'alpha(opacity=100)'
            }, 1500);
        }, 600);

    }

    HomeLoad.prototype.loadSubTitle = function () {

        setTimeout(function(){
            $('.js-header-subtitle').animate({
                'opacity': '1',
                'filter': 'alpha(opacity=100)'
            }, 1500);
        }, 1400);

    }
    
    return HomeLoad;

});       