"use client";
import { useState } from "react";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [<Slide1 key="1" />, <Slide2 key="2" />];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Contenedor de diapositivas */}
      <div className="absolute inset-0 z-0">
        {slides[currentSlide]}
      </div>

      {/* Botones de navegación (corregidos y estilizados) */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="bg-[#A36F52] hover:bg-[#8e6047] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1 transition-colors"
        >
          <span>◀</span> Anterior
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#A36F52] hover:bg-[#8e6047] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1 transition-colors"
        >
          Siguiente <span>▶</span>
        </button>
      </div>
    </main>
  );
}