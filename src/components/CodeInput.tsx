import React, { useState } from "react";
import { motion } from "framer-motion";

interface CodeInputProps {
  onValidate: (code: string) => { valid: boolean; message: string };
  hasValidCode: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ onValidate, hasValidCode }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setMessage({ text: "Vui lòng nhập mã!", isError: true });
      return;
    }

    const result = onValidate(code.trim().toUpperCase());
    setMessage({ text: result.message, isError: !result.valid });

    if (result.valid) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  return (
    <div className="mb-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 sm:gap-3"
      >
        <div className="flex-grow">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã quay thưởng"
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-midautumn-gold-600 bg-moon-pastel-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-midautumn-gold-500"
            disabled={hasValidCode}
          />
        </div>
        <motion.button
          type="submit"
          className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium ${
            hasValidCode
              ? "bg-green-600 text-white"
              : "bg-midautumn-gold-600 hover:bg-midautumn-gold-500 text-white"
          }`}
          whileHover={!hasValidCode ? { scale: 1.03 } : {}}
          whileTap={!hasValidCode ? { scale: 0.98 } : {}}
          disabled={hasValidCode}
          animate={
            isAnimating
              ? {
                  scale: [1, 1.1, 1],
                  backgroundColor: [
                    "rgb(217, 119, 6)",
                    "rgb(16, 185, 129)",
                    "rgb(16, 185, 129)",
                  ],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          {hasValidCode ? "✓ Mã hợp lệ" : "Kiểm tra"}
        </motion.button>
      </form>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
            message.isError ? "text-red-400" : "text-green-400"
          }`}
        >
          {message.text}
        </motion.div>
      )}
    </div>
  );
};

export default CodeInput;
