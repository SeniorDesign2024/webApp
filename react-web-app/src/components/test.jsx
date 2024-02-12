import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isMounted : false,
      isAuthenticated: false
    };
  }

  componentDidMount(){
    fetch('api/event/test')
    .then(res=> {
      if(!res.ok) this.setState({isAuthenticated : false, isMounted : true})
      return res.json();
    }).then(res =>{
      this.setState({isAuthenticated: true, isMounted : true})
    }).catch(err => this.setState({isAuthenticated: false, isMounted : true}))
  }

  render() {
    // alert(this.state.isAuthenticated)
    const { message, isMounted, isAuthenticated } = this.state;
    return (
      <p>{isMounted ? (isAuthenticated ? <this.props.component /> : <Navigate to={"/"} />) : "Loading..."}</p>
    );
  }
};