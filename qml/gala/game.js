var leftPressed = false;
var rightPressed = false;
var started = false;
var fighterComponent = Qt.createComponent("Fighter.qml");
var beeComponenet = Qt.createComponent("Bee.qml");
var butterflyComponenet = Qt.createComponent("Butterfly.qml");
var fighter = null;
var enemies = [];
var butterflies = [101,81,61,41,21];
var bees = [123,143,163,183,203];
var waveCount = 0;
var wavePause = 20;

function startNewGame() {
    if( started === true ) {
        fighter.destroy();
        return;
    }
    console.log("start game");
    while(fighterComponent.status !== Component.Ready ) {
        if(fighterComponent.status === Component.Error) {
            console.log(fighterComponent.errorString());
            break;
        }
        else
            console.log("Still loading ship");
    }
    while(beeComponenet.status !== Component.Ready ) {
        if(beeComponenet.status === Component.Error) {
            console.log(beeComponenet.errorString());
            break;
        }
        else
            console.log("Still loading bee");
    }

    while(butterflyComponenet.status !== Component.Ready ) {
        if(butterflyComponenet.status === Component.Error) {
            console.log(butterflyComponenet.errorString());
            break;
        }
        else
            console.log("Still loading butterfly");
    }

    console.log("creating ship");
    fighter = fighterComponent.createObject(background);
    if (fighter === null) {
        console.log("error creating ship");
        console.log(fighterComponent.errorString());
    }

    fighter.x = background.width/2-7;
    fighter.y = background.height-15;

    for( var i = 0; i < 5; i++) {
        enemies.push(beeComponenet.createObject(background, {"endX": bees[i], "endY": 70 }));
    }
    for( var i = 0; i < 5; i++) {
        enemies.push(butterflyComponenet.createObject(background, {"endX": butterflies[i], "endY": 70 }));
    }
//    enemies.push(beeComponenet.createObject(background, {"endX": 123, "endY": 70 }));
//    enemies.push(beeComponenet.createObject(background, {"endX": 143, "endY": 70 }));
//    enemies.push(beeComponenet.createObject(background, {"endX": 163, "endY": 70 }));
//    enemies.push(beeComponenet.createObject(background, {"endX": 183, "endY": 70 }));
//    enemies.push(beeComponenet.createObject(background, {"endX": 203, "endY": 70 }));


//    enemies.push(butterflyComponenet.createObject(background, {"endX": 101, "endY": 70 }));
//    enemies.push(butterflyComponenet.createObject(background, {"endX": 81, "endY": 70 }));
//    enemies.push(butterflyComponenet.createObject(background, {"endX": 61, "endY": 70 }));
//    enemies.push(butterflyComponenet.createObject(background, {"endX": 41, "endY": 70 }));
//    enemies.push(butterflyComponenet.createObject(background, {"endX": 21, "endY": 70 }));

//    var animation = Qt.createQmlObject(
//                'import QtQuick 2.0; NumberAnimation { id:motion; from: 0; to: 1; duration: 3000 }',
//        background, "dynamicSnippet1");
//    animation.destroy(3000);
//    animation.targets = enemies;
//    animation.property = 'advance';

//    animation.start();

    console.log("ready");

    started = true;
}

function quit() {
    started = false;
    fighter = null;
    butterflyComponenet = 0;
    console.log("quit");
    Qt.quit()
}

function move( time ) {
    if( !started )
        return;
    if( leftPressed && rightPressed )
        return;
    if( leftPressed )
        fighter.x -= 2;
    if( rightPressed )
        fighter.x += 2;
    if( fighter.x < 0 )
        fighter.x = 0;
    else if( fighter.x > background.width-15 )
        fighter.x = background.width-15;
//    ship.rotation = (ship.rotation - 10) % 360
}

function triggerWave() {
    if( !started )
        return;

    if( wavePause > 0 ) {
        wavePause--;
        return;
    }

    if( waveCount < 5 ){
        enemies[waveCount].started = true;
        waveCount++;
        if( waveCount%5==0 ) {
            wavePause = 20;
        }

        return;
    }

    if( waveCount < 10 ){
        enemies[waveCount].started = true;
        waveCount++;
        return;
    }

}
