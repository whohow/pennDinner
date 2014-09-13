define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function LocationView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    function _createViews(){
        var firstSurface = new Surface({
            content: 'Time View',
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);

        this.nextMod = new StateModifier({
            align: [0.7, 0.7]
        });
        this.nextButton = new Surface({
            content: "next",
            size:[100, 70],
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
            this._eventOutput.emit('next', {location: "some location"});
        }.bind(this));
        this.preButton.on('click', function(){
            this._eventOutput.emit('pre', "cancelLocation");
        }.bind(this));

    }

    LocationView.prototype = Object.create(View.prototype);
    LocationView.prototype.constructor = LocationView;

    LocationView.DEFAULT_OPTIONS = {};

    module.exports = LocationView;
});
