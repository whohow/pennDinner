define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var ImageSurface    = require('famous/surfaces/ImageSurface');
    var Lightbox = require('famous/views/Lightbox');

    var RequestDinnerView = require('views/RequestDinnerView');
    var ConfirmedDinnerView = require('views/ConfirmedDinnerView');
    var PendingDinnerView = require('views/PendingDinnerView');
    var EventsList = require('collections/EventsList');

    function PageView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);

        _setListeners.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44
    };

    PageView.prototype.showRequestDinnerView = function(){
        this.lightbox.show(this.requestDinnerView);
    };
    PageView.prototype.showConfirmedDinnerView = function(){
        this.lightbox.show(this.confirmedDinnerView);
    };
    PageView.prototype.showPendingDinnerView = function(){
        this.lightbox.show(this.pendingDinnerView);
    };

    function _createBacking() {
        var backing = new Surface({
            properties: {
                // ------------------------- color
                backgroundColor: 'white',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }
        });

        this.add(backing);
    }

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/hamburger.png'
        });

        var searchSurface = new ImageSurface({
            size: [320, 44],
            content : 'img/nav-bar.png'
        });

        var iconSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/icon.png'
        });

        var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5],
            transform: Transform.translate(0, 0, 2)
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5],
            transform: Transform.translate(0, 0, 1.5)
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

//        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(searchModifier).add(searchSurface);
//        this.layout.header.add(iconModifier).add(iconSurface);
    }

    function _createBody() {
        this.confirmedCollection = new EventsList();
        this.pendingCollection = new EventsList();
        this.requestDinnerView = new RequestDinnerView();
        this.confirmedDinnerView = new ConfirmedDinnerView({collection: this.confirmedCollection});
        this.pendingDinnerView = new PendingDinnerView({collection: this.pendingCollection});
        window.pendingCollection = this.pendingCollection;
        window.confirmedCollection = this.confirmedCollection;
        this.lightbox = new Lightbox({
            inTransform: Transform.translate(0, 0),
            outTransform: Transform.translate(0, 0)
        });
        this.layout.content.add(this.lightbox);
        this.lightbox.show(this.requestDinnerView);
//        setTimeout(function(){
//            $.get('src/data/preferenceData.json', function(data){
//                this.confirmedCollection.add(data);
//            }.bind(this))
//        }.bind(this), 1000);
//
//        setTimeout(function(){
//            $.get('src/data/preferenceData.json', function(data){
//                this.pendingCollection.add(data);
//            }.bind(this))
//        }.bind(this), 1000);
    }

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.requestDinnerView.views[0].pipe(this._eventOutput);
    }

    module.exports = PageView;
});
