var fighterComponent = Qt.createComponent("Fighter.qml");
var enemyComponent = Qt.createComponent("Enemy.qml");
var lifeComponent = Qt.createComponent("Life.qml");
var fireComponent = Qt.createComponent("Fire.qml");
var pathFromLeftComponent = Qt.createComponent("PathFromTopLeft.qml");
var pathFromRightComponent = Qt.createComponent("PathFromTopRight.qml");

var fighter = null;
var enemies = [];
var lifes = [];
var bullets = [];
var firstWave = [
            [ ["bee.png",123,pathFromLeftComponent],["butterfly.png",101,pathFromRightComponent] ],
            [ ["bee.png",143,pathFromLeftComponent],["butterfly.png",81, pathFromRightComponent] ],
            [ ["bee.png",163,pathFromLeftComponent],["butterfly.png",61, pathFromRightComponent] ],
            [ ["bee.png",183,pathFromLeftComponent],["butterfly.png",41, pathFromRightComponent] ],
            [ ["bee.png",203,pathFromLeftComponent],["butterfly.png",21, pathFromRightComponent] ]
        ];

var leftPressed = false;
var rightPressed = false;
var started = false;
var waveCount = 0;
var score = 0;

function loadComponents() {
    while(fighterComponent.status !== Component.Ready ) {
        if(fighterComponent.status === Component.Error) {
            console.log(fighterComponent.errorString());
            break;
        }
        else
            console.log("Still loading ship");
    }

    while(enemyComponent.status !== Component.Ready ) {
        if(enemyComponent.status === Component.Error) {
            console.log(enemyComponent.errorString());
            break;
        }
        else
            console.log("Still loading butterfly");
    }

    while(lifeComponent.status !== Component.Ready ) {
        if(lifeComponent.status === Component.Error) {
            console.log(lifeComponent.errorString());
            break;
        }
        else
            console.log("Still loading life");
    }

    while(fireComponent.status !== Component.Ready ) {
        if(fireComponent.status === Component.Error) {
            console.log(fireComponent.errorString());
            break;
        }
        else
            console.log("Still loading fire");
    }

    while(pathFromLeftComponent.status !== Component.Ready ) {
        if(pathFromLeftComponent.status === Component.Error) {
            console.log(pathFromLeftComponent.errorString());
            break;
        }
        else
            console.log("Still loading path from left");
    }

    while(pathFromRightComponent.status !== Component.Ready ) {
        if(pathFromRightComponent.status === Component.Error) {
            console.log(pathFromRightComponent.errorString());
            break;
        }
        else
            console.log("Still loading path from right");
    }

    lifes[0] = lifeComponent.createObject(background);
    lifes[0].x = 1;
    lifes[0].y = background.height-15;
    lifes[1] = lifeComponent.createObject(background);
    lifes[1].x = 15;
    lifes[1].y = background.height-15;

    console.log("creating ship");
    fighter = fighterComponent.createObject(background);
    if (fighter === null) {
        console.log("error creating ship");
        console.log(fighterComponent.errorString());
    }

    for( var i = 0; i < firstWave.length; i++ ) {
        var entry = firstWave[i];
        for( var j = 0; j < entry.length; j++ ) {
            var path = entry[j][2].createObject(background, {"endX": entry[j][1], "endY": 70 });
            var enemy = enemyComponent.createObject(background, {"image": entry[j][0], "flypath": path});
            if( enemy === null ) {
                console.log("error creating enemy");
                console.log(entry[j][0].errorString());
            }

            enemy.visible = false;
            enemies.push( enemy );
        }
    }

    for( i = 0; i < 3; i++ ) {
        var fire = fireComponent.createObject(background);
        bullets.push(fire);
    }


}

function rest() {
    for( var i = 0; i < enemies.length; i++ ){
        enemies[i].reset();
    }
    for( var i = 0; i < bullets.length; i++ ) {
        bullets[i].reset();
    }
    fighter.visible = false;
}

function startNewGame() {
    waveCount = 0;
    score = 0;
    hud.score = 0;

    console.log("start game");


    fighter.x = background.width/2-7;
    fighter.y = background.height-31;
    fighter.visible = true;

    console.log("ready");
    started = true;
    wavebeat.restart();
}

function quit() {
    started = false;
    fighter = null;
    enemyComponent = 0;
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

    var ewidth = enemies[0].width;
    var eheight = enemies[0].height;

    for( var i = 0; i < bullets.length; i++ ) {
        var x = bullets[i].x;
        var y = bullets[i].y;
        if( y > -10 ) {
            for( var j = 0; j < enemies.length; j++ ){
                if(enemies[j].visible) {
                    if( ( enemies[j].x <= x && (enemies[j].x+enemies[j].width) >= x ) &&
                        ( enemies[j].y <= y && (enemies[j].y+enemies[j].height) >= y ) ) {
                        enemies[j].reset();
                        bullets[i].reset();
                        score += enemies[j].score;
                        hud.score = score;
                        break;
                    }
                }
            }
        }
    }
}

function triggerWave() {
    if( !started )
        return;

    if( waveCount < enemies.length ){
        enemies[waveCount++].start();
        enemies[waveCount++].start();
    }
}

function fire() {
    if( !started )
        return;
    for( var i = 0; i < 3; ++i ) {
        if(!bullets[i].visible){
            bullets[i].start( fighter.x + fighter.width/2-1 , fighter.y - 10);
            break;
        }
    }
}
