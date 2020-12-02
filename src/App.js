import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/ui/navbar.component";
import MovieList from "./components/routes/movie-list.component";
import EditMovie from "./components/routes/edit-movie.component";
import CreateMovie from "./components/routes/create-movie.component";
import CreateDirector from "./components/routes/create-director.component";
import DirectorList from "./components/routes/director-list.component";
import EditDirector from "./components/routes/edit-director.component";

function App() {
  return (

    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={MovieList}/>
        <Route path="/movie/edit/:id"  component={EditMovie}/>
        <Route path="/movie/create"  component={CreateMovie}/>
        <Route path="/director"  exact component={DirectorList}/>
        <Route path="/director/create"  component={CreateDirector}/>
        <Route path="/director/edit/:id"  component={EditDirector}/>
      </div>
    </Router>
    
   
  );
}

export default App;