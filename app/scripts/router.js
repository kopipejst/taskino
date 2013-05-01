/*global define*/
'use strict';

define(['jquery', 'underscore', 'backbone', 'views/app'], function($, _, Backbone, AppView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'category/:id': 'showCategories',
            '/list': 'showList',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function() {
            var appRouter = new AppRouter();

            appRouter.on('defaultAction', function(actions) {
                // We have no matching route, lets just log what the URL was
                console.log('No route:', actions);
            });

            Backbone.history.start();
            var appView = new AppView();
        };
    return {
        initialize: initialize
    };
});