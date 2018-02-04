import React from 'react';

import {changeCurrentPictureTo} from '../actions/galleryActions'
import {connect} from 'react-redux'
import ImageGallery from 'react-image-gallery';

@connect((store) => {
  return {
    images: store.gallery.images,
    showImageIndex: store.gallery.showImageIndex,
    maxWidth: store.gallery.maxWidth,
    maxHeight: store.gallery.maxHeight
  }
})
export default class Gallery extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.idChanged(nextProps)) {
      this.loadGallery(nextProps.match.params.id)
    }else{
      this._imageGallery.slideToIndex(nextProps.showImageIndex)
    }
  }

  componentWillMount () {
    this.loadGallery(this.getCurrentId())
  }

  componentDidMount () {
    window.addEventListener("resize", this.componentWillMount.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.componentWillMount.bind(this));
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

  loadGallery (imageId) {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[ 0 ],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.props.dispatch(changeCurrentPictureTo(imageId, width, height))
  }

  createRenderImage (maxWidth, maxHeight) {
    return (item) => {
      const fullscreen = this._imageGallery !== undefined && this._imageGallery.state.isFullscreen
      const background = !fullscreen ? "#404551" : null
      let height = maxHeight
      let width = maxWidth
      if (!fullscreen) {
        height -= 150
        width -= 150
      }
      return (
        <div className='image-gallery-image'
             style={{ backgroundColor: background }}
        >
          <img src={item.original} style={{
            maxHeight: height + "px",
            maxWidth: width + "px",
            objectFit: 'scale-down',
            fontFamily: "'object-fit: scale-down'",
            backgroundColor: background
          }}/>
        </div>
      );
    }
  }

  render () {
    const { images, showImageIndex, maxWidth, maxHeight } = this.props
    return (
      <div className="thgallery">
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={images}
          lazyLoad
          showIndex
          showThumbnails={false}
          renderItem={this.createRenderImage(maxWidth, maxHeight)}
          thumbnailPosition={"left"}/>
      </div>
    )
  }
}