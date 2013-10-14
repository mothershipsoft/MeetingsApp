//-----------------------------------------------------------------------------------------------------------------------------------------
// Regions Collection - the backbone region collection
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------


define(["backbone", "NPrSRegionModel"], function(Backbone, NPrSRegionModel) {
    "use strict";
    var appRoot = nprs_dash.util.appRoot;

    var NPrSRegionCollection = Backbone.Collection.extend({
        model: NPrSRegionModel,
        datatype: "json",
        url: appRoot + '/json/regions'
    });

    return NPrSRegionCollection;
});