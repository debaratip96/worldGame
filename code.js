var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["1db35ae6-bdf4-42d1-8bad-e0b4b911e69e","8470d250-6ea5-4347-9c41-9d43d3f4f396"],"propsByKey":{"1db35ae6-bdf4-42d1-8bad-e0b4b911e69e":{"name":"playerShip2_green_1","sourceUrl":"assets/api/v1/animation-library/gamelab/FE5FYwdJhRwxIqzbXx5ZArNboxSSaOht/category_vehicles/playerShip2_green.png","frameSize":{"x":112,"y":75},"frameCount":1,"looping":true,"frameDelay":2,"version":"FE5FYwdJhRwxIqzbXx5ZArNboxSSaOht","categories":["vehicles"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":112,"y":75},"rootRelativePath":"assets/api/v1/animation-library/gamelab/FE5FYwdJhRwxIqzbXx5ZArNboxSSaOht/category_vehicles/playerShip2_green.png"},"8470d250-6ea5-4347-9c41-9d43d3f4f396":{"name":"playerShip1_red_1","sourceUrl":null,"frameSize":{"x":99,"y":75},"frameCount":1,"looping":false,"frameDelay":12,"version":"k6ObrZSyFvY4tS6.j8.AtvaQZDOyhEis","categories":["vehicles"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":99,"y":75},"rootRelativePath":"assets/8470d250-6ea5-4347-9c41-9d43d3f4f396.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// player properties
var player = createSprite(200,350,40,40);
player.shapeColor = 'blue';
player.setAnimation("playerShip2_green_1");

//enemy properties
var enemy = createSprite(200,50,50,30);
enemy.shapeColor = 'red';
enemy.setAnimation("playerShip1_red_1");

//enemy protector properties
var enemyprotectors = createSprite(30,220,80,20);
enemyprotectors.shapeColor = 'pink';
var enemyprotector = createSprite(370,200,80,20);
enemyprotector.shapeColor = 'pink';

// last defence
var enemyborder = createSprite(200,100,300,20);
enemyborder.shapeColor = 'yellow';

//ball properties
var ball = createSprite(200,280,20,20);
ball.shapeColor = 'green';

//nothin
var Php = 100;
var Ehp = 10;
var gamestate = 'serve';











function draw() {
  
//background
  background("black");
  
// hp texts
  text("hp:",20,260);
  text(Php,40,260);
    text("hp:",20,180);
  text(Ehp,40,180);
  
// controls
  if(keyDown("left")){
    player.velocityX = -9;
    player.velocityY = 0;
  }
    if(keyDown("right")){
    player.velocityX = 9;
    player.velocityY = 0;
  }

// texts
   if(gamestate === 'serve'){
   text("press space to start",150,200);
  }
  
  
  //reducing player hp
  if(player.isTouching(ball)){
    Php = Php-1;
  }
  
//reducing hp of enemy  
  if(enemy.isTouching(ball)){
  Ehp = Ehp-1;
  }
  
  //press space to start
  if(keyDown('space') &&  gamestate === "serve"){
  gamestate = 'play';
  serve();
  }
  
// if hp 0 then restart
  if(Ehp===0 || Php===0){
  gamestate = 'over';
  text("press R to restart",170,170);
  reset();
  }
  
  //if r clicked restart
  if(keyDown("r") && gamestate === 'over'){
  gamestate = 'serve';
  Ehp = 10;
  Php = 100;
  }

//create edges
  createEdgeSprites();
  
  //oplayer,ball,enemy bounces
  player.bounceOff(edges);
  enemyprotectors.bounceOff(edges);
  enemyprotector.bounceOff(edges);
  ball.bounceOff(enemyprotectors);
  ball.bounceOff(enemyprotector);
  ball.bounceOff(enemyborder);
  ball.bounceOff(edges);
  ball.bounceOff(player);
  ball.bounceOff(enemy);
 
  // draw sprites
  drawSprites();
  
}

function serve(){
  ball.velocityY = -7;
  ball.velocityX = 0;
       enemyprotectors.velocityX = -10;
enemyprotector.velocityX = 10;
}
function reset(){
  ball.x = 200;
  ball.y = 310;
  ball.velocityY = 0;
  ball.velocityX = 0;
 enemyprotectors.velocityX = 0;
 enemyprotector.velocityX = 0;
}








// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
