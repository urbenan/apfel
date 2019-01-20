
addEventListener("message", apfelMenge, false);


function apfelMenge(event) {
  var workerId=parseFloat(event.data[0]);
  var x_links=parseFloat(event.data[1]);
  var x_rechts=parseFloat(event.data[2]);
  var y_oben=parseFloat(event.data[3]);
  var y_unten=parseFloat(event.data[4]);
  var dx=parseFloat(event.data[5]);  
  var rot, gruen, blau;
  var antwort=new Object();
  var pixelArray=new Array();
  var breite, hoehe;
  var x_apfel, y_apfel;
  var dy=dx;
  breite=parseInt((x_rechts-x_links)/dx);
  hoehe=parseInt((y_unten-y_oben)/dy);
  x_apfel=x_links;
  y_apfel=y_oben;

  for (var x = 0; x < breite; x++) {
    antwort.workerId=workerId;
    pixelArray[x] = new Array();
    for (var y=0; y<hoehe ; y++) {
      n_apfel=256-parseInt(getApfelPixel(x_apfel, y_apfel)/80*256);
      rot=parseInt(n_apfel);
      gruen=0;
      blau=0;
      pixelArray[x][y]=rot;
      y_apfel=y_apfel+dy;
    }
    x_apfel=x_apfel+dx;
    y_apfel=y_oben;
  }
  
  antwort.pixelArray=pixelArray;
  postMessage(antwort);
} 

function getApfelPixel(x,y) {
  var c_real = x;
  var c_im = y;
  var z_real = 0;
  var z_im = 0;
  var anzahl = 0;
  var abstand = 0;

  // z = z^2+c
  while ((abstand < 100) && (anzahl < 80)) {
    anzahl ++;
    z_real_neu = Math.pow(z_real, 2) - Math.pow(z_im, 2) + c_real;
    z_im_neu = (2*z_real*z_im) + c_im;
    z_real = z_real_neu;
    z_im = z_im_neu;
    abstand = Math.sqrt(Math.pow((z_real - x), 2) + Math.pow((z_im - y), 2));
  }
  return anzahl;
}
