import React from 'react';
import NewsFeed from './components/newsfeed.jsx';
import NewsForm from './components/newsform.jsx';

export default class Home extends React.Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return (
      <div className="container-fluid" style={{height:'100%'}}>
        <div className="row">
          <NewsFeed className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7"></NewsFeed>
          <NewsForm className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xl-offset-1 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1"></NewsForm>
        </div>
      </div>
    );
  }
}
