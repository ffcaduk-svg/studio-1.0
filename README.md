# My AI Studio — V1

Starter platform untuk membangun AI workspace sendiri.

## Fitur V1

- Dashboard UI
- AI Chat
- Gemini provider melalui server-side API route
- Struktur awal yang siap dikembangkan menjadi:
  - GPT provider
  - Claude provider
  - Agents
  - Workflow Builder
  - Memory
  - Files
  - Usage & billing

## Persyaratan

- Node.js
- npm atau pnpm
- Gemini API key

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env.local`.
2. Isi:

```env
GEMINI_API_KEY=API_KEY_KAMU
```

3. Install:

```bash
npm install
```

4. Jalankan:

```bash
npm run dev
```

5. Buka:

http://localhost:3000

## Keamanan

Jangan gunakan `NEXT_PUBLIC_GEMINI_API_KEY`. API key hanya dipakai di server melalui `app/api/chat/route.ts`.

## Roadmap

V1: Gemini chat
V2: provider abstraction + GPT + Claude
V3: agent builder
V4: React Flow workflow engine
V5: PostgreSQL + auth + memory + files
V6: deployment + usage + billing
