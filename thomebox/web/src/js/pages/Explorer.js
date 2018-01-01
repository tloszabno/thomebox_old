import React from 'react';
import NodeElement from '../components/NodeElement'

export default class Explorer extends React.Component {
  constructor () {
    super()
    this.state = {
      elements: [
        {
          id: 1,
          name: 'Folder1',
          type: 'folder',
          selected: false
        },
        {
          id: 2,
          name: 'Folder2',
          type: 'folder',
          selected: false
        },
        {
          id: 3,
          name: 'Folder3',
          type: 'folder',
          selected: false
        },
        {
          id: 4,
          name: 'Folder4',
          type: 'folder',
          selected: false
        },
        {
          id: 5,
          name: 'Folder5',
          type: 'folder',
          selected: false
        },
        {
          id: 6,
          name: 'Folder6',
          type: 'folder',
          selected: false
        },
        {
          id: 7,
          name: 'Folder7',
          type: 'folder',
          selected: false
        },
        {
          id: 8,
          name: 'Folder8',
          type: 'folder',
          selected: false
        },
        {
          id: 9,
          name: 'file.jpg',
          type: 'file',
          selected: false
        },
        {
          id: 10,
          name: 'file2.jpg',
          type: 'file',
          selected: false
        },
        {
          id: 11,
          name: 'file3.jpg',
          type: 'file',
          selected: false
        },
        {
          id: 12,
          name: 'file12.jpg',
          type: 'file',
          selected: false
        },
        {
          id: 13,
          name: 'file3.jpg',
          type: 'file',
          selected: false
        },
        {
          id: 14,
          name: 'file4.jpg',
          type: 'file',
          selected: false
        },
        {
          id: 15,
          name: 'file5.jpg',
          type: 'file',
          selected: true
        }
      ],
      selectedElements: new Set([ 15 ])
    };
  }

  render () {
    return (
      <div className="node-container">
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
      selectedElements = new Set()
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
    }else if( node.type == 'file'){
      //handle open file
    }
  }
}