import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Director = props => (
    <tr>
        <td>{props.director.directorname}</td>
        <td>{props.director.description}</td>
        <td>
            <Link to={"/director/edit/"+props.director._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDirector(props.director._id) }}>delete</a>
        </td>
    </tr>
)

export default class DirectorList extends Component {
    constructor(props){
        super(props);

        this.deleteDirector = this.deleteDirector.bind(this);

        this.state = {directors: []};
    }

    componentDidMount(){
        axios.get('https://movie-suggestion-api.herokuapp.com/director/')
        .then(response =>{
            this.setState({
                directors: response.data
            })
        })
    }

    deleteDirector(id) {
        axios.delete('https://movie-suggestion-api.herokuapp.com/director/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          directors: this.state.directors.filter(el => el._id !== id)
        })
      }
    

    

    directorList(){
        return this.state.directors.map(director => {
            return <Director director={director} deleteDirector={this.deleteDirector} key={director._id} ></Director>;
        });
    }

    render() {
        return (
            <div >
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Director</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.directorList()}
                </tbody>
                </table>
            </div>
        )
    }
}
