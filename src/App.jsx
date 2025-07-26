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
import UserDashboard from './pages/userDashboard';
import SearchResults from './pages/searchResult';
import ReadBook from './pages/readBook';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './pages/edit-profile';
import Dashboard from './components/Dashboard';
import NotFound from './pages/NotFound'
import { useRef,useEffect ,useState} from 'react';
import axios from 'axios';

function App() {
  const storedUserId = localStorage.getItem("userId");
  const user = JSON.parse(localStorage.getItem("user"));

  const activeTimeRef = useRef(0); // total active seconds
  const [isActive, setIsActive] = useState(true);
  const idleTimer = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!user?._id) return;

    // Track activity and mark active
    const resetIdle = () => {
      setIsActive(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);

      // If user idle for 60s -> inactive
      idleTimer.current = setTimeout(() => setIsActive(false), 60000);
    };

    // Start interval to track active time every second
    intervalRef.current = setInterval(() => {
      if (isActive) {
        activeTimeRef.current += 1; // add 1 sec if user is active
      }
    }, 1000);

    // Events that reset idle timer
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", resetIdle);

    // Send data every minute & on exit
    const updateTime = async () => {
      const minutes = Math.floor(activeTimeRef.current / 60);
      if (minutes > 0) {
        await axios.post("https://api-routes.onrender.com/api/users/update-website-time", {
          userId: user._id,
          minutesRead: minutes,
        });
        console.log("✅ Active time saved:", minutes);
        activeTimeRef.current = 0; // reset after sending
      }
    };

    const intervalSave = setInterval(updateTime, 60000); // send every 1 min
    window.addEventListener("beforeunload", updateTime);

    return () => {
      updateTime();
      clearInterval(intervalRef.current);
      clearInterval(intervalSave);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("beforeunload", updateTime);
    };
  }, [user]);

  return (
    <BrowserRouter>
    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
         HEAD
        theme="dark"

       
      />
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
  <Route path="/dashboard" element={<Dashboard />}></Route>
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
  <Route path="/search" element={<SearchResults />} />
  <Route path="/read/:id" element={<ReadBook userId={storedUserId} />} />
  <Route path="/read" element={<ReadBook />} />
  <Route path="/userDashboard" element={<UserDashboard />} />
  <Route path="/edit-profile" element={<EditProfile />} />
   <Route path="*" element={<NotFound />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
