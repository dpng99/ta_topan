import React, { Component } from 'react'
import CRUDHandler from './CRUDHandler'

export class UpdateHandler extends Component {
    constructor(props) {
        super(props);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.saveData = this.saveData.bind(this);
        this.newData = this.newData.bind(this);

        this.state = {
            latitude: "",
            longitude: "",
            published: false,
      
            submitted: false,
          };
        }
        onChangeLatitude(e){
            this.setState({
                latitude: e.target.value,
            });
        }
        onChangeLongitude(e){
            this.setState({
                longitude: e.target.value,  
            });
        }
        saveData(){
            let data = {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                pubshed: false
            };
            CRUDHandler.create(data)
            .then(()=>{
                console.log("Data Berhasil di masukkan");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) =>{
                console.log(e);
            })
        }
        newData(){
            this.setState({
                latitude: "",
                longitude: "",
                published: false,
                submitted: false
            })
        }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}export default UpdateHandler
