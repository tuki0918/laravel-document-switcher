/* eslint-env browser */

import Raven from 'raven-js';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { SENTRY_DSN } from './constants';
import 'photon/dist/css/photon.css'
import './App.css';

/**
 * https://sentry.io
 */
Raven.config(SENTRY_DSN).install();

/**
 * render
 */
render(
    <App />,
    document.getElementById('root')
);
