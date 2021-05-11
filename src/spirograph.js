class Spirograph {
  start = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const GREEN = 'rgba(0, 255, 0, .5)';
    const RED = 'rgba(255, 0, 0, 1)';
    const YELLOW = 'rgba(255, 255, 0, .5)';

    const cx = width / 2;
    const cy = height / 2;

    const r1 = width / 4;
    const delta1 = Math.PI / 90;
    let a1 = Math.PI * 1.5;

    const r2 = r1 / 4;
    const delta2 = delta1 * 3.2;
    let a2 = a1;
    const track2 = [];
    let track2Full = false;

    const r3 = r2 - 1;
    const track3 = [];
    let track3Full = false;


    function dist(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    function loop() {
      ctx.lineWidth = 1;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, width, height);

      let x = cx + r1 * Math.cos(a1);
      let y = cy + r1 * Math.sin(a1);

      let x2 = x + r2 * Math.cos(a2);
      let y2 = y + r2 * Math.sin(a2);

      let x3 = x + r3 * Math.cos(a2);
      let y3 = y + r3 * Math.sin(a2);

      a1 += delta1;
      a2 += delta2;

      if (track2.length > 2) {
        ctx.strokeStyle = RED;
        ctx.beginPath();
        ctx.moveTo(track2[0][0], track2[0][1]);
        track2.forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.stroke();
      }

      if (track2.length > 0 && dist(x2, y2, track2[0][0], track2[0][1]) < 2) {
        track2.push([x2, y2]);
        track2Full = true;
      }
      if (!track2Full) {
        track2.push([x2, y2]);
      }

      if (track3.length > 2) {
        ctx.strokeStyle = YELLOW;
        ctx.beginPath();
        ctx.moveTo(track3[0][0], track3[0][1]);
        track3.forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.stroke();
      }

      if (track3.length > 2 && dist(x3, y3, track3[0][0], track3[0][1]) < 2) {
        track3Full = true;
        track3.push([x3, y3]);
      }
      if (!track3Full) {
        track3.push([x3, y3]);
      }

      ctx.strokeStyle = GREEN;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      requestAnimationFrame(loop);
    }

    loop();
  }
}

export default Spirograph;
