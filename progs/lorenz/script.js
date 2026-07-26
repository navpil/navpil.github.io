//I've included as many comments as possible for the variables associated with Lorenz Mathamatics so you can edit and play.  The rest of the script should be self - explanatory, if not, you can refer to the D3.js docs.

function parse(str) {
    return Function(`'use strict'; return (${str})`)()
}

function getVal(name) {
    return parse(document.getElementById(name).value)
}

function start() {
    //Lorenz Attractor Parameters
    var dt = getVal("dt"),//0.005, // (δτ) Represents time. Draw curve - higher the value, straighter the lines
        p = getVal("point-of-origin"),//28, // (ρ) point of origin
        w = getVal("width-of-element"),//10,  // (σ)width of main element - higher the number, narrower the width
        beta = getVal("beta"),//8 / 3,  // (β) points of equilibrium - this applied value results in the infinity symbol. higher values will break the equilibrium, causing the ends to separate and spread. When ρ = 28, σ = 10, and β = 8/3, the Lorenz system has chaotic solutions; it is this set of chaotic solutions that make up the Lorenz Attractor (the infinity symbol).  If ρ < 1 then there is only one equilibrium point, which is at the origin. This point corresponds to no convection. All orbits converge to the origin when ρ  < 1.  The 'fork' occurs at ρ = 1, or ρ > 1 Try it.

        //Below x, y, and z values are the components of a given three dimensional location in space
        x0 = getVal("x0"),//.5,   //change in x,y, or z with respect to time
        y0 = getVal("y0"),//.5,   //"                                       "
        z0 = getVal("z0")//10;   //"                                       "

    var width = 800,
        height = 600;
    var widthG = 950,
        heightG = 200;


    var canvas = d3.select("#lorenz").append("canvas")
        .attr("width", width)
        .attr("height", height);
    var setup = d3.select("#lorenz").append("div").attr("id", "configs2");
    document.getElementById("configs2").innerHTML = "p: " + p + ", w: " + w + ", beta: " + document.getElementById("beta").value + ", dt: " + dt + ", xyz(" + x0 + ", " + y0 + ", " + z0 + ")";

    document.getElementById("configs").remove();

    //Color Range
    var color = d3.scale.linear()
        .domain([0, 20, 30, 45])
        .range(["yellow", "orange", "brown", "purple"])
        .interpolate(d3.interpolateHcl);

    var lorenz2d = canvas.node().getContext("2d");


    var canvasX = d3.select("#graphs").append("canvas")
        .attr("width", widthG)
        .attr("height", heightG)
        .attr("position", "relative")
        .node().getContext("2d");
    var canvasY = d3.select("#graphs").append("canvas")
        .attr("width", widthG)
        .attr("height", heightG).node().getContext("2d");
    var canvasZ = d3.select("#graphs").append("canvas")
        .attr("width", widthG)
        .attr("height", heightG).node().getContext("2d");


    // set how the new images are drawn onto the existing image. 'lighter' will  display the new over the old

    lorenz2d.globalCompositeOperation = "lighter";
    lorenz2d.translate(width / 2, height / 2);
    lorenz2d.scale(12, 8);
    lorenz2d.lineWidth = .25;

    //consistent timing of animations when concurrent transitions are scheduled for fluidity
      var x = x0 + (Math.random() - .5) * 4,
          y = y0 + (Math.random() - .5) * 4,
          z = z0 + (Math.random() - .5) * 4,
          n = 10,//Math.random() * 30 | 0,
          t1 = 500,//Math.random() * 500,
          time = 0;

    var oldX = x;
    var oldY = y;
    var oldZ = z;

    var timeCoeff = dt*10;//0.05;

    d3.timer(function() {
    //  d3.timer(function(t0) {
        for (var i = 0; i < n; ++i) {
          oldX = x;
          oldY = y;
          oldZ = z;

          lorenz2d.strokeStyle = color(z);
          lorenz2d.beginPath();
          lorenz2d.moveTo(x, y);

          x += dt * w * (y - x);
          y += dt * (x * (p - z) - y);
          z += dt * (x * y - beta * z);
          lorenz2d.lineTo(x, y);
          lorenz2d.stroke();

          canvasX.strokeStyle = "rgb(128 0 0)";//color("#ffff33");
          canvasX.beginPath();
          canvasX.moveTo((time*timeCoeff), (oldX*4+heightG/2));
          canvasX.lineTo((time+1)*timeCoeff, (x*4+heightG/2));
          canvasX.stroke();

          canvasY.strokeStyle = "rgb(0 128 0)";//color("#ffff33");
          canvasY.beginPath();
          canvasY.moveTo((time*timeCoeff), (oldY*4+heightG/2));
          canvasY.lineTo((time+1)*timeCoeff, (y*4+heightG/2));
          canvasY.stroke();

          canvasZ.strokeStyle = "rgb(0 0 128)";//color("#ffff33");
          canvasZ.beginPath();
          canvasZ.moveTo((time*timeCoeff), (oldZ*5+heightG/2-130));
          canvasZ.lineTo((time+1)*timeCoeff, (z*5+heightG/2-130));
          canvasZ.stroke();
          time++;

          if ((time*timeCoeff) > widthG) {
            time = 0;
            canvasX.reset();
            canvasY.reset();
            canvasZ.reset();
          }
        }
    //    return t0 > t1;
    //  }, 100, 100);

      lorenz2d.save();
      lorenz2d.setTransform(1, 0, 0, 1, 0, 0);

      //source-atop draws old image on top of the new image, eliminating the part of the old image that is outside of the new image range.
      lorenz2d.globalCompositeOperation = "source-atop";
      lorenz2d.fillStyle = "rgba(0,0,0,.03)";
      lorenz2d.fillRect(0, 0, width, height);
      lorenz2d.restore();
    });

}
//start();