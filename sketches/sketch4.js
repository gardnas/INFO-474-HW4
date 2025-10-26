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
    
    // Get current time
    const currentHour = p.hour(); // 0-23
    const currentMinute = p.minute(); // 0-59
    const currentSecond = p.second(); // 0-59
    
    // hours section
    const hoursStartX = centerX - 250;
    const hoursStartY = centerY - 200;
    
    // pencil!!!
    const pencilX = hoursStartX - 60;
    const pencilTopY = hoursStartY - 30;
    const pencilBottomY = centerY + 200;
    const pencilWidth = 20;
    
    // body
    p.fill(255, 200, 100);
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(pencilX - pencilWidth / 2, pencilTopY + 30, pencilWidth, pencilBottomY - pencilTopY - 30);
    
    // tip
    p.fill(50, 30, 20);
    p.triangle(
      pencilX, pencilTopY,
      pencilX - pencilWidth / 2, pencilTopY + 30,
      pencilX + pencilWidth / 2, pencilTopY + 30
    );
    
    // lead
    p.fill(60, 60, 60);
    p.noStroke();
    p.triangle(
      pencilX, pencilTopY + 5,
      pencilX - pencilWidth / 4, pencilTopY + 20,
      pencilX + pencilWidth / 4, pencilTopY + 20
    );
    
    // Eraser
    p.fill(255, 150, 150);
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(pencilX - pencilWidth / 2, pencilBottomY - 40, pencilWidth, 40, 0, 0, 3, 3);
    
    // Metal part above eraser
    p.fill(192, 192, 192);
    p.rect(pencilX - pencilWidth / 2, pencilBottomY - 45, pencilWidth, 5);
    
    p.fill(0);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.text("HOURS", hoursStartX, hoursStartY - 20);
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        let x = hoursStartX + col * (bubbleSize + bubbleSpacing) + bubbleSize / 2;
        let y = hoursStartY + row * (bubbleSize + bubbleSpacing);
        
        let hourNum = row * 6 + col + 1;
        
        // Fill bubble if it matches current hour
        if (hourNum === currentHour + 1) {
          p.fill(0);
        } else {
          p.noFill();
        }
        
        // bubbles
        p.stroke(0);
        p.strokeWeight(2);
        p.circle(x, y, bubbleSize);
        
        // labels one to 24
        // white text to see the labels
        if (hourNum === currentHour + 1) {
          p.fill(255);
        } else {
          p.fill(0);
        }
        p.noStroke();
        p.textSize(12);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(hourNum, x, y);
      }
    }

     // minutes section
    const minutesStartX = hoursStartX;
    const minutesStartY = hoursStartY + 4 * (bubbleSize + bubbleSpacing) + 60;
    p.fill(0);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.text("MINUTES", minutesStartX, minutesStartY - 20);
    
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 12; col++) {
        let x = minutesStartX + col * (bubbleSize + bubbleSpacing) + bubbleSize / 2;
        let y = minutesStartY + row * (bubbleSize + bubbleSpacing);
        
        let minuteNum = row * 12 + col;
        
        // Fill bubble if it matches current minute
        if (minuteNum === currentMinute) {
          p.fill(0);
        } else {
          p.noFill();
        }
        
        // minute bubbles
        p.stroke(0);
        p.strokeWeight(2);
        p.circle(x, y, bubbleSize);
        
        // labels 0-59
        // white text to see the labels
        if (minuteNum === currentMinute) {
          p.fill(255); 
        } else {
          p.fill(0);
        }
        p.noStroke();
        p.textSize(10);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(minuteNum, x, y);
      }
    }

    // seconds section
    const secondsBubbleSize = 150;
    const secondsX = minutesStartX + 12 * (bubbleSize + bubbleSpacing) + 100;
    const secondsY = minutesStartY + (5 * (bubbleSize + bubbleSpacing)) / 2 - bubbleSize / 2;
    
    p.fill(0);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text("SECONDS", secondsX, secondsY - secondsBubbleSize / 2 - 20);
    
    // draw in area based on num of seconds passed
    const secondsAngle = p.map(currentSecond, 0, 60, 0, p.TWO_PI);
    
    // pie slice of area filled in 
    // circle bvecause similar to how I fill in a bubble on multiple choice
    p.fill(0);
    p.noStroke();
    p.arc(secondsX, secondsY, secondsBubbleSize, secondsBubbleSize, -p.HALF_PI, -p.HALF_PI + secondsAngle, p.PIE);
    
    // Outer circle border
    p.noFill();
    p.stroke(0);
    p.strokeWeight(3);
    p.circle(secondsX, secondsY, secondsBubbleSize);
    
    // Display second number in center with inverted color only on filled area
    //blend mode to invert colors where filled
    p.push();
    p.blendMode(p.DIFFERENCE);
    p.fill(255);
    p.noStroke();
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(currentSecond, secondsX, secondsY);
    p.pop();
    
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
