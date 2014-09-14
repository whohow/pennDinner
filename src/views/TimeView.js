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
        this.recent = null;
        var surfaceMod = new StateModifier({
           align: [0.5, 0.117],
           origin: [.5,.5]
        });

        var firstSurface = new Surface({
            content: 'Select the day you want to attend dinner',
            size:[window.innerWidth, 40],
            properties: {
                size: [undefined, undefined],
                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });
        this.add(surfaceMod).add(firstSurface);
        var grid = new GridLayout({
            dimensions: [7, 5]
        });

        this.surfaces = [];
        grid.sequenceFrom(this.surfaces);

        for(var i = 0; i < 31; i++) {
            if(i == 0) {
                this.surfaces.push(new Surface({
                    content: "",
                    size: [window.innerWidth / 7, window.innerHeight/ 10],
                    properties: {
                        textAlign: 'center'
                    }
                }));
            }
            else {
                this.surfaces.push(new Surface({
                    content: "" + i,
                    size: [window.innerWidth / 7, window.innerHeight/ 10],
                    properties: {
                        textAlign: 'center'
                    }
                }));
            }

        }


        var stateModifier = new StateModifier({
            align: [.5 , .5],
            origin: [.5,.5],
            size:[window.innerWidth * 0.95, window.innerHeight * 0.5]
        });

        this.add(stateModifier).add(grid);

        this.nextMod = new StateModifier({
            align: [0.75, 0.9]
        });
        this.nextButton = new Surface({
            content: "<i class='fa fa fa-chevron-right fa-2x'></i>",
            size:[100, 70],
            properties:{
                zIndex: 10,

                color: 'black',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });


//        this.add(this.nextMod).add(this.nextButton);
    }

    function _setListeners(){
        this.nextButton.on('click', function(){

        }.bind(this));

        _.each(this.surfaces, function(surface){
            surface.on('click', function(){
                var string = surface.getContent();
                if(surface.getProperties().backgroundColor == "#82FA58") return ;
                this._eventOutput.emit('next', {scheduledDate: string});
                surface.setProperties({backgroundColor: "#82FA58"});
                this.recent = surface;
            }.bind(this))
        }.bind(this))

    }
    TimeView.prototype.cancel = function(){
        this.recent.setProperties({backgroundColor: 'transparent'});
    };

    module.exports = TimeView;
});
