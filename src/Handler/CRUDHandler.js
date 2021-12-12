import { database } from "../Firebase";
import React,{useState, useEffect} from 'react'
const db = database.ref('/MonitoringDebitQualityApp/MonitoringDebit');
const dblocation =  database.ref('MonitoringDebitQualityApp')
const dbh= database.ref('MonitoringDebitQualityApp/LokasiQuality')
const monitoring = database.ref('MonitoringDebitQualityApp')
class CrudHandler{
    
    getAll(){
        return db;
    }
    getMonitor(){
        return monitoring;
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
        return dbh.child(key).update(value);
    }
    historycal(value){
        return dbh.push(value);
    }

    delete(key) {
        return db.child(key).remove();
      }

}
export default new CrudHandler();