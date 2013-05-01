/*global define*/
'use strict';
var snapper;
define([
    'jquery',
    'underscore',
    'backbone',
    'router', // Request router.js
    'snap'
], function($, _, Backbone, Router, Snap){
    var initialize = function() {
        snapper = new Snap({
            element: $('#content')[0],
            disable: 'right'
        });
        $('#open-left').click ( function () {
            snapper.open('left');
        });
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});