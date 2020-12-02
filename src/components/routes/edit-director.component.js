import React, { Component } from 'react';
import axios from 'axios';

export default class EditDirector extends Component {
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

    componentDidMount(){
        axios.get('http://localhost:5000/director/' + this.props.match.params.id)
        .then(response => {
           // const selectedMovie = response.data;
            this.setState({
                directorname: response.data.directorname,
                description: response.data.description,
            });
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:5000/director/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    directors: response.data.map(director => director.directorname),
                    
                });
                console.log(this.state.directors);
            }
        })
        .catch(err => console.log(err));
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
        };
        axios.post('http://localhost:5000/director/update/' + this.props.match.params.id, director )
        .then(response => {
            alert('The director is updated successfully');
            console.log(response.data);
        })
        .catch(err => {
            alert('Something went wrong');
            console.log(err);
        })

       window.location = '/director';
    }

    render() {
        return (
            <div>
                <h3>Edit "{this.state.directorname}"</h3>
                <form onSubmit={this.onSubmit}>
                        <div className='form-group'> 
                            <label >Director: </label>
                            <input value={this.state.directorname} onChange={this.onChangeDirectorname} type="text" class="form-control" aria-describedby="helpId" placeholder="Big Fish"/>
                            <small id="helpId" class="form-text text-muted">Insert the director's name</small>
                        </div>
                        <div className='form-group'>
                            <label >Description: </label>
                            <input value={this.state.description} onChange={this.onChangeDescription} type="text" class="form-control" aria-describedby="helpId" placeholder="The movie which is watched first together"/>
                            <small id="helpId" class="form-text text-muted">About the director</small>
                        </div>
                    <div className="form-group">
                        <button type="submit" class="btn btn-primary">Update Director</button>
                    </div>
                </form>
            </div>
        )
    }
}