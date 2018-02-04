import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './pages/Layout';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store"


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import '../css/styles.css';
import '../css/navbar.css';
import '../css/explorer.css';
import '../css/gallery.css';

const rootElement = document.getElementById('app');
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Layout/>
    </HashRouter>
  </Provider>
), rootElement);