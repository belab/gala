import QtQuick 2.4

Path {
    id: myPath
    property int endX
    property int endY

    startX: 224
    startY: 260
    PathLine { x: 124; y: 180 }
    PathArc {
            x: 174; y: 160
            radiusX: 30; radiusY: 30
            useLargeArc: true
            direction: PathArc.Clockwise
    }
    PathArc {
            x: 114; y: 150
            radiusX: 30; radiusY: 30
            direction: PathArc.Clockwise
    }
    PathCurve{ x: myPath.endX; y: myPath.endY+5 }
}
