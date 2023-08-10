import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../../components/layout/Container';

export default function ViewTodo() {
    const { activeStoreItem } = useSelector(state=> state.TodoReducerSlice)
    const createDate = new Date();
  return (
    <Container style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.labelText}>Title:</Text>
        <Text style={styles.title}>{activeStoreItem?.title}</Text>
      </View>
      <View style={styles.descWrapper}>
        <Text style={styles.labelText}>Description:</Text>
        <Text style={styles.desc}>{activeStoreItem?.desc}</Text>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.labelText}>Date Created:</Text>
        <Text style={styles.date}>{createDate.toString() || ''}</Text>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  titleWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  },
  descWrapper: {
    marginBottom: 20,
    justifyContent: 'center'
  },
  dateWrapper: {
    marginBottom: 20,
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 10,
    paddingVertical: 10
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  desc: {
    fontWeight: '500'
  },
  date: {
    fontSize: 16
  }
})