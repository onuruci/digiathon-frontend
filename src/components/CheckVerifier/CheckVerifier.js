import React, { useEffect, useState } from "react";

import Header from "../Header";

import './checkverify.css';
import qr from "../../utils/qr-code.png"

import { signer } from "../../utils/interaction";

import { verifyCheck } from "../../utils/interaction";
import { executeRecete } from "../../utils/interaction";
import { getUsed } from "../../utils/interaction";


const CheckVerifier = ({setSigner, check}) => {

  const [addr, setAddr] = useState("");
  const [used, setUsed] = useState(false);

  useEffect(() => {
    verifyCheck(check["hash"], check["name"], check["value"], setAddr);
    getUsed(check["hash"], setUsed);
  }, [signer]);

  const executedoc = async () => {
    executeRecete(check["hash"], check["name"], check["value"]);
  };

  return(
    <div>
      <Header setSigner={setSigner} bl={true}/>
      <div className="verifierbody">
        <div className="checkinfo">
          <div className="checkvar">
            <div className="wg">İsim:</div>  
            <div className="ml">
              {check["name"]}
            </div> 
          </div>
          <div className="checkvar">
            
            <div className="wg">Miktar: </div>  
            <div className="ml">
              {check["value"]}
            </div> 
          </div>
          <div className="checkvar">
            <div className="wg">Şifre: </div>  
            <div className="ml">
              {check["hash"].slice(0, 18)+"..."+check["hash"].slice(-5)}
            </div> 
          </div>
          <div className="checkvar">
            
            <div className="wg">İmza Adresi: </div>  
            <div className="ml">
              {check["address"]}
            </div> 
          </div>
        </div>
        <div className="verifyInfo">
          {
            check["address"] === addr ?
            <div>
              <div className="truew">
                Doğrulanmıştır
              </div>
              {
                !used ? <div className="usebutton" onClick={()=> executedoc()}>
                Belgeyi Kullan
              </div> : <div>
                Belge Kullanılmıştır
              </div>
              }
              <div>
                <img style={{width: "16rem", marginTop: "2rem"}} src={qr} alt="" />
              </div>
              
            </div>:
            <div>
              <div className="wrongw">
                Yanlış Hash
              </div>
            </div>
          }
        </div>
      </div>
      
    </div>
  );
};

export default CheckVerifier;