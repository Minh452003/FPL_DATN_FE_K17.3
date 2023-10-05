
import Homeslides from "@/components/Homeslides";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
const LayoutWebsite = () => {
  return (
    <div className="mx-auto top-0 lg:container ">
     <Header/>
      {/* Homeslides */}
      <section className="mx-auto">
        <Homeslides />
      </section>
      {/* Outlet */}
      <section>
        <main className="max-w mx-auto mt-10">
          <Outlet />
        </main>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutWebsite;
