import React from 'react';
import styled from "styled-components"

const Heading1 = styled.h1`
  font-size: 54px;
  font-weight: bold;
  text-align: centre;
`;

const Header = () => {
  return (
    <div>
      <Heading1>NC News</Heading1>
    </div>
  );
};

export default Header;