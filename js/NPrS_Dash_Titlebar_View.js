
//-----------------------------------------------------------------------------------------------------------------------------------------
// Title bar - the titlebar view
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
    var _titlebarTemplate;
    var NPrSTitlebarView = Backbone.View.extend({
        el: $("#title-bar"),
        initialize: function(){
            //this.render();
        },
        render:function() {
            var me = this;
            var $content = $(this.$el.children(".title-bar-content"));
            var regionName = "";
            var countryName;
            var entityName;
            var selectedRegions = [];
            var i;
            // get selected regions
            if (nprs_dash.regions) {
                for (i in nprs_dash.currentScope.regions) {
                    var region = nprs_dash.regions.get(nprs_dash.currentScope.regions[i]);
                    selectedRegions.push(region);
                    if (i != "0") {
                        regionName += ",";
                    }
                    regionName += region.get("name");
                }
            }

            // get countries
            var selectedCountries = [];
            if (nprs_dash.countries && nprs_dash.currentScope.countries.length) {
                countryName = "";
                for (i in nprs_dash.currentScope.countries) {
                    var country = nprs_dash.countries.get(nprs_dash.currentScope.countries[i]);
                    selectedCountries.push(country);
                    if (i != "0") {
                        countryName += ",";
                    }
                    countryName += country.get("name");
                }
                var selectedEntities = [];
                if (nprs_dash.entities && nprs_dash.currentScope.entities.length) {
                    entityName = "";
                    for (i in nprs_dash.currentScope.entities) {
                        var entity = nprs_dash.entities.get(nprs_dash.currentScope.entities[i]);
                        selectedEntities.push(entity);
                        if (i != "0") {
                            entityName += ",";
                        }
                        entityName += entity.get("name");
                    }
                }
            }

            $content.html(_titlebarTemplate({region:regionName,country:countryName, entity:entityName}));
            $content.children().on('click', function() { me.btnClicked(this);});
        }
    });

    NPrSTitlebarView.prototype.btnClicked = function(btn) {
        var $btn = $(btn);

        if (btn.id == "region" && nprs_dash.currentScope.countries.length) {
            nprs_dash.setScope( {
                regions:nprs_dash.currentScope.regions,
                countries:[],
                entities:[]
            });
        }
        else if (btn.id == "country" && nprs_dash.currentScope.entities.length) {
            nprs_dash.setScope( {
                regions:nprs_dash.currentScope.regions,
                countries:nprs_dash.currentScope.countries,
                entities:[]
            });
        }
        else {
            nprs_dash.showPlacesChooser();
        }
    };

    _titlebarTemplate = _.template(
        "<a id=\"region\"><%=region%> </a>" +
        "<% if (country) { %> <a id=\"country\">/ <%=country%>  </a> <% } %>" +
        "<% if (entity)  { %> <a id=\"entity\">/ <%=entity%>  </a> <% }  %>");


    return NPrSTitlebarView;
});