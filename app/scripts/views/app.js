/*global define*/

define(['jquery', 'underscore', 'backbone', 'collections/list', 'collections/categories', 'views/list', 'views/category'], 
    function($, _, Backbone, TodoList, CategoriesCollection, ListView, CategoryView) {

    var AppView = Backbone.View.extend({
        el: $('#app'),

        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #add-new': 'createOnSubmit',
            'click .clear-done': 'removeDone',
            'click #add-category': 'addCategory',
            'click .category a': 'prepareCategoryId',
            'click .category span': 'removeCategory',
            'click #add-category-show': 'showAddCategory'
        },

        initialize: function() {

            this.$input = this.$('#new-todo');
            this.$inputCategory = this.$('#new-category');
            this.$activeCategory = this.$('.active-category');
            //this.$activeCategoryTotal = this.$('.active-category-total');

            this.collection = new TodoList();
            this.categoryCollection = new CategoriesCollection();

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.categoryCollection, 'add', this.addOneCategory);
            
            this.collection.fetch();
            //this.collection.removeDone();
            this.setCategoryId('home');

            this.categoryCollection.fetch();

        },

        filterOne : function (todo) {
            todo.markAsDone();
        },

        showDone : function () {
            $('#todo-done').html('');
            var coll = this.collection.filterDone(this.activeCategory);
            coll.each(function (todo) {
                var view = new ListView({ model: todo });
                $('#todo-done').prepend(view.render().el);
            }, this);
        },

        showActive : function () {
            $('#todo-active').html('');
            var coll = this.collection.filterActive(this.activeCategory);
            coll.each(function (todo) {
                var view = new ListView({ model: todo });
                $('#todo-active').prepend(view.render().el);
            }, this);
            //this.$activeCategoryTotal.html(this.collection.length);
        },

        removeDone: function () {
            this.collection.removeDone(this.activeCategory);
            this.showDone();
            this.showActive();
        },

        update: function () {
            //this.filterAll();
        },

        addOne: function(todo) {
            var view = new ListView({ model: todo });
            $('#todo-active').prepend(view.render().el);
        },

        // Generate the attributes for a new Todo item.
        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                categoryId: this.activeCategory,
                done: false
            };
        },

        createOnEnter: function(e) {
            if (e.which !== 13 || !this.$input.val().trim()) {
                return;
            }
            this.collection.create(this.newAttributes(), { wait: true });
            this.$input.val('');
            this.$input.focus();
        },

        createOnSubmit: function() {
            if (this.$input.val().trim()) {
                this.collection.create(this.newAttributes(), { wait: true });
                this.$input.val('');
                this.$input.focus();
            }
        },

        newCategory: function () {
            return {
                name: this.$inputCategory.val().trim()
            };
        },

        addCategory: function () {
            this.categoryCollection.create(this.newCategory(), { wait: true });
            this.$inputCategory.val('');
            $('.add-new-category').animate({ top: "-50px" }, 300);
        },

        addOneCategory: function(category) {
            var view = new CategoryView({ model: category });
            $('#categories-list').prepend(view.render().el);
        },

        prepareCategoryId: function (evt) {
            var id = $(evt.target).data('category-id');
            Backbone.history.navigate('category/' + id, true);
            this.setCategoryId(id);
        },

        setCategoryId: function(id) {
            this.activeCategory = id;
            this.$activeCategory.html(this.categoryCollection.getNameById(id));
            this.showDone();
            this.showActive();
            snapper.close();
        },

        removeCategory: function (evt) {
            this.collection.removeByCategory(this.activeCategory);
            this.categoryCollection.remove(this.activeCategory);
            this.activeCategory = 0;
        },

        showAddCategory: function () {
            $('.add-new-category').animate({ top: 0 }, 300);
        }

    });

    return AppView;

});