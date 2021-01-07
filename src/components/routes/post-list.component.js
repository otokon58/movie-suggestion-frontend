import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const mainurl = 'https://otokontest.azurewebsites.net/';
const TITLE = 'Posts';

const Post = (props) => (
  <tr>
    <td>{props.articleNumber}</td>
    <td>{props.post.title}</td>
    <td>{props.post.article.substring(0, 10)}</td>
    <td>
      <Link to={'/~21993735/post/edit/' + props.post._id}>edit</Link> |{' '}
      <a
        href="#"
        onClick={() => {
          props.deletePost(props.post._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);

    this.state = { posts: [] };
  }

  componentDidMount() {
    axios.get(`${mainurl}post/`).then((response) => {
      this.setState({
        posts: response.data,
      });
    });
  }

  deletePost(id) {
    axios.delete(`${mainurl}post/${id}`).then((response) => {
      console.log(response.data);
    });

    this.setState({
      posts: this.state.posts.filter((el) => el._id !== id),
    });
  }

  postList() {
    let i = 0;
    return this.state.posts.map((post) => {
      i++;
      return (
        <Post
          post={post}
          articleNumber={i}
          deletePost={this.deletePost}
          key={post._id}
        ></Post>
      );
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Title</th>
              <th scope="col">Article</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.postList()}</tbody>
        </table>
      </div>
    );
  }
}
