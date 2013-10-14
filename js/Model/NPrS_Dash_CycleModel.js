//-----------------------------------------------------------------------------------------------------------------------------------------
// Cycle Model - the backbone model of a cycle
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

    var NPrSCycleModel = Backbone.Model.extend({
        defaults: { entity:0, id:0, name:"", milestones:[] },
        datatype: "json",
        urlRoot: appRoot + '/json/cycle',

        getMilestones:function() {
            var milestones = [{
                    "DueDate": "2013-08-04T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Cut-off",
                    "late": (Math.random()*6>4) ,
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-08-03T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Sign-off",
                    "late": (Math.random()*2>1) ,
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-08-02T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Cut-off",
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-08-01T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Cut-off",
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-07-02T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Cut-off",
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-06-02T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Cut-off",
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-05-02T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Cut-off",
                    "MilestoneOrder": 1
                },
                {
                    "DueDate": "2013-04-02T15:19:21+00:00",
                    "Id": "0123456789ABCDEF0123456789ABCDEF",
                    "Description": "Sign-off",
                    "late": true,
                    "MilestoneOrder": 1
                }];
                return milestones;
        }

    });

    return NPrSCycleModel;
});


