/*** AppView.js ***/

define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Easing          = require('famous/transitions/Easing');
    var Transitionable  = require('famous/transitions/Transitionable');
    var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

    var PageView      = require('views/PageView');
    var MenuView      = require('views/MenuView');
    var StripData     = require('data/StripData');
    var EmptyView      = require('views/EmptyView');
    var LoginView      = require('views/LoginView');



    function AppView() {
        this.isLoged = false;
        View.apply(this, arguments);

        this.menuToggle = false;
        this.pageViewPos = new Transitionable(0);

        _createPageView.call(this);
        _createMenuView.call(this);
        if(! this.isLoged){
            _createLoginView.call(this);
            _setLoginListeners.call(this);
        }

        _setListeners.call(this);
        _handleSwipe.call(this);

    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        openPosition: 276,
        transition: {
            duration: 300,
            curve: 'easeOut'
        },
        posThreshold: 138,
        velThreshold: 0.75
    };

    function _createPageView() {
        this.pageView = new PageView();
        this.pageModifier = new Modifier({
            transform: function() {
                return Transform.translate(this.pageViewPos.get(), 0, 0);
            }.bind(this)
        });

        this.add(this.pageModifier).add(this.pageView);
    }

    function _createMenuView() {
        this.menuView = new MenuView({ stripData: StripData });

        var menuModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(menuModifier).add(this.menuView);
    }

    function _setListeners() {
        this.pageView.on('menuToggle', this.toggleMenu.bind(this));
        this.menuView.on('stripViewClicked', function(index){
            if(index == 0){
                // do request dinner
                this.pageView.showRequestDinnerView();
            }else if (index == 1){
                // show confirmed card
                this.pageView.showConfirmedDinnerView();
            }else if(index == 2){
                // show pending card
                this.pageView.showPendingDinnerView();
            }else{
//                this.pageView.showSettingView.call(this);
            }
            this.toggleMenu();
        }.bind(this));
    }

    function _setLoginListeners() {
        this.loginView.on('logedIn', function(data){

            if(_checkLogin(data.userName, data.passWord)) {
                this.loginMod.setTransform(Transform.translate(-500, 0, 0), {duration: 1000, curve: 'easeOut'});
            }
            else {
                this.loginMod.setTransform(Transform.translate(-500, 0, 0), {duration: 1000, curve: 'easeOut'});
            }

        }.bind(this));
    }

    function _checkLogin(username, password) {
        if(username === password) {
            return true;
        }
        else {
            return false;
        }
    }

    function _handleSwipe() {
        var sync = new GenericSync(
            ['mouse', 'touch'],
            {direction : GenericSync.DIRECTION_X}
        );

        this.pageView.pipe(sync);

        sync.on('update', function(data) {
            var currentPosition = this.pageViewPos.get();
            if(currentPosition === 0 && data.velocity > 0) {
                this.menuView.animateStrips();
            }

            this.pageViewPos.set(Math.max(0, currentPosition + data.delta));
        }.bind(this));

        sync.on('end', (function(data) {
            var velocity = data.velocity;
            var position = this.pageViewPos.get();

            if(this.pageViewPos.get() > this.options.posThreshold) {
                if(velocity < -this.options.velThreshold) {
                    this.slideLeft();
                } else {
                    this.slideRight();
                }
            } else {
                if(velocity > this.options.velThreshold) {
                    this.slideRight();
                } else {
                    this.slideLeft();
                }
            }
        }).bind(this));
    }

    function _createLoginView(){
        this.loginView = new LoginView();
        this.loginMod = new StateModifier({
            transform: Transform.translate(0, 0, 10)
        });
        this.add(this.loginMod).add(this.loginView);
    }
    AppView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.slideLeft();
        } else {
            this.slideRight();
            this.menuView.animateStrips();
        }
    };

    AppView.prototype.slideLeft = function() {
        this.pageViewPos.set(0, this.options.transition, function() {
            this.menuToggle = false;
        }.bind(this));
    };

    AppView.prototype.slideRight = function() {
        this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
            this.menuToggle = true;
        }.bind(this));
    };

    module.exports = AppView;
});
