import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DishSearch from "../DishSearch/DishSearch";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  render() {
    
    return (
      <div className="SelectDish">
        {/* <h2>This is the Select Dish screen</h2> */}

        {/* We pass the model as property to the Sidebar component */}
        <div className="col-md-3" style={{float: "left"}}>

        <Sidebar model={this.props.model} />
        </div>
        <div className="col-md-9" style={{float: "left"}}>

        {/* <Dishes /> */}
        <DishSearch model={this.props.model} />
        </div>
      </div>
    );
  }
}

export default SelectDish;
