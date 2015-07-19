import QtQuick 2.4

Item {
    Item {
        x:20
        y:0
        Text {
            text: "1UP"
    //            font.family: "Helvetica"
            font.pointSize: 5
            font.bold: true
            color: "red"
        }
    }

    Item {
        x:85
        y:0
        Text {
            text: "HIGH SCORE"
            font.pointSize: 5
            font.bold: true
            color: "red"
        }
    }

    Item {
        x:30
        y:7
        Text {
            text: "00"
            font.pointSize: 5
            font.bold: true
            color: "white"
        }
    }

    Item {
        x:99
        y:7
        Text {
            text: "20000"
            font.pointSize: 5
            font.bold: true
            color: "white"
        }
    }
}
