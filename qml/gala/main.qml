import QtQuick 2.0

import "game.js" as Logic

Rectangle {
    property real scaling: 2.4
    width: 4000*0.099*scaling
    height: 3713*0.104*scaling
    color: "black"
    antialiasing: true
    Rectangle {
        width: 224
        height: 288
        scale: parent.scaling
        color: "black"
        id: background
        focus: true
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.horizontalCenterOffset: -1.1*scaling
        anchors.verticalCenter: parent.verticalCenter
        anchors.verticalCenterOffset: 25*scaling
        Stars {}

//        DebugCanvas {}

        Keys.onPressed: {
            if ( event.key === Qt.Key_Left )
                Logic.leftPressed = true
            else if( event.key === Qt.Key_Right )
                Logic.rightPressed = true
            else if( event.key === Qt.Key_Enter ) {
                console.log("Enter")
                Logic.startNewGame()
            } else if ( event.key === Qt.Key_Escape )
                Logic.quit()
        }

        Keys.onReleased: {
            if ( event.key === Qt.Key_Left )
                Logic.leftPressed = false
            else if( event.key === Qt.Key_Right )
                Logic.rightPressed = false
        }


        Timer {
            id: heartbeat;
            interval: 1;
            running: true
            repeat: true
            onTriggered: {
                Logic.move( heartbeat.interval )
            }
        }

        Timer {
            id: wavebeat;
            interval: 150;
            running: true
            repeat: true
            onTriggered: {
                Logic.triggerWave()
            }
        }

        Hud{}
    }

    Image {
        anchors.fill: parent
        source: "galaga_bezel.png"
    }

//    Image {
//        anchors.fill: parent
//        source: "bezel_glass.png"
//    }
}
