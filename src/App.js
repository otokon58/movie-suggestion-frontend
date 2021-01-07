import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/ui/navbar.component';
import MovieList from './components/routes/movie-list.component';
import EditMovie from './components/routes/edit-movie.component';
import CreateMovie from './components/routes/create-movie.component';
import CreateDirector from './components/routes/create-director.component';
import DirectorList from './components/routes/director-list.component';
import EditDirector from './components/routes/edit-director.component';
import CreatePost from './components/routes/create-post.component';
import PostList from './components/routes/post-list.component';
import EditPost from './components/routes/edit-post.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/~21993735/" exact component={MovieList} />
        <Route path="/~21993735/movie/edit/:id" component={EditMovie} />
        <Route path="/~21993735/movie/create" component={CreateMovie} />
        <Route path="/~21993735/director/" exact component={DirectorList} />
        <Route path="/~21993735/director/create" component={CreateDirector} />
        <Route path="/~21993735/director/edit/:id" component={EditDirector} />
        <Route path="/~21993735/post/" exact component={PostList} />
        <Route path="/~21993735/post/create" component={CreatePost} />
        <Route path="/~21993735/post/edit/:id" component={EditPost} />
      </div>
    </Router>
  );
}

export default App;
