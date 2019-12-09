import styled from "styled-components";

export const Card = styled.li`
  width: 1000px;
  height: 250px;
  background-color: #fff;
  background: linear-gradient(#f8f8f8, #fff);
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin-top: 15rem;
  margin: 1.5rem;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
`;

export const Votes = styled.div`
  top: 15%;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.75em;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.15);
  padding: 0.125rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
  text-align: centre;
  position: absolute;
  top: 50%;
  left: 90%;
  -webkit-transform: translate(-50%, -50%);
`;

export const ArticleList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: space-around;
  position: absolute;
  padding-top: 3250px
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
`;
