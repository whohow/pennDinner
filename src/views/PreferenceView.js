define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function PreferenceView() {
        View.apply(this, arguments);
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
    }

    PreferenceView.prototype = Object.create(View.prototype);
    PreferenceView.prototype.constructor = PreferenceView;

    PreferenceView.DEFAULT_OPTIONS = {};

    module.exports = PreferenceView;
});
