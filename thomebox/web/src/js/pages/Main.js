import React from 'react';
import {Route, Switch} from "react-router-dom";
import Explorer from './Explorer'
import Settings from './Settings'
import Gallery from './Gallery'



export default class Main extends React.Component {

  render () {
    return (
      <div className={"main-container"}>
      <Switch>
        <Route path="/folder/:id" component={Explorer}/>
        <Route path="/gallery/:id" component={Gallery}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/" component={Explorer}/>
      </Switch>
      </div>
    );
  }
}