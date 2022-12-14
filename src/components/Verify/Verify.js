import React, { useEffect } from "react";
import { useState } from "react";

import Header from "../Header";

import { utils } from "ethers";

import { signer } from "../../utils/interaction";

import CONTRACT from "../../utils/contract";

import "./verify.css";
import axios from "axios";
import ENDPOINT from "../../utils/endpoint";

const Verify = ({setSigner}) => {

  const getValues = async () => {
    const result = await axios.get(ENDPOINT+"getdocs");
    const data = result.data;

    const domain = {
      name: "Ether Mail",
      version: "1",
      chainId: 43113,
      verifyingContract: CONTRACT,
    };

    const types = {
      check: [
        { name: "name", type: "string" },
        { name: "value", type: "string" },
      ],
    };

    const checkValue = {
      name: String(data.check.name),
      value: String(data.check.value),
    };

    const hash = data.hash.hash;

    


    console.log("RESULT:   ", data);
    console.log(utils.verifyTypedData(domain, types, checkValue, hash));

  };

  return(
    <div>
      <Header setSigner={setSigner}/>
      <button style={{marginTop: "25rem"}} onClick={() => getValues()}>Click</button>
    </div>
  );
};

export default Verify;