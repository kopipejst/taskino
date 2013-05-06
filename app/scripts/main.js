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
        localStorage: 'vendor/backbone.localStorage',
        snap: 'vendor/snap.min'
    }
});

require([
    'app',
], function(App){
    App.initialize();
});