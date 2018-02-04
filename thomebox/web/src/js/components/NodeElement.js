import React from 'react';

export default class NodeElement extends React.Component {
  constructor () {
    super()
    this.state = {
      loadingThumb: false
    }
  }

  componentWillMount () {
    const { node, fetchThumbnail } = this.props
    if (node.fetchThumb && !this.state.loadingThumb) {
      fetchThumbnail(node.id)
      this.setState({
        ...this.state,
        loadingThumb: true
      })
    }

  }

  render () {
    const { node, selected, onClick, onDoubleClick } = this.props

    const nodeBoxClasses = [ "node-box" ]
    if (selected) {
      nodeBoxClasses.push('selected')
    }

    return (
      <div className={nodeBoxClasses.join(' ')}
           onClick={() => onClick(node)}
           onDoubleClick={() => onDoubleClick(node)}>

        {node.icon && (
          <span className={"node-thumb"}>
            <span className={"node-thumb-helper"}></span>
            <img src={"data:image/jpg;base64," + node.icon}/>
          </span>
        )
        }

        {
          !node.icon && (
            <span className={"node-icon node-icon-" + node.type}></span>
          )
        }

        <span className="node-title">{node.name}</span>

      </div>
    )
  }

}