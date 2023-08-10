import { useEffect, useState } from 'react'
import { setActiveStoreItem } from '../../store/reducers/TodoReducerSlice'
import { Todo } from '../../realm/db/Todo'
import { TodoRealmContext } from '../../realm/config/TodoConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet,ScrollView, useWindowDimensions, Image, TouchableOpacity, Modal, Alert, Pressable, useColorScheme } from 'react-native'
import { User } from '../../realm/db/User'
import { setAuth } from '../../store/reducers/AuthReducerSlice'
import ArrowRight from '../../assets/img/icons/form/ArrowRight.png'
import Close from '../../assets/img/icons/form/CloseSquare.png'
import Btn from '../../components/shared/Btn'
import Container from '../../components/layout/Container'
import More from '../../assets/img/icons/form/MoreCircle.png'

export default function Home() {
  const navigation = useNavigation();
  const {uuid} = useSelector(state => state.AuthReducerSlice)
  const { useQuery, useRealm, useObject } = TodoRealmContext;
  const realm = useRealm();
  const [todoItems,setTodoItems] = useState([]);
  const items = useQuery(Todo);
  const activeUser = useObject(User,uuid)
  const { width } = useWindowDimensions();
  const [isShowMore,setIsHowMore] = useState(false);
  const [activeItemState,setActiveItemState] = useState({})
  const dispatch = useDispatch();
  const theme = useColorScheme();
  useEffect(() => {
    setTodoItems(items)
  }, [navigation])

  useEffect(() => {
    dispatch(setAuth({
      uuid: activeUser._uuid,
      username: activeUser.username,
      name: activeUser.name,
      date_joined: activeUser.date_joined
    }))
  },[activeUser])
  const handleAddTask = () => {
    navigation.navigate('AddTodo')
}

  const handleClickMore = (item) => {
    dispatch(setActiveStoreItem(item));
    setIsHowMore(true);
    setActiveItemState(item);
  }
  
  const handleView = (item) => {
    dispatch(setActiveStoreItem(item))
      Promise.resolve().then(() => {
      navigation.navigate('ViewTodo');
    })
  }

  const handleDelete = () => {
    realm.write(() => {
      realm.delete(activeItemState)
    });
    setIsHowMore(false);
    setActiveItemState({});
  }

  const handleUpdate = () => {
    setIsHowMore(false)
    setActiveItemState({});
    navigation.navigate('EditTodo')
  }

  const handleComplete = () => {
    const date = new Date().getTime();
    realm.write(() => {
      realm.create('Completed', {
        _id: activeItemState._id,
        title: activeItemState.title,
        desc: activeItemState.desc,
        isCompleted: true,
        dateCreated: activeItemState.dateCreated, 
        dateCompleted: JSON.stringify(date),
        owner_id: uuid
      });
        realm.delete(activeItemState);
    })
    setIsHowMore(false)
  }

  return (
    <Container style={styles.container}>
      <ScrollView style={[styles.todoItemWrapper,{width: width -20}]}>
        {
          todoItems.map((item) => (
            <Pressable style={styles.todoItems} key={item._id} onPress={() => handleView(item)}>
              <Text numberOfLines={1} style={[styles.todoTitle,{color: theme === 'dark' ? '#fff' : '#000'}]}>{item.title}</Text>
              <TouchableOpacity 
                style={styles.moreIcon}
                onPress={() => handleClickMore(item)}
              > 
                <Image 
                  source={More}
                  style={styles.iconImg}
                />
              </TouchableOpacity>
              <Image source={ArrowRight} style={styles.arrowRightIcon}/>
            </Pressable>
          ))
        }
      </ScrollView>
          <Modal 
            visible={isShowMore}
            transparent={true}
            animationType='slide'
          >
            <View style={styles.modalWrapper}>

              <TouchableOpacity 
                onPress={() => setIsHowMore(false)}
                style={styles.closeIcon}
              >
                <Image source={Close} style={{width: '100%',height: '100%'}}/>
              </TouchableOpacity>
              <View style={styles.moreModal}>
              
                <TouchableOpacity style={styles.modalItem} onPress={handleUpdate}>
                  <Text style={styles.modalText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.modalItem} onPress={handleDelete}>
                  <Text style={styles.modalText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalItem} onPress={handleComplete}>
                  <Text style={styles.modalText}>Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      <Btn 
        label={'Create New Todo'} 
        btnStyle={styles.btnStyle}
        callback={handleAddTask}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  todoItemWrapper: {
    maxHeight: '90%',
    flexGrow: 0
  },
  todoItems: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 50,
  },
  moreIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: '2%',
    top: '38%'
  },
  iconImg:{
    width: '100%',
    height: '100%',
    transform: [{rotate: '90deg'}]
  },
  modalWrapper: {
    backgroundColor:'#615c5c92',
    flex: 1
  },
  closeIcon:{
    width: 30,
    height: 30,
    position: 'absolute',
    right: '10%',
    top: '20%'
  },
  moreModal: {
    marginTop: '50%',
    width: 300,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 10,
  },
  modalItem: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 20
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    paddingVertical: 6,
  },
  btnStyle: {
    position:'relative',
    height: 50,
    flexGrow: 0,
    flex: 0,
    marginTop: 100,
    alignSelf: 'center',
  },
  arrowRightIcon: {
    position: 'absolute',
    top: '38%',
    right: 0,
    width: 30,
    height: 30
  }
})