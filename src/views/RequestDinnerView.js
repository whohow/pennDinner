define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox      = require('famous/views/Lightbox');

    var TimeView  = require('views/TimeView');
    var LocationView  = require('views/LocationView');
    var PreferenceView  = require('views/PreferenceView');


    function RequestDinnerView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    RequestDinnerView.prototype = Object.create(View.prototype);
    RequestDinnerView.prototype.constructor = RequestDinnerView;

    RequestDinnerView.DEFAULT_OPTIONS = {};

    function _createViews(){
        this.data = [];
        this.views = [];
        this.locationView = new LocationView();
        this.timeView = new TimeView();
        this.preferenceView = new PreferenceView();
        this.views.push(this.timeView);
        this.views.push(this.locationView);
        this.views.push(this.preferenceView);
        this.lightbox = new Lightbox();
        this.lightbox.show(this.views[0]);
        this.add(this.lightbox);
    }

    function _setListeners(){

    }

    module.exports = RequestDinnerView;
});
