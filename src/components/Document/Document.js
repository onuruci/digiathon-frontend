import React from "react";
import { useState } from "react";

import Header from "../Header";

import { signer, signDocument } from "../../utils/interaction";

import "./document.css";

const Document = ({setSigner}) => {

  const [inputDoc, setInputDoc] = useState({
    name: "",
    surname: "",
    tc: "",
    date: "",
    amount: ""
  }
  );

  const handleChange = (e, val) => {
    let inputChanged = inputDoc;
    inputChanged[val] = e.target.value;
    setInputDoc(inputChanged);
  }

  const handleClick = async (doc, sign) => {
    console.log("DOC:   ", doc);

    let res = await signDocument(inputDoc, sign);

    console.log("HASH RES:   ", res);
  }

  return(
    <div>
      <Header setSigner={setSigner} bl={true}/>
      <div className="documentbody">
        <input type="text" placeholder="İsim" sign="name" onChange={e => handleChange(e, "name")}/>
        <input type="text" placeholder="Soy İsim" sign="surname" onChange={e => handleChange(e, "surname")}/>
        <input type="text" placeholder="TC No." sign="tc" onChange={e => handleChange(e, "tc")}/>
        <input type="text" placeholder="Tarih" sign="date" onChange={e => handleChange(e, "date")}/>
        <input type="text" placeholder="Miktar" sign="amount" onChange={e => handleChange(e, "amount")}/>
        <button onClick={() => handleClick(inputDoc, signer)}>Hash</button>
      </div>
     
    </div>
  );
};

export default Document;
