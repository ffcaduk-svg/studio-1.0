 "use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Halo! Saya My AI Studio. Hubungkan Gemini di server lalu mulai percakapan.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.text ?? data.error ?? "Tidak ada respons." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Gagal menghubungi server." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="logo">✦</span> My AI Studio</div>
        <nav>
          <a className="active">⌂ Dashboard</a>
          <a>◉ AI Chat</a>
          <a>◇ Agents</a>
          <a>↯ Workflows</a>
          <a>⌁ Tools</a>
          <a>◌ Memory</a>
          <a>▣ Files</a>
          <a>⬡ Models</a>
          <a>◫ Usage</a>
        </nav>
        <div className="sidebarBottom">
          <a>⚙ Settings</a>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">MY AI STUDIO</div>
            <h1>AI Workspace</h1>
          </div>
          <div className="status"><span /> Gemini ready</div>
        </header>

        <div className="grid">
          <section className="hero card">
            <div>
              <span className="pill">V1 • Gemini</span>
              <h2>Bangun dengan AI, dari satu tempat.</h2>
              <p>Fondasi awal untuk chat, agents, workflows, memory, tools, dan multi-model AI.</p>
            </div>
            <div className="heroGlow">✦</div>
          </section>

          <section className="stats">
            <div className="card stat"><small>AI REQUESTS</small><strong>0</strong><span>Belum ada data</span></div>
            <div className="card stat"><small>PROJECTS</small><strong>1</strong><span>Starter project</span></div>
            <div className="card stat"><small>MODELS</small><strong>1</strong><span>Gemini connected</span></div>
          </section>

          <section className="chat card">
            <div className="sectionHead">
              <div><small>PLAYGROUND</small><h3>AI Chat</h3></div>
              <select defaultValue="gemini"><option value="gemini">Gemini</option><option disabled>GPT — coming next</option><option disabled>Claude — coming next</option></select>
            </div>

            <div className="messages">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.role}`}>
                  <div className="avatar">{m.role === "user" ? "U" : "✦"}</div>
                  <div><b>{m.role === "user" ? "You" : "My AI Studio"}</b><p>{m.text}</p></div>
                </div>
              ))}
              {loading && <div className="typing">Gemini sedang berpikir…</div>}
            </div>

            <div className="composer">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Tulis pesan…"
                rows={2}
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()}>Kirim ↗</button>
            </div>
          </section>

          <section className="card roadmap">
            <div className="sectionHead"><div><small>ROADMAP</small><h3>Platform modules</h3></div></div>
            <div className="modules">
              <div><b>🤖 Agents</b><span>Next</span></div>
              <div><b>↯ Workflow Builder</b><span>Next</span></div>
              <div><b>🧠 Memory</b><span>Planned</span></div>
              <div><b>🔌 GPT + Claude</b><span>Planned</span></div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}