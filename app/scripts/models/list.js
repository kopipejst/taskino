/*global define*/
'use strict';

define(['underscore', 'backbone', 'localStorage'], function(_, Backbone, LocalStorage) {

    var TodoItem = Backbone.Model.extend({
        // Default attributes for the todo item.
        defaults: {
            title: 'empty todo...',
            categoryId: 0,
            done: false
        }

    });

    return TodoItem;

});
