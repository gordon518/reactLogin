import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './css/index.css'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import userReducer from './redux/reducer'

//生成一个store对象
//内部会调用一次reducer函数得到初始state
const store = createStore(userReducer)
console.log(store);

//传入store
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

export default store;

