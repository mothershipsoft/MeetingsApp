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


    var MeetingModel = Backbone.Model.extend({
        datatype: "json",
        defaults: { id:0, attendees:[] },
        urlRoot: appRoot + '/json/meeting'
    }
    );
    return MeetingModel;
});
