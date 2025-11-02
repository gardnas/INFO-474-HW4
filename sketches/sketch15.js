registerSketch('sk15', function (p) {
  let data;
  let M = {};
  let CHART_W, CHART_H;
  let yMax = 300;

  p.preload = function () {
    data = p.loadTable('data/Fremont_Bridge_Bicycle_Counter.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('system-ui, Arial, sans-serif');
    computeLayout();
  };

  p.draw = function () {
    p.background(240);
    
    // title
    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(24);
    p.text("Two Peaks, Two Directions: Fremont's Bridge Daily Bike Flow 2024", 80, 30);
    
    drawAxes();
  };
  
  function computeLayout() {
    M = {
      top: 100,
      right: 60,
      bottom: 100,
      left: 80
    };
    
    CHART_W = p.width - M.left - M.right;
    CHART_H = p.height - M.top - M.bottom;
  }
  
  function drawAxes() {
    p.push();
    p.stroke(0);
    p.strokeWeight(2);
    
    // Y-axis line
    p.line(M.left, M.top, M.left, M.top + CHART_H);
    
    // X-axis line
    p.line(M.left, M.top + CHART_H, M.left + CHART_W, M.top + CHART_H);
    
    // Y-axis tick marks and labels 
    p.textAlign(p.RIGHT, p.CENTER);
    p.textSize(12);
    for (let val = 0; val <= yMax; val += 25) {
      const y = valueToY(val);
      p.line(M.left - 5, y, M.left, y);
      p.noStroke();
      p.text(val, M.left - 10, y);
      p.stroke(0);
    }
    
    // X-axis tick marks 
    p.textAlign(p.CENTER, p.TOP);
    for (let h = 0; h < 24; h += 1) {
      const x = hourToX(h);
      p.line(x, M.top + CHART_H, x, M.top + CHART_H + 5); 
      p.noStroke();
      p.text(h, x, M.top + CHART_H + 8);
      p.stroke(0);
    }
    
    p.pop();
  }
  
  // Convert hour to X pixel position
  function hourToX(hour) {
    return M.left + (hour / 23) * CHART_W;
  }
  
  // Convert value (bikes per hour) to Y pixel position
  function valueToY(value) {
    return M.top + CHART_H - (value / yMax) * CHART_H;
  }
  
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    computeLayout();
  };
});