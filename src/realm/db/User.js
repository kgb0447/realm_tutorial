import Realm from "realm";
export class User extends Realm.Object {
    static schema = {
        name: 'User',
        properties: {
            _uuid: 'string',
            theme: 'string',

        },
        primaryKey: '_uuid'
    }
}