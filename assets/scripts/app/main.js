requirejs.config({
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

require(['../views/Navigation', '../modules/home-load'], function(Navigation, HomeLoad) {
    var Navigation = new Navigation(),
        HomeLoad = new HomeLoad();
});
