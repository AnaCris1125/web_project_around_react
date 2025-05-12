
import React from "react";
import logo from "../../images/logo.png";
import line from "../../images/line.png";

function Header() {
    return (
            <header className="header">
            <img src={logo} alt="vector around" className="header__image" />
            <img src={line} alt="imagen linea" className="header__image-line" />
      </header>
    )
}

export default Header