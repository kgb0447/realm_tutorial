import { StyleSheet, Text,SafeAreaView, KeyboardAvoidingView, useColorScheme, useWindowDimensions } from 'react-native'
import { SafeAreaView  as SafeView} from 'react-native-safe-area-context' 
import { Platform } from 'react-native'
import { colors } from '../../theme/darkmode';
import { useEffect } from 'react';

export default function Container({children,style}) {
  const theme = useColorScheme();
  const { width } = useWindowDimensions();

  if(Platform.OS === 'ios') {
    return (
      <SafeAreaView 
        style = {[containerStyle.container,
          style,
          {
            backgroundColor: theme === 'dark' ? '#000': '#fff',
            width: width
          }]}>
        <KeyboardAvoidingView 
          behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}> 
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
  return (
    <SafeView style={[
      containerStyle.container, 
      style,
      {
        backgroundColor: theme === 'dark' ? '#212121': '#fff',
        width: width
      }]}> 
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
    }
})