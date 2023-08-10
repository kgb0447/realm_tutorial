import Realm from "realm"
export class Todo extends Realm.Object{
    static schema = {
        name: 'Todo',
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
        name: 'Completed',
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