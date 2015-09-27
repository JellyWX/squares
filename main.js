var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
      
var posX = 0;
var posY = 0;

var incX = posX*(canvas.height/16);
var incY = posY*(canvas.height/16);
 
var incX_old;
var incY_old;

var posX_old;
var posY_old;

var windowX = $(window).width();
var windowY = $(window).height();

var p;
var hex = '#000000';

var left=false;
var right=false;
var up=false;
var down=false;

var centrePixX;
var centrePixY;

//Function sets canvas size to match browser
function size(){
  canvas.height = windowY-(windowY/60);
  canvas.width = windowY-(windowY/60);
  
  context.rect(incX,incY,canvas.height/16,canvas.height/16);
  context.fillStyle='#FF0000';
  context.fill();
  
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function move(e){
  
  incX_old=incX;
  incY_old=incY;
  posX_old=posX;
  posY_old=posY;
  var k = e.keyCode;
  
  if(k==65){ //Left arrow
    if(posX!=0){
      posX-=1;
      left=true;
    }
  }
  if(k==68){ //Right arrow
    if(posX!=15){
      posX+=1;
      right=true;
    }
  }
  if(k==87){ //Up arrow
    if(posY!=0){
      posY-=1;
      up=true;
    }
  }
  if(k==83){ //Down arrow
    if(posY!=15){
      posY+=1;
      down=true;
    }
  }
  
  incX = posX*(canvas.height/16);
  incY = posY*(canvas.height/16);
  
  centrePixX = incX+(canvas.height/32); //A way of centering pixels
  centrePixY = incY+(canvas.height/32);
  
  p = context.getImageData(centrePixX,centrePixY,1,1).data; 
  hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6); //Grabs hexidecimal of the centre of the spot you are about to move onto
  
  canvas.height=canvas.height;

  if(hex!='#000000'){
    incX = posX_old*(canvas.height/16);
    incY = posY_old*(canvas.height/16);
    posX=posX_old;
    posY=posY_old;
  }
  
  
  context.fillStyle='#FF36B5';
  context.fillRect(incX,incY,canvas.height/16,canvas.height/16);
  
  context.fillStyle='#9000C9';
  context.fillRect((canvas.height/16)*1,(canvas.height/16)*0,(canvas.height/16),(canvas.height/16)*5);
  context.fillRect((canvas.height/16)*1,(canvas.height/16)*6,(canvas.height/16),(canvas.height/16)*5);
  context.fillRect((canvas.height/16)*0,(canvas.height/16)*10,(canvas.height/16)*3,(canvas.height/16)*1);
  context.fillRect((canvas.height/16)*1,(canvas.height/16)*12,(canvas.height/16)*3,(canvas.height/16)*3);
  context.fillRect((canvas.height/16)*4,(canvas.height/16)*14,(canvas.height/16),(canvas.height/16)*2);
  context.fillRect((canvas.height/16)*4,(canvas.height/16)*8,(canvas.height/16),(canvas.height/16)*3);
  context.fillRect((canvas.height/16)*3,(canvas.height/16)*0,(canvas.height/16),(canvas.height/16)*2);
  context.fillRect((canvas.height/16)*3,(canvas.height/16)*3,(canvas.height/16)*2,(canvas.height/16)*6);
  context.fillRect((canvas.height/16)*3,(canvas.height/16)*1,(canvas.height/16)*4,(canvas.height/16));
  context.fillRect((canvas.height/16)*6,(canvas.height/16)*3,(canvas.height/16)*2,(canvas.height/16));
  
  
  
  
  left=false;right=false;up=false;down=false;

}

document.onkeydown = move;

canvas.onload=size(); //Sets canvas size on loaded
