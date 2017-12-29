import React from 'react';

import {Table} from 'react-bootstrap'
import Header from './FileListView/Header'
import Folder from './FileListView/Folder'
import File from './FileListView/File'

export default class FileListView extends React.Component {

  constructor () {
    super();
    this.state = {
      folders: [
        {
          id: '7767',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59'
        },
        {
          id: '121210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58'
        },
        {
          id: '171212',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59'
        },
        {
          id: '171210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58'
        },
        {
          id: '161212',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59'
        },
        {
          id: '151210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58'
        }, {
          id: '131212',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59'
        },
        {
          id: '131210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58'
        }
      ],
      files: [
        {
          id: '131213',
          name: 'f1',
          size: '1kb',
          modified: '2017-12-28 18:59'
        },
        {
          id: '121215',
          name: 'f2',
          size: '2kb',
          modified: '2017-12-28 18:58'
        }
      ]
    }
  }

  createFolders (folders) {
    return folders.map((folder) => <Folder key={folder.id} folder={folder}></Folder>)
  }

  createFiles (files) {
    return files.map((file) => <File key={file.id} file={file} />)
  }

  render () {
    console.log(this.props.id)
    return (
      <Table className={"header-fixed"}>
        <Header/>
        <tbody>
        {this.createFolders(this.state.folders)}
        {this.createFiles(this.state.files)}
        </tbody>
      </Table>
    );
  }
}