import { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, CheckCircle, SkipForward, Mail, Calendar, Inbox } from 'lucide-react';
import { useFollowUpTasks } from '../../hooks/useFollowUpTasks';
import EmailPreviewModal from './EmailPreviewModal';

const FILTERS = [
  { id: 'all',      label: 'All Pending' },
  { id: 'overdue',  label: 'Overdue' },
  { id: 'today',    label: 'Due Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'done',     label: 'Completed' },
];

const TASK_TYPE_COLORS = {
  day1:       'bg-accent-primary/10 text-accent-primary border-accent-primary/30',
  day3:       'bg-blue-500/10 text-blue-400 border-blue-500/30',
  week1:      'bg-purple-500/10 text-purple-400 border-purple-500/30',
  biweekly_1: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  biweekly_2: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
};

function formatDueDate(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  if (dateStr === today) return { label: 'Due today', color: 'text-accent-primary' };
  if (dateStr < today) {
    const days = Math.round((new Date(today) - new Date(dateStr)) / 86400000);
    return { label: `${days}d overdue`, color: 'text-accent-danger' };
  }
  const days = Math.round((new Date(dateStr) - new Date(today)) / 86400000);
  if (days === 1) return { label: 'Due tomorrow', color: 'text-text-secondary' };
  return { label: `Due in ${days}d`, color: 'text-text-tertiary' };
}

function TaskCard({ task, onSendEmail, onSkip }) {
  const due = formatDueDate(task.dueDate);
  const labelColor = TASK_TYPE_COLORS[task.taskType] || 'bg-bg-tertiary text-text-secondary border-border-primary';
  const isCompleted = task.status === 'sent' || task.status === 'skipped';

  return (
    <div className={`bg-bg-secondary border rounded-xl p-4 transition ${
      isCompleted ? 'border-border-primary opacity-60' : 'border-border-primary hover:border-accent-primary/40'
    }`}>
      <div className="flex items-start justify-between gap-4">
        {/* Left: info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${labelColor}`}>
              {task.taskLabel}
            </span>
            {task.status === 'sent' && (
              <span className="flex items-center gap-1 text-xs text-accent-success font-semibold">
                <CheckCircle className="w-3 h-3" /> Sent
              </span>
            )}
            {task.status === 'skipped' && (
              <span className="flex items-center gap-1 text-xs text-text-tertiary font-semibold">
                <SkipForward className="w-3 h-3" /> Skipped
              </span>
            )}
          </div>

          <div className="font-semibold text-text-primary truncate">{task.clientName}</div>

          <div className="flex items-center gap-4 mt-1.5">
            <span className={`flex items-center gap-1.5 text-xs font-medium ${due.color}`}>
              <Clock className="w-3 h-3" />
              {due.label}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <Calendar className="w-3 h-3" />
              {task.dueDate}
            </span>
          </div>

          {task.clientEmail && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-text-tertiary">
              <Mail className="w-3 h-3" />
              {task.clientEmail}
            </div>
          )}
        </div>

        {/* Right: actions */}
        {!isCompleted && (
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => onSendEmail(task)}
              className="flex items-center gap-1.5 px-3 py-2 bg-accent-primary hover:bg-teal-500 rounded-lg text-xs font-semibold transition whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              Send Email
            </button>
            <button
              onClick={() => onSkip(task.id)}
              className="flex items-center gap-1.5 px-3 py-2 bg-bg-tertiary hover:bg-bg-primary border border-border-primary rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary transition"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TasksTab({ artistName, shopName }) {
  const {
    getOverdueTasks,
    getTasksDueToday,
    getUpcomingTasks,
    getCompletedTasks,
    getPendingTasks,
    updateTaskStatus,
    getUrgentCount,
  } = useFollowUpTasks();

  const [activeFilter, setActiveFilter] = useState('all');
  const [emailTask, setEmailTask] = useState(null);

  const overdue   = getOverdueTasks();
  const dueToday  = getTasksDueToday();
  const upcoming  = getUpcomingTasks();
  const completed = getCompletedTasks();
  const pending   = getPendingTasks();
  const urgentCount = getUrgentCount();

  const filteredTasks = {
    all:      [...overdue, ...dueToday, ...upcoming].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    overdue,
    today:    dueToday,
    upcoming,
    done:     completed.sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || '')),
  }[activeFilter] || pending;

  const handleSkip = async (id) => {
    await updateTaskStatus(id, 'skipped');
  };

  const handleMarkSent = async () => {
    if (!emailTask) return;
    await updateTaskStatus(emailTask.id, 'sent');
    setEmailTask(null);
  };

  const filterCounts = {
    all:      pending.length,
    overdue:  overdue.length,
    today:    dueToday.length,
    upcoming: upcoming.length,
    done:     completed.length,
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-accent-primary" />
            Follow-Up Tasks
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Auto-generated after each tattoo — review, personalize, and send
          </p>
        </div>
        {urgentCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-accent-danger/10 border border-accent-danger/30 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-accent-danger" />
            <span className="text-sm font-semibold text-accent-danger">
              {urgentCount} need{urgentCount === 1 ? 's' : ''} attention
            </span>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 overflow-x-auto mb-6 pb-1">
        {FILTERS.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
              activeFilter === filter.id
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
            }`}
          >
            {filter.label}
            {filterCounts[filter.id] > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeFilter === filter.id
                  ? 'bg-white/20 text-white'
                  : filter.id === 'overdue'
                  ? 'bg-accent-danger/20 text-accent-danger'
                  : filter.id === 'today'
                  ? 'bg-accent-primary/20 text-accent-primary'
                  : 'bg-bg-tertiary text-text-secondary'
              }`}>
                {filterCounts[filter.id]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox className="w-12 h-12 text-text-tertiary mb-4" />
          <p className="text-text-secondary font-semibold mb-2">
            {activeFilter === 'done'
              ? 'No completed tasks yet'
              : activeFilter === 'overdue'
              ? "You're all caught up! No overdue tasks."
              : activeFilter === 'today'
              ? 'Nothing due today — check back tomorrow.'
              : 'No tasks yet'}
          </p>
          {(activeFilter === 'all' || activeFilter === 'upcoming') && pending.length === 0 && (
            <p className="text-sm text-text-tertiary max-w-sm">
              Tasks are automatically created when you complete a tattoo. Mark an appointment as done to get started.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onSendEmail={setEmailTask}
              onSkip={handleSkip}
            />
          ))}
        </div>
      )}

      {/* Email preview modal */}
      {emailTask && (
        <EmailPreviewModal
          task={emailTask}
          artistName={artistName}
          shopName={shopName}
          onClose={() => setEmailTask(null)}
          onMarkSent={handleMarkSent}
        />
      )}
    </div>
  );
}

export default TasksTab;
