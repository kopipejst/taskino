/*global define*/
'use strict';

define(['underscore', 'backbone', 'localStorage', 'models/list'], function(_, Backbone, LocalStorage, TodoItem) {

    var TodoList = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: TodoItem,

        localStorage: new LocalStorage('todos-backbone'),

        filterDone: function (categoryId) {
            var done = this.filter( function (item) {
                if (categoryId !== '') {
                    return item.get('done') && item.get('categoryId') === categoryId;
                } else {
                    return item.get('done');
                }
            });
            return new TodoList(done);
        },

        filterActive: function (categoryId) {
            var done = this.filter( function (item) {
                if (categoryId !== '') {
                    return !item.get('done') && item.get('categoryId') === categoryId;
                } else {
                    return !item.get('done');
                }
            });
            return new TodoList(done);
        },

        removeDone: function (categoryId) {
            var m = this.where({done: true, categoryId: categoryId});
            for(var i in m) {
                m[i].destroy();
                this.remove(m[i]);
            }
        },

        removeByCategory: function (categoryId) {
            var m = this.where({categoryId: categoryId});
            for(var i in m) {
                m[i].destroy();
                this.remove(m[i]);
            }
        }

    });

    return TodoList;

});