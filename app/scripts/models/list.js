/*global define*/
'use strict';

define(['underscore', 'backbone'], function(_, Backbone) {

    var List = Backbone.Model.extend({

        defaults: {
            color: '#000'
        }

    });

    return List;

});