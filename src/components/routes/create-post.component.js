import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const mainurl = 'https://otokontest.azurewebsites.net/';
const TITLE = 'Add Post';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    //defining function bottom of this
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArticle = this.onChangeArticle.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onChangeContentimg = this.onChangeContentimg.bind(this);
    this.onChangeContentimg2 = this.onChangeContentimg2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      article: '',
      img: '',
      contentimg: '',
      contentimg2: '',
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeArticle(e) {
    this.setState({ article: e.target.value });
  }
  onChangeImg(e) {
    let img = e.target.files[0];

    this.setState({ img: img });
  }
  onChangeContentimg(e) {
    let contentimg = e.target.files[0];

    this.setState({ contentimg: contentimg });
  }
  onChangeContentimg2(e) {
    let contentimg2 = e.target.files[0];

    this.setState({ contentimg2: contentimg2 });
  }

  onSubmit(e) {
    e.preventDefault();

    let title = this.state.title;
    let article = this.state.article;
    let img = this.state.img;
    let contentimg = this.state.contentimg;
    let contentimg2 = this.state.contentimg2;
    let formdata = new FormData();

    formdata.append('title', title);
    formdata.append('article', article);
    formdata.append('img', img);
    formdata.append('contentimg', contentimg);
    formdata.append('contentimg2', contentimg2);

    console.log(formdata);

    axios({
      url: `${mainurl}post/add`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    })
      .then((response) => {
        console.log(response.data);
        alert('post added succesfully');
        this.setState({
          title: '',
          article: '',
          img: '',
          contentimg: '',
          contentimg2: '',
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h3>Add new post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title : </label>
            <input
              required
              value={this.state.title}
              onChange={this.onChangeTitle}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="Post Title"
            />
            <small id="helpId" class="form-text text-muted">
              Insert the title of post
            </small>
          </div>
          <div className="form-group">
            <label className="form-label" for="customFile">
              Image:{' '}
            </label>
            <input
              type="file"
              name="file"
              class="form-control"
              id="customFile"
              onChange={(e) => this.onChangeImg(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" for="customFile">
              Content Image 1:{' '}
            </label>
            <input
              type="file"
              name="file"
              class="form-control"
              id="customFile"
              onChange={(e) => this.onChangeContentimg(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" for="customFile">
              Content Image 2:{' '}
            </label>
            <input
              type="file"
              name="file"
              class="form-control"
              id="customFile"
              onChange={(e) => this.onChangeContentimg2(e)}
            />
          </div>
          <div className="form-group">
            <label>Article: </label>
            <input
              value={this.state.article}
              onChange={this.onChangeArticle}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="The director of movie which we first watched together"
            />
            <small id="helpId" class="form-text text-muted">
              Post article
            </small>
          </div>

          <div className="form-group">
            <button type="submit" class="btn btn-primary">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
