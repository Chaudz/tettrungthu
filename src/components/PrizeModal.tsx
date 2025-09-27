import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Prize } from "../data/prizes";
import useLocalStorage from "../hooks/useLocalStorage";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

interface PrizeModalProps {
  prize: Prize | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({
  prize,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [showConfetti, setShowConfetti] = React.useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [, setPreviouslySelectedId] = useLocalStorage<string | null>(
    "previouslySelectedPrize",
    null
  );
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (prize) {
      setPreviouslySelectedId(prize.id);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        onConfirm();
      }, 3000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && prize && (
        <div
          className="modal-backdrop"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {showConfetti && (
            <ReactConfetti width={width} height={height} recycle={false} />
          )}

          <motion.div
            className="modal-content bg-moon-pastel-700 text-gray-100"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-start mb-4">
              <h2
                id="modal-title"
                className="text-2xl font-bold text-midautumn-gold-400"
              >
                Xác nhận lựa chọn
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Đóng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center mb-6">
              <div className="w-40 h-40 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                <img
                  src={prize.image}
                  alt={prize.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">{prize.title}</h3>
                <p className="text-gray-300 mb-3">{prize.description}</p>
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                  style={{
                    backgroundColor:
                      prize.rarity === "Legendary"
                        ? "#fff8c2"
                        : prize.rarity === "Epic"
                        ? "#f3e8ff"
                        : prize.rarity === "Rare"
                        ? "#dbeafe"
                        : "#f3f4f6",
                    color:
                      prize.rarity === "Legendary"
                        ? "#854d0e"
                        : prize.rarity === "Epic"
                        ? "#6b21a8"
                        : prize.rarity === "Rare"
                        ? "#1e40af"
                        : "#4b5563",
                  }}
                >
                  {prize.rarity}
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-lg">
                Bạn có chắc chắn muốn chọn phần thưởng này?
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="btn btn-secondary" onClick={onClose}>
                Hủy bỏ
              </button>
              <motion.button
                className="btn btn-primary"
                onClick={handleConfirm}
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 10px rgba(240, 181, 0, 0.5)",
                }}
              >
                Xác nhận
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrizeModal;
