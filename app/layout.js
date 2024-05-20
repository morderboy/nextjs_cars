import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Сервисный центр",
  description: "Отслеживание истории ваших техосмотров",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
