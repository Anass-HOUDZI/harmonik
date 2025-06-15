
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChoresManager() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 flex items-center justify-center px-2 py-10">
      <Card className="max-w-md w-full mx-auto shadow-xl animate-fade-in">
        <CardHeader className="flex gap-4 items-center">
          <span className="p-3 bg-green-200 rounded-lg">
            <Users className="h-9 w-9 text-green-700" />
          </span>
          <div>
            <CardTitle>Gestionnaire de Corvées</CardTitle>
            <CardDescription>
              Répartissez équitablement les tâches ménagères avec gamification.<br />
              Arrive très bientôt : suivez les progrès, attribuez les tâches, récompensez l’effort !
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-lg text-green-700 mb-3 font-semibold">
            🚧 Bientôt disponible 🚧
          </div>
          <ul className="text-left mb-3 text-gray-700 list-disc pl-5">
            <li>Répartition automatique ou manuelle des tâches</li>
            <li>Points, badges et défis motivants</li>
            <li>Statistiques famille pour plus d’équité</li>
            <li>Interface ludique et adaptée enfants</li>
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
