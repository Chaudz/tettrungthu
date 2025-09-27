import React from "react";
import { motion } from "framer-motion";
import type { Prize } from "../data/prizes";
import clsx from "clsx";

interface PrizeCardProps {
  prize: Prize;
  onSelect: (prize: Prize) => void;
  isSelected: boolean;
  isFocused: boolean;
  previouslySelected: boolean;
}

const PrizeCard: React.FC<PrizeCardProps> = ({
  prize,
  onSelect,
  isSelected,
  isFocused,
  previouslySelected,
}) => {
  const { title, description, image, rarity } = prize;

  const rarityClasses = {
    Common: "",
    Rare: "prize-card-rare",
    Epic: "prize-card-epic",
    Legendary: "prize-card-legendary",
  };

  const rarityColors = {
    Common: "bg-gray-600 text-gray-200",
    Rare: "bg-blue-700 text-blue-100",
    Epic: "bg-purple-700 text-purple-100",
    Legendary: "bg-midautumn-gold-600 text-midautumn-gold-100",
  };

  return (
    <motion.div
      className={clsx(
        "prize-card",
        rarityClasses[rarity],
        isSelected && "prize-card-selected",
        isFocused && "ring-2 ring-midautumn-red-300"
      )}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      onClick={() => onSelect(prize)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(prize);
        }
      }}
    >
      {rarity === "Legendary" && <div className="legendary-shimmer" />}

      {previouslySelected && (
        <div className="absolute -top-1 -right-1 bg-midautumn-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Đã chọn trước đó
        </div>
      )}

      <div className="relative h-32 mb-3 flex items-center justify-center">
        <img src={image} alt={title} className="w-full h-full object-contain" />
        {(isSelected || isFocused) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-midautumn-gold-300"
                initial={{
                  x: "50%",
                  y: "20%",
                  opacity: 0,
                }}
                animate={{
                  x: [
                    `${50 + Math.random() * 30}%`,
                    `${50 + Math.random() * 40}%`,
                    `${50 + Math.random() * 30}%`,
                  ],
                  y: [
                    `${20 + Math.random() * 10}%`,
                    `${5 + Math.random() * 15}%`,
                    `${20 + Math.random() * 10}%`,
                  ],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>

      <div className="flex justify-between items-center">
        <span
          className={clsx(
            "text-xs px-2 py-1 rounded-full",
            rarityColors[rarity]
          )}
        >
          {rarity}
        </span>

        <button
          className="btn btn-primary text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(prize);
          }}
          aria-label={`Chọn ${title}`}
        >
          Chọn
        </button>
      </div>
    </motion.div>
  );
};

export default PrizeCard;
