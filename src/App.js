import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Episodes } from "./components/Episodes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/Client";
import { NavBar } from "./components/NavBar";
import { MainHome } from "./components/Home";
const SearchResults = lazy(() => import("./components/Search_Results"));
const Episodes = lazy(() => import("./components/Episodes"));
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-black h-full min-h-screen">
        <div>
          <Router>
            <Routes>
              {/* <Route path={"/*"} element={<NavBar />} /> */}
              <Route
                index
                element={
                  <div>
                    <NavBar />
                    <MainHome />
                  </div>
                }
              />
              <Route
                path={`results/:animeName`}
                element={
                  <Suspense
                    fallback={
                      <div className="text-white text-lg">Loading ...</div>
                    }
                  >
                    <div>
                      <NavBar />
                      <SearchResults />
                    </div>
                  </Suspense>
                }
              />
              <Route
                path={`/episodes/:show/:id`}
                element={
                  <Suspense
                    fallback={
                      <div className="text-white text-lg">Loading ...</div>
                    }
                  >
                    <div>
                      <NavBar />
                      <Episodes />
                    </div>
                  </Suspense>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
