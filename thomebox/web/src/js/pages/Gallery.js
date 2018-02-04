import React from 'react';




export default class Gallery extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.idChanged(nextProps)) {
      this.loadGallery(nextProps.match.params.id)
    }
  }

  componentWillMount () {
    this.loadGallery(this.getCurrentId())
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

  loadGallery(imageId){
    console.log(imageId)
  }

  render(){
    const {id} = this.props.match.params
    return (
      <div>
        image: {id}
      </div>
    )
  }
}