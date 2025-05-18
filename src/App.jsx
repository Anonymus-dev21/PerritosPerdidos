import "./index.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./config/supabaseConfig";
import { Input } from "./components/ui/input";
import LostPetsList from "./Componentes/common/lostPetsList";
import AddPetForm from "./Componentes/common/PETFORM/addPet";
import { IoSearchSharp } from "react-icons/io5";
import { Footer } from "./Layout/Footer";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPets, setAllPets] = useState([]); // <— guardamos todo
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoview, setEstadoview] = useState("encontrados");
  const fechReportes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    setIsLoading(false);
    if (error) {
      console.error("Error obteniendo reportes:", error);
      setPets([]);

      console.error(error);
    } else {
      setPets(data);
      setAllPets(data);
    }
  };

  const handleSearch = () => {
    let filtered = allPets;

    // Aplicar filtro de búsqueda
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (pet) =>
          pet.animal?.toLowerCase().includes(term) ||
          pet.description?.toLowerCase().includes(term) ||
          pet.whatsapp?.toLowerCase().includes(term) ||
          pet.instagram?.toLowerCase().includes(term)
      );
    }

    // Aplicar filtro de estado
    filtered = filtered.filter((pet) =>
      estadoview === "encontrados"
        ? pet.status === "encontrado"
        : pet.status === "perdido"
    );

    setPets(filtered);
  };

  // Actualizar efectos
  useEffect(() => {
    handleSearch();
  }, [search, estadoview, allPets]);

  useEffect(() => {
    fechReportes();
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          ZARATE Y CAMPANA!! ACLAREN EN LA DESCRIPCIÓN LA ZONA DONDE SE
          PERDIERON.
        </h1>
        <p className="text-4xl font-bold text-center mb-8">
          *Perritos, gatos, toda mascotita que se les haya perdido
          publiquenlo!!!*
        </p>
        <h2 className="text-center text-xl font-semibold">
          *Los perritos encontrados son aquellos que los tienen en algun lugar y
          buscan al dueñoo, los perritos perdidos son aquellos que se estan
          buscando*
        </h2>
        <div className="ReservasCategoryFilter w-full max-w-[900px] flex flex-row border-2 rounded-lg bg-gray-200 overflow-hidden my-5">
          <div
            className={`flex items-center justify-center   p-3 sm:py-1 w-[50%] transition-all duration-300 rounded-lg
      hover:bg-white cursor-pointer select-none
      ${
        estadoview.toLowerCase() === "encontrados"
          ? "bg-white shadow-inner"
          : "sm:mx-1 sm:my-1"
      }`}
            onClick={() => setEstadoview("encontrados")}
          >
            <h4 className="text-xs sm:text-sm lg:text-base text-center">
              Perritos encontrados en la calle
            </h4>
          </div>

          <div
            className={`flex items-center justify-center   p-3 sm:py-1 w-[50%] transition-all duration-300 rounded-lg
      hover:bg-white cursor-pointer select-none
      ${
        estadoview.toLowerCase() === "perdido"
          ? "bg-white shadow-inner"
          : "sm:mx-1 sm:my-1"
      }`}
            onClick={() => setEstadoview("perdido")}
          >
            <h4 className="text-xs sm:text-sm lg:text-base text-center">
              Perritos perdidos
            </h4>
          </div>
        </div>
        <div className="mb-6 relative">
          <div className="relative lg:w-[90%] w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoSearchSharp className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              className="block w-full  pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-300 sm:text-sm"
              placeholder="Buscar por nombre de mascota, instagram, mensaje o whatsapp"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearch("")}
              >
                <span className="text-gray-400 hover:text-gray-500">✕</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Mascotas Reportadas</h2>
            <LostPetsList pets={pets} />
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">
              Reportar Mascota Perdida
            </h2>
            <AddPetForm fechReportes={fechReportes} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
