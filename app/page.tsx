"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";

// ==========================================
// VARIANTES DE TRANSICIÓN "PRO"
// ==========================================
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
  }),
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Referencia al contenedor principal para la pantalla completa
  const mainRef = useRef<HTMLDivElement>(null);
  
  const slides = [<Slide1 key="1" />, <Slide2 key="2" />];

  // ==========================================
  // LÓGICA DE NAVEGACIÓN
  // ==========================================
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // ==========================================
  // LÓGICA DE PANTALLA COMPLETA GLOBAL
  // ==========================================
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mainRef.current?.requestFullscreen().catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // ==========================================
  // EVENTOS DEL TECLADO
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <main ref={mainRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      
      {/* ========================================== */}
      {/* CONTENEDOR DE DIAPOSITIVAS ANIMADAS        */}
      {/* ========================================== */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4, ease: "easeOut" },
            filter: { duration: 0.3 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* ========================================== */}
      {/* INTERFAZ DE USUARIO (Controles y Botones)    */}
      {/* ========================================== */}

      {/* Flecha Izquierda (Área gigante para clickear fácil) */}
      <div 
        onClick={prevSlide}
        className="absolute left-0 top-0 bottom-0 w-24 z-50 flex items-center justify-start pl-4 cursor-pointer group"
      >
        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-full border border-white/10 opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:bg-black/60">
          <svg className="w-10 h-10 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>

      {/* Flecha Derecha (Área gigante para clickear fácil) */}
      <div 
        onClick={nextSlide}
        className="absolute right-0 top-0 bottom-0 w-24 z-50 flex items-center justify-end pr-4 cursor-pointer group"
      >
        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-full border border-white/10 opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:bg-black/60">
          <svg className="w-10 h-10 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Barra Inferior (Indicador y Fullscreen) */}
      <div className="absolute bottom-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
        
        {/* Indicador de número (Se queda a la izquierda o centro si prefieres) */}
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg pointer-events-auto opacity-30 hover:opacity-100 transition-opacity">
          <div className="text-white font-black text-sm tracking-widest tabular-nums select-none flex items-center gap-2">
            <span>{currentSlide + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{slides.length}</span>
          </div>
        </div>

        {/* Botón Fullscreen Global */}
        <button 
          onClick={toggleFullscreen}
          className="bg-black/40 backdrop-blur-md hover:bg-[#8C5A35] text-white p-3 rounded-full border border-white/10 transition-all shadow-lg pointer-events-auto opacity-30 hover:opacity-100 hover:scale-110 focus:outline-none"
          title={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 14h6v6m10-10h-6V4m0 10l7 7m-7-7L4 4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>

      </div>

    </main>
  );
}