
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Check, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
  estimatedPrice?: number;
}

export default function ShoppingList() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);

  useEffect(() => {
    const savedItems = localStorage.getItem('shopping-list');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopping-list', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim()) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem.trim(),
        quantity: newQuantity,
        category: "Général",
        completed: false
      };
      setItems([...items, item]);
      setNewItem("");
      setNewQuantity(1);
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const completedItems = items.filter(item => item.completed);
  const pendingItems = items.filter(item => !item.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <PageContainer maxWidth="full" padding="md">
        <div className="py-10">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-3">
            <span className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="h-7 w-7 text-green-600" />
            </span>
            <div className="flex-1">
              <CardTitle className="text-2xl">Gestionnaire Listes Courses</CardTitle>
              <CardDescription>
                Optimisez vos achats avec des listes multiples et calcul de budget automatique.
                <br />
                <span className="text-green-600 font-semibold">🛒 Organisé par rayons, partage famille.</span>
              </CardDescription>
            </div>
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              ← Accueil
            </Button>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ajouter un article */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ajouter un article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nom de l'article..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Quantité"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  className="w-24"
                />
                <Button onClick={addItem} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{pendingItems.length}</div>
                  <div className="text-sm text-blue-700">À acheter</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{completedItems.length}</div>
                  <div className="text-sm text-green-700">Terminés</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des courses */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Articles à acheter */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">À acheter ({pendingItems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pendingItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleItem(item.id)}
                      className="w-8 h-8 p-0"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">Quantité: {item.quantity}</div>
                    </div>
                    <Badge variant="outline">{item.category}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {pendingItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun article à acheter
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Articles achetés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achetés ({completedItems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {completedItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleItem(item.id)}
                      className="w-8 h-8 p-0 bg-green-100"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <div className="flex-1">
                      <div className="font-medium line-through text-gray-500">{item.name}</div>
                      <div className="text-sm text-gray-400">Quantité: {item.quantity}</div>
                    </div>
                    <Badge variant="outline">{item.category}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {completedItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun article acheté
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fonctionnalités à venir */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🚀 Fonctionnalités à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Auto-génération depuis les menus planifiés
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Organisation par rayons du magasin
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Calcul budget prévisionnel vs réel
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Historique des prix
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Mode partage famille (QR code)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Listes multiples par magasin
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </PageContainer>
    </div>
  );
}
