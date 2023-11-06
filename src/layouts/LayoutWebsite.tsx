
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
const LayoutWebsite = () => {
  return (
    <div className="mx-auto top-0 lg:container ">
      <Header />
      {/* Outlet */}
      <section >
        <main className="max-w mx-auto ">
          <Outlet />
        </main>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutWebsite;
