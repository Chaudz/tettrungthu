import React, { useRef, useEffect } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  shape: number;
}

const FallingLeaves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);

  const colors = [
    "#e57373", // Đỏ nhạt
    "#ffb74d", // Cam
    "#fff176", // Vàng
    "#ffd54f", // Vàng đậm
    "#ffb300", // Vàng cam
  ];

  const initLeaves = (width: number, height: number) => {
    const leafCount = Math.min(Math.floor((width * height) / 20000), 30);
    const leaves: Leaf[] = [];

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 15 + 5,
        speed: Math.random() * 1 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        shape: Math.floor(Math.random() * 3),
      });
    }

    leavesRef.current = leaves;
  };

  const drawLeaf = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    color: string,
    opacity: number,
    shape: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    switch (shape) {
      case 0: // Lá hình tròn (đại diện cho bánh trung thu)
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        // Vẽ hoa văn trên bánh
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 1: // Lá hình lồng đèn đơn giản
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, 0);
        ctx.lineTo(0, size / 2);
        ctx.lineTo(-size / 2, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case 2: // Lá hình ngôi sao
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = size / 4;

        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI * i) / spikes;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    leavesRef.current.forEach((leaf) => {
      // Cập nhật vị trí
      leaf.y += leaf.speed;
      leaf.x += Math.sin(leaf.y / 50) * 0.5;
      leaf.rotation += leaf.rotationSpeed;

      // Vẽ lá
      drawLeaf(
        ctx,
        leaf.x,
        leaf.y,
        leaf.size,
        leaf.rotation,
        leaf.color,
        leaf.opacity,
        leaf.shape
      );

      // Reset khi lá rơi xuống dưới màn hình
      if (leaf.y > canvas.height + leaf.size) {
        leaf.y = -leaf.size;
        leaf.x = Math.random() * canvas.width;
      }
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    initLeaves(width, height);
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
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    />
  );
};

export default FallingLeaves;
