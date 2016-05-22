import React from 'react';

export default class Appbar extends React.Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return (
      <div className="navbar navbar-light-blue">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="/" className="navbar-brand">Simple News Feed</a>
          </div>
        </div>
      </div>
    );
  }
}
