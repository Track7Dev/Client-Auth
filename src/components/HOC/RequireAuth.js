import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      // Here, we want to check to see if `this.props.authenticated` is true
      // If it isn't, then redirect the user back to the /signin page
      if (localStorage.getItem('username'))
      {
        this.props.login(
          localStorage.getItem('username'),
          localStorage.getItem('password'),
          this.props.history
        );
      }
      if (!this.props.authenticated) {this.props.history.push('/signin')};
    }

    render() {
      return this.props.authenticated || localStorage.getItem('username') ? <ComposedComponent /> : <div/>;
    
      // Here, check to see if `this.props.authenticated` is true
      // If it isn't, then we don't want this component to return anything
      // Else, render the component that was passed to this higher-order component
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps, { login })(RequireAuthentication);
};
