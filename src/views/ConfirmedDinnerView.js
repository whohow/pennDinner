define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function ConfirmedDinnerView() {
        View.apply(this, arguments);
        var firstSurface = new Surface({
            content: 'Confirmed',
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);
    }

    ConfirmedDinnerView.prototype = Object.create(View.prototype);
    ConfirmedDinnerView.prototype.constructor = ConfirmedDinnerView;

    ConfirmedDinnerView.DEFAULT_OPTIONS = {};

    module.exports = ConfirmedDinnerView;
});
