import React from "react";

import "./skyhome.css";
import avaimage from '../../utils/avalanche.svg';

const SkyHome = () => {
  return(
    <div className="skyhome">
      <div className="skycontent"> 
        <div className="esignad">
          <div className="signhead">
            E İmza Nedir ?
          </div>
          <div className="signexp">
            E imza sizin imza yetkilerinizi blockchain üzerinden sağlayan, ve imzalanmış dosyaları blockhain güvenliğiyle doğrulayan kullanım kolaylığı ve güvenliği hedefleyen sistemdir
          </div>
        </div>
        <div className="esignlogo">
          <div className="avaimgcontainer">
            <img className="avaimage" src={avaimage} alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default SkyHome;