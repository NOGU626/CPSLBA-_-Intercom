// reducer.js
// reduxではglobal stateを巨大なjson(store)として管理します。stateの変更はjsonの書き換えによってのみ管理します。
// actionは純粋なjsのオブジェクトを作る関数であることを思い出してください。
// reducerはactionで生成されたオブジェクトを受け取り、巨大なjson(store)を書き換える関数です。
import {
    combineReducers,
} from 'redux';

import {INITIAL_STATE} from './actions';

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_NAME':
            return {...state, name: action.name}
        case 'DELETE_NAME':
            return {...state, name: ''}
        default:
            return state;
    }
}

export const reducers = combineReducers({
    user: reducer
})


