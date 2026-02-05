import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Settings as SettingsIcon, 
  User, 
  DollarSign, 
  Save, 
  RefreshCw, 
  Trash2,
  Mail,
  Bell,
  Shield,
  Info
} from 'lucide-react';
import { useArtistSettings } from '../hooks/useArtistSettings';
import { useExpenses } from '../hooks/useExpenses';

function Settings() {
  const { settings, updateSettings } = useArtistSettings();
  const { recurringTemplates, addRecurringTemplate, updateRecurringTemplate, deleteRecurringTemplate } = useExpenses();
  
  const [formData, setFormData] = useState(settings);
  const [newRecurring, setNewRecurring] = useState({
    category: 'Booth Rent',
    amount: '',
    notes: ''
  });
  const [activeTab, setActiveTab] = useState('profile'); // profile, payment, expenses, notifications

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(formData);
    
    // Show success message
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Saved!</span>';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);
  };

  const handleAddRecurring = (e) => {
    e.preventDefault();
    if (!newRecurring.amount || parseFloat(newRecurring.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    addRecurringTemplate({
      ...newRecurring,
      amount: parseFloat(newRecurring.amount)
    });
    
    setNewRecurring({
      category: 'Booth Rent',
      amount: '',
      notes: ''
    });
  };

  const categories = [
    'Booth Rent',
    'Utilities',
    'Supplies',
    'Equipment',
    'Marketing',
    'Software',
    'Insurance',
    'Other'
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'payment', name: 'Payment Model', icon: DollarSign },
    { id: 'expenses', name: 'Recurring Expenses', icon: RefreshCw },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Header */}
        <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-accent-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* Tabs */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary mb-6 overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? 'bg-accent-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
                <h2 className="text-xl font-bold mb-6">Artist Profile</h2>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                        placeholder="555-123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                      placeholder="john@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Studio Name (Optional)</label>
                    <input
                      type="text"
                      value={formData.studioName}
                      onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                      className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                      placeholder="Ink Masters Studio"
                    />
                    <p className="text-sm text-text-tertiary mt-2">
                      If you work at a studio, add the name here
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
                  >
                    <Save className="w-5 h-5" />
                    Save Profile
                  </button>
                </form>
              </div>
            )}

            {/* Payment Model Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Model</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-4">How do you get paid?</label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentModel: 'booth_rent' })}
                          className={`p-6 rounded-lg border-2 transition text-left ${
                            formData.paymentModel === 'booth_rent'
                              ? 'border-accent-primary bg-accent-primary/10'
                              : 'border-border-primary hover:border-accent-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-lg mb-2">💰 Booth Rent</div>
                          <div className="text-sm text-text-secondary mb-4">
                            You keep 100% of tattoo price (minus supplies and rent)
                          </div>
                          <div className="text-xs text-text-tertiary">
                            Best for: Independent artists renting a space
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentModel: 'commission' })}
                          className={`p-6 rounded-lg border-2 transition text-left ${
                            formData.paymentModel === 'commission'
                              ? 'border-accent-primary bg-accent-primary/10'
                              : 'border-border-primary hover:border-accent-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-lg mb-2">📊 Commission Split</div>
                          <div className="text-sm text-text-secondary mb-4">
                            You get a percentage of each tattoo, studio gets the rest
                          </div>
                          <div className="text-xs text-text-tertiary">
                            Best for: Artists employed by a studio
                          </div>
                        </button>
                      </div>
                    </div>

                    {formData.paymentModel === 'booth_rent' && (
                      <div className="bg-bg-primary p-6 rounded-lg border border-border-primary">
                        <label className="block text-sm font-semibold mb-2">Monthly Booth Rent Amount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary text-lg">$</span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.boothRentAmount}
                            onChange={(e) => setFormData({ ...formData, boothRentAmount: parseFloat(e.target.value) || 0 })}
                            className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition text-lg"
                            placeholder="800.00"
                          />
                        </div>
                        <p className="text-sm text-text-tertiary mt-2">
                          This will be used to calculate your monthly expenses
                        </p>
                        
                        <div className="mt-4 p-4 bg-accent-success/10 border border-accent-success/30 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-accent-success mb-1">Example Calculation</div>
                              <div className="text-sm text-text-secondary">
                                If you do a $500 tattoo with $50 in supplies:<br />
                                Your earnings = $500 - $50 = <span className="font-semibold text-accent-success">$450</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentModel === 'commission' && (
                      <div className="bg-bg-primary p-6 rounded-lg border border-border-primary">
                        <label className="block text-sm font-semibold mb-2">Your Commission Rate</label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            value={Math.round(formData.commissionRate * 100)}
                            onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) / 100 || 0 })}
                            className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition text-lg"
                            placeholder="60"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary text-lg">%</span>
                        </div>
                        <p className="text-sm text-text-tertiary mt-2">
                          Percentage of the tattoo price you keep (before supplies)
                        </p>
                        
                        <div className="mt-4 p-4 bg-accent-success/10 border border-accent-success/30 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-accent-success mb-1">Example Calculation</div>
                              <div className="text-sm text-text-secondary">
                                If you do a $500 tattoo with $50 in supplies at {Math.round(formData.commissionRate * 100)}% commission:<br />
                                Your earnings = ($500 × {Math.round(formData.commissionRate * 100)}%) - $50 = <span className="font-semibold text-accent-success">${((500 * formData.commissionRate) - 50).toFixed(2)}</span><br />
                                Studio gets = ${(500 * (1 - formData.commissionRate)).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSaveSettings}
                      className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
                    >
                      <Save className="w-5 h-5" />
                      Save Payment Model
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recurring Expenses Tab */}
            {activeTab === 'expenses' && (
              <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
                <h2 className="text-xl font-bold mb-4">Recurring Monthly Expenses</h2>
                
                <p className="text-text-secondary mb-6">
                  These expenses will automatically be added at the start of each month. Perfect for booth rent, utilities, software subscriptions, etc.
                </p>

                {/* Existing Recurring Expenses */}
                {recurringTemplates.length > 0 ? (
                  <div className="space-y-3 mb-8">
                    {recurringTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary group hover:border-accent-primary/50 transition">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="font-semibold text-lg">{template.category}</div>
                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                              Auto-adds monthly
                            </span>
                          </div>
                          {template.notes && (
                            <div className="text-sm text-text-secondary mt-1">{template.notes}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-accent-warning text-right">
                            ${template.amount.toLocaleString()}
                          </div>
                          <button
                            onClick={() => {
                              if (window.confirm(`Remove "${template.category}" from recurring expenses?`)) {
                                deleteRecurringTemplate(template.id);
                              }
                            }}
                            className="p-2 bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30 rounded-lg opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-lg">
                      <div className="font-semibold mb-2">Total Recurring Monthly Expenses:</div>
                      <div className="text-3xl font-bold text-accent-primary">
                        ${recurringTemplates.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 mb-8 bg-bg-primary rounded-lg border border-border-primary">
                    <RefreshCw className="w-16 h-16 mx-auto mb-4 text-text-tertiary" />
                    <p className="text-text-secondary text-lg mb-2">No recurring expenses yet</p>
                    <p className="text-text-tertiary text-sm">Add your monthly expenses below</p>
                  </div>
                )}

                {/* Add New Recurring Expense */}
                <div className="pt-6 border-t border-border-primary">
                  <h3 className="font-semibold text-lg mb-4">Add New Recurring Expense</h3>
                  
                  <form onSubmit={handleAddRecurring} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Category *</label>
                        <select
                          required
                          value={newRecurring.category}
                          onChange={(e) => setNewRecurring({ ...newRecurring, category: e.target.value })}
                          className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Amount *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">$</span>
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={newRecurring.amount}
                            onChange={(e) => setNewRecurring({ ...newRecurring, amount: e.target.value })}
                            className="w-full pl-8 pr-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                            placeholder="150.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Notes</label>
                        <input
                          type="text"
                          value={newRecurring.notes}
                          onChange={(e) => setNewRecurring({ ...newRecurring, notes: e.target.value })}
                          className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition"
                          placeholder="Description"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-accent-success hover:bg-green-600 rounded-lg font-semibold transition"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Add Recurring Expense
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
                <h2 className="text-xl font-bold mb-6">Email Notifications</h2>
                
                <div className="space-y-6">
                  <div className="bg-bg-primary p-6 rounded-lg border border-border-primary">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-6 h-6 text-accent-primary mt-1" />
                        <div>
                          <div className="font-semibold text-lg">Appointment Reminders</div>
                          <div className="text-sm text-text-secondary mt-1">
                            Send email reminders to clients before their appointments
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                      </label>
                    </div>
                    <div className="text-sm text-text-tertiary pl-9">
                      Coming soon: Automated email reminders 24 hours before appointments
                    </div>
                  </div>

                  <div className="bg-bg-primary p-6 rounded-lg border border-border-primary">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-6 h-6 text-accent-primary mt-1" />
                        <div>
                          <div className="font-semibold text-lg">Aftercare Instructions</div>
                          <div className="text-sm text-text-secondary mt-1">
                            Automatically send aftercare emails after completing a tattoo
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                      </label>
                    </div>
                    <div className="text-sm text-text-tertiary pl-9">
                      Coming soon: Send aftercare PDFs immediately after tattoo completion
                    </div>
                  </div>

                  <div className="bg-bg-primary p-6 rounded-lg border border-border-primary">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Bell className="w-6 h-6 text-accent-primary mt-1" />
                        <div>
                          <div className="font-semibold text-lg">Birthday Reminders</div>
                          <div className="text-sm text-text-secondary mt-1">
                            Get notified when it's a client's birthday
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-bg-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
                      </label>
                    </div>
                    <div className="text-sm text-text-tertiary pl-9">
                      Coming soon: Daily email with upcoming client birthdays
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-text-secondary">
                        <span className="font-semibold text-blue-400">Email automation coming soon!</span><br />
                        These features will be available in a future update. They're currently placeholders to show you what's coming.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;