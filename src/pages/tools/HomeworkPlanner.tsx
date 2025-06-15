
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, BookOpen, Trash2, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Homework = {
  id: string;
  subject: string;
  description: string;
  dueDate: string;
  done: boolean;
};

export default function HomeworkPlanner() {
  const navigate = useNavigate();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Simple localStorage persistence
  useEffect(() => {
    const stored = localStorage.getItem("family-homeworks");
    if (stored) {
      setHomeworks(JSON.parse(stored));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("family-homeworks", JSON.stringify(homeworks));
  }, [homeworks]);

  function addHomework() {
    if (!subject || !description || !dueDate) return;
    setHomeworks([
      ...homeworks,
      { id: Date.now().toString(), subject, description, dueDate, done: false }
    ]);
    setSubject("");
    setDescription("");
    setDueDate("");
  }

  function toggleDone(id: string) {
    setHomeworks(hws => hws.map(hw => hw.id===id ? { ...hw, done: !hw.done } : hw));
  }

  function removeHomework(id: string) {
    setHomeworks(hws => hws.filter(hw => hw.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 px-2 py-10">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </span>
              <div>
                <CardTitle className="text-2xl">Planificateur de Devoirs</CardTitle>
                <CardDescription>
                  Organisez les devoirs de tous les enfants pour réduire stress et procrastination.<br />
                  <span className="text-indigo-700 font-semibold">Suivi, rappels, planification intelligente !</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => { e.preventDefault(); addHomework(); }}>
              <div className="flex flex-col md:flex-row gap-2 mb-3">
                <Input 
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Matière (ex : Maths)"
                  className="md:w-1/4"
                  required
                />
                <Input 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Description ou titre"
                  className="md:w-2/4"
                  required
                />
                <Input
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  type="date"
                  className="md:w-1/4"
                  required
                />
                <Button type="submit" variant="default" className="flex gap-1">
                  <PlusCircle className="w-5 h-5"/>
                  Ajouter
                </Button>
              </div>
            </form>
            <div className="divide-y">
              {homeworks.length === 0 && (
                <div className="text-gray-500 text-center py-8">
                  <CalendarDays className="mx-auto mb-3 opacity-30" size={40}/>
                  Aucun devoir enregistré. Ajoutez-en un !
                </div>
              )}
              {homeworks.map(hw => (
                <div 
                  key={hw.id} 
                  className={`flex flex-col md:flex-row md:items-center gap-2 py-3 ${hw.done ? "bg-green-50" : ""}`}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={hw.done}
                      onChange={() => toggleDone(hw.id)}
                      className="accent-green-500"
                    />
                    <span className={`${hw.done ? "line-through text-gray-400" : ""} font-medium`}>{hw.subject}</span>
                  </label>
                  <span className={`flex-1 ${hw.done ? "line-through text-gray-400" : ""}`}>{hw.description}</span>
                  <span className="rounded px-2 py-0.5 text-xs bg-blue-100 text-blue-700">
                    {new Date(hw.dueDate).toLocaleDateString("fr-FR", { day: '2-digit', month: 'short' })}
                  </span>
                  <Button size="icon" variant="ghost" onClick={() => removeHomework(hw.id)}>
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Retour à la Suite
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
