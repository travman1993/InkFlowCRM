import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ClientProfile from '../components/clients/ClientProfile';
import AddClientModal from '../components/clients/AddClientModal';
import { useClients } from '../hooks/useClients';
import DashboardLayout from '../components/layout/DashboardLayout';

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClientById, updateClient, deleteClient } = useClients();
  
  const client = getClientById(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // If client not found, redirect
  if (!client) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Client Not Found</h1>
            <p className="text-text-secondary mb-6">The client you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/clients')}
              className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
            >
              Back to Clients
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedData) => {
    updateClient(client.id, updatedData);
    setIsEditModalOpen(false);
  };

  const handleDelete = (clientId) => {
    deleteClient(clientId);
  };

  return (
    <DashboardLayout>
      <ClientProfile
        client={client}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdateClient={updateClient}
      />

      <AddClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        client={client}
      />
    </DashboardLayout>
  );
}

export default ClientDetail;