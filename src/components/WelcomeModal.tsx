import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeModalProps {
  onStartMusic: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  onStartMusic,
  onClose,
  isOpen,
}) => {
  const handleStartMusic = () => {
    onStartMusic();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-moon-pastel-800 border-2 border-midautumn-gold-500 rounded-xl p-6 max-w-md mx-4 text-center"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-midautumn-gold-400 mb-3">
              Chào mừng đến với Tết Trung Thu!
            </h2>

            <p className="text-gray-300 mb-6">
              Hãy bắt đầu trải nghiệm với âm thanh để tận hưởng không khí lễ hội
              trọn vẹn nhất.
            </p>

            <motion.button
              className="bg-midautumn-gold-500 text-black font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartMusic}
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
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Phát nhạc và bắt đầu</span>
            </motion.button>

            <button
              className="text-gray-400 hover:text-gray-200 text-sm"
              onClick={onClose}
            >
              Bỏ qua
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
