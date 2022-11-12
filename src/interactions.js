import { ethers } from "ethers";
import {useState} from "react";

function Interactions() {
    const [account, setAccount] = useState("");
    const [provider, setProvider] = useState(null);
  
    function connect() {
      if (!window.ethereum) {
        alert("Metamask is not installed");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      provider.send("eth_requestAccounts", []).then((accounts) => setAccount(accounts[0])).catch((err) => console.log(err));
    }
  
    function verify(params) {
      
    }

    function sign(message, ) {
        hash = ethers.utils.keccak256(message);

    }
    
    return ();
  }
  
  export default Interactions;