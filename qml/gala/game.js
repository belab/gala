var components = [];

function addComponent(fileName) {
    var c = Qt.createComponent(fileName);
    components.push(c);
    return c;
}

function createInstance(component, props) {
    var instance = component.createObject(background, props);
    if (instance === null) {
        console.log("error creating instance");
        console.log(component.errorString());
    }
    return instance;
}

var fighterComponent = addComponent("Fighter.qml");
var enemyComponent = addComponent("Enemy.qml");
var lifeComponent = addComponent("Life.qml");
var fireComponent = addComponent("Fire.qml");
var pathFromLeftComponent = addComponent("PathFromTopLeft.qml");
var pathFromRightComponent = addComponent("PathFromTopRight.qml");

var fighter = null;
var enemies = [];
var bullets = [];
var firstWave = [
            [ ["bee.png",104, 74, pathFromLeftComponent],["butterfly.png",104, 50, pathFromRightComponent] ],
            [ ["bee.png",120, 74, pathFromLeftComponent],["butterfly.png",120, 50, pathFromRightComponent] ],
            [ ["bee.png",104, 86,pathFromLeftComponent],["butterfly.png",104, 62, pathFromRightComponent] ],
            [ ["bee.png",120, 86,pathFromLeftComponent],["butterfly.png",120, 62, pathFromRightComponent] ]
        ];

var leftPressed = false;
var rightPressed = false;
var started = false;
var waveCount = 0;
var score = 0;
var lifeCount = 4;

function loadComponents() {
    for(var i = 0; i < components.length; i++) {
        while(components[i].status !== Component.Ready ) {
            if(components[i].status === Component.Error) {
                console.log(components[i].errorString());
                break;
            }
            else
                console.log("Loading component...");
        }
    }

    fighter = createInstance(fighterComponent, {});

    for( i = 0; i < firstWave.length; i++ ) {
        var entry = firstWave[i];
        for( var j = 0; j < entry.length; j++ ) {
            var path = createInstance(entry[j][3], {"endX": entry[j][1], "endY": entry[j][2] });
            enemies.push(createInstance(enemyComponent, {"image": entry[j][0], "flypath": path, "end_x":entry[j][1], "end_y":entry[j][2]}));
        }
    }

    for( i = 0; i < 3; i++ ) {
        bullets.push(createInstance(fireComponent, {}));
    }
}

function reset() {
    for( var i = 0; i < enemies.length; i++ ){
        enemies[i].reset();
    }
    for( i = 0; i < bullets.length; i++ ) {
        bullets[i].reset();
    }
    fighter.visible = false;
    hud.showLifes(false);
}

function startNewGame() {
    waveCount = 0;
    score = 0;
    hud.score = 0;
    hud.lifeCount = lifeCount;
    hud.showLifes(true);

    fighter.x = background.width/2-7;
    fighter.y = background.height-31;
    fighter.visible = true;

    started = true;
    wavebeat.restart();
}

function quit() {
    started = false;
    fighter = null;
    enemyComponent = 0;
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
    if( !started || !fighter.visible)
        return;
    for( var i = 0; i < 3; ++i ) {
        if(!bullets[i].visible){
            bullets[i].start( fighter.x + fighter.width/2-1 , fighter.y - 10);
            break;
        }
    }
}
