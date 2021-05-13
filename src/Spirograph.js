function dist2(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

class Spirograph {

  loop = () => {

    const GREEN = 'rgba(0, 255, 0, .5)';
    const RED = 'rgba(255, 0, 0, 1)';
    const YELLOW = 'rgba(255, 255, 0, .5)';

    const {ctx, width, height, a1, a2, reverse, track3, track4} = this;

    // the center
    const cx = width / 2;
    const cy = height / 2;

    // the outter gear
    const r1 = Math.min(width, height) * 0.4;
    // angle delta per tick
    const delta1 = Math.PI / 90;

    // the inner gear
    const r2 = r1 * this.r2Percentage / 100.0;
    const delta2 = (this.r2Percentage > 0 ? delta1 * 100.0 / this.r2Percentage : 0) * (reverse ? 1 : -1);

    // the pencil's position, specified by its distance to the inner gear's center.
    const r3 = r2 * this.r3Percentage / 100.0;
    // another pencil, slightly offset
    const r4 = Math.max(0, r3 - 1);

    let x = cx + (r1 - r2) * Math.cos(a1);
    let y = cy + (r1 - r2) * Math.sin(a1);

    // the 1st pencil's current coordinates
    let x3 = x + r3 * Math.cos(a2);
    let y3 = y + r3 * Math.sin(a2);

    // the 2nd pencil's current coordinates
    let x4 = x + r4 * Math.cos(a2);
    let y4 = y + r4 * Math.sin(a2);

    // progress the angles for next frame
    this.a1 += delta1;
    this.a2 += delta2;

    // append to track3
    if (track3.length > 0 && dist2(x3, y3, track3[0][0], track3[0][1]) < 0.01) {
      track3.push([x3, y3]);
      this.track3Full = true;
    }
    if (!this.track3Full) {
      track3.push([x3, y3]);
    }

    // append to track4
    if (track4.length > 2 && dist2(x4, y4, track4[0][0], track4[0][1]) < 0.01) {
      this.track4Full = true;
      track4.push([x4, y4]);
    }
    if (!this.track4Full) {
      track4.push([x4, y4]);
    }

    //
    // draw
    //

    ctx.lineWidth = 1;

    // fill the canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    if (track3.length > 2) {
      ctx.strokeStyle = RED;
      ctx.beginPath();
      ctx.moveTo(track3[0][0], track3[0][1]);
      track3.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    }

    if (track4.length > 2) {
      ctx.strokeStyle = YELLOW;
      ctx.beginPath();
      ctx.moveTo(track4[0][0], track4[0][1]);
      track4.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.stroke();
    }

    if (!this.track3Full) {
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
      ctx.lineTo(x3, y3);
      ctx.stroke();
    }

    // Dry run several times before stop the animation to get rid of the gears completely.
    if (this.track3Full && ++this.dryRunTimes > 10) {
      this.stopped = true;
    }

    if (!this.stopped) {
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

  start = ({r2, r3, reverse}) => {
    let canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.r2Percentage = r2;
    this.r3Percentage = r3;
    this.reverse = reverse; // rever inner gear's rotation?
    this.stopped = false;
    this.dryRunTimes = 0; // each loop after the tracks are full is a dry run
    this.a1 = Math.PI * 1.5;
    this.a2 = this.a1;
    this.track3 = [];
    this.track3Full = false;
    this.track4 = [];
    this.track4Full = false;

    this.loop();
  }

  stop = () => {
    this.stopped = true;
  }
}

export default Spirograph;
