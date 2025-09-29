import { useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { validCodes } from "../data/codes";
import type { Prize } from "../data/prizes";

interface UsePrizeTrackingResult {
  usedCodes: string[];
  wonPrizes: Array<{
    code: string;
    prize: Prize;
    timestamp: number;
  }>;
  validateCode: (code: string) => { valid: boolean; message: string };
  addWonPrize: (code: string, prize: Prize) => void;
  hasValidCode: boolean;
  currentCode: string | null;
}

export function usePrizeTracking(): UsePrizeTrackingResult {
  const [usedCodes, setUsedCodes] = useLocalStorage<string[]>(
    "trungThu_usedCodes",
    []
  );
  const [wonPrizes, setWonPrizes] = useLocalStorage<
    Array<{
      code: string;
      prize: Prize;
      timestamp: number;
    }>
  >("trungThu_wonPrizes", []);
  const [currentCode, setCurrentCode] = useState<string | null>(null);

  const validateCode = useCallback(
    (code: string) => {
      // Kiểm tra mã có hợp lệ không
      if (!validCodes.includes(code)) {
        return { valid: false, message: "Mã không hợp lệ." };
      }

      // Kiểm tra mã đã được sử dụng chưa
      if (usedCodes.includes(code)) {
        return { valid: false, message: "Mã này đã được sử dụng." };
      }

      // Mã hợp lệ và chưa sử dụng
      setCurrentCode(code);
      return {
        valid: true,
        message: "Mã hợp lệ! Bạn có thể quay thưởng ngay.",
      };
    },
    [usedCodes]
  );

  const addWonPrize = useCallback(
    (code: string, prize: Prize) => {
      if (!code || usedCodes.includes(code)) return;

      // Thêm mã vào danh sách đã sử dụng
      setUsedCodes((prev) => [...prev, code]);

      // Thêm giải thưởng vào danh sách đã trúng
      setWonPrizes((prev) => [
        ...prev,
        {
          code,
          prize,
          timestamp: Date.now(),
        },
      ]);

      // Xóa mã hiện tại
      setCurrentCode(null);
    },
    [usedCodes, setUsedCodes, setWonPrizes]
  );

  return {
    usedCodes,
    wonPrizes,
    validateCode,
    addWonPrize,
    hasValidCode: !!currentCode,
    currentCode,
  };
}

export default usePrizeTracking;
