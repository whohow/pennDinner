define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface    = require('famous/surfaces/ImageSurface');

    function ItemView(options) {
        View.apply(this, arguments);
        this.model = options.model;
        this.mod = new StateModifier({
            align: [.5,.5],
            origin: [.5,.5]
        });

        this.isPreferred = false;

        this.firstSurface = new Surface({
            content: "<style type=\"text/css\">.bgimg {background-image: url(./img/event_5.png);}</style><div class=\"bgimg\" style=\"height:100px\">div with background</div>",
            size: [undefined, 100],
            properties: {
                textAlign: 'center',
                backgroundColor: 'transparent'
            }
        });
        this.add(this.firstSurface);
//     this.model.get('title') return string of title
        // content

        var titleString = "Test Data A";
        var contentString = "Test Content.";

        if(this.isPreferred) {
            this.firstSurface.setContent("<style type=\"text/css\">.bgimg {background-image: url(./img/event_3.png);}</style><div class=\"bgimg\" style=\"height:100px\">"+"test"+"</div>");
        }
        else {
            this.firstSurface.setContent("<style> .intermPreferred{width: 305px;height: 89px;margin-top: 5px;margin-left: auto;margin-right: auto;background-color: rgb(255, 153, 0);box-shadow: 1px 1px 1px #888888;}</style><div align=\"left\"; class=\"intermPreferred\"><div style=\"margin-left:10px;\"><h3 style=\"padding-top:10px;\">" + titleString + "</h3><p style=\"margin-top:-10px;\">" + contentString + "</p></div></div>");
        }

        _setListeners.call(this);


    }


    function _setListeners(){
        this.firstSurface.pipe(this._eventOutput);
        this.firstSurface.on('click', function(){
            this._eventOutput.emit("preferred")
        }.bind(this));
    }





    ItemView.prototype = Object.create(View.prototype);
    ItemView.prototype.constructor = ItemView;

    ItemView.DEFAULT_OPTIONS = {};

    module.exports = ItemView;
});
