//-----------------------------------------------------------------------------------------------------------------------------------------
// Entity Collection - the backbone entity collection
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------


define(["backbone", "NPrSEntityModel"], function(Backbone, NPrSEntityModel) {
    "use strict";
    var appRoot = nprs_dash.util.appRoot;

    var NPrSEntityCollection = Backbone.Collection.extend({
        model: NPrSEntityModel,
        datatype: "json",
        url: appRoot + '/json/entities'
    });

    return NPrSEntityCollection;
});