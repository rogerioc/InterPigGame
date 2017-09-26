var dodge = {};
var play = {};

var enymy = {}; 
var imagesCount = 3;
var eElements = new Array(3);
var images  = new Image();
var playImg  = new Image();
var btStart = new Image();

 //Wait for DOM to load and init game
  $(window).ready(function(){ 
    dodge.boot();
  });
 

  
dodge.text='Pressione S para começar.';


  
dodge.boot = function() {
  dodge.context  = $('#playground')[0].getContext('2d');
  dodge.width    = $('#playground').width();
  dodge.height   = $('#playground').height();
  dodge.gameOver = true;
  //dodge.notify(dodge.text, 15, 115);
  
  $(document).keydown(dodge.keyDown).keyup(dodge.keyUp);
  
  
  //Add event handler for start button
  dodge.canvas =$('#playground')[0];
  
     
  dodge.loadImages();
    
  
  dodge.canvas.onmousedown = onMouse;
  
}
 
 function onMouse(ev){
   
      Start();
 
 }       
    
  

  
dodge.loadImages = function(){  
  enymy.width = 53;   
  enymy.height = 57 ; 
  enymy.setPosition = function(x, y){  
	  enymy.X = x;  
	  enymy.Y = y; 
  
 }  

 //'play' will be the context now     
 //attributes  

 play.width = 60;   
 play.height = 120;  
 
btStart.height = 60;
btStart.width = 277;
//methods   
 play.setPosition = function(x, y){  
  play.X = x;  
  play.Y = y;  
  }   
  
  btStart.src = "start.png";
  images.src = "gifts.png";  
  playImg.src = "hero.png" ;
  play.img = playImg;
  btStart.onload = function(){
 	dodge.notifyImg((dodge.width/2)- (btStart.width/2), (dodge.height/2) - (btStart.height/2));
 }
 
  //enymy.img = enymyImg;
}

dodge.init = function() {
  
  dodge.setLevel(0).setScore(0);
  dodge.wL = dodge.wR = false;
  dodge.go = 0;
  dodge.getGifts =0;
  dodge.goLeft = dodge.goRight = dodge.speedUp = false;
  dodge.score = dodge.intervalID = 0;
  dodge.iniMove = 120; 
  dodge.move = dodge.iniMove ;
  dodge.gap = 5; // Space between adjacent enemy blocks
  dodge.level = 1; // Starting level
  dodge.speed = 2; // Initial speed of the enemies
  dodge.block = 2; // Values between 0 and 3
  dodge.enemyCount = 5; // max number of enemies possible (width of the playground in blocks)
  dodge.position = (dodge.width)*dodge.block/dodge.enemyCount + dodge.gap;
  dodge.speedUpBy = 0.2;
  dodge.setArrangements();
  dodge.play = true; 
  
  $('#playground').css('opacity', 1).unbind('click');
  dodge.intervalID = setInterval(dodge.paint, 8);
  
  
  dodge.drawHero();
  dodge.drawEnemies();
  
}

dodge.keyUp = function(e) {
  switch(e.keyCode) {
	case 37:
	  dodge.goLeft = false; 
	  break;
	case 38:
	  dodge.speedUp = false; 
	  break;
	case 39:
	  dodge.goRight = false; 
	  break;
  }
}

function Start(){
   
    
    if (dodge.gameOver)
     dodge.init();
}

dodge.keyDown = function(e) {
  switch(e.keyCode) {
    case 37:
	  dodge.goLeft = true; 
	  break;
	case 38:
	  dodge.speedUp = true; 
	  break;
	case 39:
	  dodge.goRight = true; 
	  break;
	case 80:	  
	   if (dodge.play) 
    clearInterval(dodge.intervalID);
    else if (!dodge.gameOver)
    dodge.intervalID = setInterval(dodge.paint, 8);
    dodge.play = !dodge.play;
		break;
	case 83: //S
	    Start();
	   break;
  }
  
}

dodge.drawFigure = function(x, y, width, height, color) {
  dodge.context.beginPath();
  dodge.context.rect(x, y, width, height);
  dodge.context.fillStyle = color;
  dodge.context.fill();	 
  dodge.context.closePath();
}

dodge.drawEnemy = function(i,x, y) {
    var ind = eElements[i];
   dodge.context.drawImage(images,Number(enymy.width * ind),0, enymy.width,enymy.height, x, y, enymy.width,enymy.height);
   return this;

}



dodge.drawHero = function() {
   play.setPosition(dodge.position,dodge.height-play.height);
   dodge.context.drawImage(play.img,dodge.position,dodge.height-(play.height));
  return this;
}

dodge.drawEnemies = function() {
  var e=0;
  for (var i = 0; i < dodge.enemyCount; i++) 
	 if (!(i in dodge.arrangement)) {	    
	   dodge.drawEnemy(e,Number(1/dodge.enemyCount)*i*dodge.width + dodge.gap, dodge.move);
	   e++;
	}
  return this;      	
}



dodge.paint = function() {  
  dodge.gameOver = false;
  var tam = (Number(1/dodge.enemyCount)*dodge.width);
  
   
  if (dodge.goRight == true && (dodge.width - dodge.position > (tam - dodge.gap))) {
      dodge.position += tam;	
      dodge.wR = true;
      dodge.block++;
      dodge.goRight = false;			
    }
  
  
  if (dodge.goLeft == true && dodge.position != dodge.gap) {
	 dodge.position-= tam;	
     dodge.wL = true;
     dodge.block--;
     dodge.goLeft = false;	
  }
  
  dodge.move += (dodge.speedUp == true) ? 4 * dodge.speed : dodge.speed;
  dodge.context.clearRect(0, 0, dodge.width, dodge.height); 
  dodge.drawHero();
  dodge.drawEnemies();
  
  
  if ((dodge.move+enymy.height) > (dodge.height - (play.height)) ) {
	if (!(dodge.block in dodge.arrangement)) {
	  //dodge.context.drawImage(images,0, Number(play.height * 8), play.width,play.height, dodge.position,dodge.height-(play.height),play.width,play.height);
	  //drawDiedEnemy(dodge.block)
	  dodge.arrangement[dodge.block]=0;
	  //dodge.drawDiedEnemy(e,Number(1/dodge.enemyCount)*dodge.block*dodge.width + dodge.gap, dodge.move);
	  //dodge.notify(dodge.text, 150, 135);
	  
	 
	  dodge.score++;
	  dodge.setScore(dodge.score);
	  dodge.getGifts++;
	  
	}
  } 
  
  if (dodge.move > dodge.height) {
  	if(dodge.getGifts==0) {
  	  dodge.getGifts=0;
  	  dodge.notifyImg((dodge.width/2)- (btStart.width/2), (dodge.height/2) - (btStart.height/2));  
	  clearInterval(dodge.intervalID);
	  dodge.gameOver = true;
	  return;
  	} 
  	
	dodge.move = dodge.iniMove;
	dodge.getGifts=0;
	//dodge.score++;
	if (dodge.score%5 == 0) {
	  dodge.level++;
	  dodge.speed += dodge.speedUpBy;
	  dodge.setLevel(dodge.level);
	}
	
	dodge.setArrangements()
  }
}

dodge.setScore = function(score) {
  $('.scoreBoard').html('<div class="subtext">Presentes</div>' + score).hide().fadeIn(); 
  if ('chrome' in window && chrome !== undefined && chrome.browserAction !== undefined) {
	  chrome.browserAction.setBadgeBackgroundColor({color:[200, 0, 0, 0]});
	  chrome.browserAction.setBadgeText({text: String(score) });
  }
  return this;
}

dodge.setLevel = function(level) {
  $('.speedMeter').html('<div class="subtext">Nível</div>' + level).hide().fadeIn();
  return this;
}

dodge.setArrangements = function() {
  dodge.arrangement = new Array();
  eElements[0]=Math.floor(Math.random()*imagesCount);
  eElements[1]=Math.floor(Math.random()*imagesCount);
  eElements[2]=Math.floor(Math.random()*imagesCount);
  
  var found = Math.floor(Math.random()*4);
  var temp;
  do {
  	temp = Math.floor(Math.random()*4);
  } while(temp == found);
  dodge.arrangement[found] = dodge.arrangement[temp] = 0;
 
}


dodge.notify = function(text, x, y) {
  dodge.context.font = "normal normal 19px Georgia";
  dodge.context.fillStyle = "black";
  dodge.context.fillText(text, x, y);
  //dodge.context.textAlign = "center";
  //$('#playground').css('opacity', '0.7'); // dim the canvas
}

dodge.notifyImg= function(x,y){
	//dodge.notify("Click para iniciar.",x,y);
  dodge.context.drawImage(btStart,x,y);
  
  $('#playground').css('opacity', '0.7'); // dim the canvas
  return this;
 
}
