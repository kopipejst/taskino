/*global define*/
'use strict';

define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var ItemView = Backbone.View.extend({
        
        tagName: 'li',

        className: 'item',

        template: _.template($('#item-template').html()),

        events: {
            'click': 'updateDone',
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
                        console.log(this.model);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        updateDone: function () {
            var done = this.model.get('done'),
                holder = done ? $('#items-active') : $('#items-done');

            if (done) {
                this.model.set('done', false);
            } else {
                this.model.set('done', true);
            }

            this.model.save();

            this.$el.css('opacity', 0).prependTo(holder).animate({'opacity': 1}, 500);
        }

    });

    return ItemView;

});