# Medical Consultant AI Assistant

An interactive AI-powered medical consultation assistant built with Flask and the Groq API.

## Features
- Real-time symptom analysis and preliminary guidance
- Interactive consultation interface
- Smart keyboard command palette
- Fast, responsive design

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/probablyishan/project-something.git
   cd project-something
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your [Groq API Key](https://console.groq.com/keys) to `.env`:
     ```env
     GROQ_API_KEY=your_groq_api_key_here
     ```

4. **Run the application:**
   ```bash
   python app.py
   ```
   Open `http://localhost:5000` in your web browser.
