import React from 'react';
import THomeBoxNavbar from './THomeBoxNavbar';
import FileListView from './FileListView'

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <THomeBoxNavbar/>
        <FileListView />
      </div>
    );
  }
}