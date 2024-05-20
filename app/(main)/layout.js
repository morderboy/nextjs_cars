import Footer from "./components/footer";
import Header from "./components/header";

export default function MainLayout({ children }) {
    return (
        <>
          <Header />
          {children}
          <Footer />
        </>
    );
  }