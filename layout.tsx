import "./globals.css";

export const metadata = {
  title: "My AI Studio",
  description: "A multi-model AI workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}