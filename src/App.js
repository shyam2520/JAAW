// import logo from './logo.svg';
import "./App.css";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Episodes } from "./components/Episodes";
import { NavBar } from "./components/NavBar";
import { MainHome } from "./components/Home";
function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Router>
          <Routes>
            <Route path={"/"} element={<MainHome />} />
            <Route path={`/search`} element={<SearchBar />} />

            <Route path={`/episodes/:show`} element={<Episodes />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
