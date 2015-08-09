import QtQuick 2.4

Path {
    id: myPath
    property int endX: 103;
    property int endY: 70;

    startX: 0
    startY: 270
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
//    PathLine { x: 100; y: 70 }
//    PathArc {
//            x: 135; y: 170
//            radiusX: 25; radiusY: 25
//            useLargeArc: true
//            direction: PathArc.Clockwise
//    }
    //PathLine { x: myPath.endX; y: 120 }
//    PathCurve{ x: myPath.endX; y: myPath.endY }
}
