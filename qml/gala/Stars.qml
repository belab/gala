import QtQuick 2.4
import QtQuick.Particles 2.0

ParticleSystem {

    ImageParticle {
        source: "star.png"
        colorVariation: 1.0
    }

    Emitter {
        width: parent.width; height: 1
        size: 8
        sizeVariation: 5
        anchors.top: parent.top
        lifeSpan: 6000
        velocity: AngleDirection {
            angle: 90
            angleVariation: 1
            magnitude: 150
            magnitudeVariation: 100
        }
    }

    Emitter {
        width: parent.width; height: parent.height
        size: 8
        sizeVariation: 5
        anchors.top: parent.top
        lifeSpan: 1500
        lifeSpanVariation: 2000
        velocity: AngleDirection {
            angle: 90
            angleVariation: 1
            magnitude: 50
            magnitudeVariation: 25
        }
    }
}
