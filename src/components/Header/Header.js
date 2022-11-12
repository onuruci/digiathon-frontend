import React from "react";

import enterlogo from "../../utils/login.png";

import './header.css';

import { connectWallet } from "../../utils/interaction";

const Header = () => {
  return(
    <div className="header">
      <div className="headerContent">
        <div className="logoDiv">
          <img className="logoImg" src="https://cdn.e-devlet.gov.tr/themes/izmir/images/ekapilogo.103.svg" alt="" srcset="" />
        </div>

        <div className="loginButton" onClick={() => connectWallet()}>
          <div className="loginContent">
            Giriş Yap
            
          </div>
          <img className="enterLogo" src={enterlogo} alt="" srcset="" />
        </div>
      </div>
      
    </div>
  );
};

export default Header;