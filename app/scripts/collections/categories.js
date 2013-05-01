/*global define*/
'use strict';

define(['underscore', 'backbone', 'localStorage', 'models/category'], function(_, Backbone, LocalStorage, Category) {

    var CategoriesCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Category,

        localStorage: new LocalStorage('todos-categories'),

        remove: function (categoryId) {
            var m = this.where({id: categoryId});
            for(var i in m) {
                m[i].destroy();
                this.remove(m[i]);
            }
        },

        getNameById: function (categoryId) {
            var m = this.where({id: categoryId});
            if(m[0]) {
                return m[0].attributes.name;
            }
        }
    });

    return CategoriesCollection;

});