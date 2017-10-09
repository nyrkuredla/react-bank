import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

//import components and containers


class BaseLayout extends Component {
  render() {
    return (

        <div className="base">
          {this.props.children}
        </div>


    );
  }
}

export default BaseLayout;
