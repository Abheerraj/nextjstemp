import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";
import ChatWidget from "./components/ChatWidget";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ListedItemsProvider } from "./context/ListedItemsContext";
import { BorrowedItemsProvider } from "./context/BorrowedItemsContext";

export const metadata: Metadata = {
  title: "Lendly - Share and Borrow with Your Community",
  description:
    "Share what you own, borrow what you need. Connect with your community to save money and reduce waste.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased relative font-sans">
        <DarkModeProvider>
          <ListedItemsProvider>
            <BorrowedItemsProvider>
              {/* Persistent Navigation Bar */}
              <NavigationBar />

              {/* Render Page-specific Content */}
              <main>{children}</main>

              {/* Footer */}
              <footer
                className="py-5 text-center text-xs text-white border-t border-neutral-200"
                style={{ backgroundColor: "#0B132B" }}
              >
                Powered by Next.js · Built for generous neighbours 🤝
              </footer>

              {/* Fixed Action Buttons */}
              <ChatWidget />
            </BorrowedItemsProvider>
          </ListedItemsProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}


