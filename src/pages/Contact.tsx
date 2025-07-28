import React, { useState } from 'react';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageCircle, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, sanitizeInput } from '@/schemas/validation';
import { z } from 'zod';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message)
      };

      // Validate form data
      const validatedData = contactFormSchema.parse(sanitizedData);

      // Simulation d'envoi
      setTimeout(() => {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
          duration: 5000,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <PageContainer>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une question, une suggestion ou besoin d'aide ? Nous sommes là pour vous accompagner dans votre utilisation de nos outils famille.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire de contact */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageCircle className="w-6 h-6 mr-2 text-primary" />
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Sujet de votre message"
                      required
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre demande, suggestion ou question..."
                      rows={6}
                      required
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Mail className="w-6 h-6 mr-2 text-primary" />
                    Nos coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:ahoudzipro@gmail.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        ahoudzipro@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Temps de réponse</p>
                      <p className="text-gray-600">Sous 24h en moyenne</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Disponibilité</p>
                      <p className="text-gray-600">Lundi - Vendredi, 9h - 18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-xl">Questions fréquentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Les outils sont-ils vraiment gratuits ?</h4>
                    <p className="text-gray-600 text-sm">Oui, tous nos outils sont 100% gratuits, sans frais cachés ni abonnements.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mes données sont-elles sécurisées ?</h4>
                    <p className="text-gray-600 text-sm">Absolument. Vos données restent stockées localement sur votre appareil.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Puis-je utiliser les outils hors ligne ?</h4>
                    <p className="text-gray-600 text-sm">Oui, une fois chargés, nos outils fonctionnent parfaitement sans connexion.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Comment suggérer un nouvel outil ?</h4>
                    <p className="text-gray-600 text-sm">Utilisez le formulaire ci-contre en précisant "Suggestion d'outil" dans le sujet.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}