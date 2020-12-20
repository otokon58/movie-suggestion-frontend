import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const mainurl = "http://54.80.143.136/";
const TITLE = 'Directors';

const Director = props => (
    <tr>
        <td><img src={mainurl + props.director.directorimg} alt="directorimg" width="100px" height="100px"/></td>
        <td>{props.director.directorname}</td>
        <td>{props.director.description}</td>
        <td>
            <Link to={"/~21993735/director/edit/"+props.director._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDirector(props.director._id) }}>delete</a>
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
        axios.get(`${mainurl}director/`)
        .then(response =>{
            this.setState({
                directors: response.data
            })
        })
    }

    deleteDirector(id) {
        axios.delete(`${mainurl}director/${id}`)
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
                <Helmet>
                    <title>{ TITLE }</title>
                </Helmet>
                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>    
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
