//合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { auth } from '@/reduxs/redux.app1'

export default combineReducers({ auth })