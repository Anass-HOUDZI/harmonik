
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActivityOrganizer() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center px-2 py-10">
      <Card className="max-w-md w-full mx-auto shadow-xl animate-fade-in">
        <CardHeader className="flex gap-4 items-center">
          <span className="p-3 bg-purple-200 rounded-lg">
            <Gamepad2 className="h-9 w-9 text-purple-700" />
          </span>
          <div>
            <CardTitle>Organisateur de Sorties</CardTitle>
            <CardDescription>
              Découvrez et planifiez facilement des activités familiales adaptées.<br />
              Module en préparation : trouvez l’idée parfaite selon la météo, l’âge, le budget !
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-lg text-purple-700 mb-3 font-semibold">
            🚧 Bientôt disponible 🚧
          </div>
          <ul className="text-left mb-3 text-gray-700 list-disc pl-5">
            <li>Suggestions d’activités selon vos préférences</li>
            <li>Planification collaborative et filtres intelligents</li>
            <li>Idées adaptées à la météo du week-end</li>
            <li>Économies garanties avec activités gratuites/locales</li>
          </ul>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="secondary" onClick={() => navigate("/")}>
            ← Retour à la Suite Famille
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
