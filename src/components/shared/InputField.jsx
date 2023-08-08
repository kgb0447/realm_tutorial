import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Show from '../../assets/img/icons/form/Show.png'
import Hide from '../../assets/img/icons/form/Hide.png'
import { removeInputSpace } from '../../utils/inputHeper'


export default function InputField({
        inputMode = 'text',
        isPassword = false,
        onChangeText = () => {},
        label = '',
        inputContainerStyle,
        inputStyle,
        placeholder ='',
        value,
        onBlur
    }) {
    const [isShowPassword,setIsShowPassword] = useState(false)
    const [userInput,setUserInput] = useState('');
    const [isFocused,setIsFocused] = useState({})


    const onchange = (input) => {
        setUserInput(input)
        onChangeText(input);
    }

    const onFocus = () => {
        setIsFocused({
            shadowColor: 'gray',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            
        })
    }
    useEffect(() => {
        if(!isPassword) {
            setIsShowPassword(true)
        }
    }, [])

    useEffect(() => {
        if(isPassword) {
            const noSpaceInput = removeInputSpace(userInput);
            setUserInput(noSpaceInput);
        }
    }, [userInput])
  return (
    <View style={[styles.container,inputContainerStyle]}>
        <Text style = {[styles.label]}>{label}</Text>
        {
           isPassword ? (
            <>
                <TextInput 
                    placeholder={placeholder} 
                    onChangeText={onchange} 
                    value={value !== undefined ? value : userInput}
                    inputMode={inputMode}
                    secureTextEntry={!isShowPassword}
                    style={[styles.textInput,inputStyle,isFocused]}
                    onFocus={onFocus}
                    onBlur={() => setIsFocused({})}
                    
                />
                {
                    userInput.length > 1 ? (
                        <TouchableOpacity onPress={()=> setIsShowPassword(!isShowPassword)}>
                            <Image 
                                source={ isShowPassword ? Hide : Show } 
                                size={20}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    )
                    : null
                }
            </>
           ) : (
            <TextInput 
                placeholder={placeholder} 
                onChangeText={onchange} 
                placeHolderTextColor={'#fff'}
                value={value !== undefined ? value : userInput}
                inputMode={inputMode}
                style={[styles.textInput,inputStyle,isFocused]}
                onFocus={onFocus}
                onBlur={() => setIsFocused({})}

            />
           ) 
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%'
    },
    label: {
        fontSize: 18,
        paddingVertical: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    textInput: {
        height: 48,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        textDecorationLine: 'none'
    },
    eyeIcon: {
        position: 'absolute',
        right: '3%',
        bottom: 30,
        zIndex: 20,
    }
})