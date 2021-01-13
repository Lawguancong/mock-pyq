

import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'; // 可以让redux数据流处理异步
import reducers from '@/reducers'

//reudx数据流 -> 创建store
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))

export default store;