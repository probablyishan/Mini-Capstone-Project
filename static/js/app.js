// app.js — app shell, navigation, and route registration
const TOOLS = [
  { id: 'chat', name: 'AI Chatbot', desc: 'Ask questions, solve problems, and get tutoring', icon: 'bot', category: 'AI Assistant', badge: 'AI Powered' },
  { id: 'expense', name: 'AI Expense Tracker', desc: 'Track spending with natural language in any currency', icon: 'wallet', category: 'Finance', badge: 'AI Powered' },
  { id: 'planner', name: 'Study Planner', desc: 'Plan assignments and exam schedules', icon: 'planner', category: 'Productivity', badge: 'AI Powered' },
  { id: 'schedule', name: 'Class Schedule', desc: 'Visual weekly timetable and lecture locations', icon: 'calendar', category: 'Productivity', badge: 'Ready' },
  { id: 'pomodoro', name: 'Focus Timer', desc: 'Focus timer with ambient soundscapes', icon: 'timer', category: 'Productivity', badge: 'Ready' },
  { id: 'notes', name: 'Notes Manager', desc: 'Take notes with AI summaries and flashcards', icon: 'note', category: 'Academics', badge: 'AI Powered' },
  { id: 'essay', name: 'Essay Outliner', desc: 'Generate structured outlines with citations', icon: 'essay', category: 'Academics', badge: 'AI Powered' },
  { id: 'citation', name: 'Citation Builder', desc: 'APA, MLA, Chicago, and Harvard references', icon: 'quote', category: 'Academics', badge: 'Ready' },
  { id: 'gpa', name: 'GPA Calculator', desc: 'Calculate and predict your semester & cumulative GPA', icon: 'calculator', category: 'Academics', badge: 'Ready' },
  { id: 'passwords', name: 'Password Manager', desc: 'Secure local vault with password generator', icon: 'lock', category: 'Tools', badge: 'Ready' },
];

const CATEGORIES = ['All', 'Finance', 'Productivity', 'Academics', 'Tools', 'AI Assistant'];

const NAV_SECTIONS = [
  {
    category: null,
    items: [
      { id: 'home', name: 'Home', icon: 'home' }
    ]
  },
  {
    category: 'FINANCE',
    items: [
      { id: 'expense', name: 'AI Expense Tracker', icon: 'wallet' }
    ]
  },
  {
    category: 'PRODUCTIVITY',
    items: [
      { id: 'planner', name: 'Study Planner', icon: 'planner' },
      { id: 'schedule', name: 'Class Schedule', icon: 'calendar' },
      { id: 'pomodoro', name: 'Focus Timer', icon: 'timer' }
    ]
  },
  {
    category: 'ACADEMICS',
    items: [
      { id: 'notes', name: 'Notes Manager', icon: 'note' },
      { id: 'essay', name: 'Essay Outliner', icon: 'essay' },
      { id: 'citation', name: 'Citation Builder', icon: 'quote' },
      { id: 'gpa', name: 'GPA Calculator', icon: 'calculator' }
    ]
  },
  {
    category: 'TOOLS',
    items: [
      { id: 'passwords', name: 'Password Manager', icon: 'lock' }
    ]
  },
  {
    category: 'AI ASSISTANT',
    items: [
      { id: 'chat', name: 'AI Chatbot', icon: 'bot', badge: 'AI' }
    ]
  }
];

function shell(content) {
  return `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside id="sidebar" class="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm fixed h-full z-30">
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <a href="#home" class="flex items-center gap-2.5 font-semibold tracking-tight">
            <span class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold shadow-sm">C</span>
            <span class="text-base font-bold text-slate-900 dark:text-white">CampusOS</span>
          </a>
        </div>
        <nav class="flex-1 overflow-y-auto px-3 py-2 space-y-1" id="sidebar-nav"></nav>
        <div class="p-3 border-t border-slate-200 dark:border-slate-800">
          <button id="reset-data" class="w-full text-xs text-slate-400 hover:text-red-500 transition-colors py-1">Reset all data</button>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex-1 md:ml-64 flex flex-col min-w-0">
        <!-- Top bar -->
        <header class="sticky top-0 z-20 bg-canvas/80 dark:bg-canvasDark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-3 px-4 md:px-6 h-14">
            <button id="mobile-menu" class="md:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">${icon('menu', 'w-5 h-5')}</button>
            <a href="#home" class="md:hidden flex items-center gap-2 font-semibold"><span class="w-6 h-6 rounded-md bg-accent flex items-center justify-center text-white text-xs font-bold">C</span></a>
            <button id="cmdk-trigger" class="flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              ${icon('search', 'w-4 h-4')} <span class="flex-1 text-left">Search…</span> <kbd class="text-xs text-slate-400">⌘K</kbd>
            </button>
            <div class="flex-1 md:hidden"></div>
            <button id="theme-toggle" class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Toggle theme">${icon('sun', 'w-5 h-5 dark:hidden')}${icon('moon', 'w-5 h-5 hidden dark:block')}</button>
          </div>
        </header>

        <main id="main-content" class="flex-1 fade-in">${content}</main>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <div id="mobile-sidebar" class="hidden md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" >
      <div class="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 slide-up flex flex-col">
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 font-semibold flex items-center gap-2.5">
          <span class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">C</span>
          <span class="text-base font-bold text-slate-900 dark:text-white">CampusOS</span>
        </div>
        <nav id="mobile-sidebar-nav" class="flex-1 overflow-y-auto px-3 py-2 space-y-1"></nav>
      </div>
    </div>
  `;
}

function sidebarNavHTML() {
  return NAV_SECTIONS.map(section => {
    const header = section.category ? `
      <div class="px-3 pt-4 pb-1 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase select-none">
        ${section.category}
      </div>
    ` : '';

    const items = section.items.map(t => {
      const active = Router.current === t.id;
      const activeClass = active
        ? 'bg-accent-soft dark:bg-slate-800 text-accent dark:text-white font-medium shadow-xs'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white';
      const iconColor = active
        ? 'text-accent dark:text-white'
        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white';

      return `
        <a href="#${t.id}" class="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${activeClass} transition-all">
          ${icon(t.icon, `w-[18px] h-[18px] ${iconColor}`)}
          <span class="flex-1 truncate">${t.name}</span>
          ${t.badge ? `<span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-accent/15 text-accent dark:bg-accent/30 dark:text-accent-soft">${t.badge}</span>` : ''}
        </a>
      `;
    }).join('');

    return `${header}<div class="space-y-0.5">${items}</div>`;
  }).join('');
}

function renderShell() {
  $('#app').innerHTML = shell('');
  $('#sidebar-nav').innerHTML = sidebarNavHTML();
  $('#mobile-sidebar-nav').innerHTML = sidebarNavHTML();

  $('#cmdk-trigger').onclick = () => CommandPalette.open();
  $('#theme-toggle').onclick = () => { Theme.toggle(); renderShell(); Router.render(Router.current); };
  $('#mobile-menu').onclick = () => $('#mobile-sidebar').classList.remove('hidden');
  $('#mobile-sidebar').onclick = (e) => { if (e.target.id === 'mobile-sidebar') $('#mobile-sidebar').classList.add('hidden'); };
  $('#reset-data').onclick = () => { if (confirm('Reset all CampusOS data to defaults?')) { Store.reset(); toast('Data reset'); Router.render(Router.current); } };

  // re-render sidebar active state on hash change
  window.addEventListener('hashchange', () => {
    const nav = $('#sidebar-nav'); if (nav) nav.innerHTML = sidebarNavHTML();
    const mnav = $('#mobile-sidebar-nav'); if (mnav) mnav.innerHTML = sidebarNavHTML();
    $('#mobile-sidebar')?.classList.add('hidden');
  });
}

// ---------- Routes ----------
Router.on('home', (main) => { main.innerHTML = homeView(); homeInit(main); });
Router.on('chat', (main) => { main.innerHTML = chatView(); chatInit(main); });
Router.on('expense', (main) => { main.innerHTML = expenseView(); expenseInit(main); });
Router.on('planner', (main) => { main.innerHTML = plannerView(); plannerInit(main); });
Router.on('notes', (main) => { main.innerHTML = notesView(); notesInit(main); });
Router.on('passwords', (main) => { main.innerHTML = passwordsView(); passwordsInit(main); });
Router.on('essay', (main) => { main.innerHTML = essayView(); essayInit(main); });
Router.on('citation', (main) => { main.innerHTML = citationView(); citationInit(main); });
Router.on('schedule', (main) => { main.innerHTML = scheduleView(); scheduleInit(main); });
Router.on('gpa', (main) => { main.innerHTML = gpaView(); gpaInit(main); });
Router.on('pomodoro', (main) => { main.innerHTML = pomodoroView(); pomodoroInit(main); });

// ---------- Home ----------
function homeView() {
  const filterBar = CATEGORIES.map(c =>
    `<button data-cat="${c}" class="cat-btn px-3.5 py-1.5 rounded-full text-sm border transition-colors ${c === 'All' ? 'border-ink dark:border-white bg-ink dark:bg-white text-white dark:text-ink' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'}">${c}</button>`
  ).join('');

  const cards = TOOLS.map(t => `
    <a href="#${t.id}" class="tool-card group block p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all">
      <div class="flex items-start justify-between mb-4">
        <span class="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-accent-soft dark:group-hover:bg-slate-800 group-hover:text-accent transition-colors">${icon(t.icon, 'w-5 h-5')}</span>
        <span class="text-xs px-2 py-0.5 rounded-full ${t.badge === 'AI Powered' ? 'bg-accent-soft text-accent dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}">${t.badge}</span>
      </div>
      <h3 class="font-semibold text-sm mb-1">${t.name}</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${t.desc}</p>
    </a>
  `).join('');

  return `
    <div class="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <!-- Hero -->
      <section class="mb-10 md:mb-14">
        <p class="text-sm text-accent font-medium mb-3">CampusOS · v1.0</p>
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl">Everything you need to survive &amp; thrive in college.</h1>
        <p class="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-xl">Nine focused tools for students — expenses, study planning, notes, and more. No fluff, no sign-up, just open and use.</p>
      </section>

      <!-- Filter bar -->
      <div class="flex flex-wrap gap-2 mb-6" id="filter-bar">${filterBar}</div>

      <!-- Grid -->
      <div id="tool-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${cards}</div>
    </div>
  `;
}

function homeInit(main) {
  let activeCat = 'All';
  main.querySelectorAll('.cat-btn').forEach(btn => {
    btn.onclick = () => {
      activeCat = btn.dataset.cat;
      main.querySelectorAll('.cat-btn').forEach(b => {
        const on = b.dataset.cat === activeCat;
        b.className = `cat-btn px-3.5 py-1.5 rounded-full text-sm border transition-colors ${on ? 'border-ink dark:border-white bg-ink dark:bg-white text-white dark:text-ink' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'}`;
      });
      const grid = $('#tool-grid', main);
      grid.querySelectorAll('.tool-card').forEach(card => {
        const tool = TOOLS.find(t => t.id === card.getAttribute('href').slice(1));
        card.style.display = (activeCat === 'All' || tool.category === activeCat) ? '' : 'none';
      });
    };
  });
}

// ---------- Expense Tracker ----------
function expenseView() {
  const s = Store.get();
  const curr = s.currency || { code: 'USD', symbol: '$', name: 'USD ($) — US Dollar' };
  const total = s.expenses.reduce((a, e) => a + e.amount, 0);
  const budget = typeof s.budget === 'number' ? s.budget : 1200;
  const remaining = budget - total;
  const pct = budget > 0 ? Math.max(0, Math.min(100, (remaining / budget) * 100)) : 0;
  const cats = ['Food', 'Rent', 'Books', 'Fun', 'Other'];
  const byCat = cats.map(c => ({ c, sum: s.expenses.filter(e => e.category === c).reduce((a, e) => a + e.amount, 0) })).filter(x => x.sum > 0);
  const maxCat = Math.max(1, ...byCat.map(x => x.sum));

  const currencyOptions = (Store.currencies || []).map(c => 
    `<option value="${c.code}" ${curr.code === c.code ? 'selected' : ''}>${c.name}</option>`
  ).join('');

  return `
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Expense Tracker</h1>
          <p class="text-sm text-slate-500 mt-1">Track in any global currency — AI auto-extracts amount, category, and date.</p>
        </div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <!-- Currency selector -->
          <div class="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 shadow-sm">
            <span class="text-xs text-slate-500 font-medium">Currency:</span>
            <select id="currency-select" class="bg-transparent text-xs font-semibold outline-none cursor-pointer text-slate-800 dark:text-slate-200">
              ${currencyOptions}
              <option value="CUSTOM" ${!(Store.currencies || []).some(c => c.code === curr.code) ? 'selected' : ''}>+ Custom Currency…</option>
            </select>
          </div>

          <!-- Edit budget button -->
          <button id="exp-edit-budget" class="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors text-slate-700 dark:text-slate-300" title="Click to adjust your budget target">
            ${icon('wallet', 'w-3.5 h-3.5 text-accent')} Budget: <span class="font-bold">${fmtMoney(budget)}</span>
          </button>
        </div>
      </div>

      <!-- AI input -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-sm">
        <div class="flex gap-2">
          <input id="exp-input" type="text" placeholder="e.g. ${curr.symbol}15 on ramen yesterday, or 450 ${curr.code} for books" class="flex-1 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
          <button id="exp-add" class="px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors flex items-center gap-1.5">${icon('sparkles', 'w-4 h-4')} Add</button>
        </div>
        <div id="exp-loading" class="hidden text-xs text-slate-400 mt-2">Parsing in ${curr.code} (${curr.symbol})…</div>
      </div>

      <!-- Dashboard -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
          <p class="text-xs text-slate-500 mb-1">Total Spent (${curr.code})</p>
          <p class="text-2xl font-bold">${fmtMoney(total)}</p>
        </div>
        <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
          <div class="flex items-center justify-between mb-1">
            <p class="text-xs text-slate-500">Budget Remaining</p>
            <span class="text-[11px] text-slate-400">Budget: ${fmtMoney(budget)}</span>
          </div>
          <p class="text-2xl font-bold ${remaining < 0 ? 'text-red-500' : ''}">${fmtMoney(remaining)}</p>
          <div class="mt-2 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full ${pct > 30 ? 'bg-accent' : 'bg-amber-500'} transition-all" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
          <p class="text-xs text-slate-500 mb-2">By Category</p>
          <div class="space-y-1.5">
            ${byCat.length ? byCat.map(x => `
              <div class="flex items-center gap-2 text-xs">
                <span class="w-14 text-slate-500">${x.c}</span>
                <div class="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-accent" style="width:${(x.sum/maxCat)*100}%"></div></div>
                <span class="w-14 text-right font-medium">${fmtMoney(x.sum)}</span>
              </div>
            `).join('') : '<p class="text-xs text-slate-400">No expenses yet</p>'}
          </div>
        </div>
      </div>

      <!-- History -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div class="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-800 flex-wrap sm:flex-nowrap">
          <h2 class="text-sm font-semibold flex-1">Transaction History (${curr.symbol})</h2>
          <input id="exp-search" type="text" placeholder="Search expenses…" class="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-xs w-36" />
          <button id="exp-manual" class="text-xs text-accent hover:underline font-medium">+ Manual add</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-xs text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr><th class="text-left font-normal px-4 py-2">Description</th><th class="text-left font-normal px-4 py-2">Category</th><th class="text-left font-normal px-4 py-2">Date</th><th class="text-right font-normal px-4 py-2">Amount (${curr.code})</th><th></th></tr>
            </thead>
            <tbody id="exp-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function expenseInit(main) {
  function renderRows() {
    const q = ($('#exp-search', main).value || '').toLowerCase();
    const expenses = Store.get().expenses.filter(e => !q || e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
    $('#exp-tbody', main).innerHTML = expenses.length ? expenses.map(e => `
      <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
        <td class="px-4 py-2.5">${e.description}</td>
        <td class="px-4 py-2.5"><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">${e.category}</span></td>
        <td class="px-4 py-2.5 text-slate-500">${fmtDate(e.date)}</td>
        <td class="px-4 py-2.5 text-right font-medium">${fmtMoney(e.amount)}</td>
        <td class="px-2 py-2.5"><button data-del="${e.id}" class="text-slate-400 hover:text-red-500 p-1" title="Delete transaction">${icon('trash', 'w-4 h-4')}</button></td>
      </tr>
    `).join('') : '<tr><td colspan="5" class="px-4 py-8 text-center text-slate-400">No transactions</td></tr>';

    main.querySelectorAll('[data-del]').forEach(btn => {
      btn.onclick = () => {
        Store.set(s => ({ expenses: s.expenses.filter(e => e.id !== btn.dataset.del) }));
        toast('Expense deleted');
        Router.render('expense');
      };
    });
  }
  renderRows();
  $('#exp-search', main).oninput = renderRows;

  // Handle currency selection
  const currSelect = $('#currency-select', main);
  if (currSelect) {
    currSelect.onchange = (e) => {
      const val = e.target.value;
      if (val === 'CUSTOM') {
        const code = prompt('Enter 3-4 letter currency code (e.g. NPR, MYR, BTC):', 'NPR');
        if (!code || !code.trim()) { Router.render('expense'); return; }
        const symbol = prompt(`Enter symbol for ${code.trim().toUpperCase()} (e.g. रू, RM, ₿, $):`, code.trim().toUpperCase()) || code.trim().toUpperCase();
        const customCurr = {
          code: code.trim().toUpperCase(),
          symbol: symbol.trim(),
          name: `${code.trim().toUpperCase()} (${symbol.trim()}) — Custom`,
        };
        Store.set({ currency: customCurr });
        toast(`Currency set to ${customCurr.name}`);
        Router.render('expense');
        return;
      }

      const selected = (Store.currencies || []).find(c => c.code === val) || { code: val, symbol: val, name: val };
      Store.set({ currency: selected });
      toast(`Currency switched to ${selected.name}`);
      Router.render('expense');
    };
  }

  // Handle budget edit
  const budgetBtn = $('#exp-edit-budget', main);
  if (budgetBtn) {
    budgetBtn.onclick = () => {
      const s = Store.get();
      const curr = s.currency || { code: 'USD', symbol: '$' };
      const currentBudget = typeof s.budget === 'number' ? s.budget : 1200;
      const input = prompt(`Enter your monthly/target budget in ${curr.code} (${curr.symbol}):`, currentBudget);
      if (input !== null) {
        const newBudget = parseFloat(input);
        if (!isNaN(newBudget) && newBudget >= 0) {
          Store.set({ budget: newBudget });
          toast(`Budget updated to ${fmtMoney(newBudget)}`);
          Router.render('expense');
        } else {
          toast('Please enter a valid numeric budget', 'error');
        }
      }
    };
  }

  async function addExpense(text) {
    const loading = $('#exp-loading', main);
    const btn = $('#exp-add', main);
    loading.classList.remove('hidden'); btn.disabled = true;
    try {
      const parsed = await api('/api/parse-expense', { text });
      Store.set(s => ({ expenses: [...s.expenses, { id: uid(), ...parsed }] }));
      toast('Expense added');
      Router.render('expense');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      loading.classList.add('hidden'); btn.disabled = false;
    }
  }

  $('#exp-add', main).onclick = () => {
    const input = $('#exp-input', main);
    if (input.value.trim()) addExpense(input.value);
  };
  $('#exp-input', main).onkeydown = (e) => { if (e.key === 'Enter') $('#exp-add', main).click(); };

  $('#exp-manual', main).onclick = () => {
    const curr = Store.get().currency || { code: 'USD', symbol: '$' };
    const desc = prompt('Description:'); if (!desc) return;
    const amount = parseFloat(prompt(`Amount (${curr.symbol || curr.code}):`) || '0'); if (!amount) return;
    const category = prompt('Category (Food, Rent, Books, Fun, Other):', 'Food') || 'Other';
    Store.set(s => ({ expenses: [...s.expenses, { id: uid(), amount, category, description: desc, date: new Date().toISOString().slice(0,10) }] }));
    toast('Expense added');
    Router.render('expense');
  };
}

// ---------- Study Planner ----------
function plannerView() {
  const s = Store.get();
  const cols = [
    { id: 'todo', name: 'To Do' },
    { id: 'doing', name: 'In Progress' },
    { id: 'done', name: 'Done' },
  ];
  return `
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Study Planner</h1>
          <p class="text-sm text-slate-500 mt-1">Organize assignments and auto-generate a study schedule.</p>
        </div>
        <button id="ai-schedule" class="px-3.5 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors flex items-center gap-1.5">${icon('sparkles', 'w-4 h-4')} AI Schedule</button>
      </div>

      <!-- Add task -->
      <div class="flex flex-wrap gap-2 mb-6">
        <input id="task-title" type="text" placeholder="Task title…" class="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-accent outline-none text-sm" />
        <select id="task-priority" class="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm">
          <option>Urgent</option><option>Medium</option><option>Chill</option>
        </select>
        <input id="task-due" type="date" class="px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm" />
        <button id="task-add" class="px-4 py-2 rounded-lg bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium">${icon('plus', 'w-4 h-4')}</button>
      </div>

      <!-- Kanban -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${cols.map(col => `
          <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold">${col.name}</h3>
              <span class="text-xs text-slate-400">${s.tasks.filter(t => t.status === col.id).length}</span>
            </div>
            <div class="space-y-2" data-col="${col.id}">
              ${s.tasks.filter(t => t.status === col.id).map(t => `
                <div class="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg group">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-sm font-medium">${t.title}</p>
                    <button data-del="${t.id}" class="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">${icon('trash', 'w-3.5 h-3.5')}</button>
                  </div>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="text-xs px-2 py-0.5 rounded-full ${t.priority === 'Urgent' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : t.priority === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'}">${t.priority}</span>
                    <span class="text-xs text-slate-400">${fmtDate(t.due)}</span>
                  </div>
                  <div class="flex gap-1 mt-2">
                    ${cols.map(c => `<button data-move="${t.id}" data-to="${c.id}" class="text-xs px-2 py-1 rounded ${c.id === t.status ? 'bg-accent-soft text-accent dark:bg-slate-800 font-medium' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">${c.name.split(' ')[0]}</button>`).join('')}
                  </div>
                </div>
              `).join('') || '<p class="text-xs text-slate-400 text-center py-4">No tasks</p>'}
            </div>
          </div>
        `).join('')}
      </div>

      <div id="schedule-output" class="mt-6"></div>
    </div>
  `;
}

function plannerInit(main) {
  $('#task-add', main).onclick = () => {
    const title = $('#task-title', main).value.trim();
    if (!title) return;
    const priority = $('#task-priority', main).value;
    const due = $('#task-due', main).value || new Date().toISOString().slice(0, 10);
    Store.set(s => ({ tasks: [...s.tasks, { id: uid(), title, priority, due, status: 'todo' }] }));
    toast('Task added');
    Router.render('planner');
  };

  main.querySelectorAll('[data-del]').forEach(btn => {
    btn.onclick = () => {
      Store.set(s => ({ tasks: s.tasks.filter(t => t.id !== btn.dataset.del) }));
      Router.render('planner');
    };
  });

  main.querySelectorAll('[data-move]').forEach(btn => {
    btn.onclick = () => {
      Store.set(s => ({ tasks: s.tasks.map(t => t.id === btn.dataset.move ? { ...t, status: btn.dataset.to } : t) }));
      Router.render('planner');
    };
  });

  $('#ai-schedule', main).onclick = async () => {
    const tasks = Store.get().tasks.filter(t => t.status !== 'done');
    if (!tasks.length) { toast('No active tasks', 'error'); return; }
    const btn = $('#ai-schedule', main);
    btn.disabled = true; btn.innerHTML = '<span class="text-xs">Generating…</span>';
    try {
      const data = await api('/api/study-schedule', { tasks });
      const out = $('#schedule-output', main);
      out.innerHTML = `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 slide-up">
          <h3 class="text-sm font-semibold mb-3 flex items-center gap-1.5">${icon('sparkles', 'w-4 h-4 text-accent')} AI Study Schedule</h3>
          <div class="space-y-3">
            ${(data.schedule || []).map(day => `
              <div>
                <p class="text-xs font-semibold text-slate-500 mb-1">${day.date}</p>
                <div class="space-y-1">
                  ${(day.slots || []).map(slot => `
                    <div class="flex items-center gap-3 text-sm">
                      <span class="text-xs text-accent font-mono w-12">${slot.time}</span>
                      <span class="flex-1">${slot.task}</span>
                      <span class="text-xs text-slate-400">${slot.duration_min}min</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      toast('Schedule generated');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      btn.disabled = false; btn.innerHTML = `${icon('sparkles', 'w-4 h-4')} AI Schedule`;
    }
  };
}

// ---------- Notes Manager ----------
function notesView() {
  const s = Store.get();
  const activeNote = s.notes[0] || null;
  return `
    <div class="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight">Notes Manager</h1>
        <p class="text-sm text-slate-500 mt-1">Write notes with markdown. AI summarizes and makes flashcards.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
        <!-- Sidebar -->
        <div class="space-y-3">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
            <p class="text-xs font-semibold text-slate-400 uppercase mb-2">Notebooks</p>
            <div class="space-y-0.5">
              ${s.notebooks.map(nb => `
                <button data-nb="${nb.id}" class="notebook-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span class="w-2 h-2 rounded-full bg-${nb.color}-500"></span>${nb.name}
                </button>
              `).join('')}
            </div>
          </div>
          <button id="new-note" class="w-full px-3 py-2 rounded-lg bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium flex items-center justify-center gap-1.5">${icon('plus', 'w-4 h-4')} New Note</button>
        </div>

        <!-- Editor -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div class="flex items-center gap-3 p-3 border-b border-slate-200 dark:border-slate-800">
            <input id="note-title" type="text" value="${activeNote?.title || ''}" placeholder="Untitled" class="flex-1 px-2 py-1 text-base font-semibold bg-transparent outline-none" />
            <button id="ai-summarize" class="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-colors flex items-center gap-1.5">${icon('sparkles', 'w-3.5 h-3.5')} Summarize</button>
          </div>
          <div class="flex gap-1 px-3 pt-2 flex-wrap" id="note-tags"></div>
          <textarea id="note-content" class="w-full h-[400px] px-4 py-3 bg-transparent outline-none resize-none text-sm font-mono leading-relaxed" placeholder="Start writing…">${activeNote?.content || ''}</textarea>
        </div>
      </div>
      <div id="notes-output" class="mt-4"></div>
    </div>
  `;
}

function notesInit(main) {
  let activeId = Store.get().notes[0]?.id || null;

  function renderTags() {
    const note = Store.get().notes.find(n => n.id === activeId);
    const tags = note ? extractTags(note.content) : [];
    $('#note-tags', main).innerHTML = tags.map(t => `<span class="text-xs px-2 py-0.5 rounded-full bg-accent-soft text-accent dark:bg-slate-800">#${t}</span>`).join('') || '<span class="text-xs text-slate-400">Tags appear when you use #hashtags</span>';
  }
  renderTags();

  function extractTags(text) {
    const matches = text.match(/#(\w+)/g) || [];
    return [...new Set(matches.map(m => m.slice(1)))];
  }

  $('#note-content', main).oninput = (e) => {
    const content = e.target.value;
    const title = $('#note-title', main).value;
    Store.set(s => ({ notes: s.notes.map(n => n.id === activeId ? { ...n, content, title, updated: Date.now() } : n) }));
    renderTags();
  };

  $('#note-title', main).oninput = (e) => {
    Store.set(s => ({ notes: s.notes.map(n => n.id === activeId ? { ...n, title: e.target.value } : n) }));
  };

  $('#new-note', main).onclick = () => {
    const note = { id: uid(), notebookId: null, title: 'Untitled', content: '', updated: Date.now() };
    Store.set(s => ({ notes: [note, ...s.notes] }));
    toast('Note created');
    Router.render('notes');
  };

  $('#ai-summarize', main).onclick = async () => {
    const content = $('#note-content', main).value;
    if (!content.trim()) { toast('Note is empty', 'error'); return; }
    const btn = $('#ai-summarize', main);
    btn.disabled = true; btn.innerHTML = '<span class="text-xs">Analyzing…</span>';
    try {
      const data = await api('/api/summarize-notes', { notes: content });
      const out = $('#notes-output', main);
      out.innerHTML = `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 slide-up">
          <h3 class="text-sm font-semibold mb-2">${icon('sparkles', 'w-4 h-4 text-accent inline mr-1')}AI Summary</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">${data.summary}</p>
          <h4 class="text-xs font-semibold text-slate-400 uppercase mb-2">Flashcards</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            ${(data.flashcards || []).map((f, i) => `
              <div class="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                <p class="text-xs text-slate-400 mb-1">Q${i+1}</p>
                <p class="text-sm font-medium mb-2">${f.question}</p>
                <p class="text-xs text-slate-500">${f.answer}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      toast('Summary ready');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      btn.disabled = false; btn.innerHTML = `${icon('sparkles', 'w-3.5 h-3.5')} Summarize`;
    }
  };
}

// ---------- Password Manager ----------
function passwordsView() {
  return `
    <div class="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight">Password Manager</h1>
        <p class="text-sm text-slate-500 mt-1">Local vault with generator and strength meter. Data stays in your browser.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
        <!-- Vault -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div class="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 class="text-sm font-semibold flex-1">Vault</h2>
            <input id="pw-search" type="text" placeholder="Search…" class="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-xs w-32" />
          </div>
          <div id="pw-list" class="divide-y divide-slate-100 dark:divide-slate-800"></div>
        </div>

        <!-- Generator -->
        <div class="space-y-4">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <h3 class="text-sm font-semibold mb-3">Password Generator</h3>
            <div id="pw-gen-output" class="font-mono text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-lg break-all mb-3 min-h-[44px] flex items-center"></div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs mb-1"><span>Length</span><span id="pw-len-val">16</span></div>
                <input id="pw-len" type="range" min="6" max="40" value="16" class="w-full accent-indigo-600" />
              </div>
              <label class="flex items-center gap-2 text-sm"><input id="pw-sym" type="checkbox" checked class="accent-indigo-600" /> Symbols</label>
              <label class="flex items-center gap-2 text-sm"><input id="pw-num" type="checkbox" checked class="accent-indigo-600" /> Numbers</label>
              <label class="flex items-center gap-2 text-sm"><input id="pw-upp" type="checkbox" checked class="accent-indigo-600" /> Uppercase</label>
              <div class="flex gap-2">
                <button id="pw-gen" class="flex-1 px-3 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark">Generate</button>
                <button id="pw-copy" class="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-sm">${icon('copy', 'w-4 h-4')}</button>
              </div>
            </div>
          </div>
          <button id="pw-add" class="w-full px-4 py-2.5 rounded-lg bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium">${icon('plus', 'w-4 h-4')} Add Entry</button>
        </div>
      </div>
    </div>
  `;
}

function passwordsInit(main) {
  function strengthLabel(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return ['weak', 'fair', 'fair', 'good', 'strong', 'strong'][score];
  }

  function renderList() {
    const q = ($('#pw-search', main).value || '').toLowerCase();
    const list = Store.get().passwords.filter(p => !q || p.name.toLowerCase().includes(q) || p.username.toLowerCase().includes(q));
    const colors = { weak: 'bg-red-100 text-red-600 dark:bg-red-900/30', fair: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30', good: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30', strong: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' };
    $('#pw-list', main).innerHTML = list.length ? list.map(p => `
      <div class="p-4 group">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-medium">${p.name}</p>
          <div class="flex items-center gap-2">
            <span class="text-xs px-2 py-0.5 rounded-full ${colors[p.strength] || colors.weak}">${p.strength}</span>
            <button data-del="${p.id}" class="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">${icon('trash', 'w-3.5 h-3.5')}</button>
          </div>
        </div>
        <p class="text-xs text-slate-500">${p.username}</p>
        <div class="flex items-center gap-2 mt-1">
          <code class="text-xs text-slate-400 font-mono flex-1 truncate" data-pw="${p.id}">••••••••</code>
          <button data-toggle="${p.id}" class="text-xs text-accent hover:underline">Show</button>
          <button data-copypw="${p.id}" class="text-xs text-slate-400 hover:text-accent">${icon('copy', 'w-3.5 h-3.5')}</button>
        </div>
      </div>
    `).join('') : '<p class="p-8 text-center text-sm text-slate-400">No passwords saved</p>';

    main.querySelectorAll('[data-del]').forEach(btn => {
      btn.onclick = () => {
        Store.set(s => ({ passwords: s.passwords.filter(p => p.id !== btn.dataset.del) }));
        toast('Entry deleted');
        renderList();
      };
    });

    main.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.onclick = () => {
        const code = main.querySelector(`[data-pw="${btn.dataset.toggle}"]`);
        const pw = Store.get().passwords.find(p => p.id === btn.dataset.toggle);
        if (code.textContent.startsWith('•')) { code.textContent = pw.password; btn.textContent = 'Hide'; }
        else { code.textContent = '••••••••'; btn.textContent = 'Show'; }
      };
    });

    main.querySelectorAll('[data-copypw]').forEach(btn => {
      btn.onclick = () => {
        const pw = Store.get().passwords.find(p => p.id === btn.dataset.copypw);
        copy(pw.password);
      };
    });
  }
  renderList();
  $('#pw-search', main).oninput = renderList;

  function generate() {
    const len = parseInt($('#pw-len', main).value);
    const sym = $('#pw-sym', main).checked;
    const num = $('#pw-num', main).checked;
    const upp = $('#pw-upp', main).checked;
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (upp) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (num) chars += '0123456789';
    if (sym) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let pw = '';
    for (let i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
    $('#pw-gen-output', main).textContent = pw;
  }
  generate();

  $('#pw-len', main).oninput = (e) => { $('#pw-len-val', main).textContent = e.target.value; generate(); };
  $('#pw-sym', main).onchange = generate;
  $('#pw-num', main).onchange = generate;
  $('#pw-upp', main).onchange = generate;
  $('#pw-gen', main).onclick = generate;
  $('#pw-copy', main).onclick = () => copy($('#pw-gen-output', main).textContent);

  $('#pw-add', main).onclick = () => {
    const name = prompt('Name (e.g. Canvas):'); if (!name) return;
    const username = prompt('Username/email:') || '';
    const password = $('#pw-gen-output', main).textContent || prompt('Password:') || '';
    Store.set(s => ({ passwords: [...s.passwords, { id: uid(), name, username, password, url: '', strength: strengthLabel(password) }] }));
    toast('Entry added');
    renderList();
  };
}

// ---------- Essay Outliner ----------
function essayView() {
  return `
    <div class="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight">Essay &amp; Assignment Outliner</h1>
        <p class="text-sm text-slate-500 mt-1">Generate structured outlines with key arguments and citations.</p>
      </div>
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6">
        <div class="space-y-3">
          <input id="essay-topic" type="text" placeholder="Topic or prompt…" class="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Word Count</label>
              <input id="essay-words" type="number" value="1000" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Tone</label>
              <select id="essay-tone" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm">
                <option>Academic</option><option>Persuasive</option><option>Analytical</option><option>Narrative</option>
              </select>
            </div>
          </div>
          <button id="essay-gen" class="w-full px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors flex items-center justify-center gap-1.5">${icon('sparkles', 'w-4 h-4')} Generate Outline</button>
        </div>
      </div>
      <div id="essay-output"></div>
    </div>
  `;
}

function essayInit(main) {
  $('#essay-gen', main).onclick = async () => {
    const topic = $('#essay-topic', main).value.trim();
    if (!topic) { toast('Enter a topic', 'error'); return; }
    const word_count = parseInt($('#essay-words', main).value) || 1000;
    const tone = $('#essay-tone', main).value;
    const btn = $('#essay-gen', main);
    btn.disabled = true; btn.innerHTML = '<span class="text-xs">Generating…</span>';
    try {
      const data = await api('/api/essay-outline', { topic, word_count, tone });
      const out = $('#essay-output', main);
      out.innerHTML = `
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 slide-up">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">${data.title || topic}</h2>
            <button id="copy-outline" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">${icon('copy', 'w-3.5 h-3.5')} Copy</button>
          </div>
          <div class="space-y-4">
            ${(data.sections || []).map((sec, i) => `
              <div class="border-l-2 border-accent pl-4">
                <h3 class="text-sm font-semibold mb-1">${i+1}. ${sec.heading}</h3>
                ${sec.key_arguments?.length ? `<ul class="text-sm text-slate-600 dark:text-slate-400 space-y-0.5 mb-2">${sec.key_arguments.map(a => `<li>• ${a}</li>`).join('')}</ul>` : ''}
                ${sec.bullet_points?.length ? `<div class="text-xs text-slate-500 space-y-0.5">${sec.bullet_points.map(b => `<div>— ${b}</div>`).join('')}</div>` : ''}
                ${sec.citations?.length ? `<p class="text-xs text-accent mt-1">${sec.citations.join(' · ')}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
      $('#copy-outline', main).onclick = () => {
        const text = `${data.title}\n\n` + (data.sections || []).map((s, i) => `${i+1}. ${s.heading}\n${(s.key_arguments||[]).map(a=>'  • '+a).join('\n')}\n${(s.bullet_points||[]).map(b=>'  — '+b).join('\n')}\n${(s.citations||[]).join(' · ')}`).join('\n\n');
        copy(text);
      };
      toast('Outline generated');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      btn.disabled = false; btn.innerHTML = `${icon('sparkles', 'w-4 h-4')} Generate Outline`;
    }
  };
}

// ---------- Citation Builder ----------
function citationView() {
  return `
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight">Citation Builder</h1>
        <p class="text-sm text-slate-500 mt-1">Generate perfectly formatted citations in seconds.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">Style</label>
            <select id="cit-style" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm">
              <option>APA 7</option><option>MLA 9</option><option>Chicago</option><option>Harvard</option>
            </select>
          </div>
          <input id="cit-author" type="text" placeholder="Author (e.g. Smith, J.)" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
          <input id="cit-title" type="text" placeholder="Title" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
          <input id="cit-year" type="text" placeholder="Year" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
          <input id="cit-publisher" type="text" placeholder="Publisher / Journal" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
          <input id="cit-url" type="text" placeholder="URL (optional)" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold">Formatted Citation</h3>
            <button id="cit-copy" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">${icon('copy', 'w-3.5 h-3.5')} Copy</button>
          </div>
          <div id="cit-output" class="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm leading-relaxed font-mono"></div>
        </div>
      </div>
    </div>
  `;
}

function citationInit(main) {
  function format() {
    const style = $('#cit-style', main).value;
    const author = $('#cit-author', main).value || 'Author, A.';
    const title = $('#cit-title', main).value || 'Title';
    const year = $('#cit-year', main).value || '2024';
    const pub = $('#cit-publisher', main).value || 'Publisher';
    const url = $('#cit-url', main).value;

    let out = '';
    if (style === 'APA 7') out = `${author} (${year}). ${title}. ${pub}.${url ? ` ${url}` : ''}`;
    else if (style === 'MLA 9') out = `${author}. "${title}." ${pub}, ${year}.${url ? ` ${url}.` : ''}`;
    else if (style === 'Chicago') out = `${author}. ${title}. ${pub}, ${year}.${url ? ` ${url}.` : ''}`;
    else if (style === 'Harvard') out = `${author} ${year}, ${title}, ${pub}.${url ? ` Available at: ${url}` : ''}`;
    $('#cit-output', main).textContent = out;
  }
  ['input', 'change'].forEach(ev => {
    main.querySelectorAll('input, select').forEach(el => el.addEventListener(ev, format));
  });
  format();
  $('#cit-copy', main).onclick = () => copy($('#cit-output', main).textContent);
}

// ---------- Class Schedule ----------
function scheduleView() {
  const s = Store.get();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM - 8 PM
  const colorMap = { indigo: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700', emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700', amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700' };

  // Next class
  const now = new Date();
  const dayIdx = (now.getDay() + 6) % 7; // Mon=0
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const today = days[dayIdx] || 'Mon';
  const upcoming = s.schedule.filter(c => c.day === today).filter(c => {
    const [h, m] = c.start.split(':').map(Number);
    return h * 60 + m >= nowMin;
  }).sort((a, b) => a.start.localeCompare(b.start));
  const nextClass = upcoming[0];

  return `
    <div class="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Class Schedule</h1>
          <p class="text-sm text-slate-500 mt-1">Your weekly timetable at a glance.</p>
        </div>
        <button id="sch-add" class="px-3.5 py-2 rounded-lg bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium flex items-center gap-1.5">${icon('plus', 'w-4 h-4')} Add Class</button>
      </div>

      ${nextClass ? `
        <div class="bg-accent-soft dark:bg-slate-800/50 border border-accent/20 dark:border-slate-700 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white">${icon('arrow', 'w-5 h-5')}</div>
          <div>
            <p class="text-xs text-accent font-medium uppercase tracking-wide">Next Class Up</p>
            <p class="text-sm font-semibold">${nextClass.title} · ${nextClass.start}–${nextClass.end} · ${nextClass.room}</p>
          </div>
        </div>
      ` : ''}

      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
        <div class="grid grid-cols-[60px_repeat(5,1fr)] min-w-[600px]">
          <div class="border-b border-r border-slate-200 dark:border-slate-800 p-2"></div>
          ${days.map(d => `<div class="border-b border-r border-slate-200 dark:border-slate-800 p-2 text-xs font-semibold text-center">${d}</div>`).join('')}
          ${hours.map(h => `
            <div class="border-b border-r border-slate-200 dark:border-slate-800 p-2 text-xs text-slate-400 text-right">${h}:00</div>
            ${days.map(d => {
              const cls = s.schedule.filter(c => c.day === d && c.start.startsWith(String(h).padStart(2, '0')));
              return `<div class="border-b border-r border-slate-200 dark:border-slate-800 p-1 space-y-1 min-h-[40px]">
                ${cls.map(c => `<div class="text-xs p-1.5 rounded border ${colorMap[c.color] || colorMap.indigo}" data-del="${c.id}">
                  <p class="font-medium leading-tight">${c.title}</p>
                  <p class="opacity-70 leading-tight">${c.start}–${c.end} · ${c.room}</p>
                  <p class="opacity-60 leading-tight">${c.instructor}</p>
                </div>`).join('')}
              </div>`;
            }).join('')}
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function scheduleInit(main) {
  main.querySelectorAll('[data-del]').forEach(el => {
    el.onclick = () => {
      Store.set(s => ({ schedule: s.schedule.filter(c => c.id !== el.dataset.del) }));
      toast('Class removed');
      Router.render('schedule');
    };
  });

  $('#sch-add', main).onclick = () => {
    const title = prompt('Class title:'); if (!title) return;
    const day = prompt('Day (Mon–Fri):', 'Mon') || 'Mon';
    const start = prompt('Start time (HH:MM):', '09:00') || '09:00';
    const end = prompt('End time (HH:MM):', '10:30') || '10:30';
    const room = prompt('Room:', 'TBD') || '';
    const instructor = prompt('Instructor:', 'TBD') || '';
    const color = prompt('Color (indigo, emerald, amber):', 'indigo') || 'indigo';
    Store.set(s => ({ schedule: [...s.schedule, { id: uid(), title, day, start, end, room, instructor, color }] }));
    toast('Class added');
    Router.render('schedule');
  };
}

// ---------- GPA Calculator ----------
function gpaView() {
  const s = Store.get();
  const grades = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 };
  const totalCredits = s.courses.reduce((a, c) => a + c.credits, 0);
  const totalPoints = s.courses.reduce((a, c) => a + (grades[c.grade] || 0) * c.credits, 0);
  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return `
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight">GPA Calculator</h1>
        <p class="text-sm text-slate-500 mt-1">Add courses and see your GPA update instantly.</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <p class="text-xs text-slate-500 mb-1">Cumulative GPA</p>
          <p class="text-3xl font-bold text-accent">${gpa}</p>
        </div>
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <p class="text-xs text-slate-500 mb-1">Total Credits</p>
          <p class="text-3xl font-bold">${totalCredits}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4">
        <div class="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 class="text-sm font-semibold flex-1">Courses</h2>
          <button id="gpa-add" class="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium flex items-center gap-1.5">${icon('plus', 'w-3.5 h-3.5')} Add Course</button>
        </div>
        <div id="gpa-list" class="divide-y divide-slate-100 dark:divide-slate-800"></div>
      </div>

      <div class="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h3 class="text-sm font-semibold mb-2">Target GPA Predictor</h3>
        <div class="flex items-center gap-3">
          <label class="text-xs text-slate-500">Target:</label>
          <input id="gpa-target" type="number" step="0.1" min="0" max="4" value="3.5" class="w-20 px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm" />
          <p id="gpa-predict" class="text-sm text-slate-600 dark:text-slate-400"></p>
        </div>
      </div>
    </div>
  `;
}

function gpaInit(main) {
  const grades = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 };

  function render() {
    const s = Store.get();
    const list = $('#gpa-list', main);
    list.innerHTML = s.courses.map(c => `
      <div class="flex items-center gap-3 p-3 group">
        <input data-edit="${c.id}" data-field="name" type="text" value="${c.name}" class="flex-1 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm" />
        <input data-edit="${c.id}" data-field="credits" type="number" value="${c.credits}" min="1" max="6" class="w-16 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm text-center" />
        <select data-edit="${c.id}" data-field="grade" class="px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-accent outline-none text-sm">
          ${Object.keys(grades).map(g => `<option ${g === c.grade ? 'selected' : ''}>${g}</option>`).join('')}
        </select>
        <button data-del="${c.id}" class="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">${icon('trash', 'w-4 h-4')}</button>
      </div>
    `).join('') || '<p class="p-6 text-center text-sm text-slate-400">No courses yet</p>';

    main.querySelectorAll('[data-edit]').forEach(inp => {
      inp.oninput = () => {
        Store.set(s => ({ courses: s.courses.map(c => c.id === inp.dataset.edit ? { ...c, [inp.dataset.field]: inp.dataset.field === 'credits' ? parseInt(inp.value) || 1 : inp.value } : c) }));
        recalc();
      };
    });

    main.querySelectorAll('[data-del]').forEach(btn => {
      btn.onclick = () => {
        Store.set(s => ({ courses: s.courses.filter(c => c.id !== btn.dataset.del) }));
        Router.render('gpa');
      };
    });
    recalc();
  }

  function recalc() {
    const s = Store.get();
    const totalCredits = s.courses.reduce((a, c) => a + c.credits, 0);
    const totalPoints = s.courses.reduce((a, c) => a + (grades[c.grade] || 0) * c.credits, 0);
    const gpa = totalCredits ? totalPoints / totalCredits : 0;
    const target = parseFloat($('#gpa-target', main).value) || 0;
    const needed = totalCredits ? ((target * (totalCredits + 3) - totalPoints) / 3).toFixed(2) : '—';
    $('#gpa-predict', main).textContent = `You need a ${needed} GPA average on your next 3 credits to reach ${target}.`;
  }

  render();
  $('#gpa-target', main).oninput = recalc;

  $('#gpa-add', main).onclick = () => {
    Store.set(s => ({ courses: [...s.courses, { id: uid(), name: 'New Course', credits: 3, grade: 'A' }] }));
    Router.render('gpa');
  };
}

// ---------- Pomodoro Timer ----------
function pomodoroView() {
  const s = Store.get().pomodoro;
  return `
    <div class="max-w-2xl mx-auto px-4 md:px-6 py-8">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold tracking-tight">Focus Timer</h1>
        <p class="text-sm text-slate-500 mt-1">25 minutes of focus. 5 minutes of rest. Repeat.</p>
      </div>

      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
        <div class="flex justify-center gap-2 mb-6">
          <button id="mode-work" class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-accent text-white">Focus</button>
          <button id="mode-break" class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Break</button>
        </div>

        <div id="timer-display" class="text-7xl font-bold tabular-nums tracking-tight mb-2">${s.workMin}:00</div>
        <p id="timer-status" class="text-sm text-slate-500 mb-6">Ready to focus</p>

        <div class="flex justify-center gap-3">
          <button id="timer-start" class="px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">Start</button>
          <button id="timer-pause" class="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Pause</button>
          <button id="timer-reset" class="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">Reset</button>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-500">Ambient:</label>
          <select id="ambient" class="px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <option value="none">None</option>
            <option value="rain">Rain</option>
            <option value="cafe">Café</option>
            <option value="white">White Noise</option>
          </select>
        </div>
        <p class="text-sm text-slate-500">Sessions today: <span id="session-count" class="font-semibold text-accent">${s.count}</span></p>
      </div>
    </div>
  `;
}

function pomodoroInit(main) {
  let mode = 'work';
  let seconds = Store.get().pomodoro.workMin * 60;
  let interval = null;
  let audioCtx = null;
  let audioNode = null;

  function updateDisplay() {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    $('#timer-display', main).textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function tick() {
    seconds--;
    updateDisplay();
    if (seconds <= 0) {
      clearInterval(interval); interval = null;
      const count = Store.get().pomodoro.count + 1;
      Store.set(s => ({ pomodoro: { ...s.pomodoro, count } }));
      $('#session-count', main).textContent = count;
      $('#timer-status', main).textContent = mode === 'work' ? 'Focus session complete! Time for a break.' : 'Break over. Ready to focus?';
      $('#timer-start', main).textContent = 'Start';
      toast(mode === 'work' ? 'Session complete!' : 'Break over', 'info');
      stopAmbient();
    }
  }

  $('#timer-start', main).onclick = () => {
    if (interval) return;
    interval = setInterval(tick, 1000);
    $('#timer-status', main).textContent = mode === 'work' ? 'Focusing…' : 'On break…';
    $('#timer-start', main).textContent = 'Running';
    startAmbient();
  };

  $('#timer-pause', main).onclick = () => {
    clearInterval(interval); interval = null;
    $('#timer-status', main).textContent = 'Paused';
    $('#timer-start', main).textContent = 'Resume';
    stopAmbient();
  };

  $('#timer-reset', main).onclick = () => {
    clearInterval(interval); interval = null;
    seconds = (mode === 'work' ? Store.get().pomodoro.workMin : Store.get().pomodoro.breakMin) * 60;
    updateDisplay();
    $('#timer-status', main).textContent = 'Ready to focus';
    $('#timer-start', main).textContent = 'Start';
    stopAmbient();
  };

  $('#mode-work', main).onclick = () => {
    mode = 'work'; seconds = Store.get().pomodoro.workMin * 60; updateDisplay();
    $('#mode-work', main).className = 'px-4 py-1.5 rounded-full text-sm font-medium bg-accent text-white';
    $('#mode-break', main).className = 'px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800';
    $('#timer-status', main).textContent = 'Ready to focus';
    clearInterval(interval); interval = null;
  };

  $('#mode-break', main).onclick = () => {
    mode = 'break'; seconds = Store.get().pomodoro.breakMin * 60; updateDisplay();
    $('#mode-break', main).className = 'px-4 py-1.5 rounded-full text-sm font-medium bg-accent text-white';
    $('#mode-work', main).className = 'px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800';
    $('#timer-status', main).textContent = 'Ready for a break';
    clearInterval(interval); interval = null;
  };

  // Ambient noise via Web Audio API
  function startAmbient() {
    const type = $('#ambient', main).value;
    if (type === 'none') return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      stopAmbient();
      if (type === 'white') {
        const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const src = audioCtx.createBufferSource(); src.buffer = buffer; src.loop = true;
        const gain = audioCtx.createGain(); gain.gain.value = 0.05;
        src.connect(gain); gain.connect(audioCtx.destination); src.start();
        audioNode = src;
      } else {
        // brown noise for rain/cafe
        const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < data.length; i++) { const white = Math.random() * 2 - 1; last = (last + 0.02 * white) / 1.02; data[i] = last * 3.5; }
        const src = audioCtx.createBufferSource(); src.buffer = buffer; src.loop = true;
        const gain = audioCtx.createGain(); gain.gain.value = type === 'rain' ? 0.08 : 0.04;
        const filter = audioCtx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = type === 'rain' ? 800 : 400;
        src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination); src.start();
        audioNode = src;
      }
    } catch (e) { /* audio not available */ }
  }

  function stopAmbient() {
    if (audioNode) { try { audioNode.stop(); } catch {} audioNode = null; }
  }

  $('#ambient', main).onchange = () => { if (interval) startAmbient(); };

  updateDisplay();
}

// ---------- AI Chatbot ----------
function chatView() {
  return `
    <div class="max-w-4xl mx-auto px-4 md:px-6 py-6 flex flex-col h-[calc(100vh-3.5rem)]">
      <!-- Chat Header -->
      <div class="flex items-center justify-between pb-4 mb-3 border-b border-slate-200 dark:border-slate-800 flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-accent-soft dark:bg-slate-800 flex items-center justify-center text-accent shadow-xs">
            ${icon('bot', 'w-6 h-6')}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">AI Campus Assistant</h1>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Groq Llama 3.3
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400">24/7 college tutor for explanations, study prep, coding, and writing.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="chat-clear" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 transition-colors shadow-xs">
            ${icon('trash', 'w-3.5 h-3.5')} Clear Chat
          </button>
        </div>
      </div>

      <!-- Quick prompts -->
      <div class="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar" id="chat-prompts">
        <span class="text-[11px] font-semibold text-slate-400 shrink-0">Try:</span>
        <button class="prompt-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-accent-soft dark:hover:bg-slate-700 hover:text-accent transition-colors shrink-0">💡 Explain Dijkstra's algorithm simply</button>
        <button class="prompt-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-accent-soft dark:hover:bg-slate-700 hover:text-accent transition-colors shrink-0">✉️ Draft an email to my professor asking for office hours</button>
        <button class="prompt-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-accent-soft dark:hover:bg-slate-700 hover:text-accent transition-colors shrink-0">🎯 Quiz me on photosynthesis with 3 questions</button>
        <button class="prompt-chip px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-accent-soft dark:hover:bg-slate-700 hover:text-accent transition-colors shrink-0">💻 Write a Python binary search function</button>
      </div>

      <!-- Messages container -->
      <div id="chat-messages" class="flex-1 overflow-y-auto space-y-4 pr-1 mb-3 rounded-xl"></div>

      <!-- Input area -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-md">
        <form id="chat-form" class="flex items-end gap-2">
          <textarea id="chat-input" rows="1" placeholder="Ask anything about coursework, code, study topics, or assignments…" class="flex-1 max-h-32 bg-transparent px-3 py-2 text-sm outline-none resize-none text-slate-900 dark:text-slate-100 placeholder-slate-400"></textarea>
          <button type="submit" id="chat-send-btn" class="p-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xs">
            ${icon('send', 'w-4 h-4')}
          </button>
        </form>
        <div class="flex items-center justify-between px-3 pt-1 text-[11px] text-slate-400">
          <span>Press <kbd class="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">Enter</kbd> to send, <kbd class="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">Shift+Enter</kbd> for newline</span>
          <span id="chat-status" class="hidden text-accent animate-pulse font-medium">Generating response…</span>
        </div>
      </div>
    </div>
  `;
}

function chatInit(main) {
  const messagesContainer = $('#chat-messages', main);
  const form = $('#chat-form', main);
  const input = $('#chat-input', main);
  const sendBtn = $('#chat-send-btn', main);
  const status = $('#chat-status', main);

  function renderMessages() {
    const s = Store.get();
    const messages = s.chatMessages || [];
    if (!messages.length) {
      messagesContainer.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
          <div class="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-3">
            ${icon('bot', 'w-6 h-6')}
          </div>
          <p class="font-medium text-slate-700 dark:text-slate-300">How can I help you today?</p>
          <p class="text-xs mt-1">Ask questions, explain code or theorems, or draft study guides.</p>
        </div>
      `;
      return;
    }

    messagesContainer.innerHTML = messages.map((m, idx) => {
      const isUser = m.role === 'user';
      if (isUser) {
        return `
          <div class="flex items-start justify-end gap-2.5">
            <div class="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs bg-accent text-white px-4 py-2.5 text-sm shadow-xs whitespace-pre-wrap leading-relaxed">
              ${m.content}
            </div>
            <div class="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 text-xs font-bold">
              ${icon('user', 'w-4 h-4')}
            </div>
          </div>
        `;
      } else {
        return `
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-accent shrink-0 text-xs font-bold">
              ${icon('bot', 'w-4 h-4')}
            </div>
            <div class="group relative max-w-[85%] sm:max-w-[80%] rounded-2xl rounded-tl-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm shadow-xs leading-relaxed text-slate-800 dark:text-slate-200">
              <div class="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                ${renderMarkdown(m.content)}
              </div>
              <button data-copy-idx="${idx}" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity" title="Copy answer">
                ${icon('copy', 'w-3.5 h-3.5')}
              </button>
            </div>
          </div>
        `;
      }
    }).join('');

    // Attach copy handlers
    messagesContainer.querySelectorAll('[data-copy-idx]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.copyIdx);
        const m = Store.get().chatMessages[idx];
        if (m) copy(m.content);
      };
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  renderMessages();

  // Prompt chips
  main.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.onclick = () => {
      input.value = chip.textContent.replace(/^[💡✉️🎯💻📚]\s*/, '').trim();
      input.focus();
    };
  });

  // Auto-resize input
  input.oninput = () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  };

  // Submit
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const s = Store.get();
    const currentMessages = s.chatMessages || [];
    const updatedMessages = [...currentMessages, { role: 'user', content: text }];
    Store.set({ chatMessages: updatedMessages });

    input.value = '';
    input.style.height = 'auto';
    renderMessages();

    // Show loading
    status.classList.remove('hidden');
    sendBtn.disabled = true;

    try {
      // Send conversation history to Groq API
      const apiMessages = updatedMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await api('/api/chat', { messages: apiMessages });
      if (res && res.reply) {
        Store.set(st => ({ chatMessages: [...(st.chatMessages || []), { role: 'assistant', content: res.reply }] }));
      }
    } catch (err) {
      toast(err.message || 'Failed to get response', 'error');
      Store.set(st => ({ chatMessages: [...(st.chatMessages || []), { role: 'assistant', content: `⚠️ **Error:** ${err.message || 'Could not connect to AI service. Please verify your GROQ_API_KEY in .env.'}` }] }));
    } finally {
      status.classList.add('hidden');
      sendBtn.disabled = false;
      renderMessages();
      input.focus();
    }
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  input.onkeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat
  $('#chat-clear', main).onclick = () => {
    if (confirm('Clear chat history?')) {
      Store.set({
        chatMessages: [
          { role: 'assistant', content: 'Hello! I am **CampusOS AI**, your college tutor & study assistant. How can I help you today?\n\n- 💡 **Explain a topic or theorem**\n- 📝 **Review & summarize study material**\n- 💻 **Debug or explain code**\n- ✉️ **Draft an email to a professor**\n- 🎯 **Generate practice quiz questions**' }
        ]
      });
      renderMessages();
      toast('Chat history cleared');
    }
  };
}

// ---------- Init ----------
renderShell();
Router.init();
