import React from 'react';
import FileListView from '../components/FileListView'

export default class Explorer extends React.Component {
  render () {
    return (
      <div>
        <h1>Folder Explorer id={this.props.match.params.id}</h1>
        <FileListView id={this.props.match.params.id} />
      </div>
    );
  }
}