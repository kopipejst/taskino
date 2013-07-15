/*global define*/
'use strict';

define(['underscore', 'backbone', 'collections/lists'], function(_, Backbone, Lists) {

    var Item = Backbone.Model.extend({
        // Default attributes for the todo item.
        defaults: {
            listId: 0,
            done: false,
            color: '#000'
        }

    });

    return Item;

});
