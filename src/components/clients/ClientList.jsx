import { useState } from 'react';
import { Search, Plus, Upload, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 20;

function ClientList({ clients, onSearch, onAddClick, onBulkImportClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, lastVisit, totalSpent
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // reset to first page on new search
    onSearch(query);
  };

  const filteredClients = onSearch(searchQuery);

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'lastVisit') {
      return new Date(b.lastVisit || 0) - new Date(a.lastVisit || 0);
    } else if (sortBy === 'totalSpent') {
      return b.totalSpent - a.totalSpent;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedClients.length / PAGE_SIZE);
  const paginatedClients = sortedClients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Clients</h1>
            <div className="flex gap-3">
              <button
                onClick={onBulkImportClick}
                className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary hover:bg-bg-tertiary rounded-lg font-semibold transition"
              >
                <Upload className="w-5 h-5" />
                <span className="hidden md:inline">Import</span>
              </button>
              <button
                onClick={onAddClick}
                className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline">Add Client</span>
                <span className="md:hidden">Add</span>
              </button>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
            >
              <option value="name">Sort by Name</option>
              <option value="lastVisit">Sort by Last Visit</option>
              <option value="totalSpent">Sort by Total Spent</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-bg-primary p-4 rounded-lg border border-border-primary">
              <div className="text-2xl font-bold text-accent-primary">{clients.length}</div>
              <div className="text-sm text-text-secondary">Total Clients</div>
            </div>
            <div className="bg-bg-primary p-4 rounded-lg border border-border-primary">
              <div className="text-2xl font-bold text-accent-success">
                {clients.filter(c => c.lastVisit && new Date(c.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-sm text-text-secondary">Active (30d)</div>
            </div>
            <div className="bg-bg-primary p-4 rounded-lg border border-border-primary">
              <div className="text-2xl font-bold text-accent-warning">
                ${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {sortedClients.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg mb-4">
              {searchQuery ? 'No clients found matching your search.' : 'No clients yet.'}
            </p>
            {!searchQuery && (
              <button
                onClick={onAddClick}
                className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Add Your First Client
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {paginatedClients.map((client) => (
              <Link
                key={client.id}
                to={`/clients/${client.id}`}
                className="bg-bg-secondary p-4 md:p-6 rounded-xl border border-border-primary hover:border-accent-primary/50 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-accent-primary transition">
                      {client.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-text-secondary">
                      {client.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {client.phone}
                        </div>
                      )}
                      {client.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {client.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent-primary">
                      ${client.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">Total Spent</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border-primary">
                  <div>
                    <div className="text-sm text-text-tertiary">Tattoos</div>
                    <div className="text-lg font-semibold">{client.totalTattoos}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-tertiary">Last Visit</div>
                    <div className="text-lg font-semibold">{formatDate(client.lastVisit)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-tertiary">Client Since</div>
                    <div className="text-lg font-semibold">{formatDate(client.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-tertiary">Birthday</div>
                    <div className="text-lg font-semibold">
                      {client.birthday ? new Date(client.birthday + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border-primary">
            <p className="text-sm text-text-secondary">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, sortedClients.length)} of {sortedClients.length} clients
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-bg-secondary border border-border-primary rounded-lg font-semibold text-sm transition hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-bg-secondary border border-border-primary rounded-lg font-semibold text-sm transition hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientList;