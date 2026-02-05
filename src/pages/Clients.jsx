import { useState } from 'react';
import ClientList from '../components/clients/ClientList';
import AddClientModal from '../components/clients/AddClientModal';
import BulkImportModal from '../components/clients/BulkImportModal';
import { useClients } from '../hooks/useClients';
import DashboardLayout from '../components/layout/DashboardLayout';

function Clients() {
  const {
    clients,
    addClient,
    bulkImportClients,
    updateClient,
    searchClients
  } = useClients();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);

  return (
    <DashboardLayout>
      <ClientList
        clients={clients}
        onSearch={searchClients}
        onAddClick={() => setIsAddModalOpen(true)}
        onBulkImportClick={() => setIsBulkImportOpen(true)}
      />

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addClient}
      />

      <BulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onImport={bulkImportClients}
      />
    </DashboardLayout>
  );
}

export default Clients;