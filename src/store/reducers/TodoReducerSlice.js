const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    activeStoreItem: {}
}

const TodoReducerSlice = createSlice({
    name: 'TodoReducerSlice',
    initialState,
    reducers: {
        setActiveStoreItem: (state,action) => {
            const { payload } = action;
            state.activeStoreItem = payload
        }
    },
})


export const { setActiveStoreItem } = TodoReducerSlice.actions

export default TodoReducerSlice.reducer