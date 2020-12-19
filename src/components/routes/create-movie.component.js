import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TITLE = 'Add Movie'

export default class CreateMovie extends Component {
    constructor(props){
        super(props);

        this.onChangeDirectorname = this.onChangeDirectorname.bind(this);
        this.onChangeMoviename = this.onChangeMoviename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            directorname:'',
            moviename: '',
            description: '',
            duration: 0,
            date: new Date(),
            directors: [],
        };
    }

    componentDidMount(){
        axios.get('https://movie-suggestion-api.herokuapp.com/director/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    directors: response.data.map(director => director.directorname),
                    directorname: response.data[0].directorname
                })
            }
        })
        .catch(err => console.log(err));
    }
    

    onChangeDirectorname(e){
        this.setState({
            directorname: e.target.value
        });
    }

    onChangeMoviename(e){
        this.setState({
            moviename: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
          date: date
        });
      }

    onSubmit(e){
        e.preventDefault();

        const movie ={
            directorname: this.state.directorname,
            moviename: this.state.moviename,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(movie);

        axios.post('https://movie-suggestion-api.herokuapp.com/movie/add', movie)
        .then(response => {
            alert(response.data);
            
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
            alert('Something went wrong');
        })

        
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{ TITLE }</title>
                </Helmet>
                <h3>Add new movie</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Director Name: </label>
                        <select ref="directorInput"
                         required 
                         className="form-control" 
                         value={this.state.directorname}
                         onChange={this.onChangeDirectorname}>
                        {
                            this.state.directors.map(function(director){
                                return <option
                                key={director}
                                value={director} > {director}
                                </option>
                            })
                        } 
                        </select>
                    </div>
                        <div className='form-group'> 
                            <label >Movie Name: </label>
                            <input value={this.state.moviename} onChange={this.onChangeMoviename} type="text" class="form-control" aria-describedby="helpId" placeholder="Big Fish"/>
                            <small id="helpId" class="form-text text-muted">Insert the movie's name</small>
                        </div>
                        <div className='form-group'>
                            <label >Description: </label>
                            <input value={this.state.description} onChange={this.onChangeDescription} type="text" class="form-control" aria-describedby="helpId" placeholder="The movie which is watched first together"/>
                            <small id="helpId" class="form-text text-muted">About the movie</small>
                        </div>
                        <div className='form-group'> 
                            <label >Duration: </label>
                            <input value={this.state.duration} onChange={this.onChangeDuration} type="text" class="form-control" aria-describedby="helpId" placeholder="125"/>
                            <small id="helpId" class="form-text text-muted">How many minutes did the movie takes?</small>
                        </div>

                        <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                            </div>
                        </div>
                    <div className="form-group">
                        <button type="submit" class="btn btn-primary">Add Movie</button>
                    </div>
                </form>
            </div>
        )
    }
}
