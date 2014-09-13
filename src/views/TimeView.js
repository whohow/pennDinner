define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function TimeView() {
        View.apply(this, arguments);
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
    }

    TimeView.prototype = Object.create(View.prototype);
    TimeView.prototype.constructor = TimeView;

    TimeView.DEFAULT_OPTIONS = {};

    module.exports = TimeView;
});
