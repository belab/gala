var leftPressed = false;
var rightPressed = false;
var started = false;
var fighterComponent = Qt.createComponent("Fighter.qml");
var beeComponent = Qt.createComponent("Bee.qml");
var butterflyComponent = Qt.createComponent("Butterfly.qml");
var fighter = null;
var enemies = [];
var firstWave = [
            [ [beeComponent,123 ],[butterflyComponent,101] ],
            [ [beeComponent,143 ],[butterflyComponent,81] ],
            [ [beeComponent,163 ],[butterflyComponent,61] ],
            [ [beeComponent,183 ],[butterflyComponent,41] ],
            [ [beeComponent,203 ],[butterflyComponent,21] ]
        ];
var waveCount = 0;

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
    while(beeComponent.status !== Component.Ready ) {
        if(beeComponent.status === Component.Error) {
            console.log(beeComponent.errorString());
            break;
        }
        else
            console.log("Still loading bee");
    }

    while(butterflyComponent.status !== Component.Ready ) {
        if(butterflyComponent.status === Component.Error) {
            console.log(butterflyComponent.errorString());
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

    for( var i = 0; i < firstWave.length; i++ ) {
        var entry = firstWave[i];
        for( var j = 0; j < entry.length; j++ ) {
            enemies.push(entry[j][0].createObject(background, {"endX": entry[j][1], "endY": 70 }));
        }
    }

    console.log("ready");

    started = true;
}

function quit() {
    started = false;
    fighter = null;
    butterflyComponent = 0;
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
}

function triggerWave() {
    if( !started )
        return;

    if( waveCount < enemies.length ){
        enemies[waveCount++].started = true;
        enemies[waveCount++].started = true;
    }
}
