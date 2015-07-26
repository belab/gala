import QtQuick 2.4

Item {
    id: enemy
    property int score: 80;
    property Path flypath;
    property url image;
    visible: false;

    function reset() {
        visible = false;
        animation.stop();
    }

    function start() {
        visible = true;
        animation.restart();
    }

    PathAnimation {
        anchorPoint: "7,5"
        id: animation
        path:flypath
        target:enemy
        orientation:PathAnimation.TopFirst
        duration: 2500
        endRotation: 0
    }

    AnimatedSprite {
        id: sprite
        width: 13
        height: 10
        source: image
        frameCount: 2
        frameWidth: 13
        frameHeight: 10
        frameRate: 1
        interpolate : false
        loops: AnimatedSprite.Infinite
        running: true
        smooth: false
    }

    width: sprite.width
    height: sprite.height
}
