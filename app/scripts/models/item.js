/*global define*/
'use strict';

define(['underscore', 'backbone'], function(_, Backbone) {

    var Item = Backbone.Model.extend({
        // Default attributes for the todo item.
        defaults: {
            listId: 0,
            done: false
        }

    });

    return Item;

});
