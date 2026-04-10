"use client";

export default function Slide2() {
  const ticketCardClass = "bg-[#F8F9FA] text-black p-8 rounded-sm shadow-xl border-[3px] border-dashed border-black relative text-center w-full max-w-2xl mx-auto";
  const authorTabClass = "bg-[#7DD15C] text-black font-bold text-lg border-[2px] border-black px-8 py-1.5 w-auto inline-block -mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
  const flagClass = "text-white px-4 py-8 rounded-b-xl shadow-lg flex items-end justify-center font-bold text-5xl";

  return (
    <div className="min-h-screen bg-[#1F2124] text-white p-10 md:p-16 flex flex-col items-center relative overflow-hidden">
      
      {/* Decoraciones de fondo (estilo Canva) */}
      <span className="absolute top-20 left-10 text-yellow-400 text-6xl">✦</span>
      <span className="absolute bottom-20 right-10 text-yellow-400 text-6xl rotate-45">✦</span>
      <span className="absolute top-40 right-20 text-yellow-400 text-5xl">✲</span>
      <span className="absolute bottom-40 left-20 text-yellow-400 text-5xl rotate-90">✲</span>

      {/* Título: Banderines Coloridos */}
      <div className="text-center mb-24 z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase mb-6">
          INNOVACIÓN
        </h1>
        <div className="flex gap-1 md:gap-3 justify-center items-start">
            <span className={`${flagClass} bg-yellow-400 translate-y-3`}>S</span>
            <span className={`${flagClass} bg-green-500`}>O</span>
            <span className={`${flagClass} bg-orange-400 -translate-y-2`}>C</span>
            <span className={`${flagClass} bg-red-600 translate-y-3`}>I</span>
            <span className={`${flagClass} bg-blue-500`}>A</span>
            <span className={`${flagClass} bg-purple-500 -translate-y-2`}>L</span>
        </div>
      </div>

      {/* Contenedor de las tarjetas de contenido */}
      <div className="flex flex-col gap-20 w-full max-w-5xl z-10">
        
        {/* Tarjeta 1 */}
        <div className="flex flex-col items-center">
          <div className={ticketCardClass}>
            <p className="text-xl font-medium leading-relaxed">
              La innovación social es una acción novedosa (propia o externa) que mejora el bienestar y la cohesión social mediante cambios en bienes o servicios, con resultados medibles y replicables.
            </p>
          </div>
          <div className={`${authorTabClass} transform translate-y-3`}>
            Hernández-Ascanio <span className="font-normal text-sm ml-1">(2016)</span>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="flex flex-col items-center">
          <div className={ticketCardClass}>
            <p className="text-xl font-medium leading-relaxed">
              La innovación social usa el talento colectivo para resolver problemas sociales con nuevos métodos, fortaleciendo la participación comunitaria y haciendo a las personas protagonistas de su desarrollo.
            </p>
          </div>
          <div className={`${authorTabClass} transform translate-y-3`}>
            Morales <span className="font-normal text-sm ml-1">(2008)</span>
          </div>
        </div>

        {/* Tarjeta Concepto de Equipo (Centrada) */}
        <div className="flex flex-col items-center mt-12">
            <div className="bg-white text-black border-2 border-black px-8 py-2 rounded-full font-bold text-2xl z-20 w-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Concepto del equipo
            </div>
            <div className={`${ticketCardClass} pt-12 -translate-y-4`}>
                <p className="text-2xl font-bold leading-relaxed text-[#1F2124]">
                  Es el proceso de generar cambios novedosos en bienes, servicios u organización que mejoran el bienestar y la cohesión social, con resultados medibles y convirtiendo a las personas en protagonistas de su propio desarrollo.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}