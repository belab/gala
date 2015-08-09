import QtQuick 2.4

Item {
    id: enemy
    property int score: 80
    property Path flypath
    property url image
    state: "INITIAL"
    property int image_width: file.implicitWidth/2
    property int image_height: file.implicitHeight
    property int end_x
    property int end_y
    property int start_time
    property int attack_time
    property real blend_value: 0

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
        attack_timer.restart()
    }


//    onStateChanged: {
//        console.log("state changed:", state)
//    }

    NumberAnimation on blend_value {
        id: blending
        from: 1000; to: 0
    }

    Timer {
        id: start_timer
        interval: start_time
        running: false
        onTriggered: {
            enemy.state = "INCOMING"
        }
    }

    Timer {
        id: attack_timer
        interval: attack_time
        running: false
        onTriggered: {
            var duration = 0
            if(swinger.forward) {
                if(swinger.scale > swinger.scale_zero) {
                    duration = swinger.duration/2 + swinger.duration/2*((swinger.max_scaling-swinger.scale)/swinger.max_scaling_dist*0.5)
                } else {
                    duration = swinger.duration/2*((swinger.scale-1.0)/swinger.max_scaling_dist*0.5)
                }
            } else {
                if(swinger.scale > swinger.scale_zero) {
                    duration = swinger.duration/2*((swinger.scale-swinger.scale_zero)/swinger.max_scaling_dist*0.5)
                } else {
                    duration = swinger.duration/2 + swinger.duration/2*((swinger.scale-1.0)/swinger.max_scaling_dist*0.5)
                }
            }
            wait_for_swinging.interval = duration
            wait_for_swinging.restart()

        }
    }
    Timer {
        id: wait_for_swinging
        running: false
        onTriggered: {
            swinger.scale=1.0
            swinger_animation.restart()
            if(enemy.state !== "INITIAL") {
                enemy.state = "ATTACKING"
            }
        }
    }

    function swingX() {
        return end_x + 90 * (swinger.scale_zero-swinger.scale)
    }

    function scaleX() {
        return ((end_x + image_width/2 - background.width/2) * swinger.scale ) + background.width/2 - image_width/2
    }

    function scaleY() {
        return ((end_y + image_height/2 - 30) * swinger.scale ) + 30 - image_height/2
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
            name: "IDLE"
            PropertyChanges {target: enemy; x: swingX() }
            PropertyChanges {target: enemy; y: end_y }
        },
        State {
            name: "ATTACKING"
            PropertyChanges {
                target: enemy
                x: scaleX()
//                x: blending.running? (swingX() * blend_value + scaleX() * (1000-blend_value))/1000 : scaleX()
            }
            PropertyChanges {
                target: enemy
                y: scaleY()
//                y: blending.running? (end_y * blend_value + scaleY() * (1000-blend_value))/1000 : scaleY()
            }
        }

    ]

    transitions: [
        Transition {
            to: "INCOMING"
            SequentialAnimation {
                animations: [incoming, switch_to_idle]
            }
        },
        Transition {
            from: "INCOMING"
            to: "IDLE"
        }
    ]

    PropertyAction { id: switch_to_idle; target: enemy; property: "state"; value: "IDLE" }

    SequentialAnimation {
        id: incoming
        PathAnimation {
            anchorPoint: Qt.point(image_width/2, image_height/2)
            path:flypath
            target:enemy
            orientation:PathAnimation.TopFirst
            duration: 2000
            orientationExitDuration: 800
            endRotation: 0
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
