import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import StarField from './components/StarField';
import Snowfall from './components/Snowfall';
import CursorTrail from './components/CursorTrail';
import MusicToggle from './components/MusicToggle';
import PageTransition from './components/PageTransition';
import LockScreen from './pages/LockScreen';
import UnlockScreen from './pages/UnlockScreen';
import Home from './pages/Home';
import YouSection from './pages/YouSection';
import LittleThings from './pages/LittleThings';
import Surprise from './pages/Surprise';
import Letter from './pages/Letter';
import FunZone from './pages/FunZone';
import Moments from './pages/Moments';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LockScreen />} />
        <Route path="/unlock" element={<UnlockScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/you" element={<YouSection />} />
        <Route path="/little-things" element={<LittleThings />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/fun-zone" element={<FunZone />} />
        <Route path="/moments" element={<Moments />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Persistent background layers */}
      <StarField />
      <Snowfall />
      <CursorTrail />

      {/* Floating music toggle */}
      <MusicToggle />

      {/* Animated page routes */}
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
