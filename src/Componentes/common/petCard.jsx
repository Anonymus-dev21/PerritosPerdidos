import { Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function PetCard({ pet }) {
  const whatsappUrl = `https://wa.me/${pet.whatsapp.replace(/\D/g, "")}`;
  const instagramUrl = pet.instagram
    ? `https://instagram.com/${
        pet.instagram.includes("@")
          ? pet.instagram.replace("@", "")
          : pet.instagram
      }`
    : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img
          src={pet.image_url || "/placeholder.svg?height=200&width=400"}
          alt={pet.animal}
          loading="lazy"
          title="Imagen de la mascota"
          className="object-cover w-full h-full"
        />
      </div>

      <CardHeader>
        <h3 className="text-xl font-bold">{pet.animal}</h3>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-700">{pet.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          asChild
        >
          <div>
            <Phone className="mr-2 h-4 w-4" />
            {pet.whatsapp}
          </div>
        </Button>

        {instagramUrl && (
          <Button variant="outline" className="w-full" asChild>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              {pet.instagram}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
