import React from 'react';
import {Glyphicon} from 'react-bootstrap'
import DownloadButton from './DownloadButton'

export default class Folder extends React.Component {
  render () {
    return (
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
    )
  }
}