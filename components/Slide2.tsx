"use client";
import { useEffect, useRef, useState } from "react";
import { motion, Variants, useMotionValue, useSpring } from "framer-motion";

export default function Slide2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ==========================================
  // LÓGICA DEL PUNTERO PERSONALIZADO
  // ==========================================
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  // ==========================================
  // LÓGICA DE ESCALADO DEL LIENZO (1920x1080 estricto)
  // ==========================================
  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGHT = 1080;

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setScale(Math.min(windowWidth / CANVAS_WIDTH, windowHeight / CANVAS_HEIGHT));
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

  // Variantes de Animación
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const popUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="w-full h-screen bg-[#111111] flex items-center justify-center overflow-hidden relative cursor-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
        .bg-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.07) 2px, transparent 2px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 2px, transparent 2px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* PUNTERO PERSONALIZADO */}
      <motion.div className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} />
      <motion.div className="fixed top-0 left-0 w-10 h-10 border-2 border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference" style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }} />

      {/* ==================================================== */}
      {/* LIENZO DE LA PRESENTACIÓN (1920x1080)                  */}
      {/* ==================================================== */}
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
        className="bg-[#18191A] bg-grid flex flex-col items-center pt-12 pb-6 box-border relative overflow-hidden shadow-2xl flex-shrink-0 cursor-none"
      >
        
        {/* ==================================================== */}
        {/* ADORNOS DEL FONDO (Sobres, estrellas y trazos)         */}
        {/* ==================================================== */}
        
        {/* Líneas amarillas top-left */}
        <div className="absolute top-48 left-32 flex flex-col gap-4 rotate-12 opacity-80 pointer-events-none">
           <div className="w-16 h-2 bg-[#F2C94C] rounded-full rotate-45 transform translate-x-4"></div>
           <div className="w-20 h-2 bg-[#F2C94C] rounded-full"></div>
           <div className="w-16 h-2 bg-[#F2C94C] rounded-full -rotate-45 transform translate-x-4"></div>
        </div>

        {/* Líneas amarillas top-right */}
        <div className="absolute top-48 right-32 flex flex-col gap-4 -rotate-12 opacity-80 pointer-events-none">
           <div className="w-16 h-2 bg-[#F2C94C] rounded-full -rotate-45 transform -translate-x-4"></div>
           <div className="w-20 h-2 bg-[#F2C94C] rounded-full"></div>
           <div className="w-16 h-2 bg-[#F2C94C] rounded-full rotate-45 transform -translate-x-4"></div>
        </div>

        {/* Estrellas amarillas centro-izq */}
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[40%] left-24 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#F2C94C"><path d="M12 0l2.5 8.5H24l-7.5 5.5 2.5 8.5-7.5-5.5-7.5 5.5 2.5-8.5L0 8.5h9.5z"/></svg>
        </motion.div>
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[50%] left-36 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 0l2.5 8.5H24l-7.5 5.5 2.5 8.5-7.5-5.5-7.5 5.5 2.5-8.5L0 8.5h9.5z"/></svg>
        </motion.div>

        {/* Sobre Verde (Derecha) */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[35%] right-20 w-40 h-28 bg-[#7DD15C] border-[4px] border-black rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-end justify-center overflow-hidden pointer-events-none">
           <div className="w-[70%] h-[120%] bg-white border-[4px] border-black absolute -top-10 rotate-[20deg]"></div>
           <div className="w-full h-[60%] border-t-[4px] border-black absolute bottom-0 bg-[#7DD15C] flex items-start justify-center pt-2">
             <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-transparent border-t-black"></div>
           </div>
        </motion.div>

        {/* Sobre Azul (Abajo Derecha) */}
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-[20%] right-24 w-40 h-28 bg-[#7DC4F2] border-[4px] border-black -rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-end justify-center overflow-hidden pointer-events-none">
           <div className="w-[70%] h-[120%] bg-white border-[4px] border-black absolute -top-10 -rotate-[20deg]"></div>
           <div className="w-full h-[60%] border-t-[4px] border-black absolute bottom-0 bg-[#7DC4F2] flex items-start justify-center pt-2">
             <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-transparent border-t-black"></div>
           </div>
        </motion.div>

        {/* Sobre Amarillo (Abajo Izquierda) */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-[25%] left-20 w-40 h-28 bg-[#F2C94C] border-[4px] border-black -rotate-[15deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-end justify-center overflow-hidden pointer-events-none">
           <div className="w-[70%] h-[120%] bg-white border-[4px] border-black absolute -top-10 rotate-[15deg]"></div>
           <div className="w-full h-[60%] border-t-[4px] border-black absolute bottom-0 bg-[#F2C94C] flex items-start justify-center pt-2">
             <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-transparent border-t-black"></div>
           </div>
        </motion.div>

        {/* ==================================================== */}
        {/* ENCABEZADO: Título con Banderines (Altura Fija: 200px) */}
        {/* ==================================================== */}
        <motion.header variants={popUp} className="h-[200px] w-full shrink-0 flex flex-col items-center relative z-10">
          <div className="relative">
            <h1 className="text-[100px] font-black text-white uppercase tracking-widest leading-none drop-shadow-xl font-sans">
              Innovación
            </h1>
            <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q12.5,0 25,10 T50,10 T75,10 T100,10" fill="none" stroke="white" strokeWidth="3" />
            </svg>
          </div>
          
          <div className="flex gap-4 justify-center items-start mt-8">
            {[
              { letter: 'S', color: 'bg-[#F2C94C]', tilt: '-rotate-6' },
              { letter: 'O', color: 'bg-[#27AE60]', tilt: 'rotate-3' },
              { letter: 'C', color: 'bg-[#56CCF2]', tilt: '-rotate-3' },
              { letter: 'I', color: 'bg-[#EB5757]', tilt: 'rotate-6' },
              { letter: 'A', color: 'bg-[#F2994A]', tilt: '-rotate-3' },
              { letter: 'L', color: 'bg-[#9B51E0]', tilt: 'rotate-3' },
            ].map((item, index) => (
              <span key={index} className={`inline-flex items-center justify-center w-24 h-32 ${item.color} text-white text-[70px] font-black rounded-b-xl transform ${item.tilt} border-2 border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}>
                {item.letter}
              </span>
            ))}
          </div>
        </motion.header>

        {/* ==================================================== */}
        {/* CUERPO PRINCIPAL: Tarjetas (Márgenes Forzados y Ancho Ampliado) */}
        {/* ==================================================== */}
        <main className="w-full max-w-[1300px] flex flex-col items-center relative z-10 mt-20">
          
          {/* Tarjeta 1 - Hernández-Ascanio (Altura 160px, margen inferior 90px para la etiqueta) */}
          <motion.div variants={popUp} whileHover={{ scale: 1.02 }} className="h-[160px] w-full bg-[#F8F9FA] border-[4px] border-dashed border-black rounded-sm shadow-2xl flex flex-col justify-center items-center relative shrink-0 mb-[90px]">
            <p className="text-black text-3xl font-bold leading-snug text-center px-16">
              La innovación social es una acción novedosa (propia o externa) que mejora el bienestar y la cohesión social mediante cambios en bienes o servicios, con resultados medibles y replicables.
            </p>
            {/* Etiqueta Verde Inferior */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-[#7DD15C] text-black border-[4px] border-black px-12 py-1.5 min-w-[350px] text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20">
              <h3 className="font-bold text-3xl font-caveat tracking-wide">Hernández-Ascanio</h3>
              <p className="text-lg font-bold">(2016)</p>
            </div>
          </motion.div>

          {/* Tarjeta 2 - Morales (Altura 160px, margen inferior 110px para la etiqueta de esta y la de abajo) */}
          <motion.div variants={popUp} whileHover={{ scale: 1.02 }} className="h-[160px] w-full bg-[#F8F9FA] border-[4px] border-dashed border-black rounded-sm shadow-2xl flex flex-col justify-center items-center relative shrink-0 mb-[110px]">
            <p className="text-black text-3xl font-bold leading-snug text-center px-16">
              La innovación social usa el talento colectivo para resolver problemas sociales con nuevos métodos, fortaleciendo la participación comunitaria y haciendo a las personas protagonistas de su desarrollo.
            </p>
            {/* Etiqueta Verde Inferior */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 bg-[#7DD15C] text-black border-[4px] border-black px-12 py-1.5 min-w-[350px] text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20">
              <h3 className="font-bold text-3xl font-caveat tracking-wide">Morales</h3>
              <p className="text-lg font-bold">(2008)</p>
            </div>
          </motion.div>

          {/* Tarjeta 3 - Concepto Equipo (Altura 200px) */}
          <motion.div variants={popUp} whileHover={{ scale: 1.02 }} className="h-[200px] w-full max-w-[1400px] bg-[#F8F9FA] border-[4px] border-dashed border-black rounded-sm shadow-2xl flex flex-col justify-center items-center relative shrink-0">
            {/* Etiqueta Blanca Superior */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black border-[4px] border-black px-16 py-3 rounded-full font-black text-4xl text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20">
              Concepto del equipo
            </div>
            <p className="text-black text-3xl font-black leading-snug text-center px-20 mt-8">
              Es el proceso de generar cambios novedosos en bienes, servicios u organización que mejoran el bienestar y la cohesión social, con resultados medibles y convirtiendo a las personas en protagonistas de su propio desarrollo.
            </p>
          </motion.div>

        </main>

      </motion.div>

      {/* BOTÓN DE PANTALLA COMPLETA */}
      <button 
        onClick={toggleFullscreen}
        className="absolute bottom-6 right-6 z-50 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all shadow-2xl flex items-center justify-center hover:scale-110 cursor-pointer border border-white/20"
        title={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
      >
        {isFullscreen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6v6m10-10h-6V4m0 10l7 7m-7-7L4 4" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        )}
      </button>
    </div>
  );
}