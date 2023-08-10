const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    isLoggedIn: false, 
    uuid: '',
    username: '',
    name: '',
    date_joined: ''
}

const AuthReducerSlice = createSlice({
    name:'AuthReducerSlice',
    initialState,
    reducers: {
        setAuth: (state,actions) => {
            state.uuid = actions.payload?.uuid
            state.username = actions.payload?.username;
            state.name = actions.payload?.name
            state.date_joined = actions.payload?.date_joined
        },
        setIsLoggedIn: (state,actions) => {
            state.isLoggedIn = actions.payload
        }
    }
})


export const { setAuth, setIsLoggedIn } = AuthReducerSlice.actions

export default AuthReducerSlice.reducer