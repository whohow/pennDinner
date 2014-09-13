define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function PreferenceView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }


    PreferenceView.prototype = Object.create(View.prototype);
    PreferenceView.prototype.constructor = PreferenceView;

    PreferenceView.DEFAULT_OPTIONS = {};

    function _createViews(){
        var firstSurface = new Surface({
            content: 'Preference View',
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);

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
            console.log("?????????????????")
            this._eventOutput.emit('confirm', {preference: "some "});
        }.bind(this));
        this.preButton.on('click', function(){
            this._eventOutput.emit('pre', "cancel Pre");
        }.bind(this))

    }

    module.exports = PreferenceView;
});
