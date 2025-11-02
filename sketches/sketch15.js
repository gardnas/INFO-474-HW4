registerSketch('sk15', function (p) {
  const COL_BG = '#FAFAFA';
  const COL_GRID = '#E9E9E9';
  const COL_AXIS = '#666';
  const COL_TEXT = '#333';
  const COL_NB = '#1f77b4';
  const COL_SB = '#d62728';

  let data;
  let M = {};
  let CHART_W, CHART_H;
  let yMax = 300;

  let nbWeekday = new Array(24).fill(0);
  let sbWeekday = new Array(24).fill(0);
  let dataReady = false;

  p.preload = function () {
    data = p.loadTable('data/Fremont_Bridge_Bicycle_Counter.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(2);
    p.textFont('Inter, system-ui, Arial, sans-serif');
    computeLayout();
    processData();
  };

  p.draw = function () {
    p.background(COL_BG);

    p.fill(COL_TEXT);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(24);
    p.text("Two Peaks, Two Directions: Fremont's Bridge Daily Bike Flow 2024", 80, 30);

    drawGrid();
    drawAxes();
    drawAxisLabels();
    drawLines();
    drawDataPoints();
  };

  function computeLayout() {
    M = { top: 100, right: 60, bottom: 100, left: 80 };
    CHART_W = p.width - M.left - M.right;
    CHART_H = p.height - M.top - M.bottom;
  }

  function drawGrid() {
    p.push();
    p.stroke(COL_GRID);
    p.strokeWeight(1);

    for (let val = 0; val <= yMax; val += 50) {
      const y = valueToY(val);
      p.line(M.left, y, M.left + CHART_W, y);
    }

    for (let h = 0; h < 24; h += 2) {
      const x = hourToX(h);
      p.line(x, M.top, x, M.top + CHART_H);
    }

    p.pop();
  }

  function drawAxes() {
    p.push();
    p.stroke(COL_AXIS);
    p.strokeWeight(2);

    p.line(M.left, M.top, M.left, M.top + CHART_H);
    p.line(M.left, M.top + CHART_H, M.left + CHART_W, M.top + CHART_H);

    p.textAlign(p.RIGHT, p.CENTER);
    p.textSize(12);
    p.fill(COL_AXIS);
    for (let val = 0; val <= yMax; val += 50) {
      const y = valueToY(val);
      p.line(M.left - 6, y, M.left, y);
      p.noStroke();
      p.text(val, M.left - 10, y);
      p.stroke(COL_AXIS);
    }

    p.textAlign(p.CENTER, p.TOP);
    for (let h = 0; h < 24; h += 2) {
      const x = hourToX(h);
      p.line(x, M.top + CHART_H, x, M.top + CHART_H + 6);
      p.noStroke();
      p.text(h, x, M.top + CHART_H + 8);
      p.stroke(COL_AXIS);
    }

    p.pop();
  }

  function drawAxisLabels() {
    p.push();
    p.fill(COL_AXIS);
    p.noStroke();
    p.textSize(14);

    p.textAlign(p.CENTER, p.TOP);
    p.text('Hour of day', M.left + CHART_W / 2, M.top + CHART_H + 34);

    p.translate(M.left - 54, M.top + CHART_H / 2);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER, p.TOP);
    p.text('Bikes per hour', 0, 0);

    p.pop();
  }

  function processData() {
    const cols = data.columns.map(c => c || '');
    const dateCol = findColumn(cols, ['date/time', 'date', 'datetime', 'timestamp']);
    const nbCol = findColumn(cols, ['fremont bridge nb', 'northbound', 'cyclist east sidewalk', 'east sidewalk']);
    const sbCol = findColumn(cols, ['fremont bridge sb', 'southbound', 'cyclist west sidewalk', 'west sidewalk']);

    if (!dateCol || !nbCol || !sbCol) {
      console.warn('Required columns not found', cols);
      return;
    }

    const yearBuckets = new Map();

    for (let i = 0; i < data.getRowCount(); i++) {
      const dt = parseTimestamp(data.getString(i, dateCol));
      if (!dt) continue;

      const dow = dt.getDay();
      if (dow === 0 || dow === 6) continue;

      const nbVal = toNumber(data.getString(i, nbCol));
      const sbVal = toNumber(data.getString(i, sbCol));
      if (!isFinite(nbVal) || !isFinite(sbVal)) continue;

      const year = dt.getFullYear();
      if (!yearBuckets.has(year)) {
        yearBuckets.set(year, {
          nb: Array.from({ length: 24 }, () => []),
          sb: Array.from({ length: 24 }, () => []),
          count: 0
        });
      }

      const bucket = yearBuckets.get(year);
      const hour = dt.getHours();
      bucket.nb[hour].push(nbVal);
      bucket.sb[hour].push(sbVal);
      bucket.count++;
    }

    if (yearBuckets.size === 0) {
      console.warn('No weekday records found.');
      return;
    }

    const preferredYear = 2024;
    let selectedYear = preferredYear;
    let selected = yearBuckets.get(preferredYear);

    if (!selected || selected.count === 0) {
      [selectedYear, selected] = Array.from(yearBuckets.entries())
        .sort((a, b) => b[1].count - a[1].count)[0];
    }

    console.log(`Using weekday data from ${selectedYear} (rows: ${selected.count})`);

    for (let h = 0; h < 24; h++) {
      nbWeekday[h] = mean(selected.nb[h]);
      sbWeekday[h] = mean(selected.sb[h]);
    }

    const maxVal = Math.max(...nbWeekday, ...sbWeekday, 0);
    yMax = Math.max(300, Math.ceil(maxVal / 50) * 50);
    dataReady = true;

    console.log('NB hourly means:', nbWeekday.map(v => Math.round(v)));
    console.log('SB hourly means:', sbWeekday.map(v => Math.round(v)));
    console.log('yMax:', yMax);
  }

  function drawDataPoints() {
    if (!dataReady) return;

    p.push();
    p.noStroke();

    p.fill(COL_NB);
    nbWeekday.forEach((val, h) => {
      p.circle(hourToX(h), valueToY(val), 8);
    });

    p.fill(COL_SB);
    sbWeekday.forEach((val, h) => {
      const x = hourToX(h);
      const y = valueToY(val);
      p.square(x - 4, y - 4, 8);
    });

    p.pop();
  }

  function drawLines() {
    p.push();
    p.strokeWeight(3);
    p.noFill();

    p.stroke(COL_NB);
    p.beginShape();
    for (let h = 0; h < 24; h++) {
      p.vertex(hourToX(h), valueToY(nbWeekday[h]));
    }
    p.endShape();

    p.stroke(COL_SB);
    p.beginShape();
    for (let h = 0; h < 24; h++) {
      p.vertex(hourToX(h), valueToY(sbWeekday[h]));
    }
    p.endShape();

    p.pop();
  }

  function findColumn(columns, keywords) {
    const lower = columns.map(c => c.toLowerCase().trim());
    for (let i = 0; i < lower.length; i++) {
      if (keywords.some(k => lower[i].includes(k))) {
        return columns[i];
      }
    }
    return null;
  }

  function toNumber(value) {
    return Number(String(value ?? '').replace(/[^0-9.\-]/g, ''));
  }

  function parseTimestamp(str) {
    if (!str) return null;
    const m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
    if (m) {
      let [, mm, dd, yyyy, hh, mi, ss = '0', ap] = m;
      mm = +mm; dd = +dd; yyyy = +yyyy; hh = +hh % 12; mi = +mi; ss = +ss;
      if (ap) {
        ap = ap.toUpperCase();
        if (ap === 'PM') hh += 12;
        if (ap === 'AM' && hh === 12) hh = 0;
      }
      const d = new Date(yyyy, mm - 1, dd, hh, mi, ss);
      return isNaN(d) ? null : d;
    }
    const fallback = new Date(str);
    return isNaN(fallback) ? null : fallback;
  }

  function mean(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((sum, v) => sum + v, 0) / arr.length;
  }

  function hourToX(hour) {
    return M.left + (hour / 23) * CHART_W;
  }

  function valueToY(value) {
    return M.top + CHART_H - (value / yMax) * CHART_H;
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    computeLayout();
  };
});