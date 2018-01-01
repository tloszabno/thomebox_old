import React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class THomeBoxNavbar extends React.Component {
  constructor () {
    super();
    this.state = {
      appTitle: "tHomeBox"
    };
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>{this.state.appTitle}</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Administrator" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Logout</MenuItem>
            </NavDropdown>
            <LinkContainer to="/settings">
              <NavItem eventKey={4}><Glyphicon glyph={"cog"}/></NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}