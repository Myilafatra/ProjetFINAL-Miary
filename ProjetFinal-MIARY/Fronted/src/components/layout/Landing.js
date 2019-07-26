import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            profil: []
        };
        this.onChange = this.onChange.bind(this)

    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/users/newArticle')
            .then(response => {
                this.setState({ profil: response.data });
                console.log('profil: ', this.state.profil);

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        let imgUrl = './image/sary9.jpg';
        return (
            <div>
                <div style={{
                    backgroundImage: 'url(' + imgUrl + ')',
                    backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
                }} id="image"
                >
                    <div className="text-center text-md-left responsive">
                        <p className="coock">Je Cuisine Créatif !<br/> Idées gourmandes <br/>pour une cuisine facile & créative</p>
                    </div>
                </div>
                <div className="container " >
                    <div className="row" >
                        {
                            (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {
                                return <div className="col-md-4 mx-auto mt-5" key={obj._id}>
                                    <div className="card1" >
                                        <img class="card-img-top" id="sary" src={'http://localhost:8080/api/users/newArticleImage/' + obj.image} alt="Cardimagecap" />
                                        <div class="card-body">
                                            <h3 class="card-title titre1"><b>*{obj.titre}*</b></h3>
                                            <h3 class="card-text titre2">{obj.description}</h3>
                                            <h3 className="card-title titre3"><b>Le {obj.date} à {obj.debut}</b></h3>
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
                                                                    <div id="popup" >
                                                                        <input className="" name="nom" onChange={this.onChange} value={this.state.value} placeholder="Nom" /><br></br>
                                                                        <input name="prenom" placeholder="Prenom" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                        <input name="phone" placeholder="Numero téléphone" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                        <input name="email" placeholder="Email" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                        <center></center>
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
                                                                        </button>
                                                                        <button onClick={onClose}>Annuler</button>
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
        );
    }
}