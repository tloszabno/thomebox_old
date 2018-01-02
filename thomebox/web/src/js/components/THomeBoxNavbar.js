import React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import BreadcrumpItem from './THomeBoxNavbar/BreadcrumpItem'

export default class THomeBoxNavbar extends React.Component {
  constructor () {
    super();
    this.state = {
      appTitle: "tHomeBox",
      breadcrumpItems: [
        { id: 1, name: 'Home', icon:'home' }, { id: 2, name: 'Photos2' }, { id: 3, name: 'Holiday 2017' }
      ]
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
          <Nav className="breadcrumb-nav">
            { this.state.breadcrumpItems.map( (el) => <BreadcrumpItem key={el.id} folder={el}/>) }
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Administrator" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Logout</MenuItem>
            </NavDropdown>
            <LinkContainer to="/settings">
              <NavItem eventKey={4}><Glyphicon glyph="cog"/></NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}