
cc.Class({
    extends: cc.Component,
    init(){
        this.node.x = 360;
        this.node.rotation=0;
    },
    move(ballPositionX){
        this.node.x=ballPositionX
    },
    onLoad() {
        this.node.parent.on("touchmove", (event) => {
            let touchPoint = this.node.parent.convertToNodeSpace(event.getLocation());
            let nodePoint = this.node.position;
            let angle = Math.round(Math.atan2(touchPoint.y - nodePoint.y, touchPoint.x - nodePoint.x) * 57.2956);
            if (-70<angle&&angle<0) {
                return;
            } else if (-180<angle&&angle<-70) {
                return;
            } else {
                this.node.rotation =90-angle;
            }
        });
    },
});