import React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import BreadcrumpItem from '../components/THomeBoxNavbar/BreadcrumpItem'
import {connect} from "react-redux"

@connect((store) => {
  return {
    breadcrumpItems: store.explorer.breadcrumpItems
  }
})
export default class THomeBoxNavbar extends React.Component {
  constructor () {
    super();
    this.state = {
      appTitle: "tHomeBox"
    };
  }
  render () {
    const { breadcrumpItems } = this.props
    const { appTitle } = this.state
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>{appTitle}</Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="breadcrumb-nav">
            {breadcrumpItems.map((el) => <BreadcrumpItem key={el.id} folder={el}/>)}
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