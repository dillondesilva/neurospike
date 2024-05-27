import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import ModeSelection from './screens/ModeSelection';
import LIFPlayground from './screens/LIFPlayground';
import AdExPlayground from './screens/AdExPlayground';

function App() {
  return (
      <Routes>
        <Route path="/*" element={<ModeSelection />} />
        <Route path="/lif" element={<LIFPlayground/>} />
        <Route path="/adex" element={<AdExPlayground />} />
      </Routes>
  );
}

export default App;
