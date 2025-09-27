import React from "react";
import { motion } from "framer-motion";

interface LanternProps {
  color: string;
  size: number;
  delay: number;
  duration: number;
  left: string;
  top?: string;
  bottom?: string;
}

const Lantern: React.FC<LanternProps> = ({
  color,
  size,
  delay,
  duration,
  left,
  top,
  bottom,
}) => {
  return (
    <motion.div
      className="absolute z-10 pointer-events-none"
      style={{
        left,
        top: top || undefined,
        bottom: bottom || undefined,
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: [0, -15, 0],
        opacity: 1,
      }}
      transition={{
        y: {
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        },
        opacity: {
          duration: 1,
          delay,
        },
      }}
    >
      <div className="relative">
        {/* Dây treo */}
        <div
          className="absolute left-1/2 -top-10 w-1 bg-midautumn-gold-800"
          style={{ height: "40px", transform: "translateX(-50%)" }}
        ></div>

        {/* Phần trên của lồng đèn */}
        <div
          className="absolute left-1/2 -top-2 w-4 h-2 bg-midautumn-gold-600 rounded-t-lg"
          style={{ transform: "translateX(-50%)" }}
        ></div>

        {/* Thân lồng đèn */}
        <div
          className={`relative w-${size} h-${
            size * 1.5
          } rounded-lg overflow-hidden shadow-lg`}
          style={{ backgroundColor: color }}
        >
          {/* Trang trí lồng đèn */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-yellow-100 rounded-full opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/2 h-1/2 border-2 border-yellow-100 rounded-full opacity-50"></div>
          </div>

          {/* Hiệu ứng ánh sáng */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-100/30 to-transparent"></div>

          {/* Tua dưới */}
          <div
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-6 h-4 bg-midautumn-gold-600"
            style={{ borderRadius: "0 0 40% 40%" }}
          ></div>
        </div>

        {/* Hiệu ứng ánh sáng xung quanh */}
        <div
          className="absolute inset-0 rounded-lg animate-pulse"
          style={{
            boxShadow: `0 0 20px 5px ${color}40`,
            animation: "glow-pulse 2s ease-in-out infinite",
          }}
        ></div>
      </div>
    </motion.div>
  );
};

export default Lantern;
