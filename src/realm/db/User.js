import Realm from "realm";

export class Preferences extends Realm.Object {
    static schema = {
        name: 'Preferences',
        properties: {
            dark_mode: 'bool',
            font_scale: 'int',
            owner_id: 'string'
        }
    }
}
export class User extends Realm.Object {
    static schema = {
        name: 'User',
        properties: {
            _uuid: 'string',
            password: 'string',
            username: 'string',
            name: 'string?',
            date_joined: 'date',
            pending_tasks: 'Todo?',
            completed_tasks: 'Completed?',
            preferences: 'Preferences?'
        },
        primaryKey: '_uuid'
    }
}
