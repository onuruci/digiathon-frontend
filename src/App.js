import React from "react";
import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home/Home";
import Document from "./components/Document/Document";
import './App.css';

import { connectWallet, getCurrentWalletConnected } from "./utils/interaction";

function App() {
  const [signer, setSigner] = useState("");

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("a");
    getCurrentWalletConnected(setSigner);
  }, []);

  useEffect(() => {
    console.log("Signerr:  ", signer);
  }, [signer]);

  return (
    <div className="App">
      <BrowserRouter>
      {
        windowDimensions.width >= 1200 ?
        <>
          <Routes>
            <Route
              path="/"
              element={
                <Home setSigner={setSigner}/>
              }
            />
            <Route
              path="/belgeler/:id"
              element={
                <Document>

                </Document>
              }
            />
          </Routes>
        </>
        :
        <div className="largescreens">
          This application is only available on large screens
        </div>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
