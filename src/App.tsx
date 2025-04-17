import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StatsProvider } from "./contexts/StatsContext.tsx";
import Header from "./layouts/Header";
import Home from "./pages/HomePage";
import Stats from "./pages/StatsPage";
import "./App.css";

function App() {
  return (
    <StatsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </StatsProvider>
  );
}

export default App;
