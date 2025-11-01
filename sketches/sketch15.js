registerSketch('sk15', function (p) {
  let data;

  p.preload = function () {
    data = p.loadTable('data/Fremont_Bridge_Bicycle_Counter.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(240);
    p.fill(0);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
    p.text(`Rows: ${data.getRowCount()}`, 50, 50);
    p.text(`Columns: ${data.getColumnCount()}`, 50, 80);
  };
  
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});