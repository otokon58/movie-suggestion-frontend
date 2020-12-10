import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class Navbar extends Component {
    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                    <Link to="/~21993735/" className="nav-brand">Movie Suggestion</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/~21993735/" className="nav-link">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/~21993735/movie/create" className="nav-link">Add Movie</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/~21993735/director" className="nav-link">Directors</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/~21993735/director/create" className="nav-link">Add Director</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
