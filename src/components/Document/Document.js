import React, { useEffect } from "react";
import { useState } from "react";

import { ethers, utils } from "ethers";

import Header from "../Header";

import { signer } from "../../utils/interaction";
import CONTRACT from "../../utils/contract";

import "./document.css";
import axios from "axios";
import { _TypedDataEncoder } from "ethers/lib/utils";
import { Link } from "react-router-dom";

const Document = ({setSigner, setCheck}) => {
  const [tab, setTab] = useState(1);
  const [checkArr, setCheckArr] = useState([]);

  const [inputDoc, setInputDoc] = useState({
    name: "",
    surname: "",
    tc: "",
    date: "",
    value: ""
  }
  );

  useEffect(() => {
    getChecks();
  }, [signer]);

  const handleChange = (e, val) => {
    let inputChanged = inputDoc;
    inputChanged[val] = e.target.value;
    setInputDoc(inputChanged);
  }

  const handleClick = async (doc, sign) => {
    console.log("DOC:   ", doc);

    let res = await signCheck(inputDoc, sign);

    console.log("HASH RES:   ", res);
  }

  const signCheck = async (inputDoc, sign) => {

    const domain = {
      name: "Ether",
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

    const check = {
      name: String(inputDoc.name),
      value: String(inputDoc.value)
    };



  let hash = await sign._signTypedData(domain, types, check);


  console.log("HASH ITSELF:   ", hash);


  let resultt = utils.verifyTypedData(domain, types, check, hash);

  console.log("RESULTT :   " , resultt);

  let save = await axios.post("http://localhost:3000/newDoc", {
    name: check.name,
    value: check.value,
    hash: hash,
    address: await signer.getAddress()
  });

  console.log("Hash:   ", hash);
  console.log("Savee:  ", save.data);
};

///// GEt CHECKS

const getChecks = async () => {
  let addr = await signer.getAddress();
  let value = await axios.post("http://localhost:3000/getchecks", {
    addr: addr
  });
  
  console.log("VALUES:  ", value.data.checks);
  console.log(await signer.getAddress());

  setCheckArr([...value.data.checks]);
  console.log(checkArr);
};

const handleTabSelect = (num) => {
  setTab(num);
};


  return(
    <div>
      <Header setSigner={setSigner} bl={true}/>
      <div className="tabber">
        <div className={tab === 1 ? "tabel selectedTab" : "tabel"} onClick={() => handleTabSelect(1)} >İmzaladığım Çekler</div>
        <div className={tab === 2 ? "tabel selectedTab" : "tabel"} onClick={() => handleTabSelect(2)}>Yeni Çek İmzala</div>
      </div>
      {
        tab === 1 ? 
        <div className="checkgrid">
          {
            checkArr.map(check => {
              return(<div className="checkbox" onClick={() => setCheck(check)}>
                <Link to="/belge_dogrula/1" val="A">
                  <div>
                    İsim: {check["name"]}
                  </div>
                  <div>
                    Miktar: {check.value}
                  </div>
                </Link>
              </div>)
            })
          }
        </div>:
        <div className="documentbody">
          <input type="text" placeholder="İsim" sign="name" onChange={e => handleChange(e, "name")}/>
          <input type="text" placeholder="Soy İsim" sign="surname" onChange={e => handleChange(e, "surname")}/>
          <input type="text" placeholder="TC No." sign="tc" onChange={e => handleChange(e, "tc")}/>
          <input type="text" placeholder="Tarih" sign="date" onChange={e => handleChange(e, "date")}/>
          <input type="text" placeholder="Miktar" sign="amount" onChange={e => handleChange(e, "value")}/>
          <button onClick={() => handleClick(inputDoc, signer)}>İmzala</button>
          <button onClick={() => getChecks()}>GET VALUES</button>
        </div>
      }
    </div>
  );
};

export default Document;
