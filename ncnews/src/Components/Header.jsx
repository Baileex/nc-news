import React from 'react';
import styled from "styled-components"
import logo from "../img/cover.png";

const Heading1 = styled.h1`
  font-size: 54px;
  font-weight: bold;
  text-align: centre;
`;

const Header = () => {
  return (
    <div className="header">
      <img src={logo}></img>
    </div>
  );
};

export default Header;