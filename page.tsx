"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    const text = message.trim();

    if (!text || loading) return;

    setMessage("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.ok
            ? data.text || "AI tidak memberikan jawaban."
            : data.error || "Terjadi kesalahan.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Tidak dapat terhubung ke server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="studio">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <aside className="sidebar">
        <div className="brand">
          <div className="logo">✦</div>

          <div>
            <strong>My AI Studio</strong>
            <span>Personal AI Workspace</span>
          </div>
        </div>

        <button className="new-chat">
          <span>＋</span>
          New conversation
        </button>

        <div className="menu-title">WORKSPACE</div>

        <button className="menu active">
          <span>◈</span>
          AI Chat
        </button>

        <button className="menu">
          <span>⌘</span>
          Agents
        </button>

        <button className="menu">
          <span>◇</span>
          Workflows
        </button>

        <button className="menu">
          <span>▣</span>
          Files
        </button>

        <div className="sidebar-bottom">
          <div className="status">
            <span className="online" />
            Gemini connected
          </div>

          <div className="version">
            My AI Studio <b>V2</b>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <div className="breadcrumb">WORKSPACE / AI CHAT</div>
            <h1>AI Conversation</h1>
          </div>

          <div className="top-actions">
            <div className="connection">
              <span className="online" />
              Online
            </div>

            <div className="avatar">S</div>
          </div>
        </header>

        <div className="chat-area">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="hero-icon">
                <span>✦</span>
              </div>

              <div className="badge">
                ✨ YOUR PERSONAL AI
              </div>

              <h2>
                What can I help
                <br />
                <span>you create today?</span>
              </h2>

              <p>
                Ask questions, build ideas, write code,
                <br />
                or let AI help you solve problems.
              </p>

              <div className="suggestions">
                <button
                  onClick={() =>
                    setMessage("Bantu saya membuat sebuah website modern")
                  }
                >
                  <span>✦</span>
                  Build something
                </button>

                <button
                  onClick={() =>
                    setMessage("Jelaskan cara kerja kecerdasan buatan")
                  }
                >
                  <span>◉</span>
                  Explain something
                </button>

                <button
                  onClick={() =>
                    setMessage("Bantu saya membuat ide aplikasi baru")
                  }
                >
                  <span>◇</span>
                  Generate ideas
                </button>
              </div>
            </div>
          ) : (
            <div className="messages">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`message-row ${
                    item.role === "user" ? "user-row" : "ai-row"
                  }`}
                >
                  {item.role === "ai" && (
                    <div className="mini-logo">✦</div>
                  )}

                  <div
                    className={`message ${
                      item.role === "user" ? "user-message" : "ai-message"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row ai-row">
                  <div className="mini-logo">✦</div>

                  <div className="message ai-message typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="composer-wrapper">
          <form className="composer" onSubmit={sendMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message your AI..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            />

            <div className="composer-bottom">
              <div className="tools">
                <button type="button">＋</button>
                <button type="button">⌁</button>
                <span>Shift + Enter for new line</span>
              </div>

              <button
                className="send"
                type="submit"
                disabled={loading || !message.trim()}
              >
                {loading ? "..." : "↑"}
              </button>
            </div>
          </form>

          <p className="disclaimer">
            AI can make mistakes. Check important information.
          </p>
        </div>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .studio {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 70% 20%,
              rgba(104, 72, 255, 0.14),
              transparent 30%
            ),
            radial-gradient(
              circle at 30% 80%,
              rgba(0, 210, 255, 0.08),
              transparent 28%
            ),
            #07070b;
          color: #f5f5f7;
          display: flex;
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .background-glow {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.12;
        }

        .glow-one {
          background: #6d5dfc;
          top: -100px;
          right: 20%;
        }

        .glow-two {
          background: #00d9ff;
          bottom: -120px;
          left: 20%;
        }

        .sidebar {
          width: 255px;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(10, 10, 15, 0.78);
          backdrop-filter: blur(20px);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 2;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 5px 8px 28px;
        }

        .logo,
        .mini-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #7c6cff, #43d9ff);
          color: white;
          box-shadow: 0 0 25px rgba(108, 92, 255, 0.35);
        }

        .logo {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          font-size: 20px;
        }

        .brand strong {
          display: block;
          font-size: 14px;
          letter-spacing: -0.2px;
        }

        .brand span {
          display: block;
          font-size: 10px;
          color: #73737e;
          margin-top: 3px;
        }

        .new-chat {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.055);
          color: white;
          border-radius: 12px;
          padding: 12px;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          margin-bottom: 30px;
          transition: 0.2s;
        }

        .new-chat:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .new-chat span {
          margin-right: 8px;
          color: #a99cff;
          font-size: 18px;
        }

        .menu-title {
          color: #555561;
          font-size: 9px;
          letter-spacing: 1.5px;
          margin: 0 10px 10px;
        }

        .menu {
          width: 100%;
          border: 0;
          background: transparent;
          color: #85858f;
          padding: 12px;
          text-align: left;
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
          margin-bottom: 3px;
        }

        .menu span {
          display: inline-block;
          width: 27px;
          color: #686875;
        }

        .menu.active {
          color: white;
          background: rgba(124, 108, 255, 0.12);
        }

        .menu.active span {
          color: #a99cff;
        }

        .sidebar-bottom {
          margin-top: auto;
          padding: 12px 8px 4px;
        }

        .status {
          color: #777782;
          font-size: 10px;
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 15px;
        }

        .online {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #43e39a;
          box-shadow: 0 0 10px #43e39a;
          display: inline-block;
        }

        .version {
          color: #41414a;
          font-size: 9px;
        }

        .version b {
          color: #6c6c77;
        }

        .workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        .topbar {
          height: 76px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          background: rgba(7, 7, 11, 0.4);
          backdrop-filter: blur(15px);
        }

        .breadcrumb {
          color: #555560;
          font-size: 8px;
          letter-spacing: 1.5px;
          margin-bottom: 5px;
        }

        .topbar h1 {
          font-size: 14px;
          margin: 0;
          font-weight: 600;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .connection {
          font-size: 10px;
          color: #72727d;
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #302d52, #181821);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa3ff;
          font-size: 11px;
        }

        .chat-area {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }

        .welcome {
          max-width: 720px;
          margin: 8vh auto 0;
          text-align: center;
        }

        .hero-icon {
          width: 68px;
          height: 68px;
          margin: 0 auto 20px;
          border-radius: 22px;
          background: rgba(124, 108, 255, 0.09);
          border: 1px solid rgba(124, 108, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9d91ff;
          font-size: 28px;
          box-shadow: 0 0 50px rgba(124, 108, 255, 0.12);
        }

        .badge {
          display: inline-block;
          color: #8e83ff;
          font-size: 8px;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }

        .welcome h2 {
          font-size: clamp(30px, 5vw, 48px);
          line-height: 1.08;
          letter-spacing: -2px;
          margin: 0;
        }

        .welcome h2 span {
          background: linear-gradient(90deg, #a69bff, #63ddff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .welcome p {
          color: #696974;
          font-size: 12px;
          line-height: 1.8;
          margin: 18px 0 30px;
        }

        .suggestions {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .suggestions button {
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.025);
          color: #9999a3;
          padding: 10px 13px;
          border-radius: 10px;
          font-size: 10px;
          cursor: pointer;
          transition: 0.2s;
        }

        .suggestions button:hover {
          border-color: rgba(130, 115, 255, 0.3);
          color: white;
          background: rgba(130, 115, 255, 0.08);
        }

        .suggestions span {
          color: #8f84ff;
          margin-right: 5px;
        }

        .messages {
          max-width: 820px;
          margin: 20px auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .message-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .user-row {
          justify-content: flex-end;
        }

        .mini-logo {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 9px;
          font-size: 13px;
        }

        .message {
          max-width: min(75%, 650px);
          padding: 13px 16px;
          border-radius: 15px;
          font-size: 13px;
          line-height: 1.65;
          white-space: pre-wrap;
        }

        .user-message {
          background: linear-gradient(135deg, #6559dc, #5146c4);
          border-bottom-right-radius: 4px;
          box-shadow: 0 8px 25px rgba(76, 65, 190, 0.15);
        }

        .ai-message {
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-bottom-left-radius: 4px;
          color: #c9c9d0;
        }

        .typing {
          display: flex;
          gap: 5px;
          padding: 17px;
        }

        .typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #8580d8;
          animation: pulse 1s infinite;
        }

        .typing span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .typing span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        .composer-wrapper {
          width: min(820px, calc(100% - 40px));
          margin: 0 auto 22px;
        }

        .composer {
          background: rgba(18, 18, 25, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 18px;
          padding: 13px;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
        }

        textarea {
          width: 100%;
          background: transparent;
          border: 0;
          outline: none;
          color: white;
          resize: none;
          font: inherit;
          font-size: 13px;
          padding: 5px 5px 12px;
        }

        textarea::placeholder {
          color: #555560;
        }

        .composer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tools {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tools button {
          border: 0;
          background: rgba(255, 255, 255, 0.05);
          color: #777783;
          width: 27px;
          height: 27px;
          border-radius: 8px;
          cursor: pointer;
        }

        .tools span {
          color: #44444d;
          font-size: 8px;
          margin-left: 5px;
        }

        .send {
          width: 35px;
          height: 35px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #776aff, #5146d5);
          color: white;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(103, 91, 255, 0.25);
        }

        .send:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          box-shadow: none;
        }

        .disclaimer {
          text-align: center;
          color: #3e3e47;
          font-size: 8px;
          margin: 8px 0 0;
        }

        @media (max-width: 700px) {
          .sidebar {
            display: none;
          }

          .topbar {
            height: 65px;
            padding: 0 18px;
          }

          .connection {
            display: none;
          }

          .chat-area {
            padding: 18px;
          }

          .welcome {
            margin-top: 10vh;
          }

          .welcome h2 {
            font-size: 34px;
          }

          .welcome p br {
            display: none;
          }

          .suggestions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .suggestions button {
            text-align: left;
          }

          .composer-wrapper {
            width: calc(100% - 24px);
            margin-bottom: 12px;
          }

          .tools span {
            display: none;
          }

          .message {
            max-width: 85%;
          }
        }
      `}</style>
    </main>
  );
}
