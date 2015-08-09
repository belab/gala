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

var fighterComponent = addComponent("Fighter.qml")
var enemyComponent = addComponent("Enemy.qml")
var lifeComponent = addComponent("Life.qml")
var fireComponent = addComponent("Fire.qml")
var pathFromLeftComponent = addComponent("PathFromTopLeft.qml")
var pathFromRightComponent = addComponent("PathFromTopRight.qml")
var pathFromBottomLeftComponent = addComponent("PathFromBottomLeft.qml")
var pathFromBottomRightComponent = addComponent("PathFromBottomRight.qml")

var fighter = null;
var enemies = [];
var bullets = [];
var enemy_delay = 180
var wave_delay = 4000
var waves = [
            // first wave
            ["assets/bee.png"      ,96, 74, pathFromLeftComponent, enemy_delay],
            ["assets/butterfly.png",96, 50, pathFromRightComponent, enemy_delay],
            ["assets/bee.png"      ,112, 74, pathFromLeftComponent, enemy_delay*2],
            ["assets/butterfly.png",112, 50, pathFromRightComponent, enemy_delay*2],
            ["assets/bee.png"      ,96, 86, pathFromLeftComponent, enemy_delay*3],
            ["assets/butterfly.png",96, 62, pathFromRightComponent, enemy_delay*3],
            ["assets/bee.png"      ,112, 86, pathFromLeftComponent, enemy_delay*4],
            ["assets/butterfly.png",112, 62, pathFromRightComponent, enemy_delay*4],
            // second wave
            ["assets/galaga_boss.png",80,  31, pathFromBottomLeftComponent, wave_delay ],
            ["assets/butterfly.png"  ,80,  50, pathFromBottomLeftComponent, wave_delay+enemy_delay],
            ["assets/galaga_boss.png",96,  31, pathFromBottomLeftComponent, wave_delay+enemy_delay*2 ],
            ["assets/butterfly.png"  ,128, 50, pathFromBottomLeftComponent, wave_delay+enemy_delay*3 ],
            ["assets/galaga_boss.png",112, 31, pathFromBottomLeftComponent, wave_delay+enemy_delay*4 ],
            ["assets/butterfly.png"  ,80,  62, pathFromBottomLeftComponent, wave_delay+enemy_delay*5 ],
            ["assets/galaga_boss.png",128, 31, pathFromBottomLeftComponent, wave_delay+enemy_delay*6 ],
            ["assets/butterfly.png"  ,128, 62, pathFromBottomLeftComponent, wave_delay+enemy_delay*7 ],
            // third wave
            ["assets/butterfly.png",160, 50, pathFromBottomRightComponent, wave_delay*2],
            ["assets/butterfly.png",144, 50, pathFromBottomRightComponent, wave_delay*2+enemy_delay],
            ["assets/butterfly.png",160, 62, pathFromBottomRightComponent, wave_delay*2+enemy_delay*2],
            ["assets/butterfly.png",144, 62, pathFromBottomRightComponent, wave_delay*2+enemy_delay*3],
            ["assets/butterfly.png",48, 50,  pathFromBottomRightComponent, wave_delay*2+enemy_delay*4],
            ["assets/butterfly.png",64, 50,  pathFromBottomRightComponent, wave_delay*2+enemy_delay*5],
            ["assets/butterfly.png",48, 62,  pathFromBottomRightComponent, wave_delay*2+enemy_delay*6],
            ["assets/butterfly.png",64, 62,  pathFromBottomRightComponent, wave_delay*2+enemy_delay*7],
            // fourth wave
            ["assets/bee.png",144, 74, pathFromRightComponent, wave_delay*3],
            ["assets/bee.png",128, 74, pathFromRightComponent, wave_delay*3+enemy_delay],
            ["assets/bee.png",144, 86, pathFromRightComponent, wave_delay*3+enemy_delay*2],
            ["assets/bee.png",128, 86, pathFromRightComponent, wave_delay*3+enemy_delay*3],
            ["assets/bee.png",64, 74,  pathFromRightComponent, wave_delay*3+enemy_delay*4],
            ["assets/bee.png",80, 74,  pathFromRightComponent, wave_delay*3+enemy_delay*5],
            ["assets/bee.png",64, 86,  pathFromRightComponent, wave_delay*3+enemy_delay*6],
            ["assets/bee.png",80, 86,  pathFromRightComponent, wave_delay*3+enemy_delay*7],
            // fifth wave
            ["assets/bee.png",32, 74,  pathFromLeftComponent, wave_delay*4],
            ["assets/bee.png",48, 74,  pathFromLeftComponent, wave_delay*4+enemy_delay],
            ["assets/bee.png",32, 86,  pathFromLeftComponent, wave_delay*4+enemy_delay*2],
            ["assets/bee.png",48, 86,  pathFromLeftComponent, wave_delay*4+enemy_delay*3],
            ["assets/bee.png",176, 74, pathFromLeftComponent, wave_delay*4+enemy_delay*4],
            ["assets/bee.png",160, 74, pathFromLeftComponent, wave_delay*4+enemy_delay*5],
            ["assets/bee.png",176, 86, pathFromLeftComponent, wave_delay*4+enemy_delay*6],
            ["assets/bee.png",160, 86, pathFromLeftComponent, wave_delay*4+enemy_delay*7]
        ];

var leftPressed = false;
var rightPressed = false;
var started = false;
var score = 0;
//var lifeCount = 3;

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

    for( i = 0; i < waves.length; i++ ) {
        var entry = waves[i];
        var path = createInstance(entry[3], {"endX": entry[1], "endY": entry[2] });
        enemies.push(createInstance(enemyComponent, {"image": entry[0],
                                                     "flypath": path,
                                                     "end_x": entry[1],
                                                     "end_y": entry[2],
                                                     "start_time": entry[4],
                                                     "attack_time":wave_delay*5+1800 }))
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
    fighter.visible = false
    hud.showLifes(false)
}

function startNewGame() {
    score = 0;
    hud.score = 0;
    hud.showLifes(true);

    fighter.x = background.width/2-7;
    fighter.y = background.height-31;
    fighter.visible = true;

    started = true;
    for(var i = 0; i < enemies.length; ++i) {
        enemies[i].start()
    }
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

    var ewidth = enemies[0].width
    var eheight = enemies[0].height

    for( var i = 0; i < bullets.length; i++ ) {
        var x = bullets[i].x
        var y = bullets[i].y
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
