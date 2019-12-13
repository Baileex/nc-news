import React, { Component } from 'react';
import styled from "styled-components";

export const StyledSearchBlock = styled.div`
  color: #3c3c3b;
  display: flex;
  justify-content: flex-start;
  padding-left: 10%;
  label {
    padding-right: 2%;
    font-size: 15px;
  }
  input {
    font-size: 15px;
    border: 1px solid #3c3c3b;
    border-radius: 5px;
    ::placeholder {
      padding-left: 5%;
    }
  }
`;

class SearchBar extends Component {
  state = {
    searchInput: ""
  }
  
  handleInput = event =>{

    const inputValue = event.target.value
    this.setState((currentState)=>{
      return  {searchInput : inputValue}
    },()=>{
      this.props.stateUpdater(this.state.searchInput)
    })
  }



  render() {
    return (
      <StyledSearchBlock>
        <label className="inputLabel" htmlFor="searchInput">
          Search for article:
        </label>
        <input
          className="searchInput"
          id="searchInput"
          value={this.state.searchInput}
          placeholder="Name"
          onChange={this.handleInput}
        ></input>
      </StyledSearchBlock>
    );
  }
}

export default SearchBar;