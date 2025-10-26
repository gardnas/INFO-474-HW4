// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('Schoolbell'); 
  };
  p.draw = function () {
    p.background(220);
    const boardWidth = 750;
    const boardHeight = 450;
    const boardX = (p.width - boardWidth) / 2;
    const boardY = (p.height - boardHeight) / 2;
    
    p.fill(6, 64, 43);
    p.noStroke();
    p.rect(boardX, boardY, boardWidth, boardHeight);

    // brown border
    p.noFill();
    p.strokeWeight(20);
    p.stroke(120, 80, 40);
    p.rect(boardX, boardY, boardWidth, boardHeight);

    // hours:
    let hour = p.hour();
    p.fill(255);
    p.noStroke();
    p.textSize(32);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Hour: ", boardX + 50, boardY + 50);

    let minute = p.minute();
    p.fill(255);
    p.noStroke();
    p.textSize(32);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Minute: ", boardX + 50, boardY + 170);

    let second = p.second();
    p.fill(255);
    p.noStroke();
    p.textSize(32);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Seconds: ", boardX + 50, boardY + 290);

    const ticksXHours = boardX + 170;
    const ticksXMinutes = boardX + 190;
    const ticksXSeconds = boardX + 220;
    
    drawTallyMarks(p, ticksXHours, boardY + 45, hour, { tallyHeight: 40, groupSpacing: 50, tallySpacing: 11, maxGroupsPerRow: 8 });

    drawTallyMarks(p, ticksXMinutes, boardY + 167, minute, { tallyHeight: 30, groupSpacing: 42, tallySpacing: 9, maxGroupsPerRow: 18 });

    drawTallyMarks(p, ticksXSeconds, boardY + 288, second, { tallyHeight: 26, groupSpacing: 38, tallySpacing: 8, maxGroupsPerRow: 18 });
  };

  function drawTallyMarks(p, startX, startY, count, opts) {
    const tallyHeight = opts.tallyHeight || 30;
    const groupSpacing = opts.groupSpacing || 40;
    const tallySpacing = opts.tallySpacing || 8;
    const maxGroupsPerRow = opts.maxGroupsPerRow || 10;

    p.stroke(255);
    p.strokeWeight(3);
    p.strokeCap(p.ROUND);

    const fullGroups = Math.floor(count / 5);
    const remainder = count % 5;

    // draw full groups (4 vertical + diagonal) with wrapping
    for (let g = 0; g < fullGroups; g++) {
      const groupIndex = g % maxGroupsPerRow;
      const row = Math.floor(g / maxGroupsPerRow);
      const gx = startX + groupIndex * groupSpacing;
      const gy = startY + row * (tallyHeight + 12);

      // 4 veritcal lines
      for (let j = 0; j < 4; j++) {
        const x = gx + j * tallySpacing;
        p.line(x, gy, x, gy + tallyHeight);
      }
      // diagonal 5th line
      p.line(gx, gy, gx + 3 * tallySpacing, gy + tallyHeight);
    }

    const baseGroup = fullGroups;
    for (let r = 0; r < remainder; r++) {
      const groupIndex = baseGroup % maxGroupsPerRow;
      const row = Math.floor(baseGroup / maxGroupsPerRow);
      const gx = startX + groupIndex * groupSpacing + r * tallySpacing;
      const gy = startY + row * (tallyHeight + 12);

      p.line(gx, gy, gx, gy + tallyHeight);
    }
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});