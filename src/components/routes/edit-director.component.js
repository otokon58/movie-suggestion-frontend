import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TITLE = 'Edit Director'

export default class EditDirector extends Component {
    constructor(props){
        super(props);

        this.onChangeDirectorname = this.onChangeDirectorname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDirectorImg = this.onChangeDirectorImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            directorname:'',
            description: '',
            directorimg: '',
        };
    }

    componentDidMount(){
        axios.get('https://movie-suggestion-api.herokuapp.com/director/' + this.props.match.params.id)
        .then(response => {
           // const selectedMovie = response.data;
            this.setState({
                directorname: response.data.directorname,
                directorimg: response.data.directorimg,
                description: response.data.description,
            });
        })
        .catch(err => console.log(err));

        
    }
    

    onChangeDirectorname(e){
        this.setState({
            directorname: e.target.value
        });
    }

    onChangeDirectorImg(e){
        let file = e.target.files[0]
        
        this.setState({directorimg: file});
    }
    

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();


        let directorname = this.state.directorname;
        let description = this.state.description;
        let directorimg = this.state.directorimg;
        let formdata = new FormData();

        formdata.append('directorname',directorname);
        formdata.append('description', description);
        formdata.append('directorimg',directorimg);

        console.log(formdata);

        axios({
            url: 'https://movie-suggestion-api.herokuapp.com/director/update/' + this.props.match.params.id,
            method: "POST",
            headers:{
                "Content-Type": "multipart/form-data",
            },
            data: formdata
        }).then(response => {
            console.log(response.data);
            alert('Director is added succesfully');
            this.setState({
                directorname:'',
                description: '',
                directorimg: '',
                
            });
        })
        .catch(err => {
            console.log(err);
            alert(err);
        });

        // const director ={
        //     directorname: this.state.directorname,
        //     description: this.state.description,
        //     directorimg : this.state.directorimg
        // };
        // axios.post('https://movie-suggestion-api.herokuapp.com/director/update/' + this.props.match.params.id, director )
        // .then(response => {
        //     alert('The director is updated successfully');
        //     console.log(response.data);
        // })
        // .catch(err => {
        //     alert('Something went wrong');
        //     console.log(err);
        // });
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{ TITLE }</title>
                </Helmet>
                <h3>Edit "{this.state.directorname}"</h3>
                <form onSubmit={this.onSubmit}>
                        <div className='form-group'> 
                            <label >Director: </label>
                            <input value={this.state.directorname} onChange={this.onChangeDirectorname} type="text" class="form-control" aria-describedby="helpId" placeholder="Big Fish"/>
                            <small id="helpId" class="form-text text-muted">Insert the director's name</small>
                        </div>
                        <div className='form-group'>
                            <label className="form-label" for="customFile">Default file input example</label>
                            <input type="file" name="file" class="form-control" id="customFile" onChange={e => this.onChangeDirectorImg(e)} />  
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
