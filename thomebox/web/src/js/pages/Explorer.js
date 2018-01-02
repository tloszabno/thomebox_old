import React from 'react';
import NodeElement from '../components/NodeElement'

const EMPTY_SET = new Set()
const EXPLORER_CLASS = "node-container"

export default class Explorer extends React.Component {
  constructor () {
    super()
    this.state = {
      elements: [
        {
          id: 1,
          name: 'Folder1',
          type: 'folder',
        },
        {
          id: 2,
          name: 'Folder2',
          type: 'folder',
        },
        {
          id: 3,
          name: 'Folder3',
          type: 'folder',
        },
        {
          id: 4,
          name: 'Folder4',
          type: 'folder',
        },
        {
          id: 5,
          name: 'Folder5',
          type: 'folder',
        },
        {
          id: 6,
          name: 'Folder6',
          type: 'folder',
        },
        {
          id: 7,
          name: 'Folder7',
          type: 'folder',
        },
        {
          id: 8,
          name: 'Folder8',
          type: 'folder',
        },
        {
          id: 9,
          name: 'file.jpg',
          type: 'file',
        },
        {
          id: 10,
          name: 'file2.jpg',
          type: 'file',
        },
        {
          id: 11,
          name: 'file3.jpg',
          type: 'file',
        },
        {
          id: 12,
          name: 'file12.jpg',
          type: 'file',
        },
        {
          id: 13,
          name: 'file3.jpg',
          type: 'file',
        },
        {
          id: 14,
          name: 'file4.jpg',
          type: 'file',
        },
        {
          id: 15,
          name: 'file5.jpg',
          type: 'file'
        }
      ],
      selectedElements: new Set([ 15 ])
    };
  }

  render () {
    return (
      <div className={EXPLORER_CLASS} onClick={(e) => this.emptySpaceClicked(e)}>
        {this.state.elements.map((el) =>
          (
            <NodeElement key={el.id} node={el} selected={this.state.selectedElements.has(el.id)}
                         onClick={this.elementClicked.bind(this)}
                         onDoubleClick={this.elementDoubleClicked.bind(this)}/>)
        )}
      </div>
    )
  }

  elementClicked (node) {
    const id = node.id
    let selectedElements = this.state.selectedElements
    if (selectedElements.has(id)) {
      selectedElements = EMPTY_SET
    } else {
      selectedElements = new Set([ id ])
    }
    this.setState(Object.assign({}, this.state, { selectedElements }))
  }

  elementDoubleClicked (node) {
    this.elementClicked(node)
    if (node.type == 'folder') {
      console.log("going to folder ", node.id)
      //handle open folder
    } else if (node.type == 'file') {
      //handle open file
    }
  }

  emptySpaceClicked (e) {
    if (e.target.classList.contains(EXPLORER_CLASS)) {
      this.setState(Object.assign({}, this.state, { selectedElements: EMPTY_SET }))
    }
  }
}