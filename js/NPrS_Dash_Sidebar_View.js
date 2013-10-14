
//-----------------------------------------------------------------------------------------------------------------------------------------
// Sidebar - the sidebar view
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------

define(["backbone"], function() {
    "use strict";
    var _sidebarTemplate;
    var NPrSSidebarView = Backbone.View.extend({
        el: $("#side-bar"),
        initialize: function(){
            this.render();
        },
        render:function() {
            this.$el.find(".sidebar-btn").off('click');
            this.$el.html(_sidebarTemplate({
                company:nprs_dash.user.get("company"),
                username:nprs_dash.user.get("name")
            }));
            var me = this;
            this.$el.find(".sidebar-btn").makeClickable(function(e, item) { me.btnClicked(item); });

            var $ul = $(this.$el.children("ul"));

            // select view group btn
            $ul.find("[data-view=\"" + nprs_dash.mainViewType + "\"]").addClass("selected");

            // select cycles filter group btn
            $ul.find("[data-cycles=\"" + nprs_dash.cyclesFilterType + "\"]").addClass("selected");

            // select milestone filter group btn
            $ul.find("[data-milestones=\"" + nprs_dash.milestoneFilterType + "\"]").addClass("selected");

            return this;
        }
    });

    NPrSSidebarView.prototype.btnClicked = function(btn) {
        var $btn = $(btn);

        var groupName = $btn.data("group");
        if (groupName) { // is a group single selection item
            // handle selection
            var groupBtns = this.$el.children("ul").find("[data-group=\""+ groupName + "\"]");
            $(groupBtns).removeClass("selected");
            $btn.addClass("selected");

            switch (groupName) {
                case "views":
                    nprs_dash.setMainView($btn.data("view"));
                    break;

                case "cycles":
                    nprs_dash.setCycleFilter($btn.data("cycles"));
                    break;

                case "milestones":
                    nprs_dash.setMilestoneFilter($btn.data("milestones"));
                    break;

                default:
                    console.log("not implemented yet");
                    break;
            }
        }
        else {
            switch ($btn.data("btn")) {
                case "scope":
                    nprs_dash.showPlacesChooser();
                    break;

                default:
                    console.log("not implemented yet");
                    break;
            }
        }
    };

    // perhaps this should be in own file...or maybe a template is overkill?
    _sidebarTemplate = _.template(
        "<ul>"                                                                                                              +
           "<li class=\"sidebar-btn\"><%= company %> <%= username %></li>"                                                  +
           "<li class=\"sidebar-header\">VIEWS</li>"                                                                        +
           "<li class=\"sidebar-btn\" data-group=\"views\" data-view=\"meeting\">CURRENT MEETING</li>"                          +
           // "<li class=\"sidebar-btn\" data-group=\"views\" data-view=\"map\">MAP</li>"                                      +
           // "<li class=\"sidebar-btn\" data-group=\"views\" data-view=\"timeline\">CYCLES</li>"                              +
           // "<li class=\"sidebar-header\">CYCLES</li>"                                                                       +
           // "<li class=\"sidebar-btn\" data-group=\"cycles\" data-cycles=\"warn\">CYCLES WITH WARNINGS</li>"                 +
           // "<li class=\"sidebar-btn\" data-group=\"cycles\" data-cycles=\"all\">ALL CYCLES</li>"                            +
           // "<li class=\"sidebar-header\">FILTER MILESTONES</li>"                                                            +
           // "<li class=\"sidebar-btn\" data-group=\"milestones\" data-milestones=\"all\">ALL MILESTONES</li>"                +
           // "<li class=\"sidebar-btn\" data-group=\"milestones\" data-milestones=\"key\">KEY MILESTONES</li>"                +
           // "<li class=\"sidebar-header\">SCOPE</li>"                                                                        +
           // "<li class=\"sidebar-btn\" data-btn=\"scope\">GO TO...</li>"                                                      +
        "</ul>");

    return NPrSSidebarView;
});