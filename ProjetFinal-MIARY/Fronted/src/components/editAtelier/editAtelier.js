import React from 'react';


class EditAtelier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: '',
      utilisateur: '',
      prix: '',
      debut: '',
      duree: '',
      place: '',
      placeRes: '',
      description: '',
      image: '',
    }
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('image', this.uploadInput.files[0]);
    data.append('titre', this.state.titre);
    data.append('prix', this.state.prix);
    data.append('debut', this.state.debut);
    data.append('duree', this.state.duree);
    data.append('place', this.state.place);
    data.append('placeRes', 0);
    data.append('idUser', localStorage.id);
    data.append('description', this.state.description)

    fetch('http://localhost:8080/api/users/putArticle/' + this.props.match.params.id, {
      method: 'PUT',
      body: data,
    }).then((response) => {
      console.log('ity n response ' + response);
      console.log('this.props.match.params.id ' + this.props.match.params.id);


      response.json().then((body) => {
        this.setState({ image: `http://localhost:8080/api/users/newArticle/${body.image}` });
        console.log('ity ilay body.image', body.image);

      });
    });
  }

  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
        <div className="col-md-6 border border-danger mx-auto mt-5" id="register">
        <center><h2 style={{marginBottom: '40px',color:"#f3671f"}}>Modification</h2></center>
          <form onSubmit={this.handleUploadImage} className="md-form">
            <div className="form-group mx-sm-3 mb-2 container">

              <div className="col-xs-6 ">

                <input className="form-control" type="text"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="titre" placeholder="Titre" />

              </div>
              <div className="col-xs-6">

                <input className="form-control" type="text"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="prix" placeholder="Prix" />

              </div>
             
                <div className="col-xs-6">
                  <input className="form-control" type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    name="debut" placeholder="Debut" />
                </div>

                <div className="col-xs-6">

                  <input className="form-control" type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    name="description" placeholder="Description" />

                </div>
           
                <div className="col-xs-6">
                  <input className="form-control" type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    name="place" placeholder="Nombre des places" />
                </div>
                <div className="col-xs-6">
                  <input className="form-control" type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    name="duree" placeholder="Durée" />
              </div>
              <br />

              <div className="row">
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />
              </div>
              <center>
                <button id="validate" className="btn btn1">VALIDER</button>
              </center>
            </div>
        </form>
        </div>
      </div>
</div>
    );
  }
}

export default EditAtelier;