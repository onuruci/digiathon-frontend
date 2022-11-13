import { ethers, Wallet } from "ethers";
import { json } from "react-router-dom";

export var provider;
export var signer;
export var walletWithProvider;

export const signCheck = async () => {
  const domain = {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Id: [
      { name: "name", type: "string" },
      { name: "surname", type: "string" },
      { name: "tc", type: "string" },
      { name: "value", type: "string" },
      { name: "med", type: "array" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "Id" },
    ],
  };

  const checkValue = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: {
      name: "emre",
      surname: "istaken",
      tc: "123546789",
      date: "12/11/22",
      value: "150",
    },
  };

  let hash = await signer._signTypedData(domain, types, checkValue);
  console.log("Hash:   ", hash);
  return hash;
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
    console.log(hashMessage);

    let res = await ethers.utils.verifyMessage(
      "Hello",
      "0x7b163d47993578ad054399c7a7f2ba63d16b44f40a0e6d5f07432cc3bbe4413f17785bbf74203180df365fae176ea1bcac0c811ba65f10085d4f72e49512fa7d1c"
    );

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
