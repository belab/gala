import QtQuick 2.4

Item {    
    id: bee
    property bool started: false
    property int endX: 103;
    property int endY: 70;
    // todo use states
    visible: started

    PathFromTopLeft {
        id:myPath
        endX: bee.endX;
        endY: bee.endY;
    }

    PathAnimation {
        path:myPath
        target:bee
        running: bee.started
        orientation:PathAnimation.TopFirst
        duration:2500
        endRotation: 0
    }

    AnimatedSprite {
        id: sprite
        width: 13
        height: 10
        x: -7
        y: -5
        source: "bee.png"
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
