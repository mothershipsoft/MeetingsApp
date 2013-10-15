// mock the api

define(["jquery.mockjax", "jquery"], function() {

    var appRoot = nprs_dash.util.appRoot;


    $.mockjax(function(settings) {
      // settings.url == '/restful/<service>'
      var service = settings.url.match(/\/json\/user\/(.*)$/);
      if ( service ) {
            return {
                responseTime: 200,
                contentType: 'text/json',
                dataType: 'json',
                proxy: appRoot +'/json/user/' + service[1] + '.json'
            };
        }

    });

    // $.mockjax(function(settings) {
    //   // settings.url == '/restful/<service>'
    //   var service = settings.url.match(/\/json\/meeting\/(.*)$/);
    //   if ( service ) {
    //         return {
    //             responseTime: 200,
    //             contentType: 'text/json',
    //             dataType: 'json',
    //             proxy: appRoot +'/json/meeting/' + service[1] + '.json'
    //         };
    //     }

    // });

});