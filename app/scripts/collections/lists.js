/*global define,PORTALIST*/
'use strict';

define(['underscore', 'backbone', 'localStorage', 'models/list'], function(_, Backbone, LocalStorage, List) {

    var Lists = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: List,

        localStorage: new LocalStorage('portalist-list'),

        removeByListId: function(listId) {
            var m = this.where({
                id: listId
            });
            for (var i in m) {
                m[i].destroy();
                this.remove(m[i]);
            }
        },

        getNameById: function(listId) {

            if (listId === '') {
                return 'All Tasks';
            }

            var m = this.where({
                id: listId
            });
            if (m[0]) {
                return m[0].attributes.name;
            } else {
                return PORTALIST.fixedListName;
            }
        },

        getColorById: function(listId) {
            var m = this.where({
                id: listId
            });

            if (m[0] && m[0].attributes) {
                return m[0].attributes.color;
            } else {
                return PORTALIST.defaultColor;
            }
        }
    });

    return Lists;

});