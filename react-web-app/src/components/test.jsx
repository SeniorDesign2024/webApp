import React, { Component } from 'react';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isMounted : false
    };
  }

  componentDidMount(){
    fetch('api/event/test')
    .then(res=> {
      if(!res.ok) this.setState({message : "Failed to connect", isMounted : true})
      return res.json();
    }).then(res =>{
      this.setState({message : res.message, isMounted : true})
    }).catch(err => this.setState({message : err.message, isMounted : true}))
  }

  render() {
    const { message, isMounted } = this.state;
    return (
      <p>{isMounted ? message : "Loading..."}</p>
    );
  }
};