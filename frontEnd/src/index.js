import React from 'react';
import ReactDOM from 'react-dom';
import {Router,hashHistory} from 'react-router';
import rootRoute from './router';

ReactDOM.render((
	<Router
    history={hashHistory}
    routes={rootRoute} />
), document.getElementById('appRoot'))
