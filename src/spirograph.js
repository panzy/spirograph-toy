function dist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

class Spirograph {
  constructor() {
    this.stopped = false;
  }

  loop = () => {

    const GREEN = 'rgba(0, 255, 0, .5)';
    const RED = 'rgba(255, 0, 0, 1)';
    const YELLOW = 'rgba(255, 255, 0, .5)';

    const {ctx, width, height, a1, a2, track2, track3} = this;

    const cx = width / 2;
    const cy = height / 2;

    const r1 = Math.min(width, height) / 4;
    const delta1 = Math.PI / 90;

    const r2 = r1 * this.r2Percentage / 100.0;
    const delta2 = -delta1 * 100.0 / Math.max(1, this.r2Percentage);

    const r3 = r2 - 1;

    let x = cx + (r1 - r2) * Math.cos(a1);
    let y = cy + (r1 - r2) * Math.sin(a1);

    let x2 = x + r2 * Math.cos(a2);
    let y2 = y + r2 * Math.sin(a2);

    let x3 = x + r3 * Math.cos(a2);
    let y3 = y + r3 * Math.sin(a2);

    // progress the angles for next frame
    this.a1 += delta1;
    this.a2 += delta2;

    // append to track2
    if (track2.length > 0 && dist(x2, y2, track2[0][0], track2[0][1]) < 1) {
      track2.push([x2, y2]);
      this.track2Full = true;
      this.stopped = true;
    }
    if (!this.track2Full) {
      track2.push([x2, y2]);
    }

    // append to track3
    if (track3.length > 2 && dist(x3, y3, track3[0][0], track3[0][1]) < 2) {
      this.track3Full = true;
      track3.push([x3, y3]);
    }
    if (!this.track3Full) {
      track3.push([x3, y3]);
    }

    //
    // draw
    //

    ctx.lineWidth = 1;

    // fill the canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    if (track2.length > 2) {
      ctx.strokeStyle = RED;
      ctx.beginPath();
      ctx.moveTo(track2[0][0], track2[0][1]);
      track2.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    }

    if (track3.length > 2) {
      ctx.strokeStyle = YELLOW;
      ctx.beginPath();
      ctx.moveTo(track3[0][0], track3[0][1]);
      track3.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    }

    if (!this.stopped) {
      // draw the gears
      ctx.strokeStyle = GREEN;
      // outter gear
      ctx.beginPath();
      ctx.arc(cx, cy, r1, 0, Math.PI * 2);
      ctx.stroke();
      // inner gear
      ctx.beginPath();
      ctx.arc(x, y, r2, 0, Math.PI * 2);
      ctx.stroke();
      // radius of the inner gear
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // call for next frame
      requestAnimationFrame(this.loop);
    }
  }

  pause = () => {
    this.stop();
  }

  resume = () => {
    this.stopped = false;
    this.loop();
  }

  start = (r2Percentage) => {
    let canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.r2Percentage = r2Percentage;
    this.stopped = false;
    this.a1 = Math.PI * 1.5;
    this.a2 = this.a1;
    this.track2 = [];
    this.track2Full = false;
    this.track3 = [];
    this.track3Full = false;

    this.loop();
  }

  stop = () => {
    this.stopped = true;
  }
}

export default Spirograph;
