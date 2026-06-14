/**
 * Reusable animated ocean background — flowing streak particles with camera drift.
 */

export interface OceanAnimationOptions {
  particleCount?: number;
  bubbleCount?: number;
  baseColor?: string;
  deepColor?: string;
  abyssColor?: string;
  speedMultiplier?: number;
}

interface OceanConfig {
  particleCount: number;
  bubbleCount: number;
  baseColor: string;
  deepColor: string;
  abyssColor: string;
  speedMultiplier: number;
}

interface OceanParticle {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  width: number;
}

interface OceanBubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

export class OceanAnimation {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly config: OceanConfig;
  private readonly _boundResize: () => void;
  private readonly _boundFrame: () => void;

  private particles: OceanParticle[] = [];
  private bubbles: OceanBubble[] = [];
  private width = 0;
  private height = 0;
  private time = 0;
  private driftX = 0;
  private driftY = 0;
  private scrollVelocity = 0;
  private bubbleIntensity = 0;
  private depth = 0;
  private targetDepth = 0;
  private running = false;

  constructor(canvas: HTMLCanvasElement, options: OceanAnimationOptions = {}) {
    this.canvas = canvas;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      throw new Error("OceanAnimation: 2d canvas context unavailable");
    }
    this.ctx = context;

    this.config = {
      particleCount: options.particleCount ?? 160,
      bubbleCount: options.bubbleCount ?? 32,
      baseColor: options.baseColor ?? "#7ec8e3",
      deepColor: options.deepColor ?? "#4a9ec4",
      abyssColor: options.abyssColor ?? "#0f2535",
      speedMultiplier: options.speedMultiplier ?? 1,
    };

    this._boundResize = this.resize.bind(this);
    this._boundFrame = this.frame.bind(this);

    this.initParticles();
    this.initBubbles();
    this.resize();
    window.addEventListener("resize", this._boundResize);
  }

  initParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  private initBubbles(): void {
    this.bubbles = [];
    for (let i = 0; i < this.config.bubbleCount; i++) {
      this.bubbles.push(this.createBubble(true));
    }
  }

  createParticle(randomY = false): OceanParticle {
    const w = this.width || window.innerWidth;
    const h = this.height || window.innerHeight;
    const length = 20 + Math.random() * 120;
    const speed = 0.3 + Math.random() * 1.2;
    const opacity = 0.04 + Math.random() * 0.22;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.15;

    return {
      x: Math.random() * (w + 200) - 100,
      y: randomY
        ? Math.random() * (h + 200) - 100
        : -length - Math.random() * 100,
      length,
      speed,
      opacity,
      angle,
      width: 0.8 + Math.random() * 2.2,
    };
  }

  private createBubble(randomY = false): OceanBubble {
    const w = this.width || window.innerWidth;
    const h = this.height || window.innerHeight;
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 100,
      radius: 1 + Math.random() * 4,
      speed: 0.4 + Math.random() * 1.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      opacity: 0.08 + Math.random() * 0.2,
    };
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = w;
    this.height = h;
  }

  setDepth(depth: number): void {
    this.targetDepth = Math.max(0, Math.min(1, depth));
  }

  setSpeedMultiplier(mult: number): void {
    this.config.speedMultiplier = mult;
  }

  setBubbleIntensity(intensity: number): void {
    this.bubbleIntensity = Math.max(0, Math.min(1, intensity));
  }

  setScrollVelocity(vel: number): void {
    this.scrollVelocity = vel;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame(this._boundFrame);
  }

  stop(): void {
    this.running = false;
  }

  frame(): void {
    if (!this.running) return;
    if (document.hidden) {
      requestAnimationFrame(this._boundFrame);
      return;
    }

    this.time += 16.67;
    this.depth += (this.targetDepth - this.depth) * 0.06;

    const velDrift = this.scrollVelocity * 0.15;
    this.driftX =
      Math.sin(this.time * 0.0003) * 8 +
      Math.sin(this.time * 0.0007) * 4 +
      velDrift * 0.3;
    this.driftY = Math.cos(this.time * 0.00025) * 6 + velDrift * 0.5;

    this.draw();
    requestAnimationFrame(this._boundFrame);
  }

  draw(): void {
    const { ctx, width, height, depth } = this;
    const { baseColor, deepColor, abyssColor } = this.config;

    const r1 = this.lerpColor(baseColor, deepColor, depth * 0.5);
    const r2 = this.lerpColor(deepColor, abyssColor, depth * 0.9);

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, r1);
    grad.addColorStop(0.4, this.lerpColor(r1, r2, depth * 0.4));
    grad.addColorStop(1, r2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    if (depth < 0.35) {
      this.drawCaustics(width, height, depth);
    }

    ctx.save();
    ctx.translate(this.driftX, this.driftY);

    const depthAngle = depth * 0.12;
    const speedMult = this.config.speedMultiplier;

    for (const p of this.particles) {
      const angle = p.angle + depthAngle;
      const speed = p.speed * speedMult * (1 + depth * 0.3);
      p.x += Math.cos(angle) * speed;
      p.y += Math.sin(angle) * speed;

      if (p.y > height + p.length + 50 || p.x > width + p.length + 50) {
        Object.assign(p, this.createParticle(false));
        p.y = -p.length - Math.random() * 80;
        p.x = Math.random() * (width + 200) - 100;
      }

      const fadeDepth = 1 - depth * 0.55;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * fadeDepth})`;
      ctx.lineWidth = p.width;
      ctx.lineCap = "round";
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(
        p.x - Math.cos(angle) * p.length,
        p.y - Math.sin(angle) * p.length,
      );
      ctx.stroke();
    }

    ctx.restore();

    if (this.bubbleIntensity > 0.01) {
      this.drawBubbles(width, height);
    }

    if (depth > 0.08) {
      const overlay = ctx.createLinearGradient(0, 0, 0, height);
      overlay.addColorStop(0, `rgba(10, 30, 50, ${depth * 0.12})`);
      overlay.addColorStop(1, `rgba(3, 10, 20, ${depth * 0.4})`);
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawCaustics(width: number, height: number, depth: number): void {
    const { ctx } = this;
    const intensity = (1 - depth / 0.35) * 0.06;
    if (intensity <= 0) return;

    ctx.save();
    ctx.globalCompositeOperation = "overlay";
    for (let i = 0; i < 5; i++) {
      const cx =
        width * (0.2 + i * 0.15) + Math.sin(this.time * 0.001 + i) * 40;
      const cy =
        height * 0.3 + Math.cos(this.time * 0.0008 + i * 2) * 30;
      const r = 80 + Math.sin(this.time * 0.0012 + i) * 30;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
      g.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
  }

  drawBubbles(_width: number, _height: number): void {
    const { ctx } = this;
    const intensity = this.bubbleIntensity;

    for (const b of this.bubbles) {
      b.wobble += b.wobbleSpeed;
      b.y -= b.speed * this.config.speedMultiplier;
      b.x += Math.sin(b.wobble) * 0.4;

      if (b.y < -10) {
        Object.assign(b, this.createBubble(false));
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * intensity})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        b.x - b.radius * 0.3,
        b.y - b.radius * 0.3,
        b.radius * 0.25,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * intensity * 0.6})`;
      ctx.fill();
    }
  }

  lerpColor(hex1: string, hex2: string, t: number): string {
    const c1 = this.hexToRgb(hex1);
    const c2 = this.hexToRgb(hex2);
    return `rgb(${Math.round(c1.r + (c2.r - c1.r) * t)}, ${Math.round(c1.g + (c2.g - c1.g) * t)}, ${Math.round(c1.b + (c2.b - c1.b) * t)})`;
  }

  hexToRgb(hex: string): Rgb {
    const h = hex.replace("#", "");
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  }

  destroy(): void {
    this.stop();
    window.removeEventListener("resize", this._boundResize);
  }
}
