import React from "react";
import { motion } from "framer-motion";

interface LanternDrumProps {
  size?: number;
  position?: "left" | "right" | "center";
  bottom?: string;
  className?: string;
}

const LanternDrum: React.FC<LanternDrumProps> = ({
  size = 100,
  position = "center",
  bottom = "10%",
  className = "",
}) => {
  // Xác định vị trí dựa trên prop position
  let positionStyle = {};
  if (position === "left") {
    positionStyle = { left: "10%", bottom };
  } else if (position === "right") {
    positionStyle = { right: "10%", bottom };
  } else {
    positionStyle = { left: "50%", bottom, transform: "translateX(-50%)" };
  }

  // Animation cho trống lân
  const drumAnimation = {
    rotate: [-5, 5, -5],
  };

  return (
    <motion.div
      className={`fixed z-10 pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 0.8}px`,
        ...positionStyle,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        ...drumAnimation,
      }}
      transition={{
        opacity: { duration: 0.8 },
        y: { duration: 0.8 },
        rotate: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative w-full h-full">
        {/* Thân trống */}
        <div className="absolute inset-0 bg-midautumn-red-800 rounded-lg overflow-hidden">
          {/* Mặt trống */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 bg-midautumn-gold-200 rounded-full border-8 border-midautumn-gold-600">
            {/* Họa tiết trang trí */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-4 border-midautumn-red-600 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-4 border-midautumn-red-600 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-midautumn-red-600 rounded-full"></div>
          </div>

          {/* Trang trí viền */}
          <div className="absolute top-0 left-0 w-full h-1/6 bg-midautumn-gold-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/6 bg-midautumn-gold-600"></div>
        </div>

        {/* Dùi trống bên trái */}
        <motion.div
          className="absolute top-1/4 left-0 w-1/5 h-1/5"
          animate={{ rotate: [30, 60, 30] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        >
          <div className="w-full h-1/3 bg-midautumn-gold-800 rounded-full"></div>
          <div className="w-1/3 h-full bg-midautumn-gold-800 rounded-full"></div>
        </motion.div>

        {/* Dùi trống bên phải */}
        <motion.div
          className="absolute top-1/4 right-0 w-1/5 h-1/5"
          animate={{ rotate: [-30, -60, -30] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 1,
            delay: 0.25,
          }}
        >
          <div className="w-full h-1/3 bg-midautumn-gold-800 rounded-full"></div>
          <div className="w-1/3 h-full ml-auto bg-midautumn-gold-800 rounded-full"></div>
        </motion.div>

        {/* Dây treo */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-1 h-10 bg-midautumn-gold-800"></div>
      </div>
    </motion.div>
  );
};

export default LanternDrum;
