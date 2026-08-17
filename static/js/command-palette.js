// command-palette.js
const CommandPalette = {
  open() {
    $('#cmdk-overlay').classList.remove('hidden');
    const input = $('#cmdk-input');
    input.value = '';
    input.focus();
    this.render('');
    input.oninput = () => this.render(input.value);
  },

  close() {
    $('#cmdk-overlay').classList.add('hidden');
  },

  tools() {
    return [
      { label: 'AI Chatbot', path: 'chat', icon: 'bot', category: 'AI Assistant' },
      { label: 'AI Expense Tracker', path: 'expense', icon: 'wallet', category: 'Finance' },
      { label: 'Study Planner', path: 'planner', icon: 'planner', category: 'Productivity' },
      { label: 'Class Schedule', path: 'schedule', icon: 'calendar', category: 'Productivity' },
      { label: 'Focus Timer', path: 'pomodoro', icon: 'timer', category: 'Productivity' },
      { label: 'Notes Manager', path: 'notes', icon: 'note', category: 'Academics' },
      { label: 'Essay Outliner', path: 'essay', icon: 'essay', category: 'Academics' },
      { label: 'Citation Builder', path: 'citation', icon: 'quote', category: 'Academics' },
      { label: 'GPA Calculator', path: 'gpa', icon: 'calculator', category: 'Academics' },
      { label: 'Password Manager', path: 'passwords', icon: 'lock', category: 'Tools' },
    ];
  },

  render(query) {
    const q = query.toLowerCase().trim();
    const results = $('#cmdk-results');
    results.innerHTML = '';

    // Tools
    const tools = this.tools().filter(t => !q || t.label.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    if (tools.length) {
      results.append(el('div', { class: 'px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide' }, 'Tools'));
      for (const t of tools) {
        results.append(this.item(t.label, t.category, t.icon, () => { this.close(); Router.go(t.path); }));
      }
    }

    // Expenses
    const expenses = Store.get().expenses.filter(e => !q || e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
    if (expenses.length) {
      results.append(el('div', { class: 'px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide' }, 'Expenses'));
      for (const e of expenses.slice(0, 5)) {
        results.append(this.item(`${e.description} — ${fmtMoney(e.amount)}`, e.category, 'wallet', () => { this.close(); Router.go('expense'); }));
      }
    }

    // Notes
    const notes = Store.get().notes.filter(n => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    if (notes.length) {
      results.append(el('div', { class: 'px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide' }, 'Notes'));
      for (const n of notes.slice(0, 5)) {
        results.append(this.item(n.title, 'Note', 'note', () => { this.close(); Router.go('notes'); }));
      }
    }

    // Passwords
    const passwords = Store.get().passwords.filter(p => !q || p.name.toLowerCase().includes(q));
    if (passwords.length) {
      results.append(el('div', { class: 'px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide' }, 'Passwords'));
      for (const p of passwords.slice(0, 5)) {
        results.append(this.item(p.name, p.username, 'lock', () => { this.close(); Router.go('passwords'); }));
      }
    }

    if (!results.children.length) {
      results.append(el('div', { class: 'px-4 py-8 text-center text-sm text-slate-400' }, 'No results found'));
    }
  },

  item(title, subtitle, iconName, onClick) {
    return el('button', {
      class: 'w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors',
      onclick: onClick,
    },
      el('span', { class: 'w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500' }, el('span', { class: 'w-4 h-4', html: ICON[iconName] || ICON.search })),
      el('div', { class: 'flex-1 min-w-0' },
        el('div', { class: 'text-sm font-medium truncate' }, title),
        el('div', { class: 'text-xs text-slate-400 truncate' }, subtitle),
      ),
    );
  },
};

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    CommandPalette.open();
  }
  if (e.key === 'Escape') CommandPalette.close();
});

$('#cmdk-overlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'cmdk-overlay') CommandPalette.close();
});
