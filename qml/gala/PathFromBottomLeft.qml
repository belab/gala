import QtQuick 2.4

Path {
    id: myPath
    property int endX
    property int endY

    startX: 0
    startY: 260
    PathLine { x: 100; y: 180 }
    PathArc {
            x: 50; y: 160
            radiusX: 30; radiusY: 30
            useLargeArc: true
            direction: PathArc.Counterclockwise
    }
    PathArc {
            x: 110; y: 150
            radiusX: 30; radiusY: 30
            direction: PathArc.Counterclockwise
    }
    PathCurve{ x: myPath.endX; y: myPath.endY+5 }
}
