requirejs.config({
    // http://stackoverflow.com/questions/8315088/prevent-requirejs-from-caching-required-scripts
    // turn this off in production!!
    //urlArgs: "bust=" + (new Date()).getTime(),

    /////////////////////////////////////////////////////////////////////////////////////////////
    "paths": {
        // libs
      "jquery"                  : "../lib/jquery-1.10.2",
      "backbone"                : "../lib/backbone",
      "underscore"              : "../lib/underscore",
      "jvectormap"              : "../lib/jquery-jvectormap-1.2.2.min",
      "jvector-world-mil-en"    : "../lib/jquery-jvectormap-world-mill-en",
      "Chart"                   : "../lib/Chart",
      "iscroll"                 : "../lib/iscroll-probe",
      "jquery.mockjax"          : "../lib/jquery.mockjax",
      "MBP_helper"              : "../lib/helper",
       // requirejs text! plugin
      "text"                    : "../lib/text",

      // models/collections
      "NPrSMockJax"             : "Model/NPrS_MockJax",
      "NPrSUserModel"           : "Model/NPrS_Dash_UserModel",
      "NPrSCycleModel"          : "Model/NPrS_Dash_CycleModel",
      "NPrSCycleCollection"     : "Model/NPrS_Dash_CycleCollection",
      "NPrSCountryModel"        : "Model/NPrS_Dash_CountryModel",
      "NPrSCountryCollection"   : "Model/NPrS_Dash_CountryCollection",
      "NPrSEntityModel"         : "Model/NPrS_Dash_EntityModel",
      "NPrSEntityCollection"    : "Model/NPrS_Dash_EntityCollection",
      "NPrSRegionModel"         : "Model/NPrS_Dash_RegionModel",
      "NPrSRegionCollection"    : "Model/NPrS_Dash_RegionCollection",


      // views/controllers
      "NPrSTimeline"            : "Timeline/NPrS_Dash_Timeline",
      "NPrSScopeSelectorView"   : "ScopeSelector/NPrS_Dash_ScopeSelectorView",

      // Util
      "NPrS_Dash_Util"          : "Util/NPrS_Dash_Util",
      "NPrSModalView"           : "Util/NPrS_Dash_ModalView"

    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
    }
});

var nprs_dash = {}; // the app global

var shouldUseStrict = "use strict";

define(['jquery', 'underscore','backbone', 'NPrS_Dash'], function($, _, Backbone, NPrS_Dash) {

    $(function() {
        nprs_dash = new NPrS_Dash();
        nprs_dash.initWithUserId(1); // TODO: get passed in user_is somehow...

    });
});