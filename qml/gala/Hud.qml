import QtQuick 2.4

Item {
    property int score: 0
    property int lifeCount: 4
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
            text: score
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

    function showStage(visible) {
        stageText.visible = visible;
    }

    function showLifes(visible) {
        lifes.visible = visible;
    }


    Text {
        id: stageText
        visible: false
        anchors.centerIn: parent
        text: "STAGE 1"
        font.pointSize: 6
        font.bold: true
        color: "#55CCCC"
    }

    Row {
        id: lifes
        visible: false
        anchors.leftMargin: 2
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        spacing: 2
        Repeater {
            model: lifeCount
            Life{

            }
        }

    }
}
