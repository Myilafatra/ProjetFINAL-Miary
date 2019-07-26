
import React from 'react';
import './new.css'

class NewAtelier extends React.Component {
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
    data.append('placeRes', this.state.placeRes);
    data.append('place', this.state.place);
    data.append('idUser', localStorage.id);
    data.append('description', this.state.description)

    fetch('http://localhost:8080/api/users/newArticle/', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ image: `http://localhost:8080/api/users/newArticle/${body.image}` });
        console.log('ity ilay body.image', body.image);

      });
    });
  }

  render() {
    return (
      <div className="container-fluid" >
        <div className="row" id="ajoutcuisinier">
          <div className="col-md-6 border border-danger mx-auto mt-5" id="register">
          <center><h2 style={{marginBottom: '40px',color:"#f3671f"}}>Nouveau atelier</h2></center>
            <form onSubmit={this.handleUploadImage} className="md-form">
              <div className="form-group mx-sm-3 mb-2 container">
               
                <input className="form-control" type="text"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="titre" placeholder="Titre" />


                <input className="form-control" type="text"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="description" placeholder="Description" />


                <input className="form-control" type="date"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="date" placeholder="Date" />

                <input className="form-control" type="text"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="duree" placeholder="Durée" /> 

                    <input className="form-control" type="time"
                      value={this.state.value}
                      onChange={this.onChange}
                      name="debut" placeholder="Debut" />
                  
                    <input className="form-control" type="text"
                      value={this.state.value}
                      onChange={this.onChange}
                      name="place" placeholder="Place disponibles" />

                    <input className="form-control" type="number"
                      value={this.state.value}
                      onChange={this.onChange}
                      name="placeRes" placeholder="Place réservées" />

                 <input className="form-control" type="number"
                  value={this.state.value}
                  onChange={this.onChange}
                  name="prix" placeholder="Prix" />

                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="image" />
                  <center><button id="validate" className="btn btn1" >Publier</button></center>
                </div>
            </form>
          </div>
          
        </div>
      </div>

    );
  }
}

export default NewAtelier;
