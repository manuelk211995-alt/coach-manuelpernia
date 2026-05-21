import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manuel Pernia | Coach de Voleibol",
  description:
    "Plataforma oficial de Manuel Pernia, entrenador profesional de voleibol. Programas de entrenamiento, calendario, recursos y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
