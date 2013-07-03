import QtQuick 2.0

Item {
    id: butterfly
    property bool started: false
    property int endX: 103;
    property int endY: 70;
    visible: started

    PathFromTopRight {
        id:myPath
        endX: butterfly.endX;
        endY: butterfly.endY;
    }

    PathAnimation {
        path:myPath
        target:butterfly
        running:started
        orientation:PathAnimation.TopFirst
        duration:3000
        endRotation: 0
    }


    AnimatedSprite {
        id: sprite
        width: 13
        height: 10
//        rotation: 90
        x: -7
        y: -5
        source: "butterfly.png"
        frameCount: 2
        frameWidth: 13
        frameHeight: 10
        frameRate: 1
        interpolate : false
        loops: AnimatedSprite.Infinite
        running: true
        smooth: false
    }
}
