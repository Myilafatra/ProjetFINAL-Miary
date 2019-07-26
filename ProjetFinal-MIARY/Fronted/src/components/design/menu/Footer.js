import React, { Component } from "react";


class Footer extends Component {
  render() {
    return (
      <footer class="page-footer font-small pt-4 mx-auto mt-5">

        <div class="container text-center text-md-left">
          <div class="row text-center text-md-left mt-3 pb-3">
            <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 class="text-uppercase mb-4 font-weight-bold"> </h6>
            </div>
          </div>

            <hr />
            <div class="row d-flex align-items-center">
              <div class="col-md-7 col-lg-8">
                <p id="me"class="text-center text-md-left">© 2018 Copyright:
                    <strong >Miary Ravaoarisoa</strong>
                </p>
              </div>
            </div>
        </div>  
      </footer>
          );
        }
        };
      
  export default Footer;