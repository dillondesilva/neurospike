import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ModeSelection from './screens/ModeSelection';
import LIFPlayground from './screens/LIFPlayground';
import AdExPlayground from './screens/AdExPlayground';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModeSelection />} />
        <Route path="/lif" element={<LIFPlayground/>} />
        <Route path="/adex" element={<AdExPlayground />} />
      </Routes>
    </Router>
  );
}

export default App;
