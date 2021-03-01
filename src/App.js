/* eslint-disable react/jsx-filename-extension */
import React from "react";
import "./App.css";
import Todo from "./pages/Todo";
import Routes from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Navbar></Navbar>
    </Routes>
  );
}

export default App;
