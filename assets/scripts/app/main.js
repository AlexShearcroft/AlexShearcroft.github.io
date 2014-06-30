requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        Backbone: '../utils/backbone',
        jquery: '../utils/jquery'
    },
    shim: {
        'Backbone': {
            deps: ['../utils/lodash', 'jquery'], // load dependencies
            exports: 'Backbone' // use the global 'Backbone' as the module value
        }
    }
});

require(['../views/Validation','../views/MobileNav','../views/Gallery','header-images','carousel'], function(Validation,MobileNav,Gallery) {

    var validate = new Validation(),
        MobileNav = new MobileNav(),
        Gallery = new Gallery();
});

/**
define( [ 'jquery' ], function( $ ) {

    $( '.js-post' ).click( function( e ) {

        $.ajax({ url: window.site_path + 'api/people/5/?key=5stp4h0bzl7n062&secret=m9na38kn1eq9rkj',
                 type: 'DELETE',
                 dataType: 'JSON',
                 success: function( data ) {

                    console.log( data );

                 }
        });

        e.preventDefault();
    });

});
**/
