import { database } from "../Firebase";

const db = database.ref('ewsApp');
const dbh= database.ref('history')
class CrudHandler{

    getAll(){
        return db;
    }
    getHistory(){
        return dbh;
    }
    create(data){
        return db.push(data);
    }
    update(key, value){
        return db.child(key).update(value);
    }
    historycal(value){
        return dbh.push(value);
    }

    delete(key) {
        return db.child(key).remove();
      }

}
export default new CrudHandler();