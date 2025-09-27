import { useEffect, useState, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  itemCount: number;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
  gridColumns?: number;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({
  itemCount,
  onSelect,
  onEscape,
  gridColumns = 3,
  enabled = true,
}: UseKeyboardNavigationProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev < 0 ? 0 : Math.min(prev + 1, itemCount - 1);
          return next;
        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev <= 0 ? 0 : prev - 1;
          return next;
        });
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev < 0 ? 0 : Math.min(prev + gridColumns, itemCount - 1);
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev < gridColumns ? prev : prev - gridColumns;
          return next;
        });
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0 && onSelect) {
          event.preventDefault();
          onSelect(focusedIndex);
        }
        break;
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
      default:
        break;
    }
  }, [focusedIndex, itemCount, onSelect, onEscape, gridColumns, enabled]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);

  return { focusedIndex, setFocusedIndex };
};

export default useKeyboardNavigation;
