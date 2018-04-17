
const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,
    properties: {
        gameView: require('GameView'),
        ballLayout: require('BallLayout'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
        sightLine:require('SightLine')
        
    },
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        window.GameCtl=this;
        this.startGame();

    },
    init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameView.init(this);
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber);
        this.overPanel.init(this);
    },
    ballRestart(){
        this.ballLayout.init(this.gameModel.initBalls);
    },
    startGame() {
        this.init();
    },
    gameOver(){
        this.overPanel.init(this)
    },
    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.bricksNumber === 0);
    },
    moveBricks(){
        this.brickLayout.moveBricks();
    },
    addBricks(n){
        this.brickLayout.addBricks(n);
    },
    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.gameModel.addScore(1);
        this.gameModel.minusBrick(1);
        this.gameView.updateScore(this.gameModel.score);
    },
    
    onBallContactGround(ballNode, groundNode) {
        ballNode.parent=null;
        this.gameModel.groundBall(1,ballNode.position.x)
        
    },
    onBallContactPaddle(ballNode, paddleNode) {
        ballNode.parent=null;
        this.gameModel.groundBall(1,paddleNode.position.x)
    },

    onBallContactWall(ballNode, brickNode) {

    },
    onBallContactSumBrick(ballNode,sumBrick){
        sumBrick.parent=null;
        this.gameModel.minusBrick(1);
        this.gameModel.addBall(1);
    },
    onDestroy() {
        this.physicsManager.enabled = false;
    }

});