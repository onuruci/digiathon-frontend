import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import enterlogo from "../../utils/login.png";

import "./header.css";
import { signer } from "../../utils/interaction";

import { connectWallet, disconnectWallet } from "../../utils/interaction";

const Header = ({ setSigner, bl }) => {
  const [addr, setAddr] = useState("");

  const getAddr = async () => {
    setAddr(await signer.getAddress());
  };

  useEffect(() => {
    getAddr();
  }, [signer]);

  return (
    <div className={bl ? "hader bluee" : "header"}>
      <div className="headerContent">
        <Link to="/">
          <div className="logoDiv">
            <img
              className="logoImg"
              src="https://cdn.e-devlet.gov.tr/themes/izmir/images/ekapilogo.103.svg"
              alt=""
              srcset=""
            />
          </div>
        </Link>

        {signer === "" ? (
          <div className="loginButton" onClick={() => connectWallet(setSigner)}>
            <div className="loginContent">Giriş Yap</div>
            <img className="enterLogo" src={enterlogo} alt="" srcset="" />
          </div>
        ) : (
          <div className="loginButton">
            <div className="loginContent">
              {addr.slice(0, 9) + "..." + addr.slice(-5)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
