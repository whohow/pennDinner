define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox      = require('famous/views/Lightbox');
    var Scrollview    = require('famous/views/Scrollview');

    var TimeView  = require('views/TimeView');
    var LocationView  = require('views/LocationView');
    var PreferenceView  = require('views/PreferenceView');
    var EventsList = require('collections/EventsList');
    var Utility = require('famous/utilities/Utility');


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
        this.index = 0;
        this.preferenceCollection = new EventsList();
        this.locationView = new LocationView();
        this.timeView = new TimeView();
        this.preferenceView = new PreferenceView({collection:  this.preferenceCollection});
        this.views.push(this.timeView);
        this.views.push(this.locationView);
        this.views.push(this.preferenceView);
        this.lightbox = new Lightbox({
            inTransform: Transform.translate(window.innerWidth, 0, 0),
            outTransform: Transform.translate(-window.innerWidth, 0, 0)
        });
        this.lightbox.show(this.views[0]);
        this.add(this.lightbox);
//        this.scrollview = new Scrollview({
//            direction: Utility.Direction.X
//        });
//        this.scrollviewMod = new StateModifier({
//            align: [.5,.5],
//            origin: [.5,.5],
//            size: [undefined, undefined]
//        });
//        this.scrollview.sequenceFrom(this.views);
//        this.add(this.scrollviewMod).add(this.scrollview);
    }

    function _setListeners(){
        window.s = this.scrollview;
        this.views.forEach(function(view){
            view.pipe(this._eventOutput);
        }.bind(this));
        this.on('next', function(data){
            this.data.push(data);
//            this.scrollview.goToNextPage();
            if(data.scheduledLocation){
                this.preferenceCollection.reset();
                $.get("./src/data/preferenceData.json", function(data){
                    console.log(data);
                    this.preferenceCollection.add(data);
                    console.log(this.preferenceCollection);
                }.bind(this));
            }
            this.lightbox.hide();
            this.lightbox.show(this.views[(++this.index) % this.views.length]);
        }.bind(this));
        this.on('pre', function(data){
            console.log(data);
            this.data.pop();
//            this.scrollview.goToPreviousPage();
            this.lightbox.hide();
            this.lightbox.show(this.views[(--this.index + this.views.length) % this.views.length])
        }.bind(this));
        this.on('confirm', function(data){
            console.log(data);

            // send request to server with data
        })
    }

    module.exports = RequestDinnerView;
});
