import React from 'react';
import {Glyphicon} from 'react-bootstrap'
import DownloadButton from './DownloadButton'

export default class Folder extends React.Component {
  render () {
    return (
      <tr className={"clickable-row"}>
        <td>
          <Glyphicon glyph={"file"}/><span className={"list-item-name"}>{this.props.file.name}</span>
        </td>
        <td>
          {this.props.file.size}
        </td>
        <td>
          {this.props.file.modified}
        </td>
        <td>
          <DownloadButton elementId={this.props.file.id}/>
        </td>
      </tr>
    )
  }
}