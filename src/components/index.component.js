import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';
var i = 1;

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.find = this.find.bind(this);
        this.state = {
            persons : [], 
            id : '',
        };
    }

    find(){
        axios.get('http://localhost:4000/persons/find/'+this.state.id)
        .then(response=>{
            if(!response.data)
                this.setState({
                    persons : response.data
                });
            else
                alert("Khong tim thay");
        })
        .catch(err=>{
            console.log(err);
        })
    }

   

    componentDidMount() {
        axios.get('http://localhost:4000/persons')
            .then(response => {
                this.setState({persons: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeValue(e){
        this.setState({
            id : e.target.value
        })
        console.log(this.state.id);
    }

    tabRow() {
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i} i = {i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Persons List</h3>
                <input type="text" onChange = {this.onChangeValue}/>
                <button className="btn btn-success" onClick={this.find}> Tim kiem </button> 
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Age</th>
                        <th colSpan="2">Action</th>
                    </tr>   
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}