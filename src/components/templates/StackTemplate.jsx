import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function StackTemplate({ children }) {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="grow flex dark:bg-gray-800 text-gray-800 dark:text-white">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
