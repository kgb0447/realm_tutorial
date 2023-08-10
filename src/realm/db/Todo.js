import Realm from "realm"
import { COMPLETED, TODO } from "../../constants/schema"
export class Todo extends Realm.Object{
    static schema = {
        name: TODO,
        properties: {
            _id: 'string',
            title: 'string',
            desc: 'string',
            isCompleted: { type: 'bool', default: false},
            dateCreated: 'string',
            dateCompleted: 'string',
            owner_id: 'string'
        },
        primaryKey: '_id'
    }
    
}


export class Completed extends Realm.Object {
    static schema = {
        name: COMPLETED,
        properties: {
            _id: 'string',
            title: 'string',
            desc: 'string',
            dateCreated: 'string',
            dateCompleted: 'string',
            owner_id: 'string'
        },
        primaryKey: '_id'
    }
}