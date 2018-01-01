import React from 'react';

export default class NodeElement extends React.Component {
  render () {
    const { node, selected, onClick, onDoubleClick } = this.props

    const nodeBoxClasses = [ "node-box" ]
    if (selected) {
      nodeBoxClasses.push('selected')
    }

    return (
      <div className={nodeBoxClasses.join(' ')} onClick={()=>onClick(node)} onDoubleClick={()=>onDoubleClick(node)}>
        <span className={"node-icon node-icon-" + node.type}></span>
        <span className="node-title">{node.name}</span>
      </div>
    )
  }

}