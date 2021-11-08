import { database } from "../Firebase";

const db = database.ref('alat/id');
class CrudHandler{

    getAll(){
        return db;
    }
    create(data){
        return db.push(data);
    }
    update(key, value){
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
      }

}
export default new CrudHandler();