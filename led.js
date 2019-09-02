var displayBase = document.getElementById("displayBase");
var display = document.getElementById("display");
var mat = new Array();

function newLine(){
  var line = new Array();
  for (var i = 0; i < 37; i++){
    var led = document.createElement("div");
    led.className = "led off";
    display.appendChild(led);
    line[i] = led;
  }
  return line;
}
for (var i = 0; i < 7; i++)
  mat[i] = newLine();

function write (arr) {
  var i = 0;
  while (i < arr.length){
    mat[arr[i++]][arr[i++]].className = "led";
  }
}

var ons = new Array(0,0,0,1,0,2,0,3,0,6,0,7,0,13,0,14,0,18,0,19,0,23,0,25,0,28,0,29,0,30,0,31,0,34,0,35,
                    1,3,1,5,1,8,1,12,1,15,1,17,1,20,1,22,1,24,1,26,1,28,1,33,1,36,
                    2,3,2,5,2,12,2,17,2,20,2,22,2,26,2,28,2,33,
                    3,3,3,6,3,7,3,12,3,14,3,15,3,17,3,18,3,19,3,20,3,22,3,26,3,28,3,29,3,30,3,34,3,35,
                    4,0,4,3,4,8,4,12,4,15,4,17,4,20,4,22,4,26,4,28,4,36,
                    5,0,5,3,5,5,5,8,5,12,5,15,5,17,5,20,5,22,5,26,5,28,5,33,5,36,
                    6,1,6,2,6,6,6,7,6,13,6,14,6,17,6,20,6,22,6,26,6,28,6,29,6,30,6,31,6,34,6,35);
write (ons);