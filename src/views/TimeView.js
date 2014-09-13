define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout    = require('famous/views/GridLayout')

    function TimeView() {
        View.apply(this, arguments);
        _createViews.call(this);
        _setListeners.call(this);
    }

    TimeView.prototype = Object.create(View.prototype);
    TimeView.prototype.constructor = TimeView;

    TimeView.DEFAULT_OPTIONS = {};

    function _createViews(){
        var grid = new GridLayout({
            dimensions: [7, 4]
        });

        var surfaces = [];
        grid.sequenceFrom(surfaces);

        for(var i = 0; i < 28; i++) {
            surfaces.push(new Surface({
                content: "panel " + (i + 1),
                size: [window.innerWidth / 7, window.innerHeight/ 10],
                properties: {
                    textAlign: 'center'
                }
            }));
        }

        var stateModifier = new StateModifier({
            align: [.5 , .4],
            origin: [.5,.5],
            size:[window.innerWidth, window.innerHeight * 0.6]
        });

        this.add(stateModifier).add(grid);

        this.nextMod = new StateModifier({
            align: [0.75, 0.85]
        });
        this.nextButton = new Surface({
            content: "<i class='fa fa fa-chevron-right fa-4x'></i>",
            size:[100, 100],
            properties:{
                zIndex: 10,

                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });


        this.add(this.nextMod).add(this.nextButton);
    }

    function _setListeners(){
        this.nextButton.on('click', function(){
            this._eventOutput.emit('next', {scheduledDate: "some date"});
        }.bind(this));
//        this.preButton.on('click', function(){
//            this._eventOutput.emit('pre', "cancelDate");
//        }.bind(this))

    }

    module.exports = TimeView;
});
