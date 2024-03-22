import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';
// import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Pages from '../src/pages';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import 'lightgallery.js/dist/css/lightgallery.min.css';
import "react-datepicker/dist/react-datepicker.min.css";
import './style/applicate.scss';
ReactDOM.render((
<Provider store={store}>
     <ConnectedRouter history={history}>
     <Pages />
     </ConnectedRouter>
</Provider>
), document.getElementById('root'));