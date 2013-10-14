//-----------------------------------------------------------------------------------------------------------------------------------------
// User Model - the backbone model of the logged in user
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


    var NPrSUserModel = Backbone.Model.extend({
        defaults: { entity:0, id:0, name:"" },
        datatype: "json",
        urlRoot: appRoot + '/json/user'
    }
    );
    return NPrSUserModel;
});
