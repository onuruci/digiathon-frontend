import React from "react";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import SkyHome from "./components/SkyHome";
import Sections from "./components/Sections";

import { connectWallet, getCurrentWalletConnected } from "./utils/interaction";

function App() {
  const [signer, setSigner] = useState("");

  useEffect(() => {
    console.log("a");
    getCurrentWalletConnected(setSigner);
  }, []);

  useEffect(() => {
    console.log("Signerr:  ", signer);
  }, [signer]);

  return (
    <div className="App">
      <Header />
      <SkyHome />
      <Sections />

      {/* <button onClick={() => connectWallet(setSigner)}>Connect Button</button> */}
    </div>
  );
}

export default App;
