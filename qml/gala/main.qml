import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2
import QtMultimedia 5.0

import "game.js" as Logic

ApplicationWindow {
    id: app
    property real scaling: 3.5
    property int life_count: 3
    property int stage: 1
    width: 224*scaling
    height: 288*scaling
//    width: 4000*0.099*scaling // fits best with the bezel
//    height: 3713*0.104*scaling
    color: "black"
    visible: true
    Audio{
        id: player
        source: "gala/assets/gala.mp3"
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
            property bool forward: true
            property int duration: 2000
            property real max_scaling_dist: 0.4
            property real max_scaling: 1 + max_scaling_dist
            property real scale_zero: max_scaling-(max_scaling-1)/2
            SequentialAnimation on scale {
                id: swinger_animation
                loops: Animation.Infinite
                PropertyAction {target: swinger; property:"forward"; value: true}
                PropertyAnimation {from: 1; to: swinger.max_scaling; duration: swinger.duration}
                PropertyAction {target: swinger; property:"forward"; value: false}
                PropertyAnimation {to: 1; duration: swinger.duration}
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
