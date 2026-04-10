export default function Slide1() {
  return (
    // Contenedor principal: h-screen (ocupa exacto el alto de la pantalla), overflow-hidden (prohíbe el scroll)
    <div className="w-full h-screen overflow-hidden bg-[#FAFAF8] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] flex flex-col p-4 md:p-8 box-border">
      
      {/* 1. ENCABEZADO (Ajustado para no ocupar tanto espacio vertical) */}
      <header className="flex-shrink-0 text-center mb-6">
        <h1 className="text-4xl md:text-6xl font-black text-[#8C5A35] uppercase tracking-wide">
          Emprendimiento
        </h1>
        <div className="-mt-2 md:-mt-4 relative z-10">
          {/* El fondo ahora es un bloque en línea, no se deformará */}
          <span className="inline-block bg-[#8C5A35] text-white text-3xl md:text-5xl font-bold px-8 py-1 md:py-2 rounded-full transform -rotate-2 shadow-lg border-2 border-white/50">
            Social
          </span>
        </div>
      </header>

      {/* 2. CUADRÍCULA CENTRAL (Zahra y Yunus) - Ocupa el espacio restante equitativamente */}
      <main className="flex-1 min-h-0 grid grid-cols-2 gap-x-8 gap-y-4 items-center max-w-6xl mx-auto w-full">
        
        {/* Fila 1 - Izquierda: Texto Zahra */}
        <div className="bg-white/80 border-2 border-dashed border-[#8C5A35] p-4 md:p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-[#8C5A35] font-black text-sm md:text-lg uppercase mb-2">
            Zahra, Gedajlovic, Neubaum & Shulman (2009)
          </h2>
          <p className="text-gray-800 text-xs md:text-lg font-medium leading-relaxed text-justify">
            El emprendimiento social abarca las actividades y procesos para descubrir, definir y explotar las oportunidades con impacto social creando nuevas empresas o administrando organizaciones de una manera innovadora.
          </p>
        </div>

        {/* Fila 1 - Derecha: Imagen Zahra */}
        <div className="w-[80%] mx-auto aspect-video bg-gray-200 rounded-lg p-1 bg-white shadow-md transform rotate-2">
          {/* Asegúrate de que la foto esté en public/zahra.jpg */}
          <img src="/zahra.jpg" alt="Zahra" className="w-full h-full object-cover rounded" />
        </div>

        {/* Fila 2 - Izquierda: Imagen Yunus */}
        <div className="w-[80%] mx-auto aspect-video bg-gray-200 rounded-lg p-1 bg-white shadow-md transform -rotate-1">
          {/* Asegúrate de que la foto esté en public/yunus.jpg */}
          <img src="/yunus.jpg" alt="Yunus" className="w-full h-full object-cover rounded" />
        </div>

        {/* Fila 2 - Derecha: Texto Yunus */}
        <div className="bg-white/80 border-2 border-dashed border-[#8C5A35] p-4 md:p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-[#8C5A35] font-black text-sm md:text-lg uppercase mb-2">
            Yunus (2013)
          </h2>
          <p className="text-gray-800 text-xs md:text-lg font-medium leading-relaxed text-justify">
            Un emprendimiento social es una compañía no orientada a la distribución de dividendos y dedicada totalmente a la solución de un problema social o ambiental determinado.
          </p>
        </div>

      </main>

      {/* 3. FOOTER: Concepto de Equipo */}
      <footer className="flex-shrink-0 mt-6 max-w-6xl mx-auto w-full bg-[#f4ece8] border border-[#8C5A35]/30 p-4 md:p-6 rounded-2xl flex items-center gap-6 shadow-sm">
        
        <div className="flex-1">
          <h3 className="text-[#8C5A35] font-black text-lg md:text-2xl uppercase mb-2 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#8C5A35] inline-block"></span>
            Concepto Grupal
          </h3>
          <p className="text-gray-800 text-sm md:text-lg font-bold italic leading-relaxed text-justify">
            El emprendimiento social es la creación y gestión innovadora de organizaciones que no buscan repartir dividendos, sino que dedican todos sus recursos a descubrir y solucionar problemas sociales.
          </p>
        </div>

        {/* Imagen del equipo */}
        <div className="w-[30%] max-w-[250px] aspect-video bg-gray-200 rounded-lg p-1 bg-white shadow-md transform -rotate-2">
          {/* Asegúrate de que la foto esté en public/grupo.jpg */}
          <img src="/grupo.jpg" alt="Equipo" className="w-full h-full object-cover rounded" />
        </div>

      </footer>
    </div>
  );
}