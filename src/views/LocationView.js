define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function LocationView() {
        View.apply(this, arguments);
        var firstSurface = new Surface({
            content : './img/band.png',
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);
    }

    LocationView.prototype = Object.create(View.prototype);
    LocationView.prototype.constructor = LocationView;

    LocationView.DEFAULT_OPTIONS = {};

    module.exports = LocationView;
});
