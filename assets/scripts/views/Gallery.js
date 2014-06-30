define(['Backbone'], function(){

    return Backbone.View.extend({

        initialize: function(){

        },
        
        el: $('body'),
        
        events: {
            'click .js-gallery-img' : 'gallery_popup',
            'click .js-close-btn'   : 'close_popup'
        },

        gallery_popup: function(e) {

            if ($(window).width() > 569) {
                $('.js-gallery-popup').fadeIn(500);
                $('.js-large-img').attr('src', e.target.src);

                var next = $('.js-next-img');
            }

            e.preventDefault();
        },

        close_popup: function(e) {
            $('.js-gallery-popup').fadeOut(500);

            e.preventDefault();
        }
    })
});