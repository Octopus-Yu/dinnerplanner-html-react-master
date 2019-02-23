import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import modelInstance from '../data/DinnerModel';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error

        this.state = {
            status: "LOADING",
        };

        this.handleAddtoMenu = this.handleAddtoMenu.bind(this);
    }

    handleAddtoMenu() {
        modelInstance.addDishToMenu(this.props.match.params.dishID);
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        let dshID = this.props.match.params.dishID;
        alert(dshID);
        modelInstance
            .getSelectedInformation(dshID)
            .then(dish => {
                modelInstance.getDish(dshID).ingredients = dish.extendedIngredients;
                modelInstance.getDish(dshID).description = dish.instructions;
                console.log(modelInstance.getDish(dshID).description);

                this.setState({
                    status: "LOADED",
                    dish: modelInstance.getDish(dshID)

                });
                alert(dish.extendedIngredients);
                console.log("@" + this.state.dish.title);


            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
        this.props.model.addObserver(this);
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests()
        });
        //console.log(this.state.dish.extendedIngredients);

    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update() {
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests()
        });

    }



    render() {
        alert("render!")
        let dshDetail = null;
        let dshName = null;
        let dshImage = null;
        let dshDescription = null;
        let ingreList = null;
        let dshPrice = null;
        let numberOfGuests = this.state.numberOfGuests;

        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned dishes
        switch (this.state.status) {
            case "LOADING":
                // dishesList = <em>Loading...</em>;
                dshDetail = (<div id="detailLoading" styly="display:none">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>

                </div>);
                break;
            case "LOADED":
                dshName = this.state.dish.title;
                dshImage = modelInstance.rootURL + this.state.dish.image;
                dshDescription = this.state.dish.description;

                ingreList = this.state.dish.ingredients.map(ingredient => (
                    // <li key={dish.id}>{dish.title}</li>

                    <tr>
                        <td>{(ingredient.amount * modelInstance.getNumberOfGuests()).toFixed(1) + ' ' + ingredient.unit}</td>
                        <td >{ingredient.name}</td>
                        <td >{"SEK"}</td>
                        <td> {Math.trunc(modelInstance.getNumberOfGuests())}</td>
                    </tr>

                ));

                // for (let ingre of this.state.dish.ingredients) {
                //     dshPrice += modelInstance.getNumberOfGuests();
                // }
                dshPrice = this.state.dish.ingredients.length * modelInstance.getNumberOfGuests();


                dshDetail = (

                    <div className="row " id="dishDetail" >

                        <div className="col-md-6">

                            <div className="card" style={{ maxHeight: "40rem", maxwidth: "40rem" }}>
                                <h5 className="card-title" id="dshName">{dshName}</h5>
                                <img src={dshImage} className="card-img-top" alt="..." id="dshImage" />
                                <div className="card-body">

                                    <p className="card-text" id="dshDescription">{dshDescription}</p>
                                    <Link to="/search">
                                        <a href="#" className="btn btn-primary" id="backtoSearch">Back to research</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">

                            <h3 className="text-left" id="ingreNumber">
                                INGREDIENTS FOR {numberOfGuests} PEOPLE
                        </h3>
                            <table className="table" style={{ backgroundcolor: "burlywood" }} id="ingreTable">
                                <thead>

                                </thead>
                                <tbody>
                                    {ingreList}
                                    <tr>
                                        <td>TOTAL</td>
                                        <td></td>
                                        <td>SEK</td>
                                        <td>{dshPrice}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button type="button" className="btn btn-md btn-primary" id="addtoMenu" onClick={this.handleAddtoMenu}>
                                Add to menu
                        </button>

                        </div>
                    </div>


                );




                break;
            default:
                // dishesList = <b>Failed to load data, please try again</b>;
                break;
        }
        // alert(this.state.dish.title);

        return (<div className="row">

            <div className="col-md-3" style={{ float: "left" }}>
                <Sidebar model={this.props.model} /></div>
            <div className="col-md-9" style={{ float: "left" }}>
                {dshDetail}
            </div>
        </div >);
    }
}

export default DishDetail;