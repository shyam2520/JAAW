import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Episodes } from "./components/Episodes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/Client";
import { NavBar } from "./components/NavBar";
import { TopAnime } from "./components/TopAnime";
// import { MainHome } from "./components/Home";
const MainHome = lazy(() => import("./components/Home"));

const SearchResults = lazy(() => import("./components/Search_Results"));
const Episodes = lazy(() => import("./components/Episodes"));
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-black h-full min-h-screen">
        <div>
          <Router>
            <Routes>
              <Route path={"/"} element={<NavBar />}>
                <Route
                  index
                  element={
                    <Suspense
                      fallback={<div className="loading">Loading ...</div>}
                    >
                      <MainHome />
                    </Suspense>
                  }
                />
                <Route
                  path={`results/:animeName`}
                  element={
                    <Suspense
                      fallback={<div className="loading">Loading ...</div>}
                    >
                      <div className=" flex flex-row ">
                        <div className=" w-8/12 mx-10  ">
                          <SearchResults />
                        </div>
                        <div className="w-1/4"> <TopAnime /> </div>
                      </div>
                    </Suspense>
                  }
                />
                <Route
                  path={`episodes/:show/:id`}
                  element={
                    <Suspense
                      fallback={<div className="loading">Loading ...</div>}
                    >
                      <Episodes />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
