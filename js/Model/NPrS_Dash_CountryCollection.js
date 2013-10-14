//-----------------------------------------------------------------------------------------------------------------------------------------
// Cycles Collection - the backbone country collection
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------


define(["backbone", "NPrSCountryModel"], function(Backbone, NPrSCountryModel) {
    "use strict";
    var appRoot = nprs_dash.util.appRoot;

    var NPrSCountryCollection = Backbone.Collection.extend({
        model: NPrSCountryModel,
        datatype: "json",
        url: appRoot + '/json/countries'
    });

    return NPrSCountryCollection;
});
