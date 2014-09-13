define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function ItemView() {
        View.apply(this, arguments);
        var firstSurface = new Surface({
            content: 'item',
            size: [undefined, 100],
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#FA5C4F'
            }
        });
        this.add(firstSurface);
    }

    ItemView.prototype = Object.create(View.prototype);
    ItemView.prototype.constructor = ItemView;

    ItemView.DEFAULT_OPTIONS = {};

    module.exports = ItemView;
});
