//-----------------------------------------------------------------------------------------------------------------------------------------
// Cycles Collection - the backbone cycle collection
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------


define(["backbone", "NPrSCycleModel"], function(Backbone, NPrSCycleModel) {
    "use strict";
    var appRoot = nprs_dash.util.appRoot;

    var NPrSCycleCollection = Backbone.Collection.extend({
        model: NPrSCycleModel,
        datatype: "json",
        url: appRoot + '/json/cycles'
    });

    return NPrSCycleCollection;
});

