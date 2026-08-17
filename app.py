import os
import json
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from groq import Groq

env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)


def get_groq_client():
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        return None
    return Groq(api_key=api_key)


def ai_chat(messages, max_tokens=800, temperature=0.7):
    """Call Groq chat completions with a JSON-return preference."""
    client = get_groq_client()
    if not client:
        return None
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API error: {e}")
        return None


def safe_json(raw):
    """Best-effort parse of JSON from LLM output that may have code fences."""
    if not raw:
        return None
    text = raw.strip()
    if text.startswith("```"):
        # strip ```json ... ``` fences
        lines = text.split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        text = "\n".join(lines)
    try:
        return json.loads(text)
    except Exception:
        return None


@app.route("/")
def index():
    return render_template("index.html")


# ---------- AI endpoints ----------

@app.route("/api/parse-expense", methods=["POST"])
def parse_expense():
    data = request.get_json(force=True)
    text = (data or {}).get("text", "").strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400

    messages = [
        {
            "role": "system",
            "content": (
                "You parse natural-language student expense descriptions in any global currency into JSON. "
                "Extract the numeric amount as a pure number, stripping any currency symbols or currency names "
                "(e.g. $, €, £, Rs, रू, ₹, ¥, CAD, AUD, NPR, INR, EUR, USD, etc.). "
                "Return ONLY valid JSON, no prose. Keys: "
                'amount (number, positive float/integer), category (one of Food, Rent, Books, Fun, Other), '
                "description (short string describing the item or service, without currency words), "
                "date (ISO YYYY-MM-DD; interpret 'yesterday','today','last week' relative to now). "
                "If no date is mentioned, use today's date."
            ),
        },
        {"role": "user", "content": text},
    ]
    raw = ai_chat(messages, max_tokens=250, temperature=0.2)
    parsed = safe_json(raw)
    if not parsed or "amount" not in parsed:
        return jsonify({"error": "Could not parse expense", "raw": raw}), 422
    # Ensure amount is float/int
    try:
        parsed["amount"] = float(parsed["amount"])
    except (ValueError, TypeError):
        parsed["amount"] = 0
    return jsonify(parsed)


@app.route("/api/study-schedule", methods=["POST"])
def study_schedule():
    data = request.get_json(force=True)
    tasks = (data or {}).get("tasks", [])
    if not tasks:
        return jsonify({"error": "No tasks provided"}), 400

    messages = [
        {
            "role": "system",
            "content": (
                "You are a study planner. Given a list of tasks with difficulty and due dates, "
                "produce a day-by-day study schedule as JSON. Return ONLY valid JSON: "
                '{"schedule": [{"date":"YYYY-MM-DD","slots":[{"time":"HH:MM","task":"...","duration_min":60}]}]}. '
                "Distribute work so harder/earlier tasks get more time. Keep slots between 30-120 min."
            ),
        },
        {"role": "user", "content": json.dumps(tasks)},
    ]
    raw = ai_chat(messages, max_tokens=900, temperature=0.5)
    parsed = safe_json(raw)
    if not parsed:
        return jsonify({"error": "Could not generate schedule", "raw": raw}), 422
    return jsonify(parsed)


@app.route("/api/summarize-notes", methods=["POST"])
def summarize_notes():
    data = request.get_json(force=True)
    notes = (data or {}).get("notes", "").strip()
    if not notes:
        return jsonify({"error": "No notes provided"}), 400

    messages = [
        {
            "role": "system",
            "content": (
                "You summarize student notes and generate flashcards. Return ONLY valid JSON: "
                '{"summary":"2-3 sentence summary","flashcards":[{"question":"...","answer":"..."}]}. '
                "Produce 4-6 flashcards."
            ),
        },
        {"role": "user", "content": notes},
    ]
    raw = ai_chat(messages, max_tokens=700, temperature=0.4)
    parsed = safe_json(raw)
    if not parsed:
        return jsonify({"error": "Could not summarize", "raw": raw}), 422
    return jsonify(parsed)


@app.route("/api/essay-outline", methods=["POST"])
def essay_outline():
    data = request.get_json(force=True)
    topic = (data or {}).get("topic", "").strip()
    word_count = (data or {}).get("word_count", 1000)
    tone = (data or {}).get("tone", "Academic")
    if not topic:
        return jsonify({"error": "No topic provided"}), 400

    messages = [
        {
            "role": "system",
            "content": (
                "You generate structured essay outlines for college students. "
                "Return ONLY valid JSON: "
                '{"title":"...","sections":[{"heading":"Introduction","key_arguments":["..."],'
                '"bullet_points":["..."],"citations":["placeholder citation 1"]}]}]. '
                f"Target ~{word_count} words, {tone} tone. Include 4-6 sections."
            ),
        },
        {"role": "user", "content": topic},
    ]
    raw = ai_chat(messages, max_tokens=1200, temperature=0.6)
    parsed = safe_json(raw)
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    messages = (data or {}).get("messages", [])
    if not messages:
        return jsonify({"error": "No messages provided"}), 400

    system_prompt = (data or {}).get("system_prompt") or (
        "You are CampusOS AI, a knowledgeable, supportive, and brilliant college tutor and student assistant. "
        "Help students learn concepts, debug code, brainstorm study plans, format citations, draft emails to professors, "
        "and solve academic problems. Use concise, structured markdown, bullet points, and code blocks where helpful."
    )

    full_messages = [{"role": "system", "content": system_prompt}] + [
        {"role": m.get("role", "user"), "content": m.get("content", "")} for m in messages
    ]

    client = get_groq_client()
    if not client:
        return jsonify({"error": "GROQ_API_KEY is not configured in .env"}), 500
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=full_messages,
            max_tokens=1500,
            temperature=0.7,
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Chat API error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
