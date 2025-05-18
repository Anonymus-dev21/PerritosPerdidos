export const Footer = () => {
  return (
    <footer className="bg-black text-white w-full absolute">
      <div className="mx-auto py-10">
        <p className="text-center text-xl ">INFORMACION EXTRA!</p>
        <div className="ENLACES  flex justify-between w-full max-sm:flex-col max-sm:items-center max-sm:space-y-5 my-5 px-15">
          <div className="SOPORTE max-sm:flex max-sm:flex-col max-sm:items-start ">
            <div className="title font-semibold text-lg max-sm:translate-x-[-25px]">
              SOPORTE:
            </div>
            <ul>
              <a href="https://wa.link/apwwkn" target="_blank">
                <li className="underline hover:text-gray-100 hover:scale-105 max-sm:translate-x-[-25px] transition-all duration-300">
                  Mandar a soporte
                </li>
              </a>
            </ul>
          </div>

          <div className="REDESSOCIALESRELACIONADAS ">
            <div className="title font-semibold text-lg ">SOPORTE:</div>
            <ul>
              <a href="https://www.instagram.com/munizarate" target="_blank">
                <li className="underline hover:text-gray-100 hover:scale-105  transition-all duration-300">
                  Municipalidad Zárate
                </li>
              </a>
              <a href="https://www.instagram.com/campanagov" target="_blank">
                <li className="underline hover:text-gray-100 hover:scale-105  transition-all duration-300">
                  Municipalidad Campana
                </li>
              </a>
              <a href="https://www.instagram.com/correlavoz_ok" target="_blank">
                <li className="underline hover:text-gray-100 hover:scale-105  transition-all  duration-300">
                  Corre La voz
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="CreadoPor text-center">
          <p className=" text-xl">Creado por:</p>
          <a href=" https://wa.link/apwwkn" target="_blank">
            <div className="NOMBRE font-semibold text-xl tracking-wider hover:scale-105  transition-all duration-300 underline">
              Oscar Cabral
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};
