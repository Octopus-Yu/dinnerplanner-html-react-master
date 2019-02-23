import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menuDishes: this.props.model.getFullMenu()

    };
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
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menuDishes: this.props.model.getFullMenu()

    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {

    let menuDishes = null;
    let totalMenuPrice = null;
    if (this.state.menuDishes) {
      menuDishes = this.state.menuDishes.map(dsh => (
        // <li key={dish.id}>{dish.title}</li>

        <tr>
          <td >{dsh.title}</td>
          <td >{this.props.model.getDishPrice(dsh.id)}</td>
        </tr>



      ));
      totalMenuPrice = this.props.model.getTotalMenuPrice();
    }

    return (
      <div className="Sidebar">
        <h3>My Dinner</h3>
        <p>
          People:
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>

        <table className="table table-sm" id="tablemenu">

          <thead>
            <tr>
              <th>
                Dish Name
                                    </th>
              <th>
                Cost
                                    </th>
            </tr>
          </thead>

          <tbody>
            {menuDishes}
          </tbody>

        </table>
        <p style={{ float: "right" }} id="totalprice">SEK {totalMenuPrice}</p>
        <Link to="/payment">
        <button type="button" className={(this.state.menuDishes.length > 0) ? 'btn btn-block btn-primary' : 'btn btn-block disabled btn-secondary'} id="comfirmDinner" disabled={(this.state.menuDishes.length > 0) ? false : true}>
          Confirm Dinner
        </button>
        </Link>

      </div>
    );
  }
}

export default Sidebar;
