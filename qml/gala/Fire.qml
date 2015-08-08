import QtQuick 2.4
import QtMultimedia 5.0

Item {
    id: fire
    width: 3
    height: 8

    property int startX: 103;
    property int startY: -10;
    visible: animation.running

    x: startX
    y: startY
    NumberAnimation on y {
        id: animation
        running: false
        from: startY; to: -10; duration: 900
    }

    SoundEffect {
            id: playSound
            source: "Fire.wav"
        }

    Image {
        x: -1
        y: -4
        source: "fire.png"
        anchors.fill: parent
    }

    function reset() {
        animation.stop();
        y = startY;
    }

    function start(initialX, initialY) {
        startX = initialX
        startY = initialY
        animation.restart()
        playSound.play()
    }
}
