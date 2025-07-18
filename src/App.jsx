import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import OurTeam from "./pages/our-team";
import Categories from './pages/categories';
import FeedbackForm from './pages/feedback';
import Login from './pages/login';
import Signup from './pages/sign-up';
import EducationAcademics from './pages/education-academics';
import ScienceTechnology from './pages/science-technology';
import AnimeManga from './pages/anime-manga';
import LiteratureFiction from './pages/literature-fiction';
import CareerProfessional from './pages/career-professional';
import CodingComputerScience from './pages/coding-cse';
import CreativeEntertainment from './pages/creativity-entertainment';
import CurrentAffairs from './pages/currentAffairs-news';
import ForKids from './pages/for-kids';
import GovernmentExamPrep from './pages/government-exam';
import HindiSahitya from './pages/hindi-sahitya';
import HobbiesLifestyle from './pages/hobbies-lifestyle';
import LanguagesCulture from './pages/language-culture';
import MythologyHistory from './pages/mythology-history';
import SelfHelpLifestyle from './pages/selfHelp-lifestyle';
import SpiritualityReligion from './pages/spirituality-religion';
// import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
  <Route path="/about-us" element={<AboutUs />} />
  <Route path="/our-team" element={<OurTeam />} />
  <Route path="/categories" element={<Categories />} />
  <Route path="/feedback" element={<FeedbackForm />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/education-academics" element={<EducationAcademics />} />
  <Route path="/science-technology" element={<ScienceTechnology />} />
  <Route path="/anime-manga" element={<AnimeManga />} />
  <Route path="/career-professional" element={<CareerProfessional />} />
  <Route path="/coding-cse" element={<CodingComputerScience />} />
  <Route path="/creativity-entertainment" element={<CreativeEntertainment />} />
  <Route path="/currentAffairs-news" element={<CurrentAffairs/>} />
  <Route path="/for-kids" element={<ForKids />} />
  <Route path="/government-exam" element={<GovernmentExamPrep />} />
  <Route path="/hindi-sahitya" element={<HindiSahitya />} />
  <Route path="/hobbies-lifestyle" element={<HobbiesLifestyle />} />
  <Route path="/language-culture" element={<LanguagesCulture />} />
  <Route path="/literature-fiction" element={<LiteratureFiction />} />
   <Route path="/mythology-history" element={<MythologyHistory />} />
  <Route path="/selfHelp-lifestyle" element={<SelfHelpLifestyle />} />
  <Route path="/spirituality-religion" element={<SpiritualityReligion />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
