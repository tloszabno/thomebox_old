import React from 'react';
import {Glyphicon} from 'react-bootstrap'
import DownloadButton from './DownloadButton'
import {LinkContainer} from 'react-router-bootstrap'

export default class Folder extends React.Component {
  render () {
    return (
      <LinkContainer to={"/folder/" + this.props.folder.id}>
        <tr className={"clickable-row"}>
          <td>
            <Glyphicon glyph={"folder-open"}/><span className={"list-item-name"}>{this.props.folder.name}</span>
          </td>
          <td>
            {this.props.folder.size}
          </td>
          <td>
            {this.props.folder.modified}
          </td>
          <td>
            <DownloadButton elementId={this.props.folder.id}/>
          </td>
        </tr>
      </LinkContainer>
    )
  }
}