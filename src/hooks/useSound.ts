import { useRef, useEffect } from "react";

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export const useSound = (soundUrl: string, options: SoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { volume = 1, loop = false } = options;

  useEffect(() => {
    // Tạo phần tử audio mới khi component mount
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.loop = loop;
    audioRef.current = audio;

    // Cleanup khi component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundUrl, volume, loop]);

  const play = () => {
    if (audioRef.current) {
      // Đặt lại thời gian phát về đầu nếu đang phát
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Không thể phát âm thanh:", error);
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  };

  return { play, stop, pause, setVolume };
};

export default useSound;
