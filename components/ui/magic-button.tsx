import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { ArrowRight, Zap } from 'lucide-react';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  icon?: React.ElementType; // Optional icon override
}

export const MagicButton: React.FC<MagicButtonProps> = ({ children, href, className, icon: Icon = ArrowRight, ...props }) => {
  const buttonRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // The inner content structure to match the CSS animation logic for the icon
  const content = (
    <>
      <div className="relative z-20 flex items-center justify-center gap-0 font-black text-white uppercase tracking-wider text-lg md:text-xl">
        <span>{children}</span>
        {/* Icon Animation mimicking: .elementor-button-icon logic */}
        <Icon className="w-6 h-6 transition-all duration-500 ease-out transform translate-x-[-50px] opacity-0 -mr-[24px] group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-2 group-hover:mr-0 text-white fill-current" />
      </div>
      
      {/* Mouse Follow Glow (::after equivalent) */}
      <div 
        className="absolute w-[80px] h-[40px] bg-[#cee2ff] rounded-full blur-[20px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
        style={{ 
          left: position.x, 
          top: position.y, 
          transform: 'translate(-50%, -50%)',
          opacity: opacity
        }}
      />

      {/* Background Divisória (::before equivalent - simulated with border/gradient as no URL was provided) */}
      <div className="absolute top-1/2 left-1/2 w-full h-[105%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-white to-transparent w-[1px] rotate-45 hidden" />
    </>
  );

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center px-8 py-5 overflow-hidden rounded-[10px] transition-all duration-1000 cursor-pointer bg-brand-button",
    className
  );
  
  // Custom styles for the specific box-shadows requested
  const customStyle = {
    boxShadow: opacity 
      ? "0px 0px 70px 15px #4B7FE1, 0 0 0 6px rgba(255, 255, 255, 0.12)" 
      : "0px 0px 50px 5px #4B7FE1, 0 0 0 8px rgba(0,99,255,0.1)",
    transition: "box-shadow 1s"
  };

  if (href) {
    return (
      <a 
        href={href} 
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        className={baseStyles}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={customStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={customStyle}
      {...props}
    >
      {content}
    </button>
  );
};

// --- Minimalist Navbar Button with Wave Effect ---

interface MinimalWaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export const MinimalWaveButton: React.FC<MinimalWaveButtonProps> = ({ children, href, className, ...props }) => {
  const content = (
    <>
      <span className="relative z-10 font-bold uppercase tracking-wide text-xs md:text-sm">
        {children}
      </span>
      {/* Wave Element */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
    </>
  );

  const baseClass = cn(
    "relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-brand-button text-white shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:bg-brand-buttonHover hover:scale-105 transition-all duration-300",
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClass} {...(props as any)}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClass} {...props}>
      {content}
    </button>
  );
};
