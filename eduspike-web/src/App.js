import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ModeSelection from './screens/ModeSelection';
import LIFPlayground from './screens/LIFPlayground';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModeSelection />} />
        <Route path="/lif" element={<LIFPlayground mode={"default"} />} />
        <Route path="/lif/zero-step-current" element={<LIFPlayground mode={"default"} />} />
      </Routes>
    </Router>
  );
}

export default App;
