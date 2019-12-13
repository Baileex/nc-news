import React, { Component } from "react";
import * as api from "../api";
import {
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import styled from "styled-components";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./ErrorPage"


const Navigate = styled.div`
position: fixed;
margin-top: 150px;
margin-bottom: 10px;
width: 100%
z-index:10;
@media only screen and (max-width: 425px ) {
  width: 95%
}
`;

class MyNavbar extends Component {
  state = {
    topics: [],
  };

  componentDidMount = () => {
    this.fetchTopics();
  };

  fetchTopics = () => {
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    }).catch(({response}) => {
      this.setState({
        error: {
          msg: response.data.msg,
          status: response.status
        }
      });
    })
  };


  render() {
    const { topics, error } = this.state;
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
    return (
      <Navigate>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/">NC News</Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/articles" className="link">
                Articles
              </Link>
              <NavDropdown title="Topics" id="basic-nav-dropdown">
                {topics.map(topic => {
                  return (
                    <li key={topic.slug} >
                      <Link to={`/topics/${topic.slug}`}>{topic.slug} </Link>
                    </li>
                  );
                })}
                <NavDropdown.Divider />
                <NavDropdown.Item>Add New Topic</NavDropdown.Item>
              </NavDropdown>
            </Nav>
              <Link to="/user">Logged in as: {this.props.loggedUser}</Link>
          </Navbar.Collapse>
        </Navbar>
      </Navigate>
    );
  }
}

export default MyNavbar;
