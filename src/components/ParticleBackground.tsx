import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: "star" | "moon" | "circle";
}

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);

  const colors = ["#FFF9C4", "#FFECB3", "#FFE082", "#FFFFFF"];
  const shapes = ["star", "moon", "circle"];

  const initParticles = (width: number, height: number) => {
    particles.current = [];
    const particleCount = Math.min(Math.floor((width * height) / 10000), 50);

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)] as
          | "star"
          | "moon"
          | "circle",
      });
    }
  };

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const innerAngle = angle + Math.PI / 5;

      if (i === 0) {
        ctx.moveTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
      } else {
        ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
      }

      ctx.lineTo(
        x + (size / 2) * Math.cos(innerAngle),
        y + (size / 2) * Math.sin(innerAngle)
      );
    }
    ctx.closePath();
    ctx.fill();
  };

  const drawMoon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x + size * 0.3, y - size * 0.3, size * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);

    particles.current.forEach((particle) => {
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;

      switch (particle.shape) {
        case "star":
          drawStar(ctx, particle.x, particle.y, particle.size * 2);
          break;
        case "moon":
          drawMoon(ctx, particle.x, particle.y, particle.size * 1.5);
          break;
        case "circle":
        default:
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
      }

      // Add subtle glow effect
      ctx.globalAlpha = particle.opacity * 0.3;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = particle.size * 3;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < -particle.size * 2) particle.x = width + particle.size;
      if (particle.x > width + particle.size * 2) particle.x = -particle.size;
      if (particle.y < -particle.size * 2) particle.y = height + particle.size;
      if (particle.y > height + particle.size * 2) particle.y = -particle.size;
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawParticles(ctx, canvas.width, canvas.height);
    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    initParticles(width, height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className || ""}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
