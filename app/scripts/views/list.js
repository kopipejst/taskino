/*global define*/
'use strict';

define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {

    var ListView = Backbone.View.extend({

        tagName: 'li',

        className: 'list',

        template: _.template($('#lists-template').html()),

        render: function() {
            this.$el.data('list-id', this.model.id);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return ListView;

});