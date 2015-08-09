import QtQuick 2.4

Item {
    id: enemy
    property int score: 80
    property Path flypath
    property url image
    visible: false
    state: "INITIAL"
    property int image_width: file.implicitWidth/2
    property int image_height: file.implicitHeight
    property int end_x
    property int end_y
    property int start_time

    Image {
        id: file
        source: sprite.source
        visible: false
    }

    function reset() {
        state = "INITIAL"
    }

    function start() {
        start_timer.restart()
        console.log("starting timer:", start_time)
//        enemy.state = "INCOMING"
    }

//    onStateChanged: {
//        console.log("state changed:", state)
//    }

    Timer {
        id: start_timer
        interval: start_time
        running: false
        onTriggered: {
            console.log("timer triggered")
            enemy.state = "INCOMING"
        }
    }

    states: [
        State {
            name: "INITIAL"
             PropertyChanges { target: enemy; visible: false }
        },
        State {
            name: "INCOMING"
            PropertyChanges { target: enemy; visible: true }
        },
        State {
            name: "READY"
            PropertyChanges { target: enemy; visible: true }
            PropertyChanges {target: enemy; x: ((end_x - background.width/2) * swinger.scale ) + background.width/2 - image_width/2  }
            PropertyChanges {target: enemy; y: ((end_y - 30) * swinger.scale ) + 30 - image_height/2 }
        }
    ]

    transitions: [
        Transition {
            to: "INCOMING"
            SequentialAnimation {
                animations: [incoming, switch_to_ready]
            }
        },
        Transition {
            from: "INCOMING"
            to: "READY"
        }
    ]

    PropertyAction { id: switch_to_ready; target: enemy; property: "state"; value: "READY" }

    SequentialAnimation {
        id: incoming
        PathAnimation {
            anchorPoint: Qt.point(image_width/2, image_height/2)
            path:flypath
            target:enemy
            orientation:PathAnimation.TopFirst
            duration: 2000
        }
        ParallelAnimation {
            NumberAnimation {
                target: enemy
                duration: 800
                property: "x"
                to: ((end_x - background.width/2) * swinger.scale ) + background.width/2 -image_width/2
            }
            NumberAnimation {
                target: enemy
                duration: 800
                property: "y"
                to: ((end_y - 30) * swinger.scale ) + 30 - image_height/2
            }
            NumberAnimation {
                target: enemy
                duration: 800
                property: "rotation"
                to: 0
            }
        }
    }
    AnimatedSprite {
        id: sprite
        width: image_width
        height: image_height
        source: image
        frameCount: 2
        frameWidth: image_width
        frameHeight: image_height
        frameRate: 1
        interpolate : false
        loops: AnimatedSprite.Infinite
        running: true
        smooth: false
    }

    width: sprite.width
    height: sprite.height
}
