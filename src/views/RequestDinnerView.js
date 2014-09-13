define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var TimeView  = require('views/TimeView');
    var LocationView  = require('views/LocationView');
    var PreferenceView  = require('views/PreferenceView');


    function RequestDinnerView() {
        View.apply(this, arguments);
        var firstSurface = new Surface({
            content: 'Request dinner View',
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);
        this.locationView = new LocationView();
        this.timeView = new TimeView();
        this.PreferenceView = new PreferenceView();
    }

    RequestDinnerView.prototype = Object.create(View.prototype);
    RequestDinnerView.prototype.constructor = RequestDinnerView;

    RequestDinnerView.DEFAULT_OPTIONS = {};

    module.exports = RequestDinnerView;
});
