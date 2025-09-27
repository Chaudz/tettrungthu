import { useState } from "react";
import { prizes } from "./data/prizes";
import type { Prize } from "./data/prizes";
import PrizeGrid from "./components/PrizeGrid";
import SpinWheel from "./components/SpinWheel";
import PrizeModal from "./components/PrizeModal";
import Toast from "./components/Toast";
import ParticleBackground from "./components/ParticleBackground";
import Moon from "./components/Moon";
import Lantern from "./components/Lantern";
import FallingLeaves from "./components/FallingLeaves";
import { motion } from "framer-motion";

function App() {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "wheel">("grid");
  console.log(viewMode);

  const handleSelectPrize = (prize: Prize) => {
    setSelectedPrize(prize);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSelection = () => {
    if (selectedPrize) {
      setToastMessage(`Bạn đã chọn: ${selectedPrize.title}`);
      setShowToast(true);
      setIsModalOpen(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen pb-16 overflow-hidden">
      <ParticleBackground />
      <Moon size={150} top="40px" right="40px" />
      <Lantern
        color="#f83b3b"
        size={16}
        delay={0}
        duration={3}
        left="5%"
        top="100px"
      />
      <Lantern
        color="#ffcf1a"
        size={12}
        delay={1.5}
        duration={4}
        left="15%"
        top="150px"
      />
      <Lantern
        color="#f83b3b"
        size={14}
        delay={0.8}
        duration={3.5}
        left="85%"
        top="120px"
      />
      <Lantern
        color="#ffcf1a"
        size={16}
        delay={2}
        duration={5}
        left="92%"
        top="180px"
      />
      <FallingLeaves />

      <header className="bg-midautumn-red-600 text-white py-6 px-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Tết Trung Thu
              </h1>
              <p className="text-midautumn-red-100">
                Chọn phần thưởng yêu thích của bạn
              </p>
            </div>

            <div className="mt-4 md:mt-0 relative z-10">
              <div className="bg-midautumn-red-700 rounded-lg p-1 inline-flex">
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-midautumn-red-600"
                      : "text-white"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  Lưới
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === "wheel"
                      ? "bg-white text-midautumn-red-600"
                      : "text-white"
                  }`}
                  onClick={() => setViewMode("wheel")}
                >
                  Vòng quay
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-moon-pastel-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-midautumn-gold-700 shadow-midautumn-gold-900/20">
            <h2 className="text-2xl font-bold mb-6 text-midautumn-gold-400">
              Phần Thưởng Có Sẵn
            </h2>

            {viewMode === "grid" ? (
              <PrizeGrid
                prizes={prizes}
                onSelectPrize={handleSelectPrize}
                selectedPrize={selectedPrize}
              />
            ) : (
              <SpinWheel
                prizes={prizes}
                onSelectPrize={handleSelectPrize}
                selectedPrize={selectedPrize}
              />
            )}
          </div>
        </motion.div>
      </main>

      <PrizeModal
        prize={selectedPrize}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSelection}
      />

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </div>
  );
}

export default App;
