import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.cursor-pointer')
        );
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const followLoop = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(followLoop);
    };

    animationFrameId = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ambient glow ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${trailing.x - 16}px, ${trailing.y - 16}px, 0) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-cyan-400/40 bg-cyan-500/[0.03] shadow-[0_0_15px_rgba(0,240,255,0.2)]" />
      </div>

      {/* Inner precise dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
      </div>
    </>
  );
};
