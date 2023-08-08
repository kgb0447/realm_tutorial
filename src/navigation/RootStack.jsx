import { useSelector } from 'react-redux'
import AuthStack from './stack/AuthStack'
import HomeTabs from './tabs/HomeTabs'
import ScreenStacks from './stack/ScreenStacks'

export default function RootStack() {
    const isLoggedIn = useSelector((state) => state.AuthReducerSlice.isLoggedIn)
    return isLoggedIn ? <ScreenStacks/> : <AuthStack/>
}