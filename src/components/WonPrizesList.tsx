import React from "react";
import { motion } from "framer-motion";
import type { Prize } from "../data/prizes";

interface WonPrizesListProps {
  wonPrizes: Array<{
    code: string;
    prize: Prize;
    timestamp: number;
  }>;
}

const WonPrizesList: React.FC<WonPrizesListProps> = ({ wonPrizes }) => {
  if (wonPrizes.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 sm:mt-8 bg-moon-pastel-800/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midautumn-gold-700 shadow-lg"
    >
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-midautumn-gold-400">
        Giải thưởng đã trúng
      </h3>
      <div className="space-y-3">
        {wonPrizes.map((item, index) => (
          <motion.div
            key={item.code}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center p-2 sm:p-3 rounded-lg bg-moon-pastel-700/50 border border-midautumn-gold-600/30"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden flex-shrink-0 bg-moon-pastel-600">
              <img
                src={item.prize.image}
                alt={item.prize.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2 sm:ml-3 flex-grow">
              <h4 className="font-medium text-white text-sm sm:text-base">
                {item.prize.title}
              </h4>
              <div className="flex justify-between items-center mt-0.5 sm:mt-1">
                <span className="text-[10px] sm:text-xs text-midautumn-gold-300">
                  Mã: {item.code}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WonPrizesList;
