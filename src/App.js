import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1 className="App-title">{this.state.title}</h1> */}

          <div className="col-md-12">
            <div className="jumbotron">

              <h1 className="display-4">
                <div className="row justify-content-center">
                  {this.state.title}
                </div>

              </h1>

            </div>
          </div>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
