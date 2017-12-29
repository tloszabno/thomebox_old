import React from 'react';

export default class Header extends React.Component {
  render () {
    return (
      <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Last Modified</th>
        <th>Download</th>
      </tr>
      </thead>
    )
  }
}