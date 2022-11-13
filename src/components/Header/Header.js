import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import enterlogo from "../../utils/login.png";

import "./header.css";
import { signer } from "../../utils/interaction";
import TcPop from "../TcPop";

import { connectWallet, disconnectWallet } from "../../utils/interaction";

const Header = ({ setSigner, bl }) => {
  const [addr, setAddr] = useState("");
  const [tc, setTc] = useState("");
  const [pop, setPop] = useState(false);

  const getAddr = async () => {
    setAddr(await signer.getAddress());
  };

  const handleTCIN = () => {
    setPop(false);
    if (tc.length == 11) {
      connectWallet(setSigner);
    }
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

        {addr === "" ? (
          <div className="loginButton" onClick={() => setPop(true)}>
            <div className="loginContent">Giriş Yap</div>
            <img className="enterLogo" src={enterlogo} alt="" srcset="" />
            {pop ? (
              <div className="tc">
                <div className="tcpop">
                  <input
                    type="text"
                    value={tc}
                    onChange={(e) => setTc(e.target.value)}
                  />
                  <button onClick={() => handleTCIN()}>Onayla</button>
                </div>
              </div>
            ) : null}
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
