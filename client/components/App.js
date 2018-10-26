import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducts } from '../reducers/productReducer';
import { getOrders } from '../reducers/orderReducer';
import Navbar from './Navbar';

class App extends Component {

  componentDidMount() {
    this.props.init()
  }

  render() {
    console.log(this.props)
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };

    return (
      <HashRouter>
        <div>
          <Route path="/" render={renderNavbar} />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ products, orders }) => {
  return { products, orders }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(getProducts())
      dispatch(getOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
