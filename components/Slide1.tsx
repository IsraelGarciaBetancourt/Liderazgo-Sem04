"use client";
import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function Slide1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // El lienzo siempre será Full HD (1920x1080) internamente
  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGHT = 1080;

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / CANVAS_WIDTH;
      const scaleY = windowHeight / CANVAS_HEIGHT;
      // Escala perfecta sin deformar
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => console.log(err));
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
  // VARIANTES DE ANIMACIÓN (FRAMER MOTION)
  // ==========================================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const popUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };
  const slideLeft: Variants = {
    hidden: { x: -60, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } }
  };
  const slideRight: Variants = {
    hidden: { x: 60, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } }
  };

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#1a1a1a] flex items-center justify-center overflow-hidden relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="bg-[#FAFAF8] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] flex flex-col p-14 box-border relative overflow-hidden shadow-2xl flex-shrink-0"
      >
        
        {/* ==================================================== */}
        {/* ADORNOS DE FONDO (Más complejos y llenos)              */}
        {/* ==================================================== */}
        
        {/* Mancha animada superior izquierda */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[700px] h-[700px] bg-[#8C5A35] opacity-5 rounded-[40%_60%_70%_30%] pointer-events-none" />
        
        {/* Mancha animada inferior derecha */}
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -right-20 w-[900px] h-[900px] bg-[#8C5A35] opacity-[0.04] rounded-[60%_40%_30%_70%] pointer-events-none" />

        {/* Patrón de puntos - Izquierda centro */}
        <div className="absolute top-[40%] left-8 grid grid-cols-4 gap-4 opacity-15 pointer-events-none">
          {[...Array(24)].map((_, i) => (<div key={`dot-l-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#8C5A35]"></div>))}
        </div>

        {/* Patrón de puntos - Derecha arriba */}
        <div className="absolute top-24 right-12 grid grid-cols-5 gap-3 opacity-15 pointer-events-none">
          {[...Array(15)].map((_, i) => (<div key={`dot-r-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#8C5A35]"></div>))}
        </div>

        {/* Círculo hueco decorativo - Abajo izquierda */}
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-16 left-16 w-64 h-64 border-[12px] border-dashed border-[#8C5A35] opacity-10 rounded-full pointer-events-none" />

        {/* Ondas decorativas - Derecha centro */}
        <svg className="absolute top-[45%] right-8 opacity-10 w-48 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="#8C5A35" strokeWidth="8" d="M 0,100 C 50,50 50,150 100,100 C 150,50 150,150 200,100" />
          <path fill="none" stroke="#8C5A35" strokeWidth="8" d="M 0,130 C 50,80 50,180 100,130 C 150,80 150,180 200,130" />
        </svg>
        {/* ==================================================== */}


        {/* ==================================================== */}
        {/* CONTENIDO PRINCIPAL CON ALTURAS FIJAS PARA EVITAR OVERLAP */}
        {/* ==================================================== */}

        {/* 1. ENCABEZADO (Altura fija: 200px) */}
        <motion.header variants={popUp} className="h-[200px] flex-shrink-0 text-center relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-7xl md:text-8xl font-black text-[#8C5A35] uppercase tracking-wide drop-shadow-sm">
            Emprendimiento
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} className="-mt-6 relative z-10 inline-block cursor-default">
            <span className="inline-block bg-[#8C5A35] text-white text-6xl md:text-7xl font-bold px-16 py-3 rounded-full transform -rotate-2 shadow-xl border-4 border-white/50 transition-all">
              Social
            </span>
          </motion.div>
        </motion.header>

        {/* 2. CUADRÍCULA CENTRAL (Altura fija: 520px para asegurar espacio) */}
        <main className="h-[520px] grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-8 items-center max-w-7xl mx-auto w-full relative z-10 mt-4">
          
          {/* Fila 1 - Izquierda: Texto Zahra */}
          <motion.div variants={slideLeft} whileHover={{ scale: 1.02 }} className="bg-white/90 border-4 border-dashed border-[#8C5A35] p-6 lg:p-8 rounded-2xl shadow-lg h-full flex flex-col justify-center">
            <h2 className="text-[#8C5A35] font-black text-2xl uppercase mb-3 leading-tight">
              Zahra, Gedajlovic, Neubaum & Shulman (2009)
            </h2>
            <p className="text-gray-800 text-xl font-medium leading-relaxed text-justify">
              El emprendimiento social abarca las actividades y procesos para descubrir, definir y explotar las oportunidades con impacto social creando nuevas empresas o administrando organizaciones de una manera innovadora.
            </p>
          </motion.div>

          {/* Fila 1 - Derecha: Imagen Zahra */}
          <motion.div variants={slideRight} whileHover={{ scale: 1.05, rotate: 0 }} className="h-full w-[85%] mx-auto bg-gray-200 rounded-xl p-2 bg-white shadow-xl transform rotate-2 origin-center">
            <img src="/images/Zahra.webp" alt="Zahra" className="w-full h-full object-cover rounded-lg" />
          </motion.div>

          {/* Fila 2 - Izquierda: Imagen Yunus */}
          <motion.div variants={slideLeft} whileHover={{ scale: 1.05, rotate: 0 }} className="h-full w-[85%] mx-auto bg-gray-200 rounded-xl p-2 bg-white shadow-xl transform -rotate-1 origin-center">
            <img src="/images/yunus.webp" alt="Yunus" className="w-full h-full object-cover rounded-lg" />
          </motion.div>

          {/* Fila 2 - Derecha: Texto Yunus */}
          <motion.div variants={slideRight} whileHover={{ scale: 1.02 }} className="bg-white/90 border-4 border-dashed border-[#8C5A35] p-6 lg:p-8 rounded-2xl shadow-lg h-full flex flex-col justify-center">
            <h2 className="text-[#8C5A35] font-black text-2xl uppercase mb-3 leading-tight">
              Yunus (2013)
            </h2>
            <p className="text-gray-800 text-xl font-medium leading-relaxed text-justify">
              Un emprendimiento social es una compañía no orientada a la distribución de dividendos y dedicada totalmente a la solución de un problema social o ambiental determinado.
            </p>
          </motion.div>

        </main>

        {/* 3. FOOTER: Concepto de Equipo (Altura fija: 220px y margen superior forzado para separar) */}
        <motion.footer variants={popUp} whileHover={{ y: -5 }} className="h-[220px] mt-10 max-w-7xl mx-auto w-full bg-[#f4ece8] border-2 border-[#8C5A35]/30 p-8 rounded-3xl flex items-center gap-12 shadow-lg relative z-10 transition-all">
          
          <div className="flex-1 h-full flex flex-col justify-center">
            <h3 className="text-[#8C5A35] font-black text-3xl uppercase mb-3 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#8C5A35] inline-block rounded"></span>
              Concepto Grupal
            </h3>
            <p className="text-gray-800 text-2xl font-bold italic leading-relaxed text-justify">
              El emprendimiento social es la creación y gestión innovadora de organizaciones que no buscan repartir dividendos, sino que dedican todos sus recursos a descubrir y solucionar problemas sociales.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.08, rotate: 0 }} className="h-full w-[350px] shrink-0 bg-gray-200 rounded-xl p-2 bg-white shadow-xl transform -rotate-2 origin-center">
            <img src="/images/emprendimientoGrupoFoto.webp" alt="Equipo" className="w-full h-full object-cover rounded-lg" />
          </motion.div>

        </motion.footer>

      </motion.div>
    </div>
  );
}