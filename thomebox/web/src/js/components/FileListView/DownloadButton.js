import React from 'react';
import {Glyphicon, Button} from 'react-bootstrap'

export default class DownloadButton extends React.Component {
  render () {
    return (
      <Button onClick={()=>{console.log("Downloading " + this.props.elementId)}}><Glyphicon glyph={"download"}/></Button>
    )
  }
}
