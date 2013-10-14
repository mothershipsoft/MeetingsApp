//-----------------------------------------------------------------------------------------------------------------------------------------
// Country Model - the backbone model of a country
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------


define(["backbone"], function(Backbone) {
    "use strict";
    var appRoot = nprs_dash.util.appRoot;

    var NPrSCountryModel = Backbone.Model.extend({
        defaults: { id:0, name:"" },
        datatype: "json",
        urlRoot: appRoot + '/json/countries'

    });

    return NPrSCountryModel;
});