import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package,
  Plus,
  Download,
  Calendar,
  Trash2,
  Percent
} from 'lucide-react';
import { useTattoos } from '../hooks/useTattoos';
import { useExpenses } from '../hooks/useExpenses';
import StatCard from '../components/analytics/StatCard';
import RevenueChart from '../components/analytics/RevenueChart';
import AddExpenseModal from '../components/analytics/AddExpenseModal';

function Analytics() {
  const { tattoos, getTotalRevenue, getTotalEarnings, getTotalSuppliesCost } = useTattoos();
  const { 
    expenses, 
    addExpense, 
    deleteExpense, 
    getTotalExpenses, 
    applyRecurringExpenses
  } = useExpenses();
  
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Auto-apply recurring expenses at start of new month
  useEffect(() => {
    const now = new Date();
    applyRecurringExpenses(now.getFullYear(), now.getMonth() + 1);
  }, []);

  // ---------- Period Filtering Helpers ----------

  const getPeriodBounds = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(selectedYear, 0, 1);
    const endOfYear = new Date(selectedYear, 11, 31);

    if (selectedPeriod === 'day') return { start: startOfDay, end: now };
    if (selectedPeriod === 'week') return { start: startOfWeek, end: now };
    if (selectedPeriod === 'month') return { start: startOfMonth, end: now };
    if (selectedPeriod === 'year') return { start: startOfYear, end: endOfYear };
    return { start: new Date(0), end: now }; // all time
  };

  const filterByPeriod = (items, dateField = 'date') => {
    const { start, end } = getPeriodBounds();
    return items.filter(item => {
      const d = new Date(item[dateField]);
      return d >= start && d <= end;
    });
  };

  // ---------- Filtered Data ----------

  const periodTattoos = filterByPeriod(tattoos);
  const periodExpenses = filterByPeriod(expenses);

  const periodRevenue = periodTattoos.reduce((sum, t) => sum + t.price, 0);
  const periodEarnings = periodTattoos.reduce((sum, t) => sum + t.artistEarnings, 0);
  const periodSupplies = periodTattoos.reduce((sum, t) => sum + t.suppliesCost, 0);
  const periodExpensesTotal = periodExpenses.reduce((sum, e) => sum + e.amount, 0);
  const periodProfit = periodEarnings - periodExpensesTotal;
  const periodTattooCount = periodTattoos.length;
  const profitMargin = periodRevenue > 0 ? Math.round((periodProfit / periodRevenue) * 100) : 0;

  // Expense breakdown filtered by period
  const periodExpensesByCategory = () => {
    const byCategory = {};
    periodExpenses.forEach((e) => {
      if (!byCategory[e.category]) byCategory[e.category] = 0;
      byCategory[e.category] += e.amount;
    });
    return byCategory;
  };

  // Generate chart data for current month
  const getMonthChartData = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const data = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTattoos = tattoos.filter(t => t.date === dateStr);
      const dayRevenue = dayTattoos.reduce((sum, t) => sum + t.price, 0);

      if (day % 5 === 0 || day === 1 || day === daysInMonth) {
        data.push({
          label: `${day}`,
          value: dayRevenue
        });
      }
    }

    return data;
  };

  // Get year options
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Export to CSV
  const handleExportCSV = () => {
    const allTransactions = [
      ...tattoos.map(t => ({
        date: t.date,
        type: 'Revenue',
        description: `Tattoo - ${t.clientName} - ${t.location}`,
        amount: t.price,
        supplies: t.suppliesCost,
        net: t.artistEarnings
      })),
      ...expenses.map(e => ({
        date: e.date,
        type: 'Expense',
        description: `${e.category} - ${e.notes}`,
        amount: -e.amount,
        supplies: 0,
        net: -e.amount
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const headers = ['Date', 'Type', 'Description', 'Amount', 'Supplies', 'Net'];
    const rows = allTransactions.map(t => [
      t.date,
      t.type,
      `"${t.description}"`,
      t.amount.toFixed(2),
      t.supplies.toFixed(2),
      t.net.toFixed(2)
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inkflow_transactions_${selectedYear}.csv`;
    a.click();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const periodLabel = selectedPeriod === 'day' ? 'Today' 
    : selectedPeriod === 'week' ? 'This Week' 
    : selectedPeriod === 'month' ? 'This Month' 
    : `${selectedYear}`;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Header */}
        <div className="bg-bg-secondary border-b border-border-primary p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddExpenseOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary hover:bg-bg-tertiary rounded-lg font-semibold transition"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">Add Expense</span>
                </button>
                
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden md:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex flex-wrap gap-3">
              {['day', 'week', 'month', 'year'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedPeriod === period
                      ? 'bg-accent-primary text-white'
                      : 'bg-bg-primary border border-border-primary text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {period === 'day' ? 'Today' : 
                   period === 'week' ? 'This Week' : 
                   period === 'month' ? 'This Month' : 'Year'}
                </button>
              ))}

              {selectedPeriod === 'year' && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-2 bg-bg-primary border border-border-primary rounded-lg font-semibold focus:outline-none focus:border-accent-primary transition"
                >
                  {getYearOptions().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Revenue"
              value={`$${periodRevenue.toLocaleString()}`}
              subtitle={`${periodTattooCount} tattoo${periodTattooCount !== 1 ? 's' : ''} completed`}
              icon={DollarSign}
              color="accent-primary"
            />

            <StatCard
              title="Expenses"
              value={`$${periodExpensesTotal.toLocaleString()}`}
              subtitle={`Supplies: $${periodSupplies.toLocaleString()}`}
              icon={Package}
              color="accent-warning"
            />

            <StatCard
              title="Net Profit"
              value={`$${periodProfit.toLocaleString()}`}
              subtitle={`Earnings minus expenses`}
              icon={periodProfit >= 0 ? TrendingUp : TrendingDown}
              color={periodProfit >= 0 ? 'accent-success' : 'accent-danger'}
            />

            <StatCard
              title="Avg per Tattoo"
              value={`$${periodTattooCount > 0 ? Math.round(periodRevenue / periodTattooCount) : 0}`}
              subtitle={profitMargin > 0 ? `${profitMargin}% profit margin` : 'No data yet'}
              icon={Percent}
              color="accent-primary"
            />
          </div>

          {/* Revenue Chart */}
          {selectedPeriod === 'month' && (
            <RevenueChart
              data={getMonthChartData()}
              title="Revenue This Month"
            />
          )}

          {/* Expense Breakdown - Filtered by Period */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <h2 className="text-2xl font-bold mb-2">Expense Breakdown</h2>
            <p className="text-sm text-text-tertiary mb-6">{periodLabel}</p>
            
            {Object.keys(periodExpensesByCategory()).length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(periodExpensesByCategory())
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary">
                    <div>
                      <div className="font-semibold">{category}</div>
                      <div className="text-sm text-text-tertiary">
                        {periodExpenses.filter(e => e.category === category).length} transaction{periodExpenses.filter(e => e.category === category).length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-accent-warning">
                      ${amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-tertiary">
                No expenses recorded for {periodLabel.toLowerCase()}
              </div>
            )}
          </div>

          {/* Recent Transactions - Filtered by Period */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <h2 className="text-2xl font-bold mb-2">Transactions</h2>
            <p className="text-sm text-text-tertiary mb-6">{periodLabel}</p>

            {/* Tattoos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-success" />
                Revenue ({periodTattoos.length})
              </h3>
              {periodTattoos.length > 0 ? (
                <div className="space-y-3">
                  {periodTattoos.slice(0, 10).map(tattoo => (
                    <div key={tattoo.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary hover:border-accent-primary/50 transition">
                      <div>
                        <div className="font-semibold">{tattoo.clientName}</div>
                        <div className="text-sm text-text-secondary">{formatDate(tattoo.date)} • {tattoo.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-accent-success">+${tattoo.price.toLocaleString()}</div>
                        <div className="text-xs text-text-tertiary">Earnings: ${tattoo.artistEarnings.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                  {periodTattoos.length > 10 && (
                    <div className="text-center text-sm text-text-tertiary py-2">
                      +{periodTattoos.length - 10} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-text-tertiary">
                  No tattoos completed {periodLabel === 'Today' ? 'today' : `for ${periodLabel.toLowerCase()}`}
                </div>
              )}
            </div>

            {/* Expenses */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-accent-danger" />
                Expenses ({periodExpenses.length})
              </h3>
              {periodExpenses.length > 0 ? (
                <div className="space-y-3">
                  {periodExpenses.slice(0, 10).map(expense => (
                    <div key={expense.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary hover:border-accent-primary/50 transition group">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{expense.category}</div>
                          {expense.recurring && (
                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                              Recurring
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-text-secondary">{formatDate(expense.date)}{expense.notes ? ` • ${expense.notes}` : ''}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold text-accent-danger">-${expense.amount.toLocaleString()}</div>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this expense?')) {
                              deleteExpense(expense.id);
                            }
                          }}
                          className="p-2 bg-accent-danger/20 text-accent-danger hover:bg-accent-danger/30 rounded-lg opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {periodExpenses.length > 10 && (
                    <div className="text-center text-sm text-text-tertiary py-2">
                      +{periodExpenses.length - 10} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-text-tertiary">
                  No expenses recorded {periodLabel === 'Today' ? 'today' : `for ${periodLabel.toLowerCase()}`}
                </div>
              )}
            </div>
          </div>

          {/* Year End Summary */}
          <div className="bg-gradient-to-br from-accent-primary/10 to-bg-secondary p-6 md:p-8 rounded-2xl border border-accent-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-accent-primary" />
              <h2 className="text-2xl font-bold">Year Summary ({selectedYear})</h2>
            </div>

            {(() => {
              const yearTattoos = tattoos.filter(t => new Date(t.date).getFullYear() === selectedYear);
              const yearExpenses = expenses.filter(e => new Date(e.date).getFullYear() === selectedYear);
              const yearRevenue = yearTattoos.reduce((sum, t) => sum + t.price, 0);
              const yearEarnings = yearTattoos.reduce((sum, t) => sum + t.artistEarnings, 0);
              const yearExpTotal = yearExpenses.reduce((sum, e) => sum + e.amount, 0);
              const yearProfit = yearEarnings - yearExpTotal;

              return (
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-text-tertiary mb-2">Total Revenue</div>
                    <div className="text-3xl font-bold text-accent-primary">
                      ${yearRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-tertiary mb-2">Total Expenses</div>
                    <div className="text-3xl font-bold text-accent-warning">
                      ${yearExpTotal.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-tertiary mb-2">Net Profit</div>
                    <div className={`text-3xl font-bold ${yearProfit >= 0 ? 'text-accent-success' : 'text-accent-danger'}`}>
                      ${yearProfit.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-tertiary mb-2">Tattoos Completed</div>
                    <div className="text-3xl font-bold">
                      {yearTattoos.length}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSave={addExpense}
      />
    </DashboardLayout>
  );
}

export default Analytics;