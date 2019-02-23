import React, { Component } from "react";
import { Link } from "react-router-dom";


class Recipe extends Component {
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
        let totalMenuPrice = this.props.model.getTotalMenuPrice();
        if (this.state.menuDishes) {
            menuDishes = this.state.menuDishes.map(dsh => (
                // <li key={dish.id}>{dish.title}</li>

                <div className="row">
                    <div className="col-md-2 text-center">
                        <img className="card-img-top" alt={dsh.title} src={this.props.model.rootURL + dsh.image} />
                    </div>
                    <div className="col-md-5">
                        <h2>
                            {dsh.title}
                        </h2>
                        <p>
                            {dsh.description}
                        </p>
                    </div>
                    <div className="col-md-5">
                        <h4>
                            PREPARATION
                    </h4>
                        <p>
                            {dsh.description}
                        </p>
                    </div>
                </div>
            ));


            return (


                <div className="row" id="recipeView">
                    <div className="container my-2">
                        <h3 style={{ float: "left" }} id="recipeNumber">My Dinner : {this.state.numberOfGuests} People
                    </h3>
                        <Link to="/search">
                            <button type="button" className="btn btn-primary" style={{ float: "right" }} id="recipeBack">Go back and edit dinner</button>
                        </Link>
                    </div>
                    <div className="container-fluid" style={{ border: "1px solid" }} id="recipeDetail">
                        {/* put recipe detail here */}
                        {menuDishes}
                    </div>
                </div>
            );
        }
    }
}

export default Recipe;
