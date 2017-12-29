import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import '../css/styles.css'; //FIXME: should not use relative ('..') path

const rootElement = document.getElementById('app');
ReactDOM.render(<Layout/>, rootElement);