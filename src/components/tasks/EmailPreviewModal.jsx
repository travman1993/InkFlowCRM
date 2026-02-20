import { useState, useEffect } from 'react';
import { X, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useFollowUpTasks } from '../../hooks/useFollowUpTasks';

function EmailPreviewModal({ task, onClose, onMarkSent }) {
  const { updateTaskEmail } = useFollowUpTasks();

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [emailOpened, setEmailOpened] = useState(false);

  useEffect(() => {
    if (task) {
      setSubject(task.emailSubject || '');
      setBody(task.emailBody || '');
      setEmail(task.clientEmail || '');
      setEmailOpened(false);
    }
  }, [task]);

  if (!task) return null;

  const hasEmail = email.trim().length > 0;

  const handleOpenEmailClient = async () => {
    // Save any edits back to the task first
    await updateTaskEmail(task.id, subject, body, email);

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodedSubject}&body=${encodedBody}`;
    window.open(mailto, '_self');
    setEmailOpened(true);
  };

  const handleMarkSent = async () => {
    // Save any edits before marking sent
    await updateTaskEmail(task.id, subject, body, email);
    onMarkSent();
  };

  const taskTypeColors = {
    day1: 'bg-accent-primary/10 text-accent-primary border-accent-primary/30',
    day3: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    week1: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    biweekly_1: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    biweekly_2: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
  };
  const labelColor = taskTypeColors[task.taskType] || 'bg-bg-tertiary text-text-secondary border-border-primary';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Mail className="w-5 h-5 text-accent-primary" />
              <h2 className="text-xl font-bold">Review Email</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${labelColor}`}>
                {task.taskLabel}
              </span>
              <span className="text-sm text-text-tertiary">for {task.clientName}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* To field */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-text-secondary">
              To
            </label>
            {!hasEmail && (
              <div className="flex items-center gap-2 mb-2 p-3 bg-accent-warning/10 border border-accent-warning/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-accent-warning flex-shrink-0" />
                <span className="text-sm text-accent-warning">
                  No email on file — enter one below to open your email client
                </span>
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition text-sm"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-text-secondary">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition text-sm"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-text-secondary">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              className="w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition resize-none text-sm leading-relaxed"
            />
          </div>

          {/* Email opened confirmation */}
          {emailOpened && (
            <div className="flex items-center gap-2 p-3 bg-accent-success/10 border border-accent-success/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-accent-success flex-shrink-0" />
              <span className="text-sm text-accent-success">
                Email client opened — once you've sent it, mark it as sent below.
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-border-primary">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-bg-primary border border-border-primary rounded-lg font-semibold hover:bg-bg-tertiary transition text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOpenEmailClient}
              disabled={!hasEmail}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent-primary hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg font-semibold transition text-sm"
            >
              <Send className="w-4 h-4" />
              Open Email Client
            </button>
            <button
              type="button"
              onClick={handleMarkSent}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent-success hover:bg-green-600 rounded-lg font-semibold transition text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Sent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailPreviewModal;
