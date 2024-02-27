import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
// import ThreeComponent from './ThreeComponent';
import ModeSelection from './screens/ModeSelection';
import LIFPlayground from './screens/LIFPlayground';
import AdExPlayground from './screens/AdExPlayground';

// function Hello() {
//   return (
//     <div>
//       <ThreeComponent />
//     </div>
//   );
// }

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModeSelection />} />
        <Route path="/lif" element={<LIFPlayground />} />
        <Route path="/adex" element={<AdExPlayground />} />
      </Routes>
    </Router>
  );
}
