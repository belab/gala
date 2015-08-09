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
var waves = [
            ["assets/bee.png",104, 74, pathFromLeftComponent, 180],             // first wave
            ["assets/butterfly.png",104, 50, pathFromRightComponent, 180],
            ["assets/bee.png",120, 74, pathFromLeftComponent, 180*2],
            ["assets/butterfly.png",120, 50, pathFromRightComponent, 180*2],
            ["assets/bee.png",104, 86, pathFromLeftComponent, 180*3],
            ["assets/butterfly.png",104, 62, pathFromRightComponent, 180*3],
            ["assets/bee.png",120, 86, pathFromLeftComponent, 180*4],
            ["assets/butterfly.png",120, 62, pathFromRightComponent, 180*4],
            ["assets/galaga_boss.png",88, 35, pathFromBottomLeftComponent, 5000 ], // second wave
            ["assets/butterfly.png",88, 50, pathFromBottomLeftComponent, 5000+180],
            ["assets/galaga_boss.png",104, 35, pathFromBottomLeftComponent, 5000+180*2 ],
            ["assets/butterfly.png",136, 50, pathFromBottomLeftComponent, 5000+180*3 ],
            ["assets/galaga_boss.png",120, 35, pathFromBottomLeftComponent, 5000+180*4 ],
            ["assets/butterfly.png",88, 62, pathFromBottomLeftComponent, 5000+180*5 ],
            ["assets/galaga_boss.png",136, 35, pathFromBottomLeftComponent, 5000+180*6 ],
            ["assets/butterfly.png",136, 62, pathFromBottomLeftComponent, 5000+180*7 ]
        ];

var leftPressed = false;
var rightPressed = false;
var started = false;
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

    for( i = 0; i < waves.length; i++ ) {
        var entry = waves[i];
        var path = createInstance(entry[3], {"endX": entry[1], "endY": entry[2] });
        enemies.push(createInstance(enemyComponent, {"image": entry[0],
                                                     "flypath": path,
                                                     "end_x": entry[1],
                                                     "end_y": entry[2],
                                                     "start_time": entry[4] }))
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
    score = 0;
    hud.score = 0;
    hud.lifeCount = lifeCount;
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
