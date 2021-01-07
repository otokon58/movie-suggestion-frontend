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
        <Route path="/" exact component={MovieList} />
        <Route path="/movie/edit/:id" component={EditMovie} />
        <Route path="/movie/create" component={CreateMovie} />
        <Route path="/director/" exact component={DirectorList} />
        <Route path="/director/create" component={CreateDirector} />
        <Route path="/director/edit/:id" component={EditDirector} />
        <Route path="/post/" exact component={PostList} />
        <Route path="/post/create" component={CreatePost} />
        <Route path="/post/edit/:id" component={EditPost} />
      </div>
    </Router>
  );
}

export default App;
