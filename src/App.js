import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Episodes } from "./components/Episodes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/Client";
import { NavBar } from "./components/NavBar";
// import { MainHome } from "./components/Home";
const  MainHome  = lazy(()=>import('./components/Home')) 
  

const SearchResults = lazy(() => import("./components/Search_Results"));
const Episodes = lazy(() => import("./components/Episodes"));
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-black h-full min-h-screen">
        <div>
          <Router>
            <Routes>
              <Route
                path={"/"}
                element={
                  <div>
                    <NavBar />
                    <Suspense fallback={<div className="loading">Loading ...</div>}>
                    <MainHome />
                    </Suspense>
                  </div>
                }
              />
              <Route
                path={`/results/:animeName`}
                element={
                  <div>
                    <NavBar />
                    <Suspense
                      fallback={
                        <div className="loading">
                          Loading ...
                        </div>
                      }
                    >
                      {" "}
                      <SearchResults />
                    </Suspense>
                  </div>
                }
              />
              <Route
                path={`/episodes/:show/:id`}
                element={
                  <div>
                    <NavBar />
                    <Suspense
                      fallback={
                        <div className="loading">
                          Loading ...
                        </div>
                      }
                    >
                      <Episodes />
                    </Suspense>
                  </div>
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
