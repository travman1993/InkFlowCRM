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
  Trash2
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
    getExpensesByCategory,
    applyRecurringExpenses
  } = useExpenses();
  
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // day, week, month, year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Auto-set to current year
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Auto-apply recurring expenses at start of new month
  useEffect(() => {
    const now = new Date();
    applyRecurringExpenses(now.getFullYear(), now.getMonth() + 1);
  }, []);

  // Calculate stats
  const totalRevenue = getTotalRevenue();
  const totalEarnings = getTotalEarnings();
  const totalSuppliesCost = getTotalSuppliesCost();
  const totalExpenses = getTotalExpenses();
  const netProfit = totalEarnings - totalExpenses;

  // Get current period data
  const getCurrentPeriodData = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    let periodTattoos = [];
    let periodExpenses = [];

    if (selectedPeriod === 'day') {
      periodTattoos = tattoos.filter(t => new Date(t.date) >= startOfDay);
      periodExpenses = expenses.filter(e => new Date(e.date) >= startOfDay);
    } else if (selectedPeriod === 'week') {
      periodTattoos = tattoos.filter(t => new Date(t.date) >= startOfWeek);
      periodExpenses = expenses.filter(e => new Date(e.date) >= startOfWeek);
    } else if (selectedPeriod === 'month') {
      periodTattoos = tattoos.filter(t => new Date(t.date) >= startOfMonth);
      periodExpenses = expenses.filter(e => new Date(e.date) >= startOfMonth);
    } else if (selectedPeriod === 'year') {
      periodTattoos = tattoos.filter(t => new Date(t.date).getFullYear() === selectedYear);
      periodExpenses = expenses.filter(e => new Date(e.date).getFullYear() === selectedYear);
    }

    const periodRevenue = periodTattoos.reduce((sum, t) => sum + t.price, 0);
    const periodEarnings = periodTattoos.reduce((sum, t) => sum + t.artistEarnings, 0);
    const periodExpensesTotal = periodExpenses.reduce((sum, e) => sum + e.amount, 0);
    const periodProfit = periodEarnings - periodExpensesTotal;

    return {
      revenue: periodRevenue,
      earnings: periodEarnings,
      expenses: periodExpensesTotal,
      profit: periodProfit,
      tattooCount: periodTattoos.length
    };
  };

  const periodData = getCurrentPeriodData();

  // Generate chart data for current month
  const getMonthChartData = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const data = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTattoos = tattoos.filter(t => t.date === dateStr);
      const dayRevenue = dayTattoos.reduce((sum, t) => sum + t.price, 0);

      // Only show every 5 days for cleaner chart
      if (day % 5 === 0 || day === 1 || day === daysInMonth) {
        data.push({
          label: `${day}`,
          value: dayRevenue
        });
      }
    }

    return data;
  };

  // Get year options - automatically include current year and previous years
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
    // Combine tattoos and expenses
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

    // Create CSV
    const headers = ['Date', 'Type', 'Description', 'Amount', 'Supplies', 'Net'];
    const rows = allTransactions.map(t => [
      t.date,
      t.type,
      t.description,
      t.amount.toFixed(2),
      t.supplies.toFixed(2),
      t.net.toFixed(2)
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Download
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
              value={`$${periodData.revenue.toLocaleString()}`}
              subtitle={`${periodData.tattooCount} tattoos completed`}
              icon={DollarSign}
              color="accent-primary"
            />

            <StatCard
              title="Expenses"
              value={`$${periodData.expenses.toLocaleString()}`}
              subtitle="All business costs"
              icon={Package}
              color="accent-warning"
            />

            <StatCard
              title="Net Profit"
              value={`$${periodData.profit.toLocaleString()}`}
              subtitle="Revenue - Expenses"
              icon={periodData.profit >= 0 ? TrendingUp : TrendingDown}
              color={periodData.profit >= 0 ? 'accent-success' : 'accent-danger'}
            />

            <StatCard
              title="Average Tattoo"
              value={`$${periodData.tattooCount > 0 ? (periodData.revenue / periodData.tattooCount).toFixed(0) : 0}`}
              subtitle={`${periodData.tattooCount} total`}
              icon={DollarSign}
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

          {/* Expense Breakdown */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <h2 className="text-2xl font-bold mb-6">Expense Breakdown</h2>
            
            {Object.keys(getExpensesByCategory()).length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(getExpensesByCategory()).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary">
                    <div>
                      <div className="font-semibold">{category}</div>
                      <div className="text-sm text-text-tertiary">
                        {expenses.filter(e => e.category === category).length} transactions
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
                No expenses recorded yet
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-bg-secondary rounded-xl border border-border-primary p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>

            {/* Tattoos */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-success" />
                Revenue (Last 10)
              </h3>
              {tattoos.length > 0 ? (
                <div className="space-y-3">
                  {tattoos.slice(0, 10).map(tattoo => (
                    <div key={tattoo.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary hover:border-accent-primary/50 transition">
                      <div>
                        <div className="font-semibold">{tattoo.clientName}</div>
                        <div className="text-sm text-text-secondary">{formatDate(tattoo.date)} • {tattoo.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-accent-success">+${tattoo.price}</div>
                        <div className="text-xs text-text-tertiary">Net: ${tattoo.artistEarnings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-tertiary">
                  No tattoos completed yet
                </div>
              )}
            </div>

            {/* Expenses */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-accent-danger" />
                Expenses (Last 10)
              </h3>
              {expenses.length > 0 ? (
                <div className="space-y-3">
                  {expenses.slice(0, 10).map(expense => (
                    <div key={expense.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-primary hover:border-accent-primary/50 transition group">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{expense.category}</div>
                          <span className="text-xs px-2 py-1 bg-accent-warning/10 text-accent-warning rounded">
                            {expense.category}
                          </span>
                          {expense.recurring && (
                            <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                              Recurring
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-text-secondary">{formatDate(expense.date)} • {expense.notes}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold text-accent-danger">-${expense.amount}</div>
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
                </div>
              ) : (
                <div className="text-center py-8 text-text-tertiary">
                  No expenses recorded yet
                </div>
              )}
            </div>
          </div>

          {/* Year End Summary */}
          <div className="bg-gradient-to-br from-accent-primary/10 to-bg-secondary p-6 md:p-8 rounded-2xl border border-accent-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-accent-primary" />
              <h2 className="text-2xl font-bold">Year-End Summary ({selectedYear})</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-text-tertiary mb-2">Total Revenue</div>
                <div className="text-3xl font-bold text-accent-primary">
                  ${tattoos.filter(t => new Date(t.date).getFullYear() === selectedYear).reduce((sum, t) => sum + t.price, 0).toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-text-tertiary mb-2">Total Expenses</div>
                <div className="text-3xl font-bold text-accent-warning">
                  ${expenses.filter(e => new Date(e.date).getFullYear() === selectedYear).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-text-tertiary mb-2">Net Profit</div>
                <div className="text-3xl font-bold text-accent-success">
                  ${(
                    tattoos.filter(t => new Date(t.date).getFullYear() === selectedYear).reduce((sum, t) => sum + t.artistEarnings, 0) -
                    expenses.filter(e => new Date(e.date).getFullYear() === selectedYear).reduce((sum, e) => sum + e.amount, 0)
                  ).toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-text-tertiary mb-2">Tattoos Completed</div>
                <div className="text-3xl font-bold">
                  {tattoos.filter(t => new Date(t.date).getFullYear() === selectedYear).length}
                </div>
              </div>
            </div>
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