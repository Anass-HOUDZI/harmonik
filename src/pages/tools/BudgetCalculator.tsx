
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calculator, PiggyBank, TrendingUp, TrendingDown, Plus, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
  icon: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

const defaultCategories: BudgetCategory[] = [
  { id: '1', name: 'Logement', budgeted: 1200, spent: 1180, color: 'bg-blue-500', icon: '🏠' },
  { id: '2', name: 'Alimentation', budgeted: 600, spent: 420, color: 'bg-green-500', icon: '🛒' },
  { id: '3', name: 'Transport', budgeted: 300, spent: 280, color: 'bg-yellow-500', icon: '🚗' },
  { id: '4', name: 'Enfants', budgeted: 400, spent: 320, color: 'bg-pink-500', icon: '👶' },
  { id: '5', name: 'Santé', budgeted: 200, spent: 150, color: 'bg-red-500', icon: '💊' },
  { id: '6', name: 'Loisirs', budgeted: 300, spent: 180, color: 'bg-purple-500', icon: '🎮' },
];

export default function BudgetCalculator() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BudgetCategory[]>(defaultCategories);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(3500);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense' as 'expense' | 'income'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('budget-categories');
    const savedTransactions = localStorage.getItem('budget-transactions');
    const savedIncome = localStorage.getItem('monthly-income');
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedIncome) {
      setMonthlyIncome(JSON.parse(savedIncome));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('budget-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('budget-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('monthly-income', JSON.stringify(monthlyIncome));
  }, [monthlyIncome]);

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = monthlyIncome - totalSpent;
  const savingsRate = ((monthlyIncome - totalSpent) / monthlyIncome) * 100;

  const addTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      description: newTransaction.description,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      date: new Date().toISOString().split('T')[0],
      type: newTransaction.type
    };

    setTransactions([...transactions, transaction]);

    // Update category spent amount
    if (newTransaction.type === 'expense') {
      setCategories(categories.map(cat => 
        cat.id === newTransaction.category 
          ? { ...cat, spent: cat.spent + transaction.amount }
          : cat
      ));
    }

    setNewTransaction({
      description: '',
      amount: '',
      category: '',
      type: 'expense'
    });
  };

  const deleteTransaction = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) return;

    setTransactions(transactions.filter(t => t.id !== transactionId));

    // Update category spent amount
    if (transaction.type === 'expense') {
      setCategories(categories.map(cat => 
        cat.id === transaction.category 
          ? { ...cat, spent: Math.max(0, cat.spent - transaction.amount) }
          : cat
      ));
    }
  };

  const updateCategoryBudget = (categoryId: string, newBudget: number) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, budgeted: newBudget }
        : cat
    ));
  };

  const getProgressPercentage = (spent: number, budgeted: number) => {
    return budgeted > 0 ? Math.min((spent / budgeted) * 100, 100) : 0;
  };

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <PageContainer maxWidth="full" padding="md">
        <div className="py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                ← Accueil
              </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-green-600" />
                <span>Calculateur Budget Familial</span>
              </h1>
              <p className="text-gray-600">Gérez efficacement vos finances familiales</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-700">Revenus Mensuels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{monthlyIncome.toLocaleString()} €</div>
              <div className="mt-2">
                <Input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="border-blue-200"
                  placeholder="Revenus mensuels"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-700">Dépenses Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{totalSpent.toLocaleString()} €</div>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                {((totalSpent / monthlyIncome) * 100).toFixed(1)}% du revenu
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700">Reste à Vivre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{remainingBudget.toLocaleString()} €</div>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <PiggyBank className="h-4 w-4 mr-1" />
                {savingsRate.toFixed(1)}% d'épargne
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-700">Budget Alloué</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{totalBudgeted.toLocaleString()} €</div>
              <div className="flex items-center mt-2 text-sm text-purple-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                {totalBudgeted > monthlyIncome ? 'Sur-budgétisé' : 'Équilibré'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Budget by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Budget par Catégorie</CardTitle>
              <CardDescription>Suivez vos dépenses par poste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => {
                const progressPercentage = getProgressPercentage(category.spent, category.budgeted);
                const isOverBudget = category.spent > category.budgeted;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                        {isOverBudget && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {category.spent} € / {category.budgeted} €
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Progress 
                          value={progressPercentage}
                          className="h-2"
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          type="number"
                          value={category.budgeted}
                          onChange={(e) => updateCategoryBudget(category.id, Number(e.target.value))}
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {progressPercentage.toFixed(1)}% utilisé
                      {isOverBudget && (
                        <span className="text-red-500 ml-2">
                          (Dépassement: +{(category.spent - category.budgeted).toFixed(0)} €)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Add Transaction */}
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une Transaction</CardTitle>
              <CardDescription>Enregistrez vos dépenses et revenus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  placeholder="Ex: Courses Carrefour"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Montant (€)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value as 'expense' | 'income' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Dépense</SelectItem>
                      <SelectItem value="income">Revenu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={addTransaction} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!newTransaction.description || !newTransaction.amount || !newTransaction.category}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter la Transaction
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Transactions Récentes</CardTitle>
            <CardDescription>Vos dernières dépenses et revenus</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.slice(-10).reverse().map((transaction) => {
                  const category = categories.find(c => c.id === transaction.category);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category?.icon || '💰'}</span>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')} • {category?.name || 'Autre'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.type === 'expense' ? '-' : '+'}{transaction.amount.toFixed(2)} €
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucune transaction enregistrée pour le moment
              </p>
            )}
          </CardContent>
        </Card>
        </div>
      </PageContainer>
    </div>
  );
}
