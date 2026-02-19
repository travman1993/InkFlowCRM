import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import StudioAppointmentModal from './StudioAppointmentModal';
import StudioAppointmentDetailModal from './StudioAppointmentDetailModal';

// Fixed color palette for managed artists (index-based, wraps around)
const ARTIST_PALETTE = [
  { bg: 'rgba(168,85,247,0.2)',  text: '#a855f7', solid: '#a855f7' }, // purple
  { bg: 'rgba(244,63,94,0.2)',   text: '#f43f5e', solid: '#f43f5e' }, // rose
  { bg: 'rgba(245,158,11,0.2)',  text: '#f59e0b', solid: '#f59e0b' }, // amber
  { bg: 'rgba(132,204,22,0.2)',  text: '#84cc16', solid: '#84cc16' }, // lime
  { bg: 'rgba(59,130,246,0.2)',  text: '#3b82f6', solid: '#3b82f6' }, // blue
  { bg: 'rgba(236,72,153,0.2)',  text: '#ec4899', solid: '#ec4899' }, // pink
];

// Owner's own appointments use the brand teal
const OWNER_COLOR     = { bg: 'rgba(14,165,233,0.2)',  text: '#0ea5e9', solid: '#0ea5e9' };
const COMPLETED_COLOR = { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', solid: '#22c55e' };

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function toMinutes(t) {
  if (!t) return 0;
  const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function StudioMonthView({ appointments, artists, onAddAppointment, onUpdateAppointment, onDeleteAppointment }) {
  const [currentDate, setCurrentDate]           = useState(new Date());
  const [isAddModalOpen, setIsAddModalOpen]     = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen]     = useState(false);
  const [editingAppointment, setEditingAppointment]   = useState(null);
  const [selectedDate, setSelectedDate]         = useState(null);
  const [expandedDay, setExpandedDay]           = useState(null);

  const currentMonth = currentDate.getMonth();
  const currentYear  = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth     = new Date(currentYear, currentMonth + 1, 0).getDate();
  const todayStr        = new Date().toISOString().split('T')[0];

  // Stable color map: artist.id → palette entry (by position in sorted array)
  const artistColorMap = useMemo(() => {
    const map = {};
    artists.forEach((artist, i) => {
      map[artist.id] = ARTIST_PALETTE[i % ARTIST_PALETTE.length];
    });
    return map;
  }, [artists]);

  const getColor = (apt) => {
    if (apt.status === 'completed') return COMPLETED_COLOR;
    if (!apt.studioArtistId)       return OWNER_COLOR;
    return artistColorMap[apt.studioArtistId] || OWNER_COLOR;
  };

  const getChipLabel = (apt) => {
    if (!apt.studioArtistId) return apt.clientName;
    const artist = artists.find(a => a.id === apt.studioArtistId);
    const firstName = artist ? artist.name.split(' ')[0] : '';
    return firstName ? `${firstName} · ${apt.clientName}` : apt.clientName;
  };

  const getArtistLabel = (apt) => {
    if (!apt.studioArtistId) return 'Owner (You)';
    const artist = artists.find(a => a.id === apt.studioArtistId);
    return artist ? artist.name : 'Unknown';
  };

  const getDateStr = (day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const getAppointmentsForDay = (day) => {
    const dateStr = getDateStr(day);
    return appointments.filter(apt => apt.date === dateStr);
  };

  const prevMonth = () => { setCurrentDate(new Date(currentYear, currentMonth - 1, 1)); setExpandedDay(null); };
  const nextMonth = () => { setCurrentDate(new Date(currentYear, currentMonth + 1, 1)); setExpandedDay(null); };

  const handleDayClick = (day) => {
    const dateStr  = getDateStr(day);
    const dayAppts = getAppointmentsForDay(day);

    if (dayAppts.length === 0) {
      setSelectedDate(dateStr);
      setEditingAppointment(null);
      setIsAddModalOpen(true);
    } else if (dayAppts.length === 1) {
      setSelectedAppointment(dayAppts[0]);
      setIsDetailModalOpen(true);
      setExpandedDay(null);
    } else {
      setExpandedDay(expandedDay === dateStr ? null : dateStr);
    }
  };

  const handleAppointmentClick = (e, appointment) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleSaveAppointment = (data) => {
    if (editingAppointment) {
      onUpdateAppointment(editingAppointment.id, data);
    } else {
      onAddAppointment(data);
    }
    setEditingAppointment(null);
    setSelectedDate(null);
  };

  const handleEditAppointment = (appointment) => {
    setIsDetailModalOpen(false);
    setEditingAppointment(appointment);
    setIsAddModalOpen(true);
  };

  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button onClick={prevMonth} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button onClick={nextMonth} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedDate(todayStr);
                setEditingAppointment(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Add Appointment</span>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-text-tertiary py-2">
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto p-2 md:p-6">
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="min-h-[80px] md:min-h-[100px]" />;
            }

            const dateStr    = getDateStr(day);
            const dayAppts   = getAppointmentsForDay(day);
            const isToday    = dateStr === todayStr;
            const isExpanded = expandedDay === dateStr;
            const maxVisible = 2;
            const hiddenCount = dayAppts.length - maxVisible;

            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`min-h-[80px] md:min-h-[100px] p-1 md:p-2 rounded-lg border cursor-pointer transition hover:border-accent-primary/50 ${
                  isToday
                    ? 'border-accent-primary bg-accent-primary/5'
                    : 'border-border-primary hover:bg-bg-secondary'
                } ${isExpanded ? 'ring-2 ring-accent-primary bg-accent-primary/10' : ''}`}
              >
                <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-accent-primary' : 'text-text-secondary'}`}>
                  {day}
                </div>

                <div className="space-y-1">
                  {dayAppts.slice(0, maxVisible).map(apt => {
                    const color = getColor(apt);
                    return (
                      <div
                        key={apt.id}
                        onClick={e => handleAppointmentClick(e, apt)}
                        style={{ backgroundColor: color.bg, color: color.text }}
                        className="text-xs px-1.5 py-1 rounded truncate cursor-pointer transition hover:opacity-80"
                      >
                        <span className="hidden md:inline">{apt.time} </span>
                        {getChipLabel(apt)}
                      </div>
                    );
                  })}
                  {hiddenCount > 0 && (
                    <div className="text-xs text-accent-primary font-semibold px-1.5 cursor-pointer hover:underline">
                      +{hiddenCount} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Day Panel */}
        {expandedDay && (
          <div className="mt-4 bg-bg-secondary rounded-xl border border-accent-primary/30 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {new Date(expandedDay + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long', month: 'long', day: 'numeric',
                })}
                <span className="text-sm text-text-tertiary font-normal ml-3">
                  {appointments.filter(a => a.date === expandedDay).length} appointment
                  {appointments.filter(a => a.date === expandedDay).length !== 1 ? 's' : ''}
                </span>
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedDate(expandedDay);
                    setEditingAppointment(null);
                    setIsAddModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg text-sm font-semibold transition"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
                <button onClick={() => setExpandedDay(null)} className="p-2 hover:bg-bg-tertiary rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {appointments
                .filter(apt => apt.date === expandedDay)
                .sort((a, b) => toMinutes(a.time) - toMinutes(b.time))
                .map(apt => {
                  const color = getColor(apt);
                  return (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setSelectedAppointment(apt);
                        setIsDetailModalOpen(true);
                      }}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition hover:border-accent-primary/50 ${
                        apt.status === 'completed'
                          ? 'bg-accent-success/5 border-accent-success/30'
                          : 'bg-bg-primary border-border-primary'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                          <div className="text-sm font-bold">{apt.time || 'TBD'}</div>
                          <div className="text-xs text-text-tertiary">
                            {apt.duration >= 60
                              ? `${Math.floor(apt.duration / 60)}h${apt.duration % 60 > 0 ? ` ${apt.duration % 60}m` : ''}`
                              : `${apt.duration}m`}
                          </div>
                        </div>

                        <div
                          className="w-1 h-10 rounded-full shrink-0"
                          style={{ backgroundColor: color.solid }}
                        />

                        <div>
                          <div className="font-semibold">{apt.clientName}</div>
                          <div className="text-sm text-text-secondary">
                            {getArtistLabel(apt)} · {apt.type === 'consult' ? 'Consultation' : 'Tattoo Session'}
                            {apt.status === 'completed' && ' · Completed ✓'}
                          </div>
                          {apt.notes && (
                            <div className="text-xs text-text-tertiary mt-1 truncate max-w-[300px]">
                              {apt.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {apt.clientPhone && (
                        <div className="hidden md:block text-sm text-text-tertiary">
                          {apt.clientPhone}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 px-2">
          {/* Owner */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: OWNER_COLOR.bg, border: `1px solid ${OWNER_COLOR.solid}` }} />
            <span className="text-text-secondary text-sm">Owner (You)</span>
          </div>

          {/* Each active managed artist */}
          {artists.map((artist, i) => {
            const color = ARTIST_PALETTE[i % ARTIST_PALETTE.length];
            return (
              <div key={artist.id} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: color.bg, border: `1px solid ${color.solid}` }} />
                <span className="text-text-secondary text-sm">{artist.name.split(' ')[0]}</span>
              </div>
            );
          })}

          {/* Completed */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: COMPLETED_COLOR.bg, border: `1px solid ${COMPLETED_COLOR.solid}` }} />
            <span className="text-text-secondary text-sm">Completed</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StudioAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingAppointment(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveAppointment}
        appointment={editingAppointment}
        selectedDate={selectedDate}
        artists={artists}
      />

      <StudioAppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        artists={artists}
        onEdit={handleEditAppointment}
        onDelete={onDeleteAppointment}
      />
    </div>
  );
}

export default StudioMonthView;
