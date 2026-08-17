// utils.js — shared helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

function toast(message, type = 'success') {
  const colors = {
    success: 'bg-ink text-white dark:bg-slate-700',
    error: 'bg-red-600 text-white',
    info: 'bg-accent text-white',
  };
  const t = el('div', {
    class: `px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg fade-in ${colors[type] || colors.success}`,
  }, message);
  $('#toast-container').append(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 2500);
}

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function uid() { return Math.random().toString(36).slice(2, 10); }

function fmtMoney(n, customCurrency) {
  if (typeof n !== 'number') n = parseFloat(n) || 0;
  let curr = customCurrency;
  if (!curr && typeof Store !== 'undefined' && Store.get) {
    curr = Store.get().currency;
  }
  if (!curr) curr = { code: 'USD', symbol: '$' };
  if (typeof curr === 'string') {
    curr = { code: curr, symbol: curr };
  }

  const code = (curr.code || 'USD').toUpperCase();
  const symbol = curr.symbol || code;

  // Zero-decimal currencies
  const zeroDecimal = ['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'HUF', 'TWD', 'ISK'].includes(code);
  const maxDigits = zeroDecimal ? 0 : 2;
  const minDigits = zeroDecimal ? 0 : (n % 1 === 0 ? 0 : 2);

  try {
    // Try browser's native Intl currency formatter
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    }).format(n);
  } catch (e) {
    // Fallback for custom or non-standard ISO symbols/codes (e.g. NPR, custom symbols)
    const formattedNum = n.toLocaleString('en-US', {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return `${symbol} ${formattedNum}`;
  }
}

function fmtDate(d) {
  if (!d) return '';
  return new Date(d + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function copy(text) {
  navigator.clipboard.writeText(text).then(() => toast('Copied to clipboard'));
}

// Theme
const Theme = {
  get() { return localStorage.getItem('campusos_theme') || 'light'; },
  set(t) {
    localStorage.setItem('campusos_theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  },
  toggle() { this.set(this.get() === 'dark' ? 'light' : 'dark'); },
};
Theme.set(Theme.get());

// Icons (inline SVG strings)
const ICON = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16" cy="14" r="1.2" fill="currentColor"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  planner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="11" width="16" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  essay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>',
  quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10c0-3.3 2.7-6 6-6v3c-1.7 0-3 1.3-3 3h3v6H3v-6zm12 0c0-3.3 2.7-6 6-6v3c-1.7 0-3 1.3-3 3h3v6h-6v-6z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  calculator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>',
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="10" width="18" height="11" rx="3"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/><path d="M12 2v4M8 6h8M2 15h1M21 15h1"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
};

function icon(name, cls = 'w-5 h-5') {
  return `<span class="inline-block ${cls}">${ICON[name] || ''}</span>`;
}

function renderMarkdown(text) {
  if (!text) return '';
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks
  escaped = escaped.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="my-2 p-3 bg-slate-900 text-slate-100 dark:bg-black rounded-lg text-xs font-mono overflow-x-auto border border-slate-700"><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-accent font-mono text-xs">$1</code>');

  // Headings
  escaped = escaped.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold mt-2 mb-1 text-slate-800 dark:text-slate-100">$1</h3>');
  escaped = escaped.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold mt-2.5 mb-1.5 text-slate-900 dark:text-white">$1</h2>');
  escaped = escaped.replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold mt-3 mb-2 text-slate-900 dark:text-white">$1</h1>');

  // Bold & Italics
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>');
  escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Bullet lists
  escaped = escaped.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-4 list-disc text-xs sm:text-sm my-0.5">$1</li>');

  // Numbered lists
  escaped = escaped.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-xs sm:text-sm my-0.5">$2</li>');

  // Paragraph line breaks
  escaped = escaped.replace(/\n\n/g, '<div class="h-2"></div>');
  escaped = escaped.replace(/\n/g, '<br/>');

  return escaped;
}
