import React, { Component } from "react";
// import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import modelInstance from "../data/DinnerModel";
import "./DishSearch.css";

class DishSearch extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      type:"All",
      keyword:""
      // numberOfGuests: this.props.model.getNumberOfGuests()
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleSubmit(event) {
    // alert('Your favorite flavor is: ' + event.target.value);
    // this.setState({type: event.target.value});
    this.setState({keyword: this.refs.searchWord.value});
    event.preventDefault();
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

// this is called when component is removed from the DOM
// good place to remove observer
componentWillUnmount() {
  this.props.model.removeObserver(this);
}

// in our update function we modify the state which will
// cause the component to re-render
update() {
  // this.setState({
  //   numberOfGuests: this.props.model.getNumberOfGuests()
  // });

}



// our handler for the input's on change event
// onNumberOfGuestsChanged = e => {
//   this.props.model.setNumberOfGuests(e.target.value);
// };

render() {
  let dshTypes = modelInstance.getDishTypes().map(dshType => (
  <option key={modelInstance.getDishTypes().indexOf(dshType)}>{dshType}</option>));
  return (
    <div id="DishSearchView">

      <h3 style={{ float: "left my-3" }}>
        Find A Dish
      </h3>

      <form role="form" className="form-inline" style={{ float: "left" }} onSubmit={this.handleSubmit} >
        <div className="form-group px-2">
          <input type="searchlabel" className="form-control" id="searchLabel" placeholder="Enter Key Words" ref="searchWord"/>
        </div>
        <select id="selectMenu" className="form-control"  onChange={this.handleTypeChange}>
          {dshTypes}


        </select>
        <button type="submit" className="btn btn-primary mx-2" id="searchBtn">
          Search
          </button>
      </form>

      <p className="p-4"></p>

      <div className="clearfix"></div>


      {/* For the dish search result */}
      <div className="row " id="dishSearch" >

        <Dishes type={this.state.type} keyword={this.state.keyword}/>

      </div>
    </div>
  );
}
}

export default DishSearch;
