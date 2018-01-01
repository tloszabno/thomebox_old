import React from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Glyphicon} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

const DESC = 'desc'
const A_IS_FIRST = -1
const B_IS_FIRST = 1
const EQUAL = 0

function folderTypeCompare (a, b) {
  if (a.type == 'folder' && b.type != 'folder') {
    return A_IS_FIRST
  }
  if (a.type != 'folder' && b.type == 'folder') {
    return B_IS_FIRST
  }
  return EQUAL
}

export default class FileListView extends React.Component {

  constructor () {
    super();
    this.state = {
      items: [
        {
          id: '7767',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59',
          type: 'folder'
        },
        {
          id: '121210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58',
          type: 'folder'
        },
        {
          id: '171212',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59',
          type: 'folder'
        },
        {
          id: '171210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58',
          type: 'folder'
        },
        {
          id: '161212',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59',
          type: 'folder'
        },
        {
          id: '151210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58',
          type: 'folder'
        }, {
          id: '131212',
          name: 'd1',
          size: null,
          modified: '2017-12-28 18:59',
          type: 'folder'
        },
        {
          id: '131210',
          name: 'd2',
          size: null,
          modified: '2017-12-28 18:58',
          type: 'folder'
        },
        {
          id: '131213',
          name: 'f1',
          size: '1kb',
          modified: '2017-12-28 18:59',
          type: 'file'
        },
        {
          id: '121215',
          name: 'f2',
          size: '2kb',
          modified: '2017-12-28 18:58',
          type: 'file'
        }
      ]
    }
  }

  //TODO: separate component
  itemNameFormatter (cell, row) {
    const { type } = row
    const glyphIcon = type === 'file' ? 'file' : 'folder-open'
    return (
      <span>
        <Glyphicon glyph={glyphIcon}/><span className={"list-item-name"}>{cell}</span>
      </span>
    )
  }

  sortByName (a, b, order) {
    const folderCompare = folderTypeCompare(a, b)
    if (folderCompare != EQUAL) {
      return folderCompare
    }

    const factor = order == DESC ? -1 : 1;
    return a.name.localeCompare(b.name) * factor
  }

  render () {
    const selectRowProp = {
      mode: 'radio',
      bgColor: '#ccc',
      clickToSelect: true,
      hideSelectColumn: true
    };

    return (
      <BootstrapTable data={this.state.items} striped selectRow={selectRowProp} search>
        <TableHeaderColumn isKey dataField='id' hidden></TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataFormat={this.itemNameFormatter} dataSort
                           sortFunc={this.sortByName}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='size'>Size</TableHeaderColumn>
        <TableHeaderColumn dataField='modified'>Modified</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}