import React from "react";
import { motion } from "framer-motion";

interface MoonProps {
  size?: number;
  top?: string;
  right?: string;
}

const Moon: React.FC<MoonProps> = ({
  size = 120,
  top = "40px",
  right = "40px",
}) => {
  return (
    <motion.div
      className="absolute z-0 pointer-events-none"
      style={{
        top,
        right,
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Mặt trăng */}
      <div className="relative w-full h-full">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-100 to-yellow-200"
          style={{
            boxShadow: "0 0 60px 10px rgba(255, 248, 194, 0.6)",
          }}
          animate={{
            boxShadow: [
              "0 0 60px 10px rgba(255, 248, 194, 0.6)",
              "0 0 70px 15px rgba(255, 248, 194, 0.7)",
              "0 0 60px 10px rgba(255, 248, 194, 0.6)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>

        {/* Bóng trên mặt trăng */}
        <div
          className="absolute rounded-full bg-yellow-50/30"
          style={{
            width: `${size * 0.2}px`,
            height: `${size * 0.2}px`,
            top: `${size * 0.2}px`,
            left: `${size * 0.2}px`,
          }}
        ></div>
        <div
          className="absolute rounded-full bg-yellow-50/20"
          style={{
            width: `${size * 0.15}px`,
            height: `${size * 0.15}px`,
            top: `${size * 0.5}px`,
            left: `${size * 0.6}px`,
          }}
        ></div>
        <div
          className="absolute rounded-full bg-yellow-50/25"
          style={{
            width: `${size * 0.25}px`,
            height: `${size * 0.25}px`,
            top: `${size * 0.6}px`,
            left: `${size * 0.3}px`,
          }}
        ></div>
      </div>

      {/* Các ngôi sao xung quanh */}
      {[...Array(5)].map((_, i) => {
        const starSize = Math.random() * 6 + 2;
        const distance = size * (0.8 + Math.random() * 0.6);
        const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.5;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={i}
            className="absolute bg-yellow-100 rounded-full"
            style={{
              width: `${starSize}px`,
              height: `${starSize}px`,
              left: `${size / 2 + x}px`,
              top: `${size / 2 + y}px`,
              boxShadow: "0 0 5px 2px rgba(255, 248, 194, 0.8)",
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default Moon;
