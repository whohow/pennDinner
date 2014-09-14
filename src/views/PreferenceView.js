define(function(require, exports, module) {
    var Engine          = require('famous/core/Engine');
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Scrollview    = require('famous/views/Scrollview');

    var ItemView = require('views/ItemView');
    var Utility = require('famous/utilities/Utility');

    function PreferenceView(options) {
        this.collection = options.collection;
        this.itemCount = 0;
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    // Please indicate your restaurants preferences

    PreferenceView.prototype = Object.create(View.prototype);
    PreferenceView.prototype.constructor = PreferenceView;

    PreferenceView.DEFAULT_OPTIONS = {};

    function _createViews(){

        this.itemViews = [];
        this.itemViews.push(new ItemView());
        this.itemViews.push(new ItemView());
        this.itemViews.push(new ItemView());

        this.scrollview = new Scrollview({
            direction: Utility.Direction.Y
        });
        this.scrollviewMod = new StateModifier({
            align: [.5,.5],
            origin: [.5,.5],
            size: [undefined, undefined],
//            transform: Transform.translate(0, 0, 10)
        });
        this.scrollview.sequenceFrom(this.itemViews);
        this.scrollview.outputFrom(function(offset) {
            return Transform.translate(0,offset);
        });
        this.add(this.scrollviewMod).add(this.scrollview);

        this.nextMod = new StateModifier({
            align: [0.745, 0.885]
        });
        this.nextButton = new Surface({
            content: "<i class='fa fa-check-circle-o fa-3x'></i>",
            size:[90, 70],
            properties:{
                zIndex: 10,

                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });
        this.preMod = new StateModifier({
            align: [0.25, 0.9]
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
        this.add(this.nextMod).add(this.nextButton);
    }

    function _setListeners(){



        this.nextButton.on('click', function(){
            this._eventOutput.emit('confirm', {preference: "some "});
        }.bind(this));
        this.preButton.on('click', function(){
            this._eventOutput.emit('pre', "cancel Pre");
        }.bind(this));

        this.collection.on('all', function(event, model, collection){
//            console.log(event, model);
            if(event === 'add'){
                var item = new ItemView();

                this.itemViews.push(item);
                item._eventOutput.on('click', function(){
                    if(item.isPreferred) {
                        item.isPreferred = false;
                        item.firstSurface.setContent("<style type=\"text/css\">.bgimg {background-image: url(./img/event_3.png);}</style><div class=\"bgimg\" style=\"height:100px\">div with background</div>");
                    }
                    else {
                        item.isPreferred = true;
                        item.firstSurface.setContent("<style> .intermPreferred{width: 305px;height: 89px;margin-top: 5px;margin-left: auto;margin-right: auto;background-color: lightblue;box-shadow: 1px 1px 1px #888888;}</style><div class=\"intermPreferred\">a</div>");
                    }


                }.bind(this));
                this.itemCount++;
            }
            if(event === 'reset'){
                while(this.itemViews.length > 0){
                    this.itemViews.pop();
                }
            }
        }.bind(this));


        Engine.pipe(this.scrollview);

    }



    module.exports = PreferenceView;
});
