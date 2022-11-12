import { ethers, Wallet } from "ethers";

export var provider;
export var signer;
export var walletWithProvider;

export const connectWallet = async (setSigner) => {
  if (window.ethereum) {
    await window.ethereum.enable();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    let add = await signer.getAddress();

    let hash = await signer.signMessage("Hello");
    console.log("Hash:   ", hash);

    let res = await ethers.utils.verifyMessage(
      "Hello",
      "0xb4b2b06e88cf2a6653cc522e618ed09aea48fbbd126dc92ae508a95c5a18f1db5cc44b3ca302acfdfaee79d33f24afe5013ca62d2a07537dd910e1479bc83a071c"
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
    console.log("Procider:   ", provider);
  } else {
    return {
      address: "",
      status: "Install Metamask",
    };
  }
};
