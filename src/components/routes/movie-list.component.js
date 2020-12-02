import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Movie = props => (
    <tr>
        <td>{props.movie.directorname}</td>
        <td>{props.movie.moviename}</td>
        <td>{props.movie.description}</td>
        <td>{props.movie.duration}</td>
        <td>{props.movie.date}</td>
        <td>
            <Link to={"/movie/edit/"+props.movie._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMovie(props.movie._id) }}>delete</a>
        </td>
    </tr>
)

export default class MovieList extends Component {
    constructor(props){
        super(props);

        this.deleteMovie = this.deleteMovie.bind(this);

        this.state = {movies: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/movie/')
        .then(response =>{
            this.setState({
                movies: response.data
            })
        })
    }

    deleteMovie(id) {
        axios.delete('http://localhost:5000/movie/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          movies: this.state.movies.filter(el => el._id !== id)
        })
      }
    

    

    movieList(){
        return this.state.movies.map(movie => {
            return <Movie movie={movie} deleteMovie={this.deleteMovie} key={movie._id} ></Movie>;
        });
    }

    render() {
        return (
            <div >
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Director</th>
                    <th scope="col">Movie</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.movieList()}
                </tbody>
                </table>
            </div>
        )
    }
}