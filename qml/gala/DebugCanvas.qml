import QtQuick 2.4

Canvas {
    id: canvas
//    property list<Path> pathList: []
//            State { name: "a1" },
//            State { name: "a2" },
////            PathFromTopLeft {id: p1},
////            PathFromTopRight {id: p2}
//        ]
//    pathList: [
        PathFromTopLeft {id: p1}
        PathFromTopRight {id: p2}
//    ]
    onPaint: {
        var ctx = canvas.getContext('2d');
        ctx.reset();
        ctx.strokeStyle = Qt.rgba(0.7, 1, 0.3, 1.0);
        ctx.path = p1
        ctx.stroke();
        ctx.path = p2
        ctx.stroke();
//        for( var i = 0; i < pathList.length; i++ ) {
//            ctx.path = pathList[i];
//            ctx.stroke();
//        }

//        ctx.lineTo(95, 0);
//        ctx.lineTo(112,30);
//        ctx.lineTo(200,135);
//        ctx.lineTo(135,170);
//        ctx.lineTo(123,80);
//        ctx.lineTo(123,70);
//        ctx.lineTo(190, 144);
//        ctx.lineTo(190, 190);
//        ctx.lineTo(170, 200);
//        ctx.lineTo(150, 190);
//        ctx.lineTo(135, 170);
//        ctx.lineTo(130, 144);
//        ctx.path = path1;
//        ctx.stroke();
//        ctx.path = path2;
//        ctx.stroke();

//        ctx.strokeStyle = Qt.rgba(0.3, 0.7, 1, 1.0);
//        ctx.path = halfHeart;
//        ctx.stroke();

//        ctx.strokeStyle = Qt.rgba(1, 0.3, 0.7, 1.0);
//        ctx.path = myPath;
//        ctx.stroke();

    }
}
