import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import OurTeam from "./pages/our-team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-team" element={<OurTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
