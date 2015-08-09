import QtQuick 2.4

Path {
    id: myPath
    property int endX: 103;
    property int endY: 70;

    startX: 224
    startY: 270
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
    //PathLine { x: myPath.endX; y: 120 }
//    PathCurve{ x: myPath.endX; y: myPath.endY }
}
