"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";

// ==========================================
// VARIANTES DE TRANSICIÓN "PRO" (Keynote Style)
// ==========================================
const slideVariants = {
  // Cuando la diapositiva ENTRA
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%", // Viene de la derecha o izquierda según la dirección
    opacity: 0,
    scale: 0.85, // Efecto de profundidad (entra desde lejos)
    filter: "blur(10px)", // Desenfoque cinematográfico de movimiento
  }),
  // Cuando la diapositiva está en el CENTRO
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  // Cuando la diapositiva SALE
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%", // Se va hacia el lado contrario
    opacity: 0,
    scale: 0.85, // Efecto de profundidad (se aleja)
    filter: "blur(10px)",
  }),
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Añadimos un estado para saber si vamos hacia adelante (1) o hacia atrás (-1)
  const [direction, setDirection] = useState(0); 
  
  const slides = [<Slide1 key="1" />, <Slide2 key="2" />];

  // ==========================================
  // LÓGICA DE NAVEGACIÓN
  // ==========================================
  const nextSlide = useCallback(() => {
    setDirection(1); // Indicamos que vamos hacia la derecha
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1); // Indicamos que vamos hacia la izquierda
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

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
    <main className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      
      {/* ========================================== */}
      {/* CONTENEDOR DE DIAPOSITIVAS ANIMADAS        */}
      {/* ========================================== */}
      
      {/* Quitamos mode="wait" para que la diapositiva vieja y la nueva se muevan al MISMO TIEMPO, creando un cruce perfecto */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction} // Le pasamos la dirección a nuestras variantes
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 }, // Física de resorte rápida pero suave
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
      {/* CONTROLES DE NAVEGACIÓN (HUD)                */}
      {/* ========================================== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 group">
        <div className="flex items-center gap-6 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl opacity-40 transition-all duration-300 group-hover:opacity-100 hover:scale-105">
          
          <button onClick={prevSlide} className="text-white/80 hover:text-[#8C5A35] transition-colors focus:outline-none" title="Anterior">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-white font-black text-sm tracking-widest tabular-nums select-none flex items-center gap-2">
            <span>{currentSlide + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{slides.length}</span>
          </div>

          <button onClick={nextSlide} className="text-white/80 hover:text-[#8C5A35] transition-colors focus:outline-none" title="Siguiente">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>

    </main>
  );
}