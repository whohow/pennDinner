define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Scrollview    = require('famous/views/Scrollview');

    var EventsList = require('collections/EventsList');
    var ItemView = require('views/ItemView');
    var Utility = require('famous/utilities/Utility');

    function PendingDinnerView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    PendingDinnerView.prototype = Object.create(View.prototype);
    PendingDinnerView.prototype.constructor = PendingDinnerView;

    PendingDinnerView.DEFAULT_OPTIONS = {};
    function _createViews(){
        this.collection = new EventsList();
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
        this.add(this.scrollviewMod).add(this.scrollview);
    }

    function _setListeners(){

    }

    module.exports = PendingDinnerView;
});
