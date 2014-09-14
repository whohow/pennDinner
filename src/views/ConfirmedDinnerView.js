define(function(require, exports, module) {
    var Engine          = require('famous/core/Engine');
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Scrollview    = require('famous/views/Scrollview');

    var EventsList = require('collections/EventsList');
    var ItemView = require('views/ItemView');
    var Utility = require('famous/utilities/Utility');


    function ConfirmedDinnerView(options) {
        View.apply(this, arguments);
        this.collection = options.collection;
        _createViews.call(this);
        _setListeners.call(this);
    }

    ConfirmedDinnerView.prototype = Object.create(View.prototype);
    ConfirmedDinnerView.prototype.constructor = ConfirmedDinnerView;

    ConfirmedDinnerView.DEFAULT_OPTIONS = {};

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
//            transform: Transform.translate(0, 0, 10),
            size: [undefined, undefined]
        });
        this.scrollview.sequenceFrom(this.itemViews);
        this.scrollview.outputFrom(function(offset) {
            return Transform.translate(0,offset);
        });
        this.add(this.scrollviewMod).add(this.scrollview);

    }

    function _setListeners(){
        this.collection.on('all', function(event, model, collection){
            console.log(event, model);
            if(event === 'add'){
                this.itemViews.push(new ItemView());
            }
            if(event === 'remove'){
                while(this.itemViews.length > 0){
                    this.itemViews.pop();
                }
            }
        }.bind(this));

        Engine.pipe(this.scrollview);

         for (var i = 0; i < this.itemViews.length; i++) {
             Wrapper(i).call(this);
         }
    }

    function Wrapper(i){
        return function(){
            this.itemViews[i].on('preferred', function(data){
                this.itemViews[i].isPreferred = true;
                this.itemViews[i].firstSurface.setContent("<style> .intermPreferred{width: 305px;height: 89px;margin-top: 5px;margin-left: auto;margin-right: auto;background-color: lightblue;box-shadow: 1px 1px 1px #888888;}</style><div class=\"intermPreferred\">a</div>");
            }.bind(this));

        }
    }


    module.exports = ConfirmedDinnerView;
});
