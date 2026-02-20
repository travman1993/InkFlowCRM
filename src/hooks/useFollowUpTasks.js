import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

// ── Email content templates ────────────────────────────────────────────────

export function generateEmailContent(taskType, clientName, artistName, shopName) {
  const artist = artistName || 'Your artist';
  const shop = shopName || 'our shop';
  const client = clientName || 'there';

  switch (taskType) {
    case 'day1':
      return {
        subject: `Aftercare instructions from ${artist} at ${shop}`,
        body: `Hey ${client}, it's ${artist} from ${shop}!

Thanks so much for coming in today — your new piece looks amazing. Here are your aftercare instructions to keep it healing perfectly:

1. Keep it clean — gently wash with unscented soap 2x a day for the first 2 weeks.
2. Moisturize — apply a thin layer of unscented lotion or Aquaphor 2-3x a day once it starts to dry.
3. No sun exposure or tanning for at least 4 weeks.
4. No swimming, soaking, or hot tubs for at least 2 weeks.
5. Don't pick or scratch if it starts to peel — let it shed naturally.

If you notice any signs of infection (excessive redness, swelling, or discharge), please reach out right away.

Any questions at all, don't hesitate to text or message me. Can't wait to see it healed!

- ${artist}`,
      };

    case 'day3':
      return {
        subject: `Quick check-in — ${artist} at ${shop}`,
        body: `Hey ${client}, it's ${artist} from ${shop}!

Just checking in to see how your tattoo is healing up. By now it might be starting to peel — that's completely normal and part of the process!

A few reminders:
- Keep moisturizing (thin layers, 2-3x a day)
- Don't pick or scratch the peeling skin
- Stay out of direct sunlight

Let me know if anything looks off or you have any questions. I'm always happy to take a look if you're worried about anything!

- ${artist}`,
      };

    case 'week1':
      return {
        subject: `How's the healing going? — ${artist} at ${shop}`,
        body: `Hey ${client}, it's ${artist} from ${shop}!

It's been about a week since your session — your tattoo should be looking really great by now. Most of the peeling and flaking should be done!

A couple things to keep in mind going forward:
- Continue moisturizing for a full 4-6 weeks
- Use SPF 50+ on it whenever you're in the sun to keep the colors vibrant

Also — if you've been thinking about your next piece, I'd love to start chatting about ideas! Whether it's something you've had in mind for a while or something totally new, feel free to reach out anytime.

Thanks again for trusting me with your work. It means a lot!

- ${artist}`,
      };

    case 'biweekly_1':
      return {
        subject: `Staying in touch — ${artist} at ${shop}`,
        body: `Hey ${client}, it's ${artist} from ${shop}!

Hope you're absolutely loving your healed tattoo by now! It's always so exciting to see how pieces come out once they're fully settled.

Just wanted to stay in touch and let you know I'm always here whenever you're ready for your next piece. Whether it's an addition to what you have, a cover-up, or something brand new — I'd love to work with you again.

Feel free to reach out anytime or book directly through [your booking link].

Thanks for your continued support — it truly means the world!

- ${artist}`,
      };

    case 'biweekly_2':
      return {
        subject: `Thinking about your next tattoo? — ${artist} at ${shop}`,
        body: `Hey ${client}, it's ${artist} from ${shop}!

Just thinking about you and wanted to reach out! I hope you're still loving your ink.

If you've been mulling over ideas for your next piece or have been putting off booking — this is your sign! I currently have some availability coming up and would love to fit you in.

Reach out anytime to chat about ideas or schedule a consultation. Looking forward to working with you again!

- ${artist}`,
      };

    default:
      return {
        subject: `Follow-up from ${artist} at ${shop}`,
        body: `Hey ${client}, it's ${artist} from ${shop}! Just reaching out to check in. Hope you're doing well!\n\n- ${artist}`,
      };
  }
}

// ── Task schedule ──────────────────────────────────────────────────────────

const FOLLOW_UP_SCHEDULE = [
  { type: 'day1',       daysAfter: 1,  label: 'Day 1 Aftercare Email' },
  { type: 'day3',       daysAfter: 3,  label: '3-Day Healing Check-In' },
  { type: 'week1',      daysAfter: 10, label: '1-Week Follow-Up' },
  { type: 'biweekly_1', daysAfter: 24, label: '3-Week Touchpoint' },
  { type: 'biweekly_2', daysAfter: 38, label: '5-Week Touchpoint' },
];

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00'); // noon to avoid timezone shifts
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

// ── Row mapper ─────────────────────────────────────────────────────────────

function mapTask(row) {
  return {
    id: row.id,
    artistId: row.artist_id,
    clientName: row.client_name,
    clientEmail: row.client_email || '',
    tattooId: row.tattoo_id,
    taskType: row.task_type,
    taskLabel: row.task_label,
    dueDate: row.due_date,
    status: row.status,
    emailSubject: row.email_subject || '',
    emailBody: row.email_body || '',
    completedAt: row.completed_at || null,
    createdAt: row.created_at,
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useFollowUpTasks() {
  const { state, dispatch, artistId } = useAppContext();
  const { followUpTasks = [] } = state;

  const today = new Date().toISOString().split('T')[0];

  // ── Create 5 follow-up tasks for a completed tattoo ──────────────────────

  const createTasksForTattoo = async (tattoo, artistName, shopName, clientEmail = '') => {
    const completionDate = tattoo.date || new Date().toISOString().split('T')[0];

    const rows = FOLLOW_UP_SCHEDULE.map(({ type, daysAfter, label }) => {
      const { subject, body } = generateEmailContent(type, tattoo.clientName, artistName, shopName);
      return {
        artist_id: artistId,
        client_name: tattoo.clientName,
        client_email: clientEmail || '',
        tattoo_id: tattoo.id,
        task_type: type,
        task_label: label,
        due_date: addDays(completionDate, daysAfter),
        status: 'pending',
        email_subject: subject,
        email_body: body,
      };
    });

    const { data, error } = await supabase
      .from('follow_up_tasks')
      .insert(rows)
      .select();

    if (error) {
      console.error('Error creating follow-up tasks:', error);
      return;
    }

    const mapped = (data || []).map(mapTask);
    dispatch({ type: 'ADD_FOLLOW_UP_TASKS', payload: mapped });
  };

  // ── Update a task's status ────────────────────────────────────────────────

  const updateTaskStatus = async (id, status) => {
    const { error } = await supabase
      .from('follow_up_tasks')
      .update({
        status,
        completed_at: ['sent', 'skipped'].includes(status) ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating task status:', error);
      return;
    }

    dispatch({
      type: 'UPDATE_FOLLOW_UP_TASK',
      payload: {
        id,
        data: {
          status,
          completedAt: ['sent', 'skipped'].includes(status) ? new Date().toISOString() : null,
        },
      },
    });
  };

  // ── Update task email content (if artist edits before sending) ─────────────

  const updateTaskEmail = async (id, subject, body, clientEmail) => {
    const update = {};
    if (subject !== undefined) update.email_subject = subject;
    if (body !== undefined) update.email_body = body;
    if (clientEmail !== undefined) update.client_email = clientEmail;

    const { error } = await supabase
      .from('follow_up_tasks')
      .update(update)
      .eq('id', id);

    if (error) {
      console.error('Error updating task email:', error);
      return;
    }

    dispatch({
      type: 'UPDATE_FOLLOW_UP_TASK',
      payload: {
        id,
        data: {
          emailSubject: subject,
          emailBody: body,
          clientEmail,
        },
      },
    });
  };

  // ── Filter helpers ────────────────────────────────────────────────────────

  const getPendingTasks = () =>
    followUpTasks.filter(t => t.status === 'pending');

  const getOverdueTasks = () =>
    followUpTasks.filter(t => t.status === 'pending' && t.dueDate < today);

  const getTasksDueToday = () =>
    followUpTasks.filter(t => t.status === 'pending' && t.dueDate === today);

  const getUpcomingTasks = () =>
    followUpTasks.filter(t => t.status === 'pending' && t.dueDate > today);

  const getCompletedTasks = () =>
    followUpTasks.filter(t => t.status === 'sent' || t.status === 'skipped');

  const getUrgentCount = () =>
    followUpTasks.filter(t => t.status === 'pending' && t.dueDate <= today).length;

  return {
    followUpTasks,
    createTasksForTattoo,
    updateTaskStatus,
    updateTaskEmail,
    getPendingTasks,
    getOverdueTasks,
    getTasksDueToday,
    getUpcomingTasks,
    getCompletedTasks,
    getUrgentCount,
  };
}
