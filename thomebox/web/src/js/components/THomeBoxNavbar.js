import React from 'react';
import {Glyphicon, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import BreadcrumpItem from './THomeBoxNavbar/BreadcrumpItem'
import {connect} from "react-redux"
import explorer from '../reducers/explorerReducer'

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
    console.log("props", this.props)
    const { breadcrumpItems } = this.props
    const { appTitle } = this.state
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>{appTitle}</Navbar.Brand>
          </LinkContainer>
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