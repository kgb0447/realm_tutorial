import { useEffect, useState } from 'react'
import { StyleSheet, useWindowDimensions, Alert } from 'react-native'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import { nanoid } from '@reduxjs/toolkit'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { getDateToString } from '../../utils/helpers'
import Container from '../../components/layout/Container'
import InputField from '../../components/shared/InputField'
import Btn from '../../components/shared/Btn'
import useSetRealm from '../../hooks/useSetRealm'

export default function AddTodo() {
    const { useRealm,useQuery } = TodoRealmContext;
    const { uuid } = useSelector(state=> state.AuthReducerSlice)
    const { width } = useWindowDimensions();
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('');
    const [isDisabled,setIsDisabled] = useState(true)
    const todo = useQuery('Todo').filter((item) => item.owner_id === uuid)
    const realm = useRealm();
    const navigation = useNavigation();
    const { setData } = useSetRealm(TodoRealmContext,'Todo')

    const resetInputState = () => { //Resets the state
        setDesc('');
        setTitle('');
    }

    const handleAdd = () => {
        // Adds new date in the Todo db and resets the states
        setData({ 
            _id: nanoid(),
            title: title,
            desc: desc,
            isCompleted: false,
            dateCreated: getDateToString(), 
            dateCompleted: getDateToString(),
            owner_id: uuid
        });
        resetInputState();
        navigation.navigate('Home');
    }

    const handleInputs = () => {
        // Validates the input of the user
        const titles = todo.map(item => item.title);
        if(titles.includes(title)) { //if the user already used the title
            Alert.alert("Error","The task title was already taken", [
                {
                    text: 'Okay',
                    onPress: resetInputState
                }
            ]);
            setTitle('')
        } else {
            return 'passed'
        }
    }

    const handleDisable = () => {
        // Enables the button if the requirements was meet
        if(title.length > 0 && desc.length > 0) {
            if(handleInputs() === 'passed') {
                setIsDisabled(false)
            }
        }
    }

    useEffect(() => {
        handleDisable();
        handleInputs();
    }, [title,desc])
  
    return (
    <Container style={styles.container}>
        <InputField 
            placeholder='Enter your todo title' 
            label='Title'
            inputContainerStyle={[styles.textInput,{width: width}]}
            inputStyle={styles.titleInputArea}
            onChangeText={(text) => setTitle(text)}
            value={title}
        />
        <InputField 
            placeholder='Enter your description' 
            label='Description'
            inputContainerStyle={[styles.textInput,{width: width}]}
            inputStyle={styles.descInputArea}
            onChangeText={(text) => setDesc(text)}
            value={desc}
            isMultiline={true}
        />
        <Btn 
            label={"Add Task"} 
            btnStyle={styles.btn} 
            callback={handleAdd} 
            isDisabled={isDisabled}/>
    </Container>
  )
}

const styles = StyleSheet.create({
    container: {
    },
    textInput: {
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    titleInputArea: {
        width: '100%'
    },
    descInputArea: {
        height: 300,
        textAlign: 'left',
        flexWrap:'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        
        
    },
    btn: {
        height: 50,
        bottom: -100,
        alignSelf: 'center'
    },
})