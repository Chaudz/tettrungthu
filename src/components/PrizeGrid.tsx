import React from "react";
import type { Prize } from "../data/prizes";
import PrizeCard from "./PrizeCard";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";
import useLocalStorage from "../hooks/useLocalStorage";
import { motion } from "framer-motion";

interface PrizeGridProps {
  prizes: Prize[];
  onSelectPrize: (prize: Prize) => void;
  selectedPrize: Prize | null;
}

const PrizeGrid: React.FC<PrizeGridProps> = ({
  prizes,
  onSelectPrize,
  selectedPrize,
}) => {
  const [previouslySelectedId] = useLocalStorage<string | null>(
    "previouslySelectedPrize",
    null
  );

  const { focusedIndex } = useKeyboardNavigation({
    itemCount: prizes.length,
    onSelect: (index) => {
      onSelectPrize(prizes[index]);
    },
    gridColumns: 3,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {prizes.map((prize, index) => (
        <motion.div key={prize.id} variants={item}>
          <PrizeCard
            prize={prize}
            onSelect={onSelectPrize}
            isSelected={selectedPrize?.id === prize.id}
            isFocused={focusedIndex === index}
            previouslySelected={previouslySelectedId === prize.id}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PrizeGrid;
