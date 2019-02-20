import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (

      <div className="Welcome">
        <div className="text-center p-5">
          <p className="lead">Lab 1 by Xiaoyun Zhang and Yu Zhang Dinner planner Screen 01</p>
          <p className="p-2"></p>
          <Link to="/search">
            <button className="btn btn-primary btn-lg" id="CreatNewDinner">Creat New Dinner</button>
          </Link>
        </div>
      </div>

        );
  }
}

export default Welcome;
