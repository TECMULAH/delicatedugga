import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Stockists from "./pages/Stockists";
import Painting from "./pages/Painting";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="stockists" element={<Stockists />} />
          <Route path="painting" element={<Painting />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
