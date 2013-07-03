import QtQuick 2.0

import "game.js" as Logic

Rectangle {
    property real scaling: 3
    width: 224*scaling+100
    height: 288*scaling+100
    Rectangle {
        width: 224
        height: 288
        scale: parent.scaling
        color: "black"
        id: background
        focus: true
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter
        Stars {}

        MyCanvas {
            }
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
            interval: 16;
            running: true
            repeat: true
            onTriggered: {
                Logic.move( heartbeat.interval )
            }
        }

        Timer {
            id: wavebeat;
            interval: 180;
            running: true
            repeat: true
            onTriggered: {
                Logic.triggerWave()
            }
        }

        Hud{}


    }
}
