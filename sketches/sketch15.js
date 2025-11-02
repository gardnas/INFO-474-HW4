registerSketch('sk15', function (p) {
  let data;

  p.preload = function () {
    data = p.loadTable('data/Fremont_Bridge_Bicycle_Counter.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('system-ui, Arial, sans-serif');
  };

  p.draw = function () {
    p.background(240);
    
    // title
    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(24);
    p.text("Two Peaks, Two Directions: Fremont's Bridge Daily Bike Flow 2024", 80, 30);
  };
  
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});