import "./App.css";
import Advice from "./pages/Advice";
import Translate from "./pages/Translate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Routes>
            <Route path="/" element={<Advice />} />
            <Route path="translate" element={<Translate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
