define(['Backbone','../modules/toggles'], function(Backbone, Toggles){

    return Backbone.View.extend({
        initialize: function(){
        	
            this.tog = new Toggles();

        },
        
        el: $('body'),
        
        events: {
            'click .js-toggle': 'toggleNav'
        },

        toggleNav: function(e) {
            var element = $(e.target);

            this.tog.slideToggle(element);

            e.preventDefault();
        }
        
    });
});