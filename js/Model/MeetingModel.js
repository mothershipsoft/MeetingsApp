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
        defaults: { id:0, attendees:[], agenda:[] },
        urlRoot: appRoot + '/api/app.php/meeting',
        resetMeeting:function() {
            this.set("startTime",new Date().getTime());
            this.set("currentItem", 0);
            this.set("currentTopic", 0);
            var agenda = this.get("agenda");
            for (var i in agenda) {
                agenda[i].remainingTime = agenda[i].length*1000;
                var items = agenda[i].items;
                for (var j in items) {
                    items[j].remainingTime = items[j].length*1000;
                }
            }
        }
    });
    return MeetingModel;
});
