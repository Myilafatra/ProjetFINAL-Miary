import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListTout extends Component {

    constructor(props) {
        super(props);
        this.state = { produit: [] };

    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/users/newArticle')
            .then(response => {
                console.log('i am a response', response)
                this.setState({ produit: response.data });
                console.log('i am a produit', this.state.produit)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    liste() {
        return <div>
            <center><h2 id="titre">Les nouvaux ateliers</h2></center>
            <div className="container-fluid">
                <div className="row">
                
                {
                    (this.state.produit.length > 0) ? (this.state.produit.filter((params)=>params.visib).map((obj) => {
                        return <div className="col-md-4 mx-auto mt-5" key={obj._id}>
                        <div className="card1" >
                            <img class="card-img-top" id="sary" src={'http://localhost:8080/api/users/newArticleImage/' + obj.image} alt="Cardimagecap" />
                            <div class="card-body">
                                <h3 class="card-title titre1"><b>*{obj.titre}*</b></h3>
                                <h3 class="card-text titre2">{obj.description}</h3>
                                <h3 className="card-title titre3">Le {obj.date} à {obj.debut}</h3>
                                <h3 class="card-text titre3"><b>Durée:{obj.duree}h</b></h3>
                                <h3 class="card-text titre3">Places disponible:{obj.place}</h3>
                                <h3 class="card-text titre3">Places réservées:{obj.placeRes}</h3>
                                <h3 className="card-text titre1">Paf:{obj.prix}Ar <span id="pers">/pers</span> </h3>
                                <center>
                                    <button className="btn btn1"
                                        onClick={() => {
                                            confirmAlert({
                                                customUI: ({ onClose }) => {
                                                    return (
                                                        <div id="popup">
                                                            <input name="nom" onChange={this.onChange} value={this.state.value} placeholder="Nom" /><br></br>
                                                            <input name="prenom" placeholder="Prenom" onChange={this.onChange} value={this.state.value} /><br></br>
                                                            <input name="telephone" placeholder="Numero téléphone" onChange={this.onChange} value={this.state.value} /><br></br>
                                                            <input name="email" placeholder="Email" onChange={this.onChange} value={this.state.value} /><br></br>
                                                            <center>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault()
                                                                                axios.post("http://localhost:8080/api/users/particulier/" + obj._id, {
                                                                        nom: this.state.nom,
                                                                        prenom: this.state.prenom,
                                                                        phone: this.state.phone,
                                                                        email: this.state.email

                                                                                }).then(res => {
                                                                                    axios.get("http://localhost:8080/api/users/newArticle").then(res => {

                                                                                        this.setState({ profil: res.data })
                                                                                    })
                                                                                    onClose()
                                                                                })

                                                                            }} >Confirmer
                                                                        </button> &nbsp;&nbsp;&nbsp;
                                                                        <button onClick={onClose}>Annuler</button>
                                                                        </center>
                                                        </div>
                                                    );
                                                }
                                            });
                                        }}
                                    id="inscrire-btn">S'inscrire</button>
                                </center>
                            </div>
                        </div>
                    </div>
                    })) : ('')
                }
</div>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}