import { database } from "../Firebase";
import React,{useState, useEffect} from 'react'
const db = database.ref('/MonitoringDebitQualityApp/MonitoringDebit');
const dblocation =  database.ref('MonitoringDebitQualityApp/LokasiQuality')
const dbh= database.ref('MonitoringDebitQualityApp/LokasiQuality')

class CrudHandler{
    
    getAll(){
        return db;
    }
    getLocation(){
        return dblocation;
    }
    getHistory(){
        
        
        return dbh 
        
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