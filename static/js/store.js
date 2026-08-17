// store.js — localStorage-backed reactive state
const Store = (() => {
  const KEY = 'campusos_state_v1';
  const listeners = new Set();
  let state = load();

  const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'USD ($) — US Dollar' },
    { code: 'EUR', symbol: '€', name: 'EUR (€) — Euro' },
    { code: 'GBP', symbol: '£', name: 'GBP (£) — British Pound' },
    { code: 'INR', symbol: '₹', name: 'INR (₹) — Indian Rupee' },
    { code: 'NPR', symbol: 'रू', name: 'NPR (रू) — Nepalese Rupee' },
    { code: 'CAD', symbol: 'CA$', name: 'CAD ($) — Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'AUD ($) — Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'JPY (¥) — Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'CNY (¥) — Chinese Yuan' },
    { code: 'AED', symbol: 'AED', name: 'AED (د.إ) — UAE Dirham' },
    { code: 'SGD', symbol: 'S$', name: 'SGD ($) — Singapore Dollar' },
    { code: 'CHF', symbol: 'CHF', name: 'CHF (Fr) — Swiss Franc' },
    { code: 'KRW', symbol: '₩', name: 'KRW (₩) — South Korean Won' },
    { code: 'BRL', symbol: 'R$', name: 'BRL (R$) — Brazilian Real' },
    { code: 'PHP', symbol: '₱', name: 'PHP (₱) — Philippine Peso' },
    { code: 'MYR', symbol: 'RM', name: 'MYR (RM) — Malaysian Ringgit' },
    { code: 'THB', symbol: '฿', name: 'THB (฿) — Thai Baht' },
    { code: 'IDR', symbol: 'Rp', name: 'IDR (Rp) — Indonesian Rupiah' },
    { code: 'PKR', symbol: 'Rs', name: 'PKR (Rs) — Pakistani Rupee' },
    { code: 'BDT', symbol: '৳', name: 'BDT (৳) — Bangladeshi Taka' },
    { code: 'NGN', symbol: '₦', name: 'NGN (₦) — Nigerian Naira' },
    { code: 'ZAR', symbol: 'R', name: 'ZAR (R) — South African Rand' },
    { code: 'SEK', symbol: 'kr', name: 'SEK (kr) — Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: 'NOK (kr) — Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: 'DKK (kr) — Danish Krone' },
    { code: 'PLN', symbol: 'zł', name: 'PLN (zł) — Polish Zloty' },
    { code: 'TRY', symbol: '₺', name: 'TRY (₺) — Turkish Lira' },
    { code: 'MXN', symbol: '$', name: 'MXN ($) — Mexican Peso' },
    { code: 'NZD', symbol: 'NZ$', name: 'NZD ($) — New Zealand Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'HKD ($) — Hong Kong Dollar' },
  ];

  function defaults() {
    return {
      currency: { code: 'USD', symbol: '$', name: 'USD ($) — US Dollar' },
      expenses: [
        { id: id(), amount: 8.50, category: 'Food', description: 'Ramen at the dining hall', date: today() },
        { id: id(), amount: 45.00, category: 'Books', description: 'Used CS101 textbook', date: today(-2) },
        { id: id(), amount: 620.00, category: 'Rent', description: 'Apartment share — this month', date: today(-5) },
      ],
      budget: 1200,
      tasks: [
        { id: id(), title: 'CS101 Problem Set 4', priority: 'Urgent', due: today(3), status: 'todo' },
        { id: id(), title: 'Chem Lab Report', priority: 'Medium', due: today(7), status: 'todo' },
        { id: id(), title: 'Read Ch. 12 Microeconomics', priority: 'Chill', due: today(10), status: 'doing' },
      ],
      notebooks: [
        { id: id(), name: 'Chemistry', color: 'emerald' },
        { id: id(), name: 'CS101', color: 'indigo' },
        { id: id(), name: 'Personal', color: 'amber' },
      ],
      notes: [
        { id: id(), notebookId: null, title: 'Welcome note', content: '## Welcome to CampusOS Notes\n\nType here with **markdown**-style formatting. Use the AI button to summarize or make flashcards.', updated: Date.now() },
      ],
      passwords: [
        { id: id(), name: 'College Portal', username: 'alex@student.edu', password: 'Gr8ts!2024xK', url: 'portal.college.edu', strength: 'strong' },
        { id: id(), name: 'Library Login', username: 'alex42', password: 'bookworm99', url: 'library.college.edu', strength: 'weak' },
        { id: id(), name: 'Spotify', username: 'alex.music', password: 'Spot1fy#Student2024', url: 'spotify.com', strength: 'strong' },
      ],
      schedule: [
        { id: id(), title: 'CS101 Lecture', day: 'Mon', start: '09:00', end: '10:30', room: 'Eng 204', instructor: 'Prof. Chen', color: 'indigo' },
        { id: id(), title: 'Chemistry Lab', day: 'Tue', start: '13:00', end: '16:00', room: 'Sci 110', instructor: 'Dr. Patel', color: 'emerald' },
        { id: id(), title: 'Microeconomics', day: 'Wed', start: '11:00', end: '12:30', room: 'Bowl 3', instructor: 'Prof. Lee', color: 'amber' },
        { id: id(), title: 'CS101 Office Hours', day: 'Thu', start: '15:00', end: '16:00', room: 'Eng 410', instructor: 'Prof. Chen', color: 'indigo' },
        { id: id(), title: 'Chemistry Lecture', day: 'Fri', start: '10:00', end: '11:30', room: 'Sci 220', instructor: 'Dr. Patel', color: 'emerald' },
      ],
      courses: [
        { id: id(), name: 'CS101', credits: 4, grade: 'A' },
        { id: id(), name: 'Chemistry 201', credits: 3, grade: 'B+' },
        { id: id(), name: 'Microeconomics', credits: 3, grade: 'A-' },
      ],
      pomodoro: { count: 0, workMin: 25, breakMin: 5 },
      chatMessages: [
        { role: 'assistant', content: 'Hello! I am **CampusOS AI**, your college tutor & study assistant. How can I help you today?\n\n- 💡 **Explain a topic or theorem**\n- 📝 **Review & summarize study material**\n- 💻 **Debug or explain code**\n- ✉️ **Draft an email to a professor**\n- 🎯 **Generate practice quiz questions**' },
      ],
    };
  }

  function id() { return Math.random().toString(36).slice(2, 10); }
  function today(offset = 0) {
    const d = new Date(); d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      return { ...defaults(), ...JSON.parse(raw) };
    } catch { return defaults(); }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
    listeners.forEach(fn => fn(state));
  }

  return {
    currencies: CURRENCIES,
    get() { return state; },
    set(updater) {
      const next = typeof updater === 'function' ? updater(state) : updater;
      state = { ...state, ...next };
      save();
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    reset() { state = defaults(); save(); },
  };
})();
