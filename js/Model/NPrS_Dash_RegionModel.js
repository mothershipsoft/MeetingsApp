//-----------------------------------------------------------------------------------------------------------------------------------------
// Region Model - the backbone model of a region
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

    var NPrSRegionModel = Backbone.Model.extend({
        defaults: { id:0, name:"", country_id:0},
        datatype: "json",
        urlRoot: appRoot + '/json/region'

    });

    return NPrSRegionModel;
});