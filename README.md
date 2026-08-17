# 🎓 CampusOS

> **Everything you need for college — in one unified operating system.**  
> An all-in-one student dashboard and AI-powered productivity suite built with Flask, TailwindCSS, and Groq LLMs (`llama-3.3-70b-versatile`).

---

## 🚀 Overview

**CampusOS** is designed to eliminate student overwhelm by bringing academics, daily planning, notes, budgeting, and AI tutoring into a single cohesive workspace. Powered by lightning-fast Groq inference, CampusOS transforms raw thoughts, class notes, and expenses into actionable schedules, flashcards, and structured insights.

---

## ✨ Key Features

### 1. 💬 AI Campus Assistant & Tutor
- Multi-turn AI academic assistant for debugging code, understanding complex concepts, brainstorming research, and drafting emails to professors.
- Fast responses powered by Groq's high-speed inference.

### 2. 💸 Natural Language Expense Tracker
- Log expenses using plain English (e.g., *"Spent 15 dollars on lunch at the student center"* or *"500 NPR for books yesterday"*).
- Automatic extraction of amounts, categories (Food, Rent, Books, Fun, Other), and ISO dates.
- Multi-currency support and real-time student budget tracking.

### 3. 📅 Smart Study Schedule Planner
- Input your assignments, due dates, and difficulty levels.
- Generates an optimized, day-by-day study schedule with recommended time slots and durations.

### 4. 📝 AI Note Summarizer & Flashcards
- Paste lecture notes or reading materials.
- Automatically generates concise 2–3 sentence summaries and active-recall flashcard question/answer pairs.

### 5. ✍️ Essay & Research Outliner
- Enter an essay topic, target word count, and tone (Academic, Persuasive, Informative, Creative).
- Generates a full structured outline with section headings, key arguments, and citation guidance.

### 6. ⚡ Command Palette & Modern UI
- **Command Palette** (<kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd>): Instant search across tools, notes, and actions.
- **Dark / Light Mode**: Seamless theme toggle tailored for late-night study sessions.
- **Offline-ready Local Storage**: Client-side state persistence for notes, budgets, and tasks.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.9+, [Flask 3.0.3](https://flask.palletsprojects.com/), [Gunicorn](https://gunicorn.org/)
- **AI / LLM Engine**: [Groq API](https://console.groq.com/) (`llama-3.3-70b-versatile`)
- **Frontend**: Vanilla JavaScript (Modular SPA Architecture with Custom Store & Router), [Tailwind CSS](https://tailwindcss.com/)
- **Typography & Icons**: Inter Font, SVG Icons

---

## 📦 Project Structure

```text
campus-os/
├── app.py                      # Flask backend & Groq AI API routes
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules for secrets and caches
├── README.md                   # Project documentation
├── static/
│   └── js/
│       ├── app.js              # Core UI views & application logic
│       ├── command-palette.js  # Cmd+K command palette overlay
│       ├── router.js           # Lightweight client-side SPA router
│       ├── store.js            # Local storage reactive state manager
│       └── utils.js            # Formatting, toast notifications & helpers
└── templates/
    └── index.html              # Main HTML entrypoint with Tailwind CDN
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/probablyishan/project-something.git
cd project-something
```

### 2. Create and Activate a Virtual Environment (Optional)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure API Key
Create your `.env` file from the example:
```bash
cp .env.example .env
```
Open `.env` and add your [Groq API Key](https://console.groq.com/keys):
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 5. Run the Application
```bash
python app.py
```
Open your browser and navigate to:
```
http://localhost:5000
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Open Command Palette |
| <kbd>Esc</kbd> | Close Modals / Command Palette |

---

## 📄 License
MIT License. Feel free to use and customize for your own campus needs!
