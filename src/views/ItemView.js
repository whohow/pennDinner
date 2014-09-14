define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface    = require('famous/surfaces/ImageSurface');

    function ItemView() {
        View.apply(this, arguments);
        var firstSurface = new Surface({
            content: "<style type=\"text/css\">.bgimg {background-image: url(./img/event_1.png);}</style><div class=\"bgimg\" style=\"height:100px\">div with background</div>",
            size: [undefined, 100],
            properties: {
                size: [undefined, undefined],
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });
        this.add(firstSurface);
    }


    ItemView.prototype = Object.create(View.prototype);
    ItemView.prototype.constructor = ItemView;

    ItemView.DEFAULT_OPTIONS = {};

    module.exports = ItemView;
});
