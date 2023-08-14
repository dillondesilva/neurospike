import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
// import ThreeComponent from './ThreeComponent';
import ModeSelection from './screens/ModeSelection';
import LIFPlayground from './screens/LIFPlayground';

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
      </Routes>
    </Router>
  );
}
