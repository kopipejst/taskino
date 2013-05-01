/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        localStorage: {
            deps: ['backbone'],
            exports: 'LocalStorage'
        },
        snap: {
            exports: 'Snap'
        }
    },
    paths: {
        jquery: '../components/jquery/jquery',
        backbone: '../components/backbone-amd/backbone',
        underscore: '../components/underscore-amd/underscore',
        bootstrap: 'vendor/bootstrap',
        localStorage: 'vendor/backbone.localStorage',
        snap: 'vendor/snap.min'
    }
});

require([
    'app',
], function(App){
    App.initialize();
});