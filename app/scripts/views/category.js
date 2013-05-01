/*global define*/
'use strict';

define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {

    var CategoryView = Backbone.View.extend({

        tagName: 'li',

        className: 'category',

        template: _.template($('#category-template').html()),

        render: function() {
            this.$el.data('category-id', this.model.id);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return CategoryView;

});