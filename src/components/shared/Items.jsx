import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Items({item,isCompleted = false,wrapperStyle,labelStyle}) {
    const getDate = (item) => {
        let date;
        date = new Date(JSON.parse(item));
        return date.toString()
      }
  return (
    <View style={[styles.wrapper,wrapperStyle]}>
        <View style={styles.items}>
            <Text style={[styles.labels,labelStyle]}>Title:</Text>
            <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.descItem}>
            <Text style={[styles.labels,labelStyle]}>Description:</Text>
            <Text style={styles.desc}>{item.desc}</Text>
        </View>
        <View style={styles.dateItem}>
            <Text style={[styles.labels,labelStyle]}>Date Created:</Text>
            <Text style={styles.dates}>{getDate(item?.dateCreated)}</Text>
        </View>
        {
            isCompleted ? (
            <View style={styles.dateItem}>
                <Text style={[styles.labels]}>Date Completed:</Text>
                <Text style={styles.dates}>{getDate(item.dateCompleted)}</Text>
            </View>)
            : null
        }
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {},
    items: {
        flexDirection: "row",
        width: '100%',
        marginBottom: 10
    },
    labels: {
        fontWeight: '700',
        fontSize: 18,
        marginRight: 10
    },
    title:{
        fontWeight: '600',
        fontSize: 22,
        flexWrap: 'wrap'
    },
    desc: {
        fontSize: 20,
        fontWeight: '400',
        flexWrap: 'wrap'
    },
    descItem: {
        marginBottom: 10
    },
    dateItem: {
        marginBottom: 10
    },
    dates: {
        fontSize: 16
    }
})