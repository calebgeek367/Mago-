import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, Target, FileVideo, Palette, BarChart3, DollarSign, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

const modules = [
  {
    title: "Mentalidade",
    subtitle: "Módulo 01",
    description: "Desbloqueie a produtividade e os segredos da mente de quem fatura alto.",
    icon: Brain,
    color: "cyan"
  },
  {
    title: "Mineração",
    subtitle: "Módulo 02",
    description: "Encontre oceanos azuis (nichos sem concorrência) antes de todo mundo.",
    icon: Target,
    color: "purple"
  },
  {
    title: "Viralização",
    subtitle: "Módulo 03",
    description: "A alquimia dos roteiros que prendem a atenção e explodem em views.",
    icon: Zap,
    color: "yellow"
  },
  {
    title: "Design Dark",
    subtitle: "Módulo 04",
    description: "Crie thumbnails impossíveis de ignorar e edições cinemáticas.",
    icon: Palette,
    color: "pink"
  },
  {
    title: "Algoritmo",
    subtitle: "Módulo 05",
    description: "SEO Profundo. Faça o YouTube trabalhar para você 24 horas por dia.",
    icon: BarChart3,
    color: "emerald"
  },
  {
    title: "Monetização",
    subtitle: "Módulo 06",
    description: "O cofre infinito: Venda produtos e parcerias além do AdSense.",
    icon: DollarSign,
    color: "amber"
  }
];

export function ModulesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % modules.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  return (
    <section className="py-32 bg-[#020617] overflow-hidden relative min-h-[900px] flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] pointer-events-none z-10" />

        <div className="container mx-auto px-4 relative z-20 mb-16 text-center">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Domine o <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-button to-blue-500">Jogo</span>
            </h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">
                Arraste ou use as setas para navegar
            </p>
        </div>

        {/* 3D Scene Container */}
        <div className="relative w-full max-w-[1600px] mx-auto h-[600px] flex items-center justify-center perspective-container">
            
            {/* Buttons */}
            <button 
                onClick={prev}
                className="absolute left-4 md:left-10 z-50 p-4 rounded-full bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-button hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 backdrop-blur-md group"
            >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button 
                onClick={next}
                className="absolute right-4 md:right-10 z-50 p-4 rounded-full bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-button hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 backdrop-blur-md group"
            >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Carousel Track */}
            <div 
                className="relative w-full h-full flex items-center justify-center perspective-[2000px]"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {modules.map((module, index) => {
                    const total = modules.length;
                    
                    // Calculate relative index for circular wrapping
                    // We want -N/2 to N/2 roughly
                    let offset = (index - activeIndex);
                    // Normalize offset to find shortest path around the circle
                    if (offset > total / 2) offset -= total;
                    if (offset < -total / 2) offset += total;
                    
                    // Define visuals based on offset
                    const isActive = offset === 0;
                    
                    // 3D positioning logic
                    // x: Spread horizontally. Larger spread for closer items.
                    const xOffset = offset * 60; // 60% separation roughly
                    
                    // z: Push back based on distance from center
                    const zOffset = Math.abs(offset) * -350; 
                    
                    // rotation: Angle cards inwards to face center
                    const rotateY = offset * -35; 

                    return (
                        <motion.div
                            key={index}
                            className="absolute w-[300px] md:w-[400px] aspect-[4/5] rounded-[30px]"
                            initial={false}
                            animate={{
                                x: `${xOffset}%`,
                                z: zOffset,
                                rotateY: rotateY,
                                scale: isActive ? 1 : 0.9,
                                opacity: isActive ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.3),
                                filter: isActive ? 'blur(0px) brightness(1)' : `blur(${Math.abs(offset) * 4}px) brightness(${Math.max(0.3, 0.8 - Math.abs(offset) * 0.2)})`,
                                zIndex: 100 - Math.abs(offset),
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.19, 1, 0.22, 1], // "Expo" ease for smooth high-end feel
                            }}
                            style={{
                                transformStyle: "preserve-3d",
                                transformOrigin: "center center",
                            }}
                            onClick={() => {
                                if (offset !== 0) {
                                    if (offset > 0) next();
                                    else prev();
                                }
                            }}
                        >
                            {/* Card Content */}
                            <div className={cn(
                                "w-full h-full rounded-[30px] bg-[#0B0F19] border relative overflow-hidden group cursor-pointer transition-all duration-500",
                                isActive 
                                    ? "border-brand-accent/30 shadow-[0_0_80px_-20px_rgba(34,211,238,0.3)]" 
                                    : "border-white/5 hover:border-white/20"
                            )}>
                                {/* Inner Shadow / Vignette */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]/90 z-0" />
                                
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                <div className="relative h-full p-8 flex flex-col justify-between z-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500",
                                            isActive 
                                                ? "bg-brand-accent/10 border-brand-accent/30 text-brand-accent shadow-[0_0_30px_rgba(34,211,238,0.2)]" 
                                                : "bg-slate-900/50 border-white/5 text-slate-500"
                                        )}>
                                            <module.icon className="w-8 h-8" />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold tracking-widest uppercase border px-3 py-1 rounded-full",
                                            isActive ? "border-brand-accent/30 text-brand-accent" : "border-slate-800 text-slate-700"
                                        )}>
                                            {module.subtitle}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="space-y-4">
                                        <h3 className={cn(
                                            "text-3xl md:text-4xl font-bold leading-tight transition-colors duration-300",
                                            isActive ? "text-white" : "text-slate-500"
                                        )}>
                                            {module.title}
                                        </h3>
                                        
                                        <motion.div
                                            animate={{ 
                                                opacity: isActive ? 1 : 0,
                                                height: isActive ? "auto" : 0
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                                                {module.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                    
                                    {/* Active Line Decoration */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
                                    )}
                                </div>
                            </div>

                            {/* Reflection (Mirror Effect) */}
                            {isActive && (
                                <div className="absolute -bottom-[40px] left-0 right-0 h-[40px] overflow-hidden opacity-40 pointer-events-none transform scale-y-[-1] mask-image-gradient">
                                     <div className="w-full h-full bg-gradient-to-b from-transparent to-[#0B0F19]/50" />
                                     {/* Simple gradient simulation for reflection blur */}
                                     <div className="absolute top-0 left-0 w-full h-20 bg-brand-accent/10 blur-xl" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}