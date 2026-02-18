import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AppointmentModal from './AppointmentModal';
import AppointmentDetailModal from './AppointmentDetailModal';
import FinishTattooModal from '../tattoos/FinishTattooModal';

function MonthView({ appointments, onAddAppointment, onUpdateAppointment, onDeleteAppointment, onCompleteTattoo }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFinishTattooOpen, setIsFinishTattooOpen] = useState(false);
  const [completingAppointment, setCompletingAppointment] = useState(null);

  // Get month and year
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Get today's date for highlighting
  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Get appointments for a specific day
  const getAppointmentsForDay = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(apt => apt.date === dateStr);
  };

  // Handle appointment click
  const handleAppointmentClick = (apt, e) => {
    e.stopPropagation();
    setSelectedAppointment(apt);
    setIsDetailModalOpen(true);
  };

  // Handle day click (for adding appointments)
  const handleDayClick = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setIsAddModalOpen(true);
  };

  // Handle save appointment
  const handleSaveAppointment = (appointmentData) => {
    if (editingAppointment) {
      onUpdateAppointment(editingAppointment.id, appointmentData);
      setEditingAppointment(null);
    } else {
      onAddAppointment(appointmentData);
    }
    setSelectedDate(null);
  };

  // Handle edit appointment
  const handleEditAppointment = (apt) => {
    setEditingAppointment(apt);
    setIsAddModalOpen(true);
  };

  // Handle complete tattoo
  const handleCompleteTattoo = (apt) => {
    setCompletingAppointment(apt);
    setIsFinishTattooOpen(true);
  };

  // Handle save completed tattoo
  const handleSaveCompletedTattoo = (tattooData) => {
    // The completeTattoo hook handles everything:
    // 1. Inserts tattoo record to Supabase
    // 2. Updates appointment status to 'completed' in Supabase
    // 3. Updates client stats in Supabase
    // 4. Updates local state via dispatch
    onCompleteTattoo(tattooData);
    
    // Close modal
    setIsFinishTattooOpen(false);
    setCompletingAppointment(null);
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells before first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-bg-tertiary/50"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayAppointments = getAppointmentsForDay(day);
    const isTodayDate = isToday(day);

    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDayClick(day)}
        className={`h-24 md:h-32 border border-border-primary p-2 hover:bg-bg-secondary transition cursor-pointer ${
          isTodayDate ? 'bg-accent-primary/10 border-accent-primary' : 'bg-bg-tertiary'
        }`}
      >
        <div className={`text-sm md:text-base font-semibold mb-1 ${isTodayDate ? 'text-accent-primary' : 'text-text-primary'}`}>
          {day}
        </div>
        
        <div className="space-y-1">
          {dayAppointments.slice(0, 2).map((apt) => (
            <div
              key={apt.id}
              onClick={(e) => handleAppointmentClick(apt, e)}
              className={`text-xs px-2 py-1 rounded truncate hover:scale-105 transition ${
                apt.type === 'tattoo' 
                  ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                  : 'bg-accent-warning/20 text-accent-warning border border-accent-warning/30'
              }`}
            >
              {apt.time} - {apt.client}
            </div>
          ))}
          
          {dayAppointments.length > 2 && (
            <div className="text-xs text-text-tertiary px-2">
              +{dayAppointments.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-bg-tertiary rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg md:text-xl font-semibold px-4">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-bg-tertiary rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button 
            onClick={() => {
              setSelectedDate(null);
              setEditingAppointment(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">Add Appointment</span>
            <span className="md:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-px mb-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-bg-secondary py-2 text-center text-sm md:text-base font-semibold text-text-secondary"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px bg-border-primary">
          {calendarDays}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent-primary/20 border border-accent-primary/30 rounded"></div>
            <span className="text-text-secondary">Tattoo Session</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent-warning/20 border border-accent-warning/30 rounded"></div>
            <span className="text-text-secondary">Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent-primary border-2 border-accent-primary rounded"></div>
            <span className="text-text-secondary">Today</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingAppointment(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveAppointment}
        appointment={editingAppointment}
        selectedDate={selectedDate}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onEdit={handleEditAppointment}
        onDelete={onDeleteAppointment}
        onComplete={handleCompleteTattoo}
      />

      <FinishTattooModal
        isOpen={isFinishTattooOpen}
        onClose={() => {
          setIsFinishTattooOpen(false);
          setCompletingAppointment(null);
        }}
        onSave={handleSaveCompletedTattoo}
        appointment={completingAppointment}
      />
    </div>
  );
}

export default MonthView;