import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function StackTemplate({ children }) {
  return (
    <div className="h-full min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
