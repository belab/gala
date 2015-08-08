import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2
import QtMultimedia 5.0

import "game.js" as Logic

ApplicationWindow {
    id: app
    property real scaling: 3.5
    width: 224*scaling
    height: 288*scaling
//    width: 4000*0.099*scaling // fits best with the bezel
//    height: 3713*0.104*scaling
    color: "black"
    visible: true
    Audio{
        id: player
        source: "gala/gala.mp3"
        autoPlay: true
        loops: Audio.Infinite
    }

    Component.onCompleted: {
        Logic.loadComponents();
    }

    Rectangle {
        width: 224
        height: 288

        scale: app.scaling
        color: "black"
        id: background
        focus: true
        anchors.horizontalCenter: parent.horizontalCenter
//        anchors.horizontalCenterOffset: -1.1*scaling
        anchors.verticalCenter: parent.verticalCenter
//        anchors.verticalCenterOffset: 25*scaling
        Stars {
            anchors.fill: background
        }

//        DebugCanvas {
//            anchors.fill: background
//        }

        Keys.onPressed: {
            if ( event.key === Qt.Key_Left )
                Logic.leftPressed = true
            else if( event.key === Qt.Key_Right )
                Logic.rightPressed = true
            else if( event.key === Qt.Key_Enter) {
                Logic.reset();
                hud.showStage(true);
                stageHudTimer.restart();
            } else if ( event.key === Qt.Key_Escape )
                Logic.quit()
            else if( event.key === Qt.Key_0)
                Logic.fire()
        }

        Keys.onReleased: {
            if ( event.key === Qt.Key_Left )
                Logic.leftPressed = false
            else if( event.key === Qt.Key_Right )
                Logic.rightPressed = false
        }

        Item {
            id: swinger
            SequentialAnimation on scale {
                loops: Animation.Infinite
                PropertyAnimation { id: forward; to: 1.3; duration: 2000 }
                PropertyAnimation { id: backward; to: 1; duration: 2000 }
            }
        }


        Timer {
            id: stageHudTimer;
            interval: 1500;
            repeat: false
            onTriggered: {
                hud.showStage( false );
                Logic.startNewGame();
            }
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
            interval: 180;
            repeat: true
            onTriggered: {
                Logic.triggerWave()
            }
        }

        Hud{
            id: hud
            anchors.fill: parent
        }
    }

//    Image {
//        anchors.fill: parent
//        source: "galaga_bezel.png"
//    }

//    Image {
//        anchors.fill: parent
//        source: "bezel_glass.png"
//    }
}
