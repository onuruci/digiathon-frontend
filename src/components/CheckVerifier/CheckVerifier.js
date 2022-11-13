import React, { useEffect } from "react";

import Header from "../Header";

import './checkverify.css';

import { signer } from "../../utils/interaction";

import { verifyCheck } from "../../utils/interaction";


const CheckVerifier = ({setSigner, check}) => {

  useEffect(() => {
    verifyCheck(check["hash"], check["name"], check["value"]);
  }, [signer]);

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
          <div>
            Doğrulanmıştır
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CheckVerifier;