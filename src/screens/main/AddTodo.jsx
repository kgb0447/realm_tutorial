import React, { useEffect, useState } from 'react'
import Container from '../../components/layout/Container'
import InputField from '../../components/shared/InputField'
import Btn from '../../components/shared/Btn'
import { StyleSheet, useWindowDimensions, Alert } from 'react-native'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import { nanoid } from '@reduxjs/toolkit'
import { useNavigation } from '@react-navigation/native'
import { Todo } from '../../realm/db/Todo'
import { useSelector } from 'react-redux'

export default function AddTodo() {
    const { useRealm,useQuery } = TodoRealmContext;
    const { uuid } = useSelector(state=> state.AuthReducerSlice)
    const { width } = useWindowDimensions();
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('');
    const [isDisabled,setIsDisabled] = useState(true)
    const todo = useQuery(Todo)
    const realm = useRealm();
    const date = Date.now();
    const navigation = useNavigation();


    const resetInputState = () => {
        setDesc('');
        setTitle('');
    }
    const handleAdd = () => {
        realm.write(() => {
            realm.create('Todo' , {
                _id: nanoid(),
                title: title,
                desc: desc,
                isCompleted: false,
                dateCreated: date.toString(), 
                dateCompleted: date.toString(),
                owner_id: uuid
            })
        })
        setDesc('')
        setTitle('')
        navigation.navigate('Home');
    }

    const handleInputs = () => {
        const titles = todo.map(item => item.title);
        if(titles.includes(title)) {
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
    textArea: {}
})