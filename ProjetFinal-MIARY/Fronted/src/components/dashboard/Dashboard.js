import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropAtelier from "../propAtelier/propAtelier";

import Atelier from "../newAtelier/NewAtelier"

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    console.log('localStorage.local sur dashbord' + localStorage.id);

    const { user } = this.props.auth;

    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-2">
            <center>
              <h4>
                  <b>Bienvenue</b> <br />{user.nom.split(" ")[0]}
              </h4>
              <div class="d-flex" id="wrapper">

                <div class="bg-light border-right" id="sidebar-wrapper">
                  <div class="list-group list-group-flush">
                    
                    <button className="btn deconex" onClick={()=>{
                          document.getElementById('ajoutcuisinier').style.display = "block"
                          document.getElementById('tableget').style.display = "none"
                      }}>Ajouter un atelier</button>
                      
                    <a href="#" class="list-group-item list-group-item-action bg-light">
                      <button className="btn deconex" id="botton" onClick={()=>{
                          document.getElementById('tableget').style.display = "block"
                          document.getElementById('ajoutcuisinier').style.display = "none"
                      }}>Votre atelier</button>
                    </a>
                  </div>
                </div>
              </div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large deconex accent-3"
              >
                Deconnecter
            </button>
            </center>
            </div>
            <div className="col-md-9">
              <Atelier/>
              <PropAtelier />
            </div>
            <div className="landing-copy col s12 center-align">


            </div>
          </div>
        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
