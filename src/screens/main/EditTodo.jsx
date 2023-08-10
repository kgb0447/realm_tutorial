import { useEffect, useState } from 'react'
import { setActiveStoreItem } from '../../store/reducers/TodoReducerSlice'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Todo } from '../../realm/db/Todo'
import Btn from '../../components/shared/Btn'
import Container from '../../components/layout/Container'
import InputField from '../../components/shared/InputField'

export default function EditTod() {
    const { activeStoreItem } = useSelector(state=> state.TodoReducerSlice);
    const { useRealm, useObject } = TodoRealmContext;
    const { width } = useWindowDimensions();
    const [desc,setDesc] = useState('')
    const [title,setTitle] = useState('')
    const dispatch = useDispatch();
    const realm = useRealm();
    const navigation = useNavigation();
    const itemFromRealm = useObject(Todo, activeStoreItem._id)

    useEffect(() => {
        //Sets the selected item to the edit input fields
        setTitle(activeStoreItem.title)
        setDesc(activeStoreItem.desc);

        return () => {
            setDesc('');
            setTitle('');
            dispatch(setActiveStoreItem({}))
        }
    },[])

    const handleEdit = () => {
        //Updates the data in the realm db
        realm.write(() => {
            itemFromRealm._id = activeStoreItem._id
            itemFromRealm.title = title;
            itemFromRealm.desc = desc
        })
        Promise.resolve().then(() => {
            navigation.navigate('Home');
        })
    }

  return (
    <Container style={styles.container}>
        <InputField 
            placeholder='Enter your todo new title' 
            label='New Title'
            inputContainerStyle={[styles.textInput,{width: width}]}
            inputStyle={styles.titleInputArea}
            onChangeText={(text) => setTitle(text)}
            value={title?.length > 0 ? title : ''}
        />
        <InputField 
            placeholder='Enter your new description' 
            label='New Description'
            inputContainerStyle={[styles.textInput,{width: width}]}
            inputStyle={styles.descInputArea}
            onChangeText={(text) => setDesc(text)}
            value={ desc?.length > 0 ? desc :  '' }
            isMultiline={true}
        />
        <Btn label={"Save"} btnStyle={styles.btn} callback={handleEdit}/>    
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