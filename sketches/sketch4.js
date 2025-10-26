// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(255);
    
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const bubbleSize = 30;
    const bubbleSpacing = 10;
    
    // hours section
    const hoursStartX = centerX - 250;
    const hoursStartY = centerY - 200;
    p.fill(0);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.text("HOURS", hoursStartX, hoursStartY - 20);
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        let x = hoursStartX + col * (bubbleSize + bubbleSpacing) + bubbleSize / 2;
        let y = hoursStartY + row * (bubbleSize + bubbleSpacing);
        
        // bubbles
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);
        p.circle(x, y, bubbleSize);
        
        // labels one to 24
        let hourNum = row * 6 + col + 1;
        p.fill(0);
        p.noStroke();
        p.textSize(12);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(hourNum, x, y);
      }
    }
    
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
