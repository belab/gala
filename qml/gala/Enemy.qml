import QtQuick 2.4

Item {
    id: enemy
    property int score: 80
    property Path flypath
    property url image
    visible: false
    state: "INITIAL"
    property int end_x
    property int end_y
    Item {
        id: proxy
    }

    function reset() {
        state = "INITIAL"
    }

    function start() {
        enemy.state = "INCOMING"
    }

//    onStateChanged: {
//        console.log("state changed:", state)
//    }

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
            PropertyChanges {target: enemy; x: ((end_x - background.width/2) * swinger.scale ) + background.width/2 -7  }
            PropertyChanges {target: enemy; y: ((end_y - 30) * swinger.scale ) + 30 - 5 }
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
            anchorPoint: "7,5"
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
                to: ((end_x - background.width/2) * swinger.scale ) + background.width/2 -7
            }
            NumberAnimation {
                target: enemy
                duration: 800
                property: "y"
                to: ((end_y - 30) * swinger.scale ) + 30 - 5
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
