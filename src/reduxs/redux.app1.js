
const initState = {
    authUser: false, // 没有用户登录信息 默认:false
}

export function auth(state = initState,action) {
    switch (action.type) {
        case 'EDIT_CLEAR_DATA':
            return {...initState, a: 'lgc'}
        default:
            return state
    }
}
export function clearData() {
    return {
        type:'EDIT_CLEAR_DATA'
    }
}