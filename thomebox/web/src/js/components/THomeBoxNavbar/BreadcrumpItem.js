import React from 'react';
import {NavItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class BreadcrumpItem extends React.Component {
  render () {
    const { folder } = this.props
    return (
      <LinkContainer to={"/folder/" + folder.id}>
        <NavItem>
              <span className="breadcrumb-item">
                { folder.icon && (<Glyphicon glyph={folder.icon}/>) }
                <span>{folder.name}</span>
              </span>
        </NavItem>
      </LinkContainer>
    )
  }
}