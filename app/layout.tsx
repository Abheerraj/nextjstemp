import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ListedItemsProvider } from "./context/ListedItemsContext";
import { BorrowedItemsProvider } from "./context/BorrowedItemsContext";
import NavBar from "./components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lendly",
  description: "Share what you own, borrow what you need",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeProvider>
          <ListedItemsProvider>
            <BorrowedItemsProvider>
              <NavBar />
              {children}
            </BorrowedItemsProvider>
          </ListedItemsProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}


