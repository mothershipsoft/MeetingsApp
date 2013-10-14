


define(["MBP_helper"], function() {

    var NPrS_Util = function() {
        "use strict";
        // get browser specific CSS transition event
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        };

        for(t in transitions){
            if( el.style[t] !== undefined ){
                this.transitionEvent = transitions[t];
                break;
            }
        }

        // browser specific transform style strings
        var transforms = {
          'transform':'transform',
          'WebkitTransform':'webkitTransform',
          'OTransform':'oTransform',
          'MozTransform':'mozTransform',
          'MsTransform':'msTransform'
        };

        for(t in transforms){
            if( el.style[t] !== undefined ){
                this.transformStyle = transforms[t];
            }
        }


        var docLocation = document.location.pathname;
        this.appRoot = docLocation.substring(0, docLocation.lastIndexOf("/"));


        this.MBP = window.MBP;

        this.MBP.scaleFix();
        this.MBP.hideUrlBar();

        var me = this;

        // jquery plugin for makeClickable

        (function($) {

          $.fn.makeClickable = function(callback) {
            return this.each( function() {
                me.makeClickable(this, this.tagName, callback);
            });
          };

        }(jQuery));

        // override fast button setting classes
        this.MBP.fastButton.prototype.onTouchStart = function(event) {
          var element = event.target || event.srcElement;
          event.stopPropagation();
          element.addEventListener('touchend', this, false);
          document.body.addEventListener('touchmove', this, false);
          this.startX = event.touches[0].clientX;
          this.startY = event.touches[0].clientY;
        };

        this.MBP.fastButton.prototype.onClick = function(event) {
          event = event || window.event;
          var element = event.target || event.srcElement;
          if (event.stopPropagation) {
            event.stopPropagation();
          }
          this.reset(event);
          this.handler.apply(event.currentTarget, [event]);
          if (event.type == 'touchend') {
            MBP.preventGhostClick(this.startX, this.startY);
          }
        };

        // target type is optional
        NPrS_Util.prototype.makeClickable = function(topElement,targetType, callback) {
          // no target type set
          if (arguments.length == 2) {
           callback = targetType;
           targetType = topElement.tagName;
         }
         else {
          targetType = targetType.toUpperCase();
        }

          var callbackWrapper = function(event) {
            event.preventDefault();
            event.stopPropagation();
            var item;
            // standardise the event a bit
            if (event.type === 'touchend') {
                item = event.currentTarget;
            }
            else {
                item = event.toElement;
            }
            if (item.tagName === targetType) {
                callback(event,item);
            }
          };

          // we may well want to use own implentation...
          new this.MBP.fastButton(topElement, callbackWrapper, "");
        };

    };



    return NPrS_Util;
});