import Realm from "realm";
import { PREFERENCES, USER } from "../../constants/schema";

export class Preferences extends Realm.Object {
    static schema = {
        name: PREFERENCES,
        properties: {
            dark_mode: 'bool',
            font_scale: 'string',
            owner_id: 'string'
        }
    }
}
export class User extends Realm.Object {
    static schema = {
        name: USER,
        properties: {
            _uuid: 'string',
            password: 'string',
            username: 'string',
            name: 'string?',
            date_joined: 'int',
            pending_tasks: 'Todo?',
            completed_tasks: 'Completed?',
            preferences: 'Preferences?'
        },
        primaryKey: '_uuid'
    }
}
