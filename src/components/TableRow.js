import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  
  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
  }
  
  delete(){
    axios.get('http://localhost:4000/persons/delete/'+this.props.obj.idPerson)
    .then(console.log('Deleted'))
    .catch(err => console.log(err))
  }

  render() {
    return (
        <tr>
          <td> {this.props.i +1}</td>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.company}
          </td>
          <td>
            {this.props.obj.age}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj.idPerson} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button className="btn btn-danger" onClick={this.delete}>Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;