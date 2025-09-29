import React from "react";
import { motion } from "framer-motion";

interface LionProps {
  position: "left" | "right";
  size?: "small" | "medium" | "large";
  className?: string;
}

const Lion: React.FC<LionProps> = ({
  position,
  size = "medium",
  className = "",
}) => {
  // Kích thước dựa trên prop size
  const sizeMap = {
    small: {
      width: "80px",
      height: "80px",
    },
    medium: {
      width: "120px",
      height: "120px",
    },
    large: {
      width: "180px",
      height: "180px",
    },
  };

  // Vị trí dựa trên prop position
  const positionStyle =
    position === "left"
      ? { left: "5%", bottom: "5%" }
      : { right: "5%", bottom: "5%" };

  // Animation cho múa lân
  const danceAnimation = {
    y: [0, -15, 0, -10, 0],
    rotate: position === "left" ? [0, 5, 0, -5, 0] : [0, -5, 0, 5, 0],
    scale: [1, 1.05, 1, 1.05, 1],
  };

  return (
    <motion.div
      className={`fixed z-20 pointer-events-none ${className}`}
      style={{
        ...positionStyle,
        ...sizeMap[size],
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        ...danceAnimation,
      }}
      transition={{
        opacity: { duration: 1 },
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
        rotate: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative w-full h-full">
        {/* Đầu lân */}
        <div className="absolute top-0 left-0 w-full h-3/5 bg-midautumn-red-600 rounded-t-full overflow-hidden">
          {/* Mặt lân */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-4/5 h-2/5 bg-midautumn-gold-400 rounded-full">
            {/* Mắt trái */}
            <div className="absolute top-1/4 left-1/4 w-1/5 h-2/5 bg-black rounded-full">
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full"></div>
            </div>

            {/* Mắt phải */}
            <div className="absolute top-1/4 right-1/4 w-1/5 h-2/5 bg-black rounded-full">
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full"></div>
            </div>

            {/* Miệng */}
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-1/2 h-1/5 bg-midautumn-red-800 rounded-full"></div>
          </div>

          {/* Sừng trái */}
          <div className="absolute top-0 left-1/6 w-1/6 h-1/4 bg-midautumn-gold-600 rounded-full transform -rotate-45"></div>

          {/* Sừng phải */}
          <div className="absolute top-0 right-1/6 w-1/6 h-1/4 bg-midautumn-gold-600 rounded-full transform rotate-45"></div>

          {/* Trang trí đầu */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1/6 bg-midautumn-gold-500 rounded-full"></div>
        </div>

        {/* Thân lân */}
        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-midautumn-red-600 rounded-b-lg overflow-hidden">
          {/* Trang trí thân */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-midautumn-gold-400 rounded-t-lg flex justify-center items-center">
            <div className="w-3/4 h-3/4 border-2 border-midautumn-gold-600 rounded-full"></div>
          </div>

          {/* Chân trước */}
          <div className="absolute bottom-0 left-1/5 w-1/5 h-1/2 bg-midautumn-red-700 rounded-b-lg"></div>

          {/* Chân sau */}
          <div className="absolute bottom-0 right-1/5 w-1/5 h-1/2 bg-midautumn-red-700 rounded-b-lg"></div>
        </div>

        {/* Hiệu ứng lấp lánh */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 to-transparent rounded-lg"></div>
      </div>
    </motion.div>
  );
};

export default Lion;
