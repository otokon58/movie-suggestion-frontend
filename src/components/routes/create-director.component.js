import React, { Component } from 'react';
import axios from 'axios';

export default class CreateDirector extends Component {
    constructor(props){
        super(props);

        this.onChangeDirectorname = this.onChangeDirectorname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            directorname:'',
            description: '',
        };
    }


    onChangeDirectorname(e){
        this.setState({
            directorname: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();

        const director ={
            directorname: this.state.directorname,
            description: this.state.description,
        }

        console.log(director);

        axios.post('https://movie-suggestion-api.herokuapp.com/director/add', director)
        .then(response => {
            console.log(response.data);
            alert('Director is added succesfully');
            this.setState({
                directorname:'',
                description: ''
            });
        })
        .catch(err => {
            console.log(err);
            alert('Something went wrong');
        })

    }

    render() {
        return (
            <div>
                <h3>Add new movie</h3>
                <form onSubmit={this.onSubmit}>
                        <div className='form-group'> 
                            <label >Director Name: </label>
                            <input required value={this.state.directorname} onChange={this.onChangeDirectorname} type="text" class="form-control" aria-describedby="helpId" placeholder="Big Fish"/>
                            <small id="helpId" class="form-text text-muted">Insert the director's name</small>
                        </div>
                        <div className='form-group'>
                            <label >Description: </label>
                            <input value={this.state.description} onChange={this.onChangeDescription} type="text" class="form-control" aria-describedby="helpId" placeholder="The movie which is watched first together"/>
                            <small id="helpId" class="form-text text-muted">About the movie</small>
                        </div>
                       
                    <div className="form-group">
                        <button type="submit" class="btn btn-primary">Add Director</button>
                    </div>
                </form>
            </div>
        )
    }
}
