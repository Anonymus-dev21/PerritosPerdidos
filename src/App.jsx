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
      console.log("Reportes obtenidos:", data);
      setPets(data);
      setAllPets(data);
    }
  };

  const handleSearch = () => {
    if (!search) {
      setPets(allPets); // Restablece a la lista completa
      return;
    }

    const term = search.toLowerCase();

    // Filtra sobre allPets (la lista completa)
    const filteredPets = allPets.filter((pet) => {
      return (
        pet.animal?.toLowerCase().includes(term) ||
        pet.description?.toLowerCase().includes(term) ||
        pet.whatsapp?.toLowerCase().includes(term) ||
        pet.instagram?.toLowerCase().includes(term)
      );
    });

    setPets(filteredPets);
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  console.log(search);
  useEffect(() => {
    fechReportes();
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Mascotas Perdidas - Ayuda por Inundación
        </h1>
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
            <AddPetForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
