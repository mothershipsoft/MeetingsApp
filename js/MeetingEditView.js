//-----------------------------------------------------------------------------------------------------------------------------------------
// Scope selctor View- handles the region edit, country and entity selection
//
// Author: Nick Hingston - mothership software ltd 2013
//
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public prototype Functions:
//-----------------------------------------------------------------------------------------------------------------------------------------
// Public class functions:
//-----------------------------------------------------------------------------------------------------------------------------------------

define(["backbone", "text!../templates/MeetingEditView.html"], function(Backbone, meetingEditViewTemplate) {

    var _regionEditListTemplate;

    var MeetingEditView = Backbone.View.extend({
        className: "meeting-edit",

        // clone private variable of scope to operate on
        _scope: {},

        events: {
        },


        initialize: function(){
            var me = this;
            this.state = "edit";
            this.model.bind('change', function()  { me.render(); });
            this.firstRun = true;
            me.render();
        },

        render: function() {
            var me = this;
            // no need to add to DOM, just update the lists
            this.$el.html(_regionEditListTemplate(this.model.attributes));

            var $activeInput = $(document.activeElement);

            setTimeout(function() {  // need timeout to fix issue in chrome
                var $inputs = me.$el.find("input");

                $inputs.on('input', function(event) {
                    me.onInputChanged(event);
                });

                var $btns = me.$el.children().find('button');
                $btns.makeClickable(function(e, item) {me.editItem(e, item);});
            },0);

            if (this.firstRun) {
                nprs_dash.util.makeClickable(this.el, "li", function(e, item) {me.clickedItem(e, item);});
                this.firstRun = false;
            }

            return this;
        },

         clickedItem: function(event, item) {
            var $item = $(item);

            var type = $($item.parent()).data("type");

            var newType = $item.data("new");

            var agenda = this.model.get("agenda");
            if (newType === 0) {
                // add new topic
                agenda.push({topic: "Untitled",
                    "length": 20,
                    "items": []});
                this.render();
            }
            else if (newType === 1) {
                //add new item
                var index = $item.data("index");
                agenda[index].items.push({title:"untitled",length:10});
                this.render();
            }

         },

         inputGotFocus: function (event) {
            var $activeInput = $(document.activeElement);

            this.$el.find('input').each(function (item) {
                this.className = "";
            });

            if ($activeInput.data("id")) {
                $activeInput.addClass("selected");
                this.selectedRegion = nprs_dash.regions.get($activeInput.data("id"));
                var selectedCountries = this.selectedRegion.get("countries");
                var countryList1 = this.$countryList.children();
                this.embelishColumn(countryList1, selectedCountries, 0);
            }

         },

         selectRegion: function (event) {
            console.log("input touchup");
            var $item = $(event.currentTarget);
            var me = this;
            var $activeInput = $(document.activeElement);
            if (!$activeInput.data("id")) {
                this.$el.find('input').each(function (item) {

                    this.className = "";

                    if ($item.data("id")) {
                        $item.addClass("selected");
                        me.selectedRegion = nprs_dash.regions.get($item.data("id"));
                        var selectedCountries = me.selectedRegion.get("countries");
                        var countryList1 = me.$countryList.children();
                        me.embelishColumn(countryList1, selectedCountries, 0);
                    }
                });
            }
         },

         onInputChanged: function (event) {
            var $activeInput = $(document.activeElement);
            var id = $activeInput.data("id");
            var agenda = this.model.get("agenda");
            var index = $activeInput.data("index");
            if (index !== undefined) {

                var itemIndex = $activeInput.data("item");
                if (itemIndex !== undefined) {
                    var items = agenda[index].items;
                    if ($activeInput.data("type") === "length") {
                        items[itemIndex].length = parseInt($activeInput[0].value,10);
                        var totalLength = 0;
                        for (var i in items) {
                            totalLength += items[i].length;
                        }
                        agenda[index].length = totalLength;
                    }
                    else {
                        // title
                        items[itemIndex].title = $activeInput[0].value;
                    }
                }
                else {
                    agenda[index].topic = $activeInput[0].value;
                }
            }
         },

         editButtonClicked: function(event, item) {
            if (this.state === "normal") {
                item.innerHTML = "DONE";
                this.state = "edit";
                this.$entityDiv.remove();
            }
            else {
                item.innerHTML = "EDIT";
                this.state = "normal";
                this.$el.append(this.$entityDiv[0]);
            }
            this.render();
         },

         editItem: function (event, item) {
            function _move (array,old_index, new_index) {
                 while (old_index < 0) {
                    old_index += array.length;
                }
                while (new_index < 0) {
                    new_index += array.length;
                }
                if (new_index >= array.length) {
                    var k = new_index - array.length;
                    while ((k--) + 1) {
                        array.push(undefined);
                    }
                }
                array.splice(new_index, 0, array.splice(old_index, 1)[0]);
                return array;
            }
            // del, up or down pressed
            var index = $(item).data("index");
            var agenda = this.model.get('agenda');
            var itemIndex = $(item).data("item");
            var type = $(item).data("type");
            if (itemIndex !== undefined) {
                // then we are action on an item
                if (type === 'del') {
                    agenda[index].items.splice(itemIndex,1);
                }
                else if (type === 'up') {
                    _move(agenda[index].items,itemIndex,itemIndex-1);
                }
                else if (type === 'down') {
                    _move(agenda[index].items,itemIndex,itemIndex+1);
                }
            }
            else {
                // then we are action on a topic
                if (type === 'del') {
                    agenda.splice(index,1);
                }
                else if (type === 'up') {
                    _move(agenda, index,index-1);
                }
                else if (type === 'down') {
                    _move(agenda, index,index+1);
                }
            }
            this.render();
         },

         doneButtonClicked: function(event) {
            nprs_dash.setScope(this._scope);
         }

         // TODO:
         // remove: are we cleaning up?
    });

    _regionEditListTemplate = _.template(meetingEditViewTemplate);

    // TODO: should be in some utility...

    return MeetingEditView;
});