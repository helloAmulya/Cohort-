import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
// import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import { CountContext } from "./components/CountContext.jsx";
import { useContext } from "react";

// lazy loading in react for optimisation
//  using React.lazy()
// example ->
const Dashboard = lazy(() => import("./components/Dashboard.jsx"));

function App() {
  
  const [count, setCount] = useState(0);
  
  const navigate = useNavigate();

  return (
    <div>
      {/* <AppBar /> */}
      {/* <Buttons count={count} setCount={setCount} /> */}
      <CountContext.Provider value={count}>
        <Count count={count} setCount={setCount} />
      </CountContext.Provider>
    </div>
  );
}

function AppBar() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "black" }}>
      <div>Hi this is the top bar</div>

      {/* traditional way for routing, to overcome the repeated reload/refresh, we use the useNavigate hook  */}
      <button
        // onClick={() => {
        //   window.location.href = "/dashboard";
        // }}
        onClick={() => navigate("/dashboard")}
      >
        btn Dashboard
      </button>
      <button
        // onClick={() => {
        //   window.location.href = "/";
        // }}
        onClick={() => navigate("/")}
      >
        btn Landing page
      </button>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={"loading..."}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={"loading..."}>
              <LandingPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

//  to overcome prop drilling , we use context api
function Count({ setCount }) {
  return (
    <div>
      <CountRender />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CountRender() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}
function Buttons({ setCount }) {
  const count = useContext(CountContext);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
