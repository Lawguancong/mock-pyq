import React from 'react';
import ReactDOM from 'react-dom';
import '@/polyfill'
import * as serviceWorker from '@/serviceWorker'
// import '@/setupProxy';


import App from '@/routes';

ReactDOM.render(<App />, document.getElementById('root'));

// [HPM] Error occurred while trying to proxy request /homeQuery from localhost:3000 to http://localhost:7777/ 
// (ECONNREFUSED) (https://nodejs.org/api/errors.html#errors_common_system_errors)
/* 热加载 */
// if (module.hot) {
//     module.hot.accept();
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
