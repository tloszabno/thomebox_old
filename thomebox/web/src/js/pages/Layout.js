import React from 'react';
import THomeBoxNavbar from '../components/THomeBoxNavbar';
import Main from './Main'

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <THomeBoxNavbar/>
        <Main />
      </div>
    );
  }
}