define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox      = require('famous/views/Lightbox');
    var Scrollview    = require('famous/views/Scrollview');
    var Transitionable  = require('famous/transitions/Transitionable');
    var Modifier        = require('famous/core/Modifier');

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
        this.transitionables = [];
        this.mods = [];
        this.index = 0;
        this.preferenceCollection = new EventsList();
        this.locationView = new LocationView();
        this.timeView = new TimeView();
        this.preferenceView = new PreferenceView({collection:  this.preferenceCollection});
        this.views.push(this.timeView);
        this.views.push(this.locationView);
        this.views.push(this.preferenceView);
        this.transitionable = new Transitionable(0);
        this.mods.push(new Modifier({
            transform: function(){
                return Transform.translate(this.transitionable.get() * window.innerWidth, 0, Math.abs(this.transitionable.get() * window.innerWidth))
            }.bind(this)
        }));
        this.mods.push(new Modifier({
            transform: function(){
                return Transform.translate((this.transitionable.get()+1) * window.innerWidth, 0, Math.abs((this.transitionable.get()+1) * window.innerWidth))
            }.bind(this)
        }));
        this.mods.push(new Modifier({
            transform: function(){
                return Transform.translate((this.transitionable.get()+2) * window.innerWidth, 0, Math.abs((this.transitionable.get() + 2) * window.innerWidth))
            }.bind(this)
        }));
        for(var i = 0; i < 3; ++i){
            this.add(this.mods[i]).add(this.views[i]);
        }

//        this.lightbox1 = new Lightbox({
//            inTransform: Transform.translate(window.innerWidth, 0, 0),
//            outTransform: Transform.translate(-window.innerWidth, 0, 0)
//        });
//        this.lightbox2 = new Lightbox({
//            inTransform: Transform.translate(-window.innerWidth, 0, 0),
//            outTransform: Transform.translate(+window.innerWidth, 0, 0)
//        });
//        this.lightbox1.show(this.views[0]);
//        this.add(this.lightbox1);
//        this.add(this.lightbox2);
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

            this.transitionable.set(--this.index, {
                        duration: 300,
                        curve: 'easeOut'
            });

//            this.scrollview.goToNextPage();
            if(data.scheduledLocation){
                this.preferenceCollection.reset();
//                var str = JSON.stringfy(this.data);
                // TODO put the data on the request
                $.get("./src/data/preferenceData.json", function(data){
                    console.log(data);
                    this.preferenceCollection.add(data);
                    console.log(this.preferenceCollection);
                }.bind(this));
            }
//            this.lightbox1.hide();
//            this.lightbox2.hide();
//            this.lightbox1.show(this.views[(++this.index) % this.views.length]);
        }.bind(this));
        this.on('pre', function(data){
            this.transitionable.set(++this.index, {
                duration: 300,
                curve: 'easeOut'
            });
            console.log(data);
//            this.data.pop();
////            this.scrollview.goToPreviousPage();
//            this.lightbox1.hide();
//            this.lightbox1.show(this.views[(--this.index + this.views.length) % this.views.length])
        }.bind(this));
        this.on('confirm', function(data){
            this.index = 0;
            this.transitionable.set(this.index, {
                duration: 300,
                curve: 'easeOut'
            });
            console.log(data);

            // send request to server with data
        })
    }

    module.exports = RequestDinnerView;
});
