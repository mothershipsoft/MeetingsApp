//-----------------------------------------------------------------------------------------------------------------------------------------
// NPrS_Dash - setup the app class
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------


define(['NPrS_Dash_Util', "Model/MeetingModel"], function(NPrSUtil, MeetingModel) {

    var NPrS_Dash = function() {
        //Backbone.emulateJSON = true;
        this.mockjax = true;

        // setup utils
        this.util = new NPrSUtil();

        var me = this;

        $("#edit-button").click(function() { if (me.mainViewType == "edit") {
            nprs_dash.meeting.save({},{error:function(a,b) {alert(b.responseText);}});
            $("#nextItem").css({height:"80px"});
            $("#edit-button").text("Edit");
            me.setMainView("meeting");
        }
        else {
            $("#edit-button").text("Done");
            $("#nextItem").css({height:"0"});
            me.setMainView("edit");
        }});

    };

    NPrS_Dash.prototype.initWithUserId = function(userId) {
        // first setup mockjax if needed, then fetch the user
        if (this.mockjax) {
            require(['NPrSMockJax'], function () {
                setTimeout(function() {
                    nprs_dash._fetchUser(userId);
                },0);
            });
        }
        else {
            this._fetchUser(userId);
        }
    };

    NPrS_Dash.prototype.setMainView = function(mainViewType) {
        // hide sidebar first
        // $(".main-view").removeClass("showing");
        // $(".side-bar").removeClass("showing");

        if (this.mainView) {
            if (this.mainView.stopMeeting) {
                this.mainView.stopMeeting();
            }
            // perhaps this needs to be done after JS has been got for particular module - or long time with blank screen
            // or loading page inserted?
            this.mainView.remove();
        }

        this.mainViewType = mainViewType;


        switch(mainViewType) {
            case "meeting": {
                require(["MeetingsView"], function(MeetingsView) {

                    // TODO: this is in iScroll instructions...needed? Seems not...I guess it will depend on what weve put the view on
                    //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                    var mainDiv = $(".main-content");

                    var meetingView = new MeetingsView({model:nprs_dash.meeting});
                    mainDiv.append(meetingView.el);
                    nprs_dash.mainView = meetingView;
                    nprs_dash.meeting.resetMeeting();
                    meetingView.startMeeting();
                });
            }
            break;

            case "edit": {
                require(["MeetingEditView"], function(MeetingEditView) {
                    var mainDiv = $(".main-content");
                    var meetingView = new MeetingEditView({model:nprs_dash.meeting});
                    mainDiv.append(meetingView.el);
                    nprs_dash.mainView = meetingView;
                });
            }
            break;

            default:
            console.log(mainViewType + " not implemented yet");
            this.mainView = 0;
            break;
        }
    };


    // NPrS_Dash.prototype.showPlacesChooser = function() {
    //      require(["NPrSModalView", "NPrSScopeSelectorView"], function(ModalView, ScopeSelectorView) {
    //             var modalView = new ModalView({contentView: new ScopeSelectorView()});
    //             modalView.show();
    //         });
    // };

    NPrS_Dash.prototype._fetchUser = function(userId) {
        require(['NPrSUserModel'], function(NPrSUserModel) {
            nprs_dash.user = new NPrSUserModel({ id: userId });
            nprs_dash.user.fetch({
                success:function() {nprs_dash._gotUser();},
                fail:function() {alert("Could not obtain user");}
            });
        });
    };

    NPrS_Dash.prototype._gotUser = function(arg1) {
        var me = this;
        if (!nprs_dash.meeting) {
            nprs_dash.meeting = new MeetingModel({id:1, startTime: new Date().getTime()});
            nprs_dash.meeting.fetch({success:function() {
                // got to edit view by default...
                $("#nextItem").css({height:"0"});
                me.setMainView("edit");
                nprs_dash.meeting.resetMeeting();
            }});
        }

    };

    return NPrS_Dash;
});