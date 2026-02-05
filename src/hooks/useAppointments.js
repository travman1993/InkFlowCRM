import { useState } from 'react';

// Custom hook to manage appointments
export function useAppointments() {
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      date: '2026-02-05', 
      client: 'John Smith', 
      type: 'tattoo', 
      time: '2:00 PM',
      duration: 120,
      notes: 'Full sleeve session - continuing work on dragon design',
      phone: '555-123-4567',
      status: 'scheduled'
    },
    { 
      id: 2, 
      date: '2026-02-05', 
      client: 'Sarah Johnson', 
      type: 'consult', 
      time: '4:30 PM',
      duration: 30,
      notes: 'First tattoo - wants small floral design on wrist',
      phone: '555-987-6543',
      status: 'scheduled'
    },
    { 
      id: 3, 
      date: '2026-02-07', 
      client: 'Mike Davis', 
      type: 'tattoo', 
      time: '10:00 AM',
      duration: 180,
      notes: 'Chest piece - geometric design',
      phone: '555-456-7890',
      status: 'scheduled'
    },
    { 
      id: 4, 
      date: '2026-02-12', 
      client: 'Emily Brown', 
      type: 'tattoo', 
      time: '1:00 PM',
      duration: 90,
      notes: 'Touch-up on previous work',
      phone: '555-234-5678',
      status: 'scheduled'
    },
    { 
      id: 5, 
      date: '2026-02-15', 
      client: 'Chris Wilson', 
      type: 'consult', 
      time: '3:00 PM',
      duration: 45,
      notes: 'Consultation for back piece',
      phone: '555-345-6789',
      status: 'scheduled'
    },
    { 
      id: 6, 
      date: '2026-02-18', 
      client: 'Amanda Lee', 
      type: 'tattoo', 
      time: '11:00 AM',
      duration: 150,
      notes: 'Thigh tattoo - Japanese style koi fish',
      phone: '555-567-8901',
      status: 'scheduled'
    },
  ]);

  // Add new appointment
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(), // Generate unique ID
      status: 'scheduled'
    };
    setAppointments([...appointments, newAppointment]);
  };

  // Update existing appointment
  const updateAppointment = (id, updatedData) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, ...updatedData } : apt
    ));
  };

  // Delete appointment
  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  // Get appointments for a specific date
  const getAppointmentsByDate = (dateStr) => {
    return appointments.filter(apt => apt.date === dateStr);
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate
  };
}