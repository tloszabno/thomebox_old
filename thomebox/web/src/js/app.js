import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './pages/Layout';
import {HashRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import '../css/styles.css'; //FIXME: should not use relative ('..') path

const rootElement = document.getElementById('app');
ReactDOM.render((
  <HashRouter>
    <Layout/>
  </HashRouter>
), rootElement);