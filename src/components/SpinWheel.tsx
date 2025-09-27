import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Prize } from "../data/prizes";
import useSound from "../hooks/useSound";

interface SpinWheelProps {
  prizes: Prize[];
  onSelectPrize: (prize: Prize) => void;
  selectedPrize: Prize | null;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ prizes, onSelectPrize }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<Prize | null>(null);
  const [showStars, setShowStars] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Mảng các ngôi sao xung quanh vòng quay
  const stars = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const distance = 180;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 3,
    };
  });

  const spinSound = useSound("/sounds/wheel-spin.mp3", { volume: 0.5 });
  const winSound = useSound("/sounds/win-sound.mp3", { volume: 0.7 });

  // Hiệu ứng ngôi sao xuất hiện khi quay
  useEffect(() => {
    if (isSpinning) {
      setShowStars(true);
    } else {
      const timer = setTimeout(() => {
        setShowStars(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowStars(true);
    spinSound.play();

    // Chọn ngẫu nhiên một giải thưởng
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

    // Tính góc cho giải thưởng được chọn
    const prizeIndex = prizes.findIndex((p) => p.id === randomPrize.id);
    const segmentAngle = 360 / prizes.length;
    const prizeAngle = segmentAngle * prizeIndex;

    // Tính góc quay (5-10 vòng + góc đến giải thưởng)
    const spinRotation = 1800 + 360 - prizeAngle;

    // Thiết lập góc quay mới
    setRotation((prev) => prev + spinRotation);

    // Sau khi quay xong, chọn giải thưởng
    setTimeout(() => {
      winSound.play();
      setWinner(randomPrize);
      onSelectPrize(randomPrize);
      setIsSpinning(false);
    }, 5000);
  };

  const getColorByRarity = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return { bg: "#fff8c2", text: "#854d0e" };
      case "Epic":
        return { bg: "#f3e8ff", text: "#6b21a8" };
      case "Rare":
        return { bg: "#dbeafe", text: "#1e40af" };
      default:
        return { bg: "#f3f4f6", text: "#4b5563" };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 relative">
      {/* Lồng đèn trang trí bên trái */}
      <motion.div
        className="absolute left-0 top-1/4 -translate-x-1/2 hidden md:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-16 h-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-midautumn-gold-800"></div>
          <div className="absolute top-8 w-full h-12 bg-midautumn-red-600 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-midautumn-red-400/30 to-transparent"></div>
            <div className="w-8 h-8 rounded-full border-2 border-midautumn-gold-300/50"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-midautumn-gold-600"></div>
        </div>
      </motion.div>

      {/* Lồng đèn trang trí bên phải */}
      <motion.div
        className="absolute right-0 top-2/3 translate-x-1/2 hidden md:block"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -3, 0, 3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      >
        <div className="w-14 h-18 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-midautumn-gold-800"></div>
          <div className="absolute top-6 w-full h-10 bg-midautumn-gold-500 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-midautumn-gold-300/30 to-transparent"></div>
            <div className="w-6 h-6 rounded-full border-2 border-midautumn-red-300/50"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-midautumn-red-600"></div>
        </div>
      </motion.div>
      <div className="relative w-64 h-64 md:w-96 md:h-96 mb-6">
        {/* Hiệu ứng ngôi sao xung quanh */}
        <AnimatePresence>
          {showStars &&
            stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-yellow-200"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: `${star.x}%`,
                  marginTop: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  zIndex: 5,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.5, 1, 0],
                  scale: [0, 1.2, 0.8, 1.5, 0],
                  boxShadow: [
                    "0 0 0px rgba(255, 255, 0, 0)",
                    "0 0 8px rgba(255, 255, 0, 0.8)",
                    "0 0 4px rgba(255, 255, 0, 0.4)",
                    "0 0 10px rgba(255, 255, 0, 1)",
                    "0 0 0px rgba(255, 255, 0, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: star.delay,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            ))}
        </AnimatePresence>

        {/* Hiệu ứng ánh sáng xung quanh vòng quay */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "110%",
            height: "110%",
            left: "-5%",
            top: "-5%",
            background:
              "radial-gradient(circle, rgba(255,207,26,0.2) 0%, rgba(255,207,26,0) 70%)",
            zIndex: 1,
          }}
          animate={{
            opacity: isSpinning ? [0.3, 0.7, 0.3] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        {/* Bánh xe */}
        <motion.div
          ref={wheelRef}
          className="w-full h-full rounded-full relative overflow-hidden border-8 border-midautumn-gold-600"
          style={{
            transformOrigin: "center center",
          }}
          animate={{
            rotate: rotation,
          }}
          transition={{
            duration: 5,
            ease: [0.2, 0.6, 0.4, 1],
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {prizes.map((prize, index) => {
              const angle = 360 / prizes.length;
              const startAngle = index * angle;
              const endAngle = (index + 1) * angle;
              const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);

              const middleRad = ((startAngle + endAngle) / 2) * (Math.PI / 180);
              const textX = 50 + 30 * Math.cos(middleRad);
              const textY = 50 + 30 * Math.sin(middleRad);

              const { bg, text } = getColorByRarity(prize.rarity);

              return (
                <g key={prize.id}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={bg}
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill={text}
                    fontSize="3"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform={`rotate(${
                      startAngle + angle / 2 + 90
                    }, ${textX}, ${textY})`}
                    className="select-none pointer-events-none"
                  >
                    {prize.title.length > 10
                      ? `${prize.title.substring(0, 10)}...`
                      : prize.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Kim chỉ */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{
            y: isSpinning ? [-2, 0, -2] : 0,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpinning ? Infinity : 0,
            repeatType: "reverse",
          }}
        >
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-midautumn-gold-600 drop-shadow-lg"></div>
        </motion.div>

        {/* Nút giữa */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-midautumn-gold-600 flex items-center justify-center shadow-lg z-10">
          <motion.div
            className="w-12 h-12 rounded-full bg-midautumn-gold-500 flex items-center justify-center shadow-inner"
            animate={{
              boxShadow: isSpinning
                ? [
                    "0 0 10px 5px rgba(255, 207, 26, 0.5) inset",
                    "0 0 20px 8px rgba(255, 207, 26, 0.7) inset",
                    "0 0 10px 5px rgba(255, 207, 26, 0.5) inset",
                  ]
                : "0 0 10px 5px rgba(255, 207, 26, 0.3) inset",
            }}
            transition={{
              duration: 1,
              repeat: isSpinning ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <div className="w-8 h-8 rounded-full bg-midautumn-gold-700 flex items-center justify-center shadow-inner">
              <motion.div
                className="w-4 h-4 rounded-full bg-midautumn-gold-800"
                animate={{
                  scale: isSpinning ? [1, 1.2, 1] : 1,
                  backgroundColor: isSpinning
                    ? ["#d18e00", "#f0b500", "#d18e00"]
                    : "#d18e00",
                }}
                transition={{
                  duration: 0.5,
                  repeat: isSpinning ? Infinity : 0,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`px-8 py-4 rounded-full text-white font-bold text-lg transition-all ${
          isSpinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-midautumn-gold-600 hover:bg-midautumn-gold-500 hover:shadow-lg"
        }`}
        whileHover={
          !isSpinning
            ? {
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(240, 181, 0, 0.4)",
              }
            : {}
        }
        whileTap={!isSpinning ? { scale: 0.95 } : {}}
        animate={
          isSpinning
            ? {
                boxShadow: [
                  "0 0 0px rgba(240, 181, 0, 0)",
                  "0 0 20px 5px rgba(240, 181, 0, 0.6)",
                  "0 0 0px rgba(240, 181, 0, 0)",
                ],
              }
            : {}
        }
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: isSpinning ? Infinity : 0,
            repeatType: "reverse",
          },
        }}
      >
        {isSpinning ? "Đang quay..." : "Quay ngay!"}
      </motion.button>

      {winner && !isSpinning && (
        <motion.div
          className="mt-6 text-center p-4 rounded-xl bg-moon-pastel-700/50 backdrop-blur-sm border border-midautumn-gold-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              boxShadow: [
                "0 0 0px rgba(240, 181, 0, 0)",
                "0 0 15px 2px rgba(240, 181, 0, 0.3)",
                "0 0 0px rgba(240, 181, 0, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <p className="text-lg font-medium">
            Giải thưởng của bạn:{" "}
            <span className="font-bold text-midautumn-gold-400">
              {winner.title}
            </span>
          </p>
          <motion.div
            className="mt-2 text-sm text-midautumn-gold-200"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Chúc mừng bạn đã trúng thưởng!
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SpinWheel;
