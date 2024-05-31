import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import ModeSelection from './screens/ModeSelection';
import LIFPlayground from './screens/LIFPlayground';
import AdExPlayground from './screens/AdExPlayground';
import HHPlayground from './screens/HHPlayground';

function App() {
  return (
      <Routes>
        <Route path="/*" element={<ModeSelection />} />
        <Route path="/lif" element={<LIFPlayground/>} />
        <Route path="/adex" element={<AdExPlayground />} />
        <Route path="/hh" element={<HHPlayground />} />
      </Routes>
  );
}

export default App;
