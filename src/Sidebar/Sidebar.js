import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
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
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
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
            <tr>
              <td>

              </td>
              <td>

              </td>
            </tr>
          </tbody>

        </table>
        <p style={{float: "right"}} id="totalprice">SEK 0.0</p>
        <button type="button" className="btn btn-block disabled btn-secondary" id="comfirmDinner">
          Confirm Dinner
                        </button>

      </div>
    );
  }
}

export default Sidebar;
