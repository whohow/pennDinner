define(function(require, exports, module) {
    var Engine        = require('famous/core/Engine');
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ItemView      = require('views/ItemView');
    var Scrollview    = require('famous/views/Scrollview');

    var Utility = require('famous/utilities/Utility');

    function LocationView(options) {
        this.collection = options.collection;
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    function _createViews(){
        this.firstSurface = new Surface({
            content: 'Select the locations you would like to have dinner',
            properties: {
                size: [undefined, undefined],
                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });

        this.firstSurfaceMod = new StateModifier({
            align: [.5,.58],
            origin: [.5,.5],
            size: [undefined, undefined]
        });
        this.add(this.firstSurfaceMod).add(this.firstSurface);

        this.itemViews = [];
//        this.itemViews.push(new ItemView());
//        this.itemViews.push(new ItemView());
//        this.itemViews.push(new ItemView());
//        this.itemViews.push(new ItemView());
//        this.itemViews.push(new ItemView());
//        this.itemViews.push(new ItemView());



        this.scrollview = new Scrollview({
            direction: Utility.Direction.Y
        });
        this.scrollviewMod = new StateModifier({
            align: [.5,.7],
            origin: [.5,.5],
            size: [undefined, undefined]
        });
        this.scrollview.sequenceFrom(this.itemViews);

        this.scrollview.outputFrom(function(offset) {
            return Transform.translate(0,offset);
        });
        this.add(this.scrollviewMod).add(this.scrollview);




        this.nextMod = new StateModifier({
            align: [0.75, 0.9]
        });
        this.nextButton = new Surface({
            content: "<i class='fa fa-chevron-right fa-2x'></i>",
            size:[100, 70],
            properties:{
                zIndex: 10,

                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });
        this.preMod = new StateModifier({
            align: [0.25, 0.2]
        });
        this.preButton = new Surface({
            content: "<i class='fa fa-chevron-left fa-2x'></i>",
            size:[100, 70],
            properties:{
                zIndex: 10,
                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });
        this.add(this.preMod).add(this.preButton);
//        this.add(this.nextMod).add(this.nextButton);
    }

    function _setListeners(){
        this.nextButton.on('click', function(){
            this._eventOutput.emit('next', {scheduledLocation: ["some location", "other"]});
        }.bind(this));
        this.preButton.on('click', function(){
            this._eventOutput.emit('pre', "cancelLocation");
        }.bind(this));

        Engine.pipe(this.scrollview);

        for (var i = 0; i < this.itemViews.length; i++) {
            Wrapper(i).call(this);
        }

        this.collection.on('all', function(event, model, collection){
            console.log(event, model);
            if(event === 'add'){
                console.log(model);
                var item = new ItemView({model: model});
                this.itemViews.push(item);
                item._eventOutput.on('click', function(){
                    this._eventOutput.emit('next', {scheduledLocation: model.get('location')});
                }.bind(this));
//                item._eventOutput.on('click', function(){
//                    if(item.isPreferred) {
//                        item.isPreferred = false;
//                        item.firstSurface.setContent("<style type=\"text/css\">.bgimg {background-image: url(./img/event_3.png);}</style><div class=\"bgimg\" style=\"height:100px\">div with background</div>");
//                    }
//                    else {
//                        item.isPreferred = true;
//                        item.firstSurface.setContent("<style> .intermPreferred{width: 305px;height: 89px;margin-top: 5px;margin-left: auto;margin-right: auto;background-color: lightblue;box-shadow: 1px 1px 1px #888888;}</style><div class=\"intermPreferred\">University City</div>");
//                    }
//                }.bind(this));
            }
            if(event === 'remove'){
                while(this.itemViews.length > 0){
                    this.itemViews.pop();
                }
            }
        }.bind(this));
    }

    function Wrapper(i){
        return function(){
            this.itemViews[i].on('preferred', function(){
                console.log("DDD)");
                this.itemViews[i].isPreferred = true;
                this.itemViews[i].firstSurface.setContent("<style> .intermPreferred{width: 305px;height: 89px;margin-top: 5px;margin-left: auto;margin-right: auto;background-color: lightblue;box-shadow: 1px 1px 1px #888888;}</style><div class=\"intermPreferred\">a</div>");
            }.bind(this));

        }
    }

    LocationView.prototype = Object.create(View.prototype);
    LocationView.prototype.constructor = LocationView;

    LocationView.DEFAULT_OPTIONS = {};
    LocationView.prototype.setDate = function(day){
        this.firstSurface.setContent('In date ' + day + '/9 .Select the locations you would like to have dinner');
    };

    module.exports = LocationView;
});
