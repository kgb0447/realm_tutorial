import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { TodoRealmContext } from '../realm/config/TodoConfig'

export default function useSetRealm(data, uuid,schema,item = {}) {
    const { useRealm } = TodoRealmContext;
    const realm = useRealm();

    useEffect(() => {
        realm.write(() => {
            realm.create(schema,{

            })
        })
    } ,[])
}