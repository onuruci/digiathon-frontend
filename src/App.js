import React from "react";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import SkyHome from "./components/SkyHome";
import Sections from "./components/Sections";
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
      {
        windowDimensions.width >= 1400 ?
        <>
          <Header />
          <SkyHome />
          <Sections />
        </>
        :
        <div className="largescreens">
          This application is only available on large screens
        </div>
      }
      {/* <button onClick={() => connectWallet(setSigner)}>Connect Button</button> */}
    </div>
  );
}

export default App;
