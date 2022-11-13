import { ethers, Wallet } from "ethers";
import { json } from "react-router-dom";
import CONTRACT from "./contract";
export var provider;
export var signer;
export var walletWithProvider;

var checkContract;

const axios = require("axios");
const checkabi = require("./checkabi.json");

export const executeRecete = async (hash, name, value) => {
  let bool = await checkContract.receteExecution(hash, name, value);
};

export const getUsed = async (hash, setUsed) => {
  let bool = await checkContract.usedSignatures(hash);
  setUsed(bool);
  console.log("BOOOL:  ", bool);
};

export const verifyCheck = async (hash, name, value, setAddr) => {
  console.log("AAAAAA");
  let addr = await checkContract.verify(hash, name, value);
  console.log(addr);
  setAddr(addr);
  return addr;
};

export const disconnectWallet = async (setSigner) => {
  const accounts = await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });

  const account = accounts[0];
  setSigner(account);
};

export const connectWallet = async (setSigner) => {
  if (window.ethereum) {
    await window.ethereum.enable();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    let add = await signer.getAddress();

    let hash = await signer.signMessage("Hello");
    console.log("Hash:   ", hash);

    let hashMessage = await ethers.utils.hashMessage("Hello");
    console.log("HASH MESSAGE:  ", hashMessage);

    let res = await ethers.utils.verifyMessage(
      "Hello",
      "0x7b163d47993578ad054399c7a7f2ba63d16b44f40a0e6d5f07432cc3bbe4413f17785bbf74203180df365fae176ea1bcac0c811ba65f10085d4f72e49512fa7d1c"
    );

    checkContract = new ethers.Contract(CONTRACT, checkabi, signer);

    console.log("RES:   ", res);

    setSigner(add);
    console.log("Signer:   ", signer);
    console.log("Procider:   ", provider);
  } else {
    return "You should install metamask";
  }
};

export const getCurrentWalletConnected = async (setSigner) => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = await provider.getSigner();
        let add = await signer.getAddress();

        setSigner(add);
        checkContract = new ethers.Contract(CONTRACT, checkabi, signer);
        console.log("Current: ", add);
      } else {
        return {
          address: "",
          status: "Connect Metamask",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "Error",
      };
    }
    console.log("Signer:   ", signer);
    console.log("Provider:   ", provider);
  } else {
    return {
      address: "",
      status: "Install Metamask",
    };
  }
};
