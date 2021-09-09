import { INCREMENT, DECREMENT } from './action-type'

//by zhengkai.blog.csdn.net 
//reducer,相当于JMS的订阅器,type相当于主题,
//是一個 function，負責接收被 dispatch 的 action 並處理 state，要注意的是需傳入兩個參數到這個 function，第一個是目前的 state，第二個則是我們定義的 action 物件
export function counter(state = { number: 0, blog: 'zhengkai.blog.csdn.net' }, action) {
    console.log('counter', state, action);
    switch (action.type) {
        case INCREMENT:
            state.number = state.number + action.data
            return state
        case DECREMENT:
            state.number = state.number - action.data
            return state
        default: return state
    }
}