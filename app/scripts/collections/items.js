/*global define*/
'use strict';

define(['underscore', 'backbone', 'localStorage', 'models/item', 'collections/lists'], function(_, Backbone, LocalStorage, Item, Lists) {

    var Items = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Item,

        localStorage: new LocalStorage('portalist-item'),

        parse: function (data) {
            var list = new Lists();
            list.fetch();
            console.log(data)
            for(var item in data) {
                console.log(data[item].listId)
                data[item].color = list.getColorById(data[item].listId);
            }
            return data;
        },

        filterDone: function (listId) {
            var done = this.filter( function (item) {
                if (listId !== '') {
                    return item.get('done') && item.get('listId') === listId;
                } else {
                    return item.get('done');
                }
            });
            return new Items(done);
        },

        filterActive: function (listId) {
            var done = this.filter( function (item) {
                if (listId !== '') {
                    return !item.get('done') && item.get('listId') === listId;
                } else {
                    return !item.get('done');
                }
            });
            return new Items(done);
        },

        removeDone: function (listId) {
            var m = this.where({done: true, listId: listId});
            for(var i in m) {
                m[i].destroy();
                this.remove(m[i]);
            }
        },

        removeByListId: function (listId) {
            var m = this.where({listId: listId});
            for(var i in m) {
                m[i].destroy();
                this.remove(m[i]);
            }
        }

    });

    return Items;

});