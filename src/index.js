import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './stores/index';
import reducers from './reducers/index';
import App from './containers/index';
import * as commonActions from './actions/common';

import './index.scss';

const store = createStore(reducers);

const history = syncHistoryWithStore(createBrowserHistory(), store);

history.listen((location, a, b) => {
    console.log(location, a, b);
    store.dispatch(commonActions.routeChange(location ? location.pathname : '/'));
});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }
