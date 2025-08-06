import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Edit, Trash2, Users, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import PWAStatus from "@/components/PWAStatus";
import { PageContainer } from "@/components/ui/page-container";

interface FamilyMember {
  id: string;
  name: string;
  color: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  memberIds: string[];
  type: 'personal' | 'family' | 'work' | 'health' | 'education' | 'leisure';
}

const defaultMembers: FamilyMember[] = [
  { id: '1', name: 'Papa', color: 'bg-blue-500' },
  { id: '2', name: 'Maman', color: 'bg-pink-500' },
  { id: '3', name: 'Emma', color: 'bg-purple-500' },
  { id: '4', name: 'Lucas', color: 'bg-green-500' }
];

const eventTypes = [
  { value: 'family', label: 'Famille', color: 'bg-orange-500' },
  { value: 'work', label: 'Travail', color: 'bg-gray-500' },
  { value: 'health', label: 'Santé', color: 'bg-red-500' },
  { value: 'education', label: 'École', color: 'bg-yellow-500' },
  { value: 'leisure', label: 'Loisirs', color: 'bg-indigo-500' },
  { value: 'personal', label: 'Personnel', color: 'bg-teal-500' }
];

export default function FamilyCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [members, setMembers] = useState<FamilyMember[]>(defaultMembers);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 60,
    location: '',
    memberIds: [],
    type: 'family'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedMembers = localStorage.getItem('family-calendar-members');
    const savedEvents = localStorage.getItem('family-calendar-events');
    
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('family-calendar-members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('family-calendar-events', JSON.stringify(events));
  }, [events]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDay = new Date(year, month, -i);
      days.push({ date: prevDay, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description || '',
      date: newEvent.date!,
      time: newEvent.time!,
      duration: newEvent.duration!,
      location: newEvent.location || '',
      memberIds: newEvent.memberIds!,
      type: newEvent.type as Event['type']
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 60,
      location: '',
      memberIds: [],
      type: 'family'
    });
    setIsAddingEvent(false);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const formatTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const endMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
    
    return `${startTime} - ${endTime}`;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex-grow">
        <PageContainer maxWidth="full" padding="md">
          <div className="py-4 md:py-6">
            {/* Header responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 flex items-center space-x-1 md:space-x-2"
                >
                  ← <span className="hidden xs:inline">Accueil</span>
                </Button>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center space-x-1 md:space-x-2">
                  <Calendar className="h-5 w-5 md:h-8 md:w-8 text-blue-600" />
                  <span>Calendrier Familial</span>
                </h1>
                <p className="text-sm md:text-base text-gray-600 hidden sm:block">Organisez tous vos événements familiaux</p>
              </div>
            </div>
            
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="text-sm md:text-base">Nouvel Événement</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md mx-2 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg md:text-xl">Créer un nouvel événement</DialogTitle>
                  <DialogDescription className="text-sm">
                    Ajoutez un événement au calendrier familial
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Titre *</Label>
                    <Input
                      id="title"
                      value={newEvent.title || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Nom de l'événement"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Input
                      id="description"
                      value={newEvent.description || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Détails de l'événement"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="date" className="text-sm font-medium">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-sm font-medium">Heure</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">Type</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event['type'] })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-sm">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">Lieu</Label>
                    <Input
                      id="location"
                      value={newEvent.location || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Où se déroule l'événement"
                      className="mt-1"
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-col xs:flex-row gap-2 xs:gap-0">
                  <Button variant="outline" onClick={() => setIsAddingEvent(false)} className="w-full xs:w-auto order-2 xs:order-1">
                    Annuler
                  </Button>
                  <Button onClick={handleAddEvent} disabled={!newEvent.title} className="w-full xs:w-auto order-1 xs:order-2">
                    Créer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Calendar Navigation responsive */}
          <Card className="mb-4 md:mb-6 rounded-xl">
            <CardHeader className="py-3 md:py-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="px-3 py-2"
                >
                  ←
                </Button>
                <h2 className="text-lg md:text-xl font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="px-3 py-2"
                >
                  →
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Family Members Legend responsive */}
          <Card className="mb-4 md:mb-6 rounded-xl">
            <CardHeader className="py-3 md:py-4">
              <CardTitle className="text-sm md:text-base flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Membres de la famille</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3 md:pb-4">
              <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                  <Badge key={member.id} className={`${member.color} text-white text-xs md:text-sm px-2 py-1`}>
                    {member.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid responsive */}
          <Card className="rounded-xl">
            <CardContent className="p-2 md:p-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
                  <div key={day} className="p-1 md:p-2 text-center font-medium text-gray-600 text-xs md:text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days responsive */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day.date);
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-16 md:min-h-24 p-1 border rounded-lg ${
                        day.isCurrentMonth 
                          ? 'bg-white border-gray-200' 
                          : 'bg-gray-50 border-gray-100'
                      } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <div className={`text-xs md:text-sm font-medium mb-1 ${
                        day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                      } ${isToday ? 'text-blue-600' : ''}`}>
                        {day.date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, window.innerWidth < 768 ? 1 : 2).map((event) => {
                          const eventType = eventTypes.find(t => t.value === event.type);
                          return (
                            <div
                              key={event.id}
                              className={`p-1 rounded text-xs text-white cursor-pointer hover:opacity-80 ${eventType?.color || 'bg-gray-500'} transition-transform active:scale-95`}
                              title={`${event.title} - ${formatTime(event.time, event.duration)}`}
                              onClick={() => deleteEvent(event.id)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate flex-1 text-xs">{event.title}</span>
                                <Trash2 className="h-2 w-2 md:h-3 md:w-3 opacity-0 hover:opacity-100" />
                              </div>
                              <div className="text-xs opacity-80 hidden md:block">
                                {event.time}
                              </div>
                            </div>
                          );
                        })}
                        
                        {dayEvents.length > (window.innerWidth < 768 ? 1 : 2) && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - (window.innerWidth < 768 ? 1 : 2)} autres
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Today's Events responsive */}
          <Card className="mt-4 md:mt-6 rounded-xl">
            <CardHeader className="py-3 md:py-4">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                <span>Événements d'aujourd'hui</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {getEventsForDate(new Date()).length > 0 ? (
                <div className="space-y-2 md:space-y-3">
                  {getEventsForDate(new Date()).map((event) => {
                    const eventType = eventTypes.find(t => t.value === event.type);
                    return (
                      <div key={event.id} className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${eventType?.color || 'bg-gray-500'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm md:text-base truncate">{event.title}</div>
                          <div className="text-xs md:text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span>{formatTime(event.time, event.duration)}</span>
                            {event.location && (
                              <span className="flex items-center truncate">
                                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700 p-1 md:p-2"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4 text-sm md:text-base">
                  Aucun événement prévu pour aujourd'hui
                </p>
              )}
            </CardContent>
          </Card>
          </div>
        </PageContainer>
      </div>

      {/* PWA Status en bas de page */}
      <PWAStatus />
    </div>
  );
}
