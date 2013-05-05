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
            'click .list a': 'selectList',
            'click #add-list-show': 'showAddList',
            'click #add-list': 'addList',
            'click .overlay-cancel': 'overlayHide',
            'click #edit-list-show': 'showEditLists',
            'click #remove-list': 'removeList',
            'click #rename-list': 'renameList'
        },

        initialize: function() {

            this.$input = this.$('#new-item');
            this.$inputList = this.$('#new-list');
            this.$activeListTitle = this.$('.active-list-title');
            this.$overlay = this.$('#overlay');

            this.animationDuration = 300;
            //this.$activeCategoryTotal = this.$('.active-category-total');
            //
            //
            this.mode = '';
            this.activeList = 0;
            this.deleteList = 0;

            this.items = new Items();
            this.lists = new Lists();

            this.listenTo(this.items, 'add', this.addOne);
            this.listenTo(this.lists, 'add', this.addOneList);

            this.items.fetch();
            //this.collection.removeDone();
            this.setListId(0);

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

        selectList: function (evt) {
            if (this.mode === 'edit') {
                this.editList(evt);
            } else {
                this.prepareListId(evt);
            }
        },

        prepareListId: function (evt) {
            var id = evt.target ? $(evt.target).data('list-id') : evt;
            $('.list a').removeClass('active-list');
            if ( id !== 0) {
                $(evt.target).addClass('active-list');
            } else {
                this.$('#default-list').addClass('active-list');
            }
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
            this.items.removeByListId(this.deleteList);
            this.lists.removeByListId(this.deleteList);
            if (this.activeList === this.deleteList) {
                this.activeList = 0;
                this.deleteList = 0;
                this.$activeListTitle.html(this.lists.getNameById(this.activeList));
                this.refreshList();
            }
            this.overlayHide();
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

        showEditLists: function (e) {
            var $el = $(e.target);
            if ( $el.hasClass('active-list') ) {
                $el.removeClass('active-list');
                $el.html('edit');
                this.editModeOff();
            } else {
                $el.addClass('active-list');
                $el.html('done');
                this.editModeOn();
            }
        },

        editList: function (evt) {
            var that = this;
            this.deleteList = $(evt.target).data('list-id');
            $('.overlay-panel').hide();
            $('.edit-list').show();
            $('#overlay').show().animate({ opacity: 1 }, this.animationDuration, function () { that.$inputList.focus(); });
            $('#edit-list-name').val(this.lists.getNameById(this.deleteList));
        },

        overlayHide: function () {
            $('#overlay').animate({ opacity: 0 }, this.animationDuration, function () { $(this).hide(); });
        },

        showAddList: function () {
            var that = this;
            $('.overlay-panel').hide();
            $('.add-new-list').show();
            $('#overlay').show().animate({ opacity: 1 }, this.animationDuration, function () { that.$inputList.focus(); });
        },

        refreshList: function () {
            this.showActive();
            this.showDone();
        },

        editModeOn: function () {
            $('#lists').addClass('mode-edit');
            this.mode = 'edit';
            $('#add-list-show').animate({ width: 'toggle'}, this.animationDuration);
            $('#default-list').slideUp(this.animationDuration);
        },

        editModeOff: function () {
            $('#lists').removeClass('mode-edit');
            this.mode = '';
            $('#add-list-show').animate({ width: 'toggle'}, this.animationDuration);
            $('#default-list').slideDown(this.animationDuration);
        },

        renameList: function () {
            var model = this.lists.get({id: this.deleteList});
            model.save({ name: $('#edit-list-name').val() });
            this.overlayHide();
        }

    });

    return AppView;

});