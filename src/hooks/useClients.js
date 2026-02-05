import { useState } from 'react';

export function useClients() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'John Smith',
      phone: '555-123-4567',
      email: 'john@email.com',
      birthday: '1990-05-15',
      notes: 'Regular client - prefers black and grey work',
      skinConditions: 'None',
      createdAt: '2025-06-10',
      totalSpent: 2850,
      totalTattoos: 4,
      lastVisit: '2026-02-05'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      phone: '555-987-6543',
      email: 'sarah@email.com',
      birthday: '1985-12-03',
      notes: 'First-timer - nervous about pain',
      skinConditions: 'Sensitive skin',
      createdAt: '2026-01-20',
      totalSpent: 450,
      totalTattoos: 1,
      lastVisit: '2026-02-05'
    },
    {
      id: 3,
      name: 'Mike Davis',
      phone: '555-456-7890',
      email: '',
      birthday: '1992-08-22',
      notes: 'Walk-in from Instagram',
      skinConditions: 'Eczema on arms - avoid that area',
      createdAt: '2025-11-15',
      totalSpent: 1600,
      totalTattoos: 2,
      lastVisit: '2026-02-07'
    },
    {
      id: 4,
      name: 'Emily Brown',
      phone: '555-234-5678',
      email: 'emily.brown@email.com',
      birthday: '1995-03-18',
      notes: 'Loves floral designs',
      skinConditions: 'None',
      createdAt: '2025-09-05',
      totalSpent: 3200,
      totalTattoos: 5,
      lastVisit: '2026-01-28'
    },
    {
      id: 5,
      name: 'Chris Wilson',
      phone: '555-345-6789',
      email: 'chris.w@email.com',
      birthday: '1988-07-30',
      notes: 'Planning a full sleeve',
      skinConditions: 'None',
      createdAt: '2026-01-05',
      totalSpent: 800,
      totalTattoos: 1,
      lastVisit: '2026-01-15'
    },
    {
      id: 6,
      name: 'Amanda Lee',
      phone: '555-567-8901',
      email: 'amanda.lee@email.com',
      birthday: '1993-11-25',
      notes: 'Japanese style enthusiast',
      skinConditions: 'None',
      createdAt: '2025-08-20',
      totalSpent: 4500,
      totalTattoos: 6,
      lastVisit: '2026-02-18'
    },
  ]);

  // Add new client
  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      totalTattoos: 0,
      lastVisit: null
    };
    setClients([...clients, newClient]);
  };

  // Bulk import clients
  const bulkImportClients = (clientsArray) => {
    const newClients = clientsArray.map(client => ({
      ...client,
      id: Date.now() + Math.random(),
      createdAt: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      totalTattoos: 0,
      lastVisit: null
    }));
    setClients([...clients, ...newClients]);
  };

  // Update client
  const updateClient = (id, updatedData) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, ...updatedData } : client
    ));
  };

  // Delete client
  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  // Get client by ID
  const getClientById = (id) => {
    return clients.find(client => client.id === parseInt(id));
  };

  // Search clients
  const searchClients = (query) => {
    if (!query) return clients;
    
    const lowerQuery = query.toLowerCase();
    return clients.filter(client =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.phone.includes(query) ||
      (client.email && client.email.toLowerCase().includes(lowerQuery))
    );
  };

  return {
    clients,
    addClient,
    bulkImportClients,
    updateClient,
    deleteClient,
    getClientById,
    searchClients
  };
}