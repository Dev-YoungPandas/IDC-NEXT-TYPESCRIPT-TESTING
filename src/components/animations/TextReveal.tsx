'use client'; // ✅ ADD THIS!

import { useTextReveal } from '../../hooks/useTextReveal';
import '../../styles/animations.css';

interface TextRevealProps {
  children: React.ReactNode,
  className?: string
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const containerRef = useTextReveal(true);

  return (
    <div ref={containerRef} className={`bottomToUp ${className}`}>
      {children}
    </div>
  );
}