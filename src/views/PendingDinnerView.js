define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function PendingDinnerView() {
        View.apply(this, arguments);
        var firstSurface = new Surface({
            content: 'pending',
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);
    }

    PendingDinnerView.prototype = Object.create(View.prototype);
    PendingDinnerView.prototype.constructor = PendingDinnerView;

    PendingDinnerView.DEFAULT_OPTIONS = {};

    module.exports = PendingDinnerView;
});
