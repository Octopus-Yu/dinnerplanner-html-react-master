import React, { Component } from "react";
import { Link } from "react-router-dom";


class Payment extends Component {
    constructor(props) {
        super(props);

        // we put on state the properties we want to use and modify in the component
        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menuDishes: this.props.model.getFullMenu()
        };
    }





    render() {

        // let menuDishes = null;
        // let totalMenuPrice = null;




        //   ));
        //   totalMenuPrice = this.props.model.getTotalMenuPrice();
        // }
        let menuDishes = null;
        let cardImage = null;
        let totalMenuPrice = this.props.model.getTotalMenuPrice();
        if (this.state.menuDishes) {
            menuDishes = this.state.menuDishes.map(dsh => (
                // <li key={dish.id}>{dish.title}</li>

                
                    <div className="card w-75">
                        <div className="card-body">
                            <img className="card-img-top" src={this.props.model.rootURL + dsh.image}>

                            </img>
                            <p className="card-text text-center">

                            </p>
                        </div>
                        <div className="card-footer text-center">
                            {dsh.title}
                        </div>
                    </div>
                
            ));


            return (


                <div className="row" id="paymentPage" >
                    <div className="container my-2">
                        <h3 style={{ float: "left" }} id="paymentNumber">My Dinner : {this.state.numberOfGuests} People
            </h3>
                        <Link to="/search">
                            <button type="button" className="btn btn-primary" style={{ float: "right" }} id="backEdit">Go back and edit dinner</button>
                        </Link>
                    </div>
                    <div className="container-fluid my-2 mb-4">
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-7">
                                <div className="card-deck" id="paymentDetail">
                                    {/* put pyament detail here */}
                                    {menuDishes}
                                </div>
                            </div>
                            <div className="col-md-3">

                                <p id="paymentViewTotal">Total:{totalMenuPrice}</p>
                                <span id="totalPrice"> </span>
                            </div>
                        </div>
                    </div>

                    <div className="container text-center my-2">
                        <Link to="/recipe">
                        <button type="button" className="btn btn-primary btn-lg" id="printBtn">Print Full Recipe</button>
                        </Link>


                </div>
                </div >
            );
        }
    }
}

export default Payment;
