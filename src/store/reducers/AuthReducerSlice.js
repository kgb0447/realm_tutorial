const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    isLoggedIn: false,
    username: '',
    password: '',
    name: ''
}

const AuthReducerSlice = createSlice({
    name:'AuthReducerSlice',
    initialState,
    reducers: {
        setAuth: (state,actions) => {
            state.username = actions.payload?.username;
            state.name = actions.payload?.name
        },
        setIsLoggedIn: (state,actions) => {
            state.isLoggedIn = actions.payload
        }
    }
})


export const { setAuth, setIsLoggedIn } = AuthReducerSlice.actions

export default AuthReducerSlice.reducer