import React from 'react';
import NodeElement from '../components/NodeElement'
import {connect} from 'react-redux'
import {changeCurrentFolderTo, changeCurrentFolderToHome} from "../actions/explorerActions"

const EMPTY_SET = new Set()
const EXPLORER_CLASS = "node-container"

@connect((store) => {
  return {
    elements: store.explorer.elements
  }
})
export default class Explorer extends React.Component {
  constructor () {
    super()
    this.state = { selectedElements: new Set() }
  }

  componentWillReceiveProps (nextProps) {
    if (this.idChanged(nextProps)) {
      this.loadFolder(nextProps.match.params.id)
    }
  }

  componentWillMount () {
    this.loadFolder(this.getCurrentId())
  }

  idChanged (nextProps) {
    const nextId = nextProps.match.params.id
    let current = this.getCurrentId()

    return nextId !== current
  }

  getCurrentId () {
    let current = -1
    try {
      current = this.props.match.params.id
    } catch (e) {
    }
    return current
  }

  loadFolder (folderId = -1) {
    if (folderId !== -1) {
      this.props.dispatch(changeCurrentFolderTo(folderId))
    } else {
      this.props.dispatch(changeCurrentFolderToHome())
    }
  }

  render () {
    return (
      <div className={EXPLORER_CLASS} onClick={(e) => this.emptySpaceClicked(e)}>
        {this.props.elements.map((el) =>
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
      this.props.history.push('/folder/' + node.id);
    } else if (node.type == 'file') {
      this.props.history.push('/file/' + node.id);
    }
  }

  emptySpaceClicked (e) {
    if (e.target.classList.contains(EXPLORER_CLASS)) {
      this.setState(Object.assign({}, this.state, { selectedElements: EMPTY_SET }))
    }
  }
}