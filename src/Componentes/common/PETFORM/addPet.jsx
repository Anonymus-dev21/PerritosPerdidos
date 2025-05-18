import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { supabase } from "@/config/supabaseConfig";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddPetForm({ fechReportes }) {
  const [form, setForm] = useState({
    animal: "",
    description: "",
    whatsapp: "",
    instagram: "",
    status: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setForm((f) => ({ ...f, status: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.animal.trim() || !/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(form.animal)) {
      errs.animal = "El nombre debe contener solo letras y espacios.";
    }
    if (!form.description.trim()) {
      errs.description = "La descripción no puede estar vacía.";
    }
    if (!form.whatsapp.trim()) {
      errs.whatsapp = "El número de WhatsApp es obligatorio.";
    }
    if (imageFile && !imageFile.type.startsWith("image/")) {
      errs.image = "El archivo debe ser una imagen válida (jpg, png, gif...).";
    }
    if (!form.status) {
      errs.status = "Debes seleccionar el estado de la mascota.";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("reports")
          .upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const { data, error: urlError } = supabase.storage
          .from("reports")
          .getPublicUrl(fileName);
        if (urlError) throw urlError;
        imageUrl = data.publicUrl;
      }
      const { error: dbError } = await supabase.from("reports").insert([
        {
          animal: form.animal.trim(),
          description: form.description.trim(),
          whatsapp: form.whatsapp.trim(),
          instagram: form.instagram.trim() || null,
          status: form.status,
          image_url: imageUrl,
          created_at: new Date(),
        },
      ]);
      if (dbError) throw dbError;
      setSuccessMessage("¡Reporte enviado correctamente!");
      setForm({
        animal: "",
        description: "",
        whatsapp: "",
        instagram: "",
        status: "",
      });
      setImageFile(null);
      setImagePreview(null);
      fechReportes();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || err.toString(),
      });
      setErrors({ submit: "Ocurrió un error al enviar. Intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm border"
    >
      {successMessage && (
        <div className="bg-green-50 border-green-200 text-green-700 p-3 rounded-md text-center">
          {successMessage}
        </div>
      )}
      <div className="space-y-1">
        <Label htmlFor="animal">Nombre de la mascota</Label>
        <Input
          id="animal"
          name="animal"
          value={form.animal}
          onChange={handleChange}
          placeholder="Ej: Firulais"
        />
        {errors.animal && (
          <p className="text-red-600 text-sm">{errors.animal}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="status">Estado</Label>
        <Select value={form.status} onValueChange={handleStatusChange}>
          <SelectTrigger name="status" className="w-full">
            <SelectValue placeholder="Selecciona estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="perdido">Perdido</SelectItem>
            <SelectItem value="encontrado">Encontrado</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-600 text-sm">{errors.status}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe a tu mascota..."
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="image">Foto de la mascota (opcional)</Label>
        <div className="flex flex-col items-center gap-4">
          {imagePreview && (
            <div className="w-full h-48">
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}
          <label
            htmlFor="image"
            className="flex items-center justify-center w-full h-12 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transform transition-transform duration-200 hover:scale-105"
          >
            <Upload className="mr-2 h-4 w-4" />
            <span>Subir imagen</span>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image}</p>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="whatsapp">Número de WhatsApp</Label>
        <Input
          id="whatsapp"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="Ej: +54 9 11 1234-5678"
        />
        {errors.whatsapp && (
          <p className="text-red-600 text-sm">{errors.whatsapp}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="instagram">Instagram (opcional)</Label>
        <Input
          id="instagram"
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          placeholder="Ej: @usuario"
        />
      </div>
      {errors.submit && (
        <p className="text-red-600 text-center">{errors.submit}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Reportar Mascota Perdida"}
      </Button>
    </form>
  );
}
