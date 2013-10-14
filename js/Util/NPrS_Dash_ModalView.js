
//-----------------------------------------------------------------------------------------------------------------------------------------
// Modal View - container view for any modal content in the app
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
    var _modalViewTemplate;
    var NPrSModalView = Backbone.View.extend({

        className:"modal-view",
        initialize: function(){
            if (!this.options.contentView) {
                console.log("no content view");
            }
        },
        render:function() {
            var me = this;
            this.$el.append(_modalViewTemplate({title:this.options.contentView.title}));
            this.$el.find(".modal-content-div").append(this.options.contentView.$el);

            nprs_dash.util.makeClickable(this.$el.find(".modal-view-done-button")[0], function() { me.doneButtonClicked(); });
            this.options.contentView.render();
            return this;
        },
        show:function() {
            document.body.appendChild(this.el);
            this.render();
        }
    });

    NPrSModalView.prototype.doneButtonClicked = function() {
        console.log("clicked");
        if (this.options.contentView.doneButtonClicked) {
            this.options.contentView.doneButtonClicked();
        }
        this.options.contentView.remove();
        this.remove();
    };

    // perhaps this should be in own file...or maybe a template is overkill?
    _modalViewTemplate = _.template("<div><%= title %></div><button class='modal-view-done-button'>Done</button><div class='modal-content-div'></div>");

    return NPrSModalView;
});