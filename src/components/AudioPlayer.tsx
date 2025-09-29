import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion } from "framer-motion";
import useSound from "../hooks/useSound";

interface AudioPlayerProps {
  audioUrl: string;
  initialVolume?: number;
  autoPlay?: boolean;
  ref?: React.Ref<{ play: () => Promise<void> }>;
}

// Định nghĩa kiểu cho ref
export interface AudioPlayerRef {
  play: () => Promise<void>;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ audioUrl, initialVolume = 0.5, autoPlay = false }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(initialVolume);
    const [showNotification, setShowNotification] = useState(false);
    const {
      play,
      pause,
      setVolume: setAudioVolume,
    } = useSound(audioUrl, {
      volume: initialVolume,
      loop: true,
    });

    useEffect(() => {
      setAudioVolume(volume);
    }, [volume, setAudioVolume]);

    // Cung cấp các phương thức cho ref
    useImperativeHandle(ref, () => ({
      play: () => {
        const playPromise = play();
        setIsPlaying(true);
        return playPromise;
      },
    }));

    // Tự động phát nhạc khi component được tải
    useEffect(() => {
      if (autoPlay) {
        play()
          .then(() => {
            setIsPlaying(true);
            setShowNotification(true);

            // Ẩn thông báo sau 5 giây
            setTimeout(() => {
              setShowNotification(false);
            }, 5000);
          })
          .catch((error: unknown) => {
            console.error("Không thể tự động phát nhạc:", error);
          });
      }
    }, [autoPlay, play]);

    const togglePlay = () => {
      if (isPlaying) {
        pause();
        setIsPlaying(false);
      } else {
        play();
        setIsPlaying(true);
      }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
    };

    return (
      <>
        {showNotification && (
          <motion.div
            className="fixed top-4 right-4 bg-midautumn-gold-500 text-black p-3 rounded-lg shadow-lg z-50 flex items-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <span>Đang phát nhạc Trung Thu</span>
          </motion.div>
        )}

        <motion.div
          className="fixed bottom-4 right-4 bg-moon-pastel-700 p-3 rounded-lg shadow-lg z-50 flex items-center space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-midautumn-gold-500 flex items-center justify-center text-black hover:bg-midautumn-gold-400 transition-colors"
            aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-300"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              {volume > 0.01 && (
                <>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  {volume > 0.5 && (
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  )}
                </>
              )}
            </svg>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-midautumn-gold-400"
            />
          </div>

          <div className="text-xs text-gray-300">Nhạc Trung Thu</div>
        </motion.div>
      </>
    );
  }
);

export default AudioPlayer;
