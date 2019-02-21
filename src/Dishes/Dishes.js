import React, { Component } from "react";
import { Link } from 'react-router-dom';
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
 
    this.state = {
      status: "LOADING",
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
      modelInstance
        .getAllDishes()
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results,
          urlRoot: dishes.baseUri
        });

        modelInstance.rootURL=dishes.baseUri;
        modelInstance.dishes=dishes.results;
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
    
  }

  componentWillReceiveProps(nextProps) {
    //alert(nextProps.keyword);
    if (nextProps.type == "All" && nextProps.keyword == "") {
      modelInstance
        .getAllDishes()
        .then(dishes => {
          this.setState({
            status: "LOADED",
            dishes: dishes.results,
            urlRoot: dishes.baseUri
          });

          modelInstance.dishes=dishes.results;
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        });
    }

    else {

      modelInstance
        .getSearchDishes(nextProps.type,nextProps.keyword)
        .then(dishes => {
          this.setState({
            status: "LOADED",
            dishes: dishes.results,
            urlRoot: dishes.baseUri
          });
          modelInstance.dishes=dishes.results;
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        });
    }
  }
  



  render() {
    let dishesList = null;
    console.log(this.props.type+this.props.keyword);

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
          // <li key={dish.id}>{dish.title}</li>
          <Link to={"./DishDetail/" + dish.id}>
          <div key={dish.id} className="card mx-2" style={{ width: "18rem", float: "left" }}>
            <img src={this.state.urlRoot + dish.image} className="card-img-top" />
            <div className="card-body">
              <h4 className="card-text text-center">{dish.title}</h4>
            </div>
          </div>
          </Link>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">
        {/* <h3>Dishes</h3> */}
        <div>{dishesList}</div>
      </div>
    );
  }
}

export default Dishes;
