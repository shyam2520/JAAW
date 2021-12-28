import "./App.css";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Episodes } from "./components/Episodes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/Client";
import { NavBar } from "./components/NavBar";
import { MainHome } from "./components/Home";
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <NavBar />
        <div>
          <Router>
            <Routes>
              <Route path={"/"} element={<MainHome />} />
              <Route path={`/search`} element={<SearchBar />} />

              <Route path={`/episodes/:show/:id`} element={<Episodes />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
