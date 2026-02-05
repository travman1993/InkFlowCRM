import { useState } from 'react';

export function useTattoos() {
  const [tattoos, setTattoos] = useState([
    {
      id: 1,
      clientId: 1,
      clientName: 'John Smith',
      appointmentId: 1,
      date: '2026-02-05',
      price: 450,
      suppliesCost: 50,
      artistEarnings: 400,
      location: 'Left forearm',
      notes: 'Japanese dragon design - 3 hour session',
      images: [],
      paid: true,
      completedAt: '2026-02-05T18:30:00'
    },
    {
      id: 2,
      clientId: 2,
      clientName: 'Sarah Johnson',
      appointmentId: 2,
      date: '2026-02-05',
      price: 350,
      suppliesCost: 40,
      artistEarnings: 310,
      location: 'Wrist',
      notes: 'Small floral piece - first tattoo',
      images: [],
      paid: true,
      completedAt: '2026-02-05T17:00:00'
    },
  ]);

  // Add new tattoo
  const addTattoo = (tattoo) => {
    const newTattoo = {
      ...tattoo,
      id: Date.now(),
    };
    setTattoos([...tattoos, newTattoo]);
    return newTattoo;
  };

  // Get tattoos by client ID
  const getTattoosByClient = (clientId) => {
    return tattoos.filter(tattoo => tattoo.clientId === parseInt(clientId));
  };

  // Get tattoo by ID
  const getTattooById = (id) => {
    return tattoos.find(tattoo => tattoo.id === parseInt(id));
  };

  // Update tattoo
  const updateTattoo = (id, updatedData) => {
    setTattoos(tattoos.map(tattoo =>
      tattoo.id === id ? { ...tattoo, ...updatedData } : tattoo
    ));
  };

  // Delete tattoo
  const deleteTattoo = (id) => {
    setTattoos(tattoos.filter(tattoo => tattoo.id !== id));
  };

  // Get all tattoos (for analytics)
  const getAllTattoos = () => {
    return tattoos;
  };

  // Get total revenue
  const getTotalRevenue = () => {
    return tattoos.reduce((sum, tattoo) => sum + tattoo.price, 0);
  };

  // Get total earnings (price - supplies)
  const getTotalEarnings = () => {
    return tattoos.reduce((sum, tattoo) => sum + tattoo.artistEarnings, 0);
  };

  // Get total supplies cost
  const getTotalSuppliesCost = () => {
    return tattoos.reduce((sum, tattoo) => sum + tattoo.suppliesCost, 0);
  };

  return {
    tattoos,
    addTattoo,
    getTattoosByClient,
    getTattooById,
    updateTattoo,
    deleteTattoo,
    getAllTattoos,
    getTotalRevenue,
    getTotalEarnings,
    getTotalSuppliesCost
  };
}