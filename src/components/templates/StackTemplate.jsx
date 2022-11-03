import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function StackTemplate({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
