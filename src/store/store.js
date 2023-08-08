const { configureStore } = require("@reduxjs/toolkit");
import AuthReducerSlice from './reducers/AuthReducerSlice'
import TodoReducerSlice from './reducers/TodoReducerSlice'

export default configureStore({
    reducer: {
        AuthReducerSlice,
        TodoReducerSlice
    }
})