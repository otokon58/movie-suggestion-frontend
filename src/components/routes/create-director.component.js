import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const mainurl = 'https://otokontest.azurewebsites.net/';
const TITLE = 'Add Director';

export default class CreateDirector extends Component {
  constructor(props) {
    super(props);

    this.onChangeDirectorname = this.onChangeDirectorname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDirectorImg = this.onChangeDirectorImg.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      directorname: '',
      description: '',
      directorimg: '',
    };
  }

  onChangeDirectorname(e) {
    this.setState({
      directorname: e.target.value,
    });
  }

  onChangeDirectorImg(e) {
    let file = e.target.files[0];

    this.setState({ directorimg: file });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let directorname = this.state.directorname;
    let description = this.state.description;
    let directorimg = this.state.directorimg;
    let formdata = new FormData();

    formdata.append('directorname', directorname);
    formdata.append('description', description);
    formdata.append('directorimg', directorimg);

    console.log(formdata);

    axios({
      url: `${mainurl}director/add`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    })
      .then((response) => {
        console.log(response.data);
        alert('Director is added succesfully');
        this.setState({
          directorname: '',
          description: '',
          directorimg: '',
        });
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong');
      });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h3>Add new director</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Director Name: </label>
            <input
              required
              value={this.state.directorname}
              onChange={this.onChangeDirectorname}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="Tim Burton"
            />
            <small id="helpId" class="form-text text-muted">
              Insert the director's name
            </small>
          </div>
          <div className="form-group">
            <label className="form-label" for="customFile">
              Director Porte:{' '}
            </label>
            <input
              type="file"
              name="file"
              class="form-control"
              id="customFile"
              onChange={(e) => this.onChangeDirectorImg(e)}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              value={this.state.description}
              onChange={this.onChangeDescription}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="The director of movie which we first watched together"
            />
            <small id="helpId" class="form-text text-muted">
              About the director
            </small>
          </div>

          <div className="form-group">
            <button type="submit" class="btn btn-primary">
              Add Director
            </button>
          </div>
        </form>
      </div>
    );
  }
}
