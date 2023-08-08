import { StyleSheet, Text,SafeAreaView, KeyboardAvoidingView, useColorScheme } from 'react-native'
import { SafeAreaView  as SafeView} from 'react-native-safe-area-context' 
import { Platform } from 'react-native'
import { colors } from '../../theme/darkmode';

export default function Container({children,style}) {
  const theme = useColorScheme();
  console.log(theme,"them at layout")
  if(Platform.OS === 'ios') {
    return (
      <SafeAreaView style={[containerStyle.container, style,{backgroundColor: theme === 'dark' ? '#000': '#fff'}]}>
        <KeyboardAvoidingView 
          behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}> 
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
  return (
    <SafeView style={[containerStyle.container, style,{backgroundColor: theme === 'dark' ? '#212121': '#fff'}]}> 
        <KeyboardAvoidingView 
            behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        > 
          {children}
        </KeyboardAvoidingView>
    </SafeView>
  )
}

const containerStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    }
})