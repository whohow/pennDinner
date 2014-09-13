define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface');
    var InputSurface  = require('famous/surfaces/InputSurface');

    function LoginView() {
        View.apply(this, arguments);
        createBacking.call(this);
        _createButton.call(this);
        _setListeners.call(this);
    }


    var createBacking = function() {
        var backSurface = new ImageSurface({
            size: [window.innerWidth, window.innerHeight],
            content : './img/hippo.jpg',
            properties : {
                pointerEvents : 'none'
            }
        });

        this.add(backSurface);
    };

    function _createButton() {
        this.hamburgerSurface = new ImageSurface({
            size: [40, 40],
            content: 'img/plate.png'
        });

        var stateModifierSubmit = new StateModifier({
            origin: [0.5, 0],
            align: [0.9, 0.5],
            opacity: 0.8,
            transform: Transform.translate(0, window.innerHeight * 0.355, 0)
        });

        this.inputSurface = new InputSurface({
            size: [174, 35],

            content: 'img/hamburger.png',
            properties: {
                'background-color':'transparent',
                border: 'none',
                'border-color': 'transparent',
                'font-size': '20px'
            }
        });

        var stateModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0.5],
            opacity: 0.8,
            transform: Transform.translate(5, window.innerHeight * 0.33, 0)
        });

        this.inputSurface2 = new InputSurface({
            size: [104, 35],
            content: 'img/hamburger.png',
            properties: {
                'background-color':'transparent',
                border: 'none',
                'border-color': 'transparent',
                'font-size': '20px'
            }
        });

        var stateModifier2 = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0.5],
            opacity: 0.8,
            transform: Transform.translate(3, window.innerHeight * 0.39, 0)
        });

        this.add(stateModifier).add(this.inputSurface);
        this.add(stateModifier2).add(this.inputSurface2);
        this.add(stateModifierSubmit).add(this.hamburgerSurface);
    };


    function _setListeners(){
        this.hamburgerSurface.pipe(this._eventOutput);
        this.hamburgerSurface.on('click', function(){
            this._eventOutput.emit("logedIn", {userName: this.inputSurface.getValue(), passWord: this.inputSurface2.getValue()})
        }.bind(this));

    }

    LoginView.prototype = Object.create(View.prototype);
    LoginView.prototype.constructor = LoginView;

    LoginView.DEFAULT_OPTIONS = {};

    module.exports = LoginView;
});
