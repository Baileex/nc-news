import React, { Component } from "react";
import * as api from "../api";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import styled from "styled-components"
import {Link} from "@reach/router"

const Navigate = styled.div`
margin-bottom: 10px
`


class MyNavbar extends Component {
  state = {
    topics: []
  };

  componentDidMount = () => {
    this.fetchTopics();
  };

  fetchTopics = () => {
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  };

  render() {
    const { topics } = this.state;
    return (
      <Navigate>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>NC News</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">Home </Link>
              <Link to="/articles"> Articles</Link>
              <NavDropdown title="Topics" id="basic-nav-dropdown">
                {topics.map(topic => {
                  return (
                    <NavDropdown.Item key={topic.slug}>
                      <Link to={`/articles?topic_slug=${topic.slug}`}>{topic.slug}</Link>
                    </NavDropdown.Item>
                  );
                })}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  Add New Topic
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Navigate>
    );
  }
}

export default MyNavbar;