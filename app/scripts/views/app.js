/*global define,snapper*/
'use strict';

define(['jquery', 'underscore', 'backbone', 'collections/items', 'collections/lists', 'views/item', 'views/list'], 
    function($, _, Backbone, Items, Lists, ItemView, ListView) {

    var AppView = Backbone.View.extend({
        el: $('#app'),

        events: {
            'keypress #new-item': 'createOnEnter',
            'click #add-new': 'createOnSubmit',
            'click .clear-done': 'removeDone',
            'click .list a': 'prepareListId',
            'click .list span': 'removeList',
            'click #add-list-show': 'showAddList',
            'click #add-list': 'addList',
            'click #add-list-cancel': 'addListCancel'
        },

        initialize: function() {

            this.$input = this.$('#new-item');
            this.$inputList = this.$('#new-list');
            this.$activeListTitle = this.$('.active-list-title');
            this.$overlay = this.$('#overlay');
            //this.$activeCategoryTotal = this.$('.active-category-total');
            //
            this.items = new Items();
            this.lists = new Lists();

            this.listenTo(this.items, 'add', this.addOne);
            this.listenTo(this.lists, 'add', this.addOneList);

            this.items.fetch();
            //this.collection.removeDone();
            this.setListId(0);
            this.refreshList();

            this.lists.fetch();

        },

        filterOne : function (item) {
            item.markAsDone();
        },

        showDone : function () {
            $('#items-done').html('');
            var coll = this.items.filterDone(this.activeList);
            coll.each(function (item) {
                var view = new ItemView({ model: item });
                $('#items-done').prepend(view.render().el);
            }, this);
        },

        showActive : function () {
            $('#items-active').html('');
            var coll = this.items.filterActive(this.activeList);
            coll.each(function (item) {
                var view = new ItemView({ model: item });
                $('#items-active').prepend(view.render().el);
            }, this);
            //this.$activeCategoryTotal.html(this.collection.length);
        },

        removeDone: function () {
            this.items.removeDone(this.activeList);
            this.refreshList();
        },

        update: function () {
            //this.filterAll();
        },

        addOne: function(item) {
            var view = new ItemView({ model: item });
            $('#items-active').prepend(view.render().el);
        },

        // Generate the attributes for a new Todo item.
        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                listId: this.activeList,
                done: false
            };
        },

        createOnEnter: function(e) {
            if (e.which !== 13 || !this.$input.val().trim()) {
                return;
            }
            this.items.create(this.newAttributes(), { wait: true });
            this.$input.val('');
            this.$input.focus();
        },

        createOnSubmit: function() {
            if (this.$input.val().trim()) {
                this.items.create(this.newAttributes(), { wait: true });
                this.$input.val('');
                this.$input.focus();
            }
        },

        newList: function () {
            return {
                name: this.$inputList.val().trim()
            };
        },

        addOneList: function(list) {
            var view = new ListView({ model: list });
            $('#lists').prepend(view.render().el);
        },

        prepareListId: function (evt) {
            var id = $(evt.target).data('list-id');
            $('.list a').removeClass('active-list');
            $(evt.target).addClass('active-list');
            Backbone.history.navigate('list/' + id, true);
            this.setListId(id);
        },

        setListId: function (id) {
            this.activeList = id;
            this.$activeListTitle.html(this.lists.getNameById(id));
            this.refreshList();
            snapper.close();
        },

        removeList: function () {
            this.items.removeByListId(this.activeList);
            this.lists.remove(this.activeList);
            this.activeList = 0;
        },

        addList: function () {
            var that = this;

            this.lists.create(this.newList(), {
                wait: true,
                success: function (res) {
                    that.$inputList.val('');
                    that.$overlay.hide();
                    that.setListId(res.id);
                    that.$input.focus();
                }
            });
        },

        addListCancel: function () {
            this.overlayHide();
        },

        overlayHide: function () {
            $('#overlay').animate({ left: -$(document).width() }, 300);
        },

        showAddList: function () {
            this.$inputList.focus();
            $('#overlay').animate({ left: 0 }, 300).show();
        },

        refreshList: function () {
            this.showActive();
            this.showDone();
        }

    });

    return AppView;

});