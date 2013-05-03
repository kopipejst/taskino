/*global define*/
'use strict';

var snapper,
    PORTALIST = {
        fixedListName: 'Default'
    };


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
            disable: 'right',
            transitionSpeed: 0.1
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