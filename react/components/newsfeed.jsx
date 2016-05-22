import React from 'react';
import io from 'socket.io-client';

export default class NewsFeed extends React.Component {
  constructor(){
    super();
    this.state = {
      news: []
    };
  }

  componentDidMount(){
    const self = this;
      $.get('/v1/news/').then((news) => {
        self.setState({ news: news });

        // Open web socket
        self.newsClient = io('/news');
        self.newsClient.on('connect_failed', (err) => {
          console.log(err || 'Failed to connect to websocket.');
        });
        self.newsClient.on('newitem', (newNews) => {
          console.log(newNews);
          self.state.news = [newNews].concat(self.state.news);
          self.setState({ news: self.state.news });
        });
      }, (err) => {
        console.log('Error retrieving news.');
      });
  }

  componentWillUnmount(){
    // Close web socket here
  }

  render(){
    return (
      <div className={this.props.className} style={this.props.style}>
        <h2>Latest News</h2>
        {
          this.state.news.map((n, i) => (
            <div key={i}>
              <h4>{n.title}</h4>
              <div>{n.body}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

NewsFeed.propStyle = {
  className: React.PropTypes.string,
  style: React.PropTypes.object
};
