import React from 'react';
import {Nav, Navbar,NavItem} from 'react-bootstrap';



export default class THomeBoxNavbar extends React.Component{
  constructor(){
    super();
    this.state = {
      appTitle: "tHomeBox"
    };
  }
  render (){
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{this.state.appTitle}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">File</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}