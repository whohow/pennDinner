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
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }


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
            size: [undefined, undefined]
        });
        this.scrollview.sequenceFrom(this.itemViews);
        this.scrollview.outputFrom(function(offset) {
            return Transform.translate(0,offset);
        });
        this.add(this.scrollviewMod).add(this.scrollview);

        this.nextMod = new StateModifier({
            align: [0.6, 0.7]
        });
        this.nextButton = new Surface({
            content: "confirm",
            size:[90, 70],
            properties:{
                zIndex: 10,

                color: 'black',
                textAlign: 'center',
                backgroundColor: 'white'
            }
        });
        this.preMod = new StateModifier({
            align: [0.3, 0.7]
        });
        this.preButton = new Surface({
            content: "previous",
            size:[100, 70],
            properties:{
                zIndex: 10,
                color: 'black',
                textAlign: 'center',
                backgroundColor: 'white'
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
            console.log(event, model);
            if(event === 'add'){
                this.itemViews.push(new ItemView());
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
