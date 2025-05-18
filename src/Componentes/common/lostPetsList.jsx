import { useState, useEffect } from "react";
import PetCard from "./petCard";

// Datos de ejemplo para mostrar en la interfaz

export default function LostPetsList({ pets, isLoading }) {
  // Aquí se podría agregar la lógica para cargar datos reales de Supabase

  if (isLoading) {
    return <div className="text-center py-10">Cargando mascotas...</div>;
  }

  if (!pets || pets.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-700">
          No hay mascotas reportadas todavía. ¡Sé el primero en reportar!!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
