import React from "react";
import { motion } from "framer-motion";

interface DecorationItemProps {
  type: "star" | "rabbit" | "moon" | "cloud";
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const DecorationItem: React.FC<DecorationItemProps> = ({
  type,
  size,
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 3,
  className = "",
}) => {
  // Các kiểu trang trí
  const decorationElements = {
    star: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="#FFD700"
              d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z"
            />
          </svg>
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              boxShadow: "0 0 15px 5px rgba(255, 215, 0, 0.5)",
              animation: "glow-pulse 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>
    ),

    rabbit: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white rounded-full">
          {/* Đầu thỏ */}
          <div className="absolute w-4/5 h-4/5 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Tai trái */}
            <div className="absolute w-1/4 h-3/4 bg-white rounded-full top-0 left-1/4 transform -translate-y-2/3 -rotate-12"></div>
            {/* Tai phải */}
            <div className="absolute w-1/4 h-3/4 bg-white rounded-full top-0 right-1/4 transform -translate-y-2/3 rotate-12"></div>
            {/* Mắt trái */}
            <div className="absolute w-1/8 h-1/8 bg-black rounded-full top-1/2 left-1/3"></div>
            {/* Mắt phải */}
            <div className="absolute w-1/8 h-1/8 bg-black rounded-full top-1/2 right-1/3"></div>
            {/* Mũi */}
            <div className="absolute w-1/6 h-1/10 bg-pink-300 rounded-full top-3/5 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    ),

    moon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-yellow-100 rounded-full overflow-hidden">
          <div className="absolute w-4/5 h-4/5 bg-yellow-300/30 rounded-full top-1/10 left-1/10"></div>
          <div className="absolute w-1/5 h-1/5 bg-yellow-300/40 rounded-full top-1/4 right-1/4"></div>
          <div className="absolute w-1/4 h-1/4 bg-yellow-300/40 rounded-full bottom-1/4 left-1/3"></div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "0 0 20px 8px rgba(255, 248, 225, 0.6)",
          }}
        ></div>
      </div>
    ),

    cloud: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <div className="absolute w-1/2 h-1/2 bg-white rounded-full top-1/4 left-1/4"></div>
          <div className="absolute w-2/5 h-2/5 bg-white rounded-full top-1/5 left-1/10"></div>
          <div className="absolute w-2/5 h-2/5 bg-white rounded-full top-1/5 right-1/10"></div>
          <div className="absolute w-3/10 h-3/10 bg-white rounded-full bottom-1/4 left-1/5"></div>
          <div className="absolute w-3/10 h-3/10 bg-white rounded-full bottom-1/4 right-1/5"></div>
        </div>
      </div>
    ),
  };

  // Animation cho các phần tử trang trí
  const animationVariants = {
    star: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    },
    rabbit: {
      y: [0, -10, 0],
      rotate: [-5, 5, -5],
    },
    moon: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
    },
    cloud: {
      x: [0, 10, 0],
      opacity: [0.8, 1, 0.8],
    },
  };

  return (
    <motion.div
      className={`absolute z-10 pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: top || undefined,
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...animationVariants[type],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: {
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        },
        x: {
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: duration * 2,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
      }}
    >
      {decorationElements[type]}
    </motion.div>
  );
};

interface MidAutumnDecorationProps {
  className?: string;
}

const MidAutumnDecoration: React.FC<MidAutumnDecorationProps> = ({
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      {/* Ngôi sao trang trí */}
      <DecorationItem
        type="star"
        size={30}
        top="15%"
        left="10%"
        delay={0.5}
        duration={4}
      />
      <DecorationItem
        type="star"
        size={20}
        top="25%"
        right="15%"
        delay={1.2}
        duration={3.5}
      />
      <DecorationItem
        type="star"
        size={25}
        top="40%"
        left="20%"
        delay={0.8}
        duration={4.2}
      />
      <DecorationItem
        type="star"
        size={18}
        top="60%"
        right="25%"
        delay={1.5}
        duration={3.8}
      />

      {/* Thỏ ngọc */}
      <DecorationItem
        type="rabbit"
        size={60}
        top="30%"
        right="5%"
        delay={0.3}
        duration={5}
        className="hidden md:block"
      />

      {/* Mây */}
      <DecorationItem
        type="cloud"
        size={80}
        top="5%"
        left="30%"
        delay={0.7}
        duration={6}
        className="hidden md:block"
      />
      <DecorationItem
        type="cloud"
        size={60}
        top="12%"
        right="20%"
        delay={1.3}
        duration={7}
        className="hidden md:block"
      />

      {/* Phiên bản mobile - ít trang trí hơn */}
      <DecorationItem
        type="star"
        size={15}
        top="10%"
        right="10%"
        delay={0.5}
        duration={4}
        className="block md:hidden"
      />
      <DecorationItem
        type="rabbit"
        size={40}
        top="20%"
        left="5%"
        delay={0.3}
        duration={5}
        className="block md:hidden"
      />
    </div>
  );
};

export default MidAutumnDecoration;
