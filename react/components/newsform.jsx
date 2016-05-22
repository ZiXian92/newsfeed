import React from 'react';

export default class NewsForm extends React.Component {
  constructor(){
    super();
    this.addNews = this.addNews.bind(this);
    this.state = {

    };
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  addNews(){
    const self = this;
    const title = this.refs.newsTitle.value;
    const body = this.refs.newsBody.value;
    if(title.length<1) return false;
    $.ajax('/v1/news', {
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        title: title,
        body: body
      })
    }).then((news) => {
      // console.log('News added successfully');
      // console.log(news);
      // console.log(self.refs.newsTitle);
      // self.refs.newsTitle = this.refs.newsBody = '';
    }, (err) => {
      console.log('Failed to add news.');
      console.log(err);
    });
  }

  render(){
    return (
      <div className={this.props.className} style={this.props.style}>
        <h2>Add News</h2>
        <div className="form-group has-error label-floating">
          <label for="newstitleinput" className="control-label">Title</label>
          <input className="form-control" id="newstitleinput" ref="newsTitle" required />
          <span className="help-block">This field is required.</span>
        </div>
        <div className="form-group label-floating">
          <label for="newsbodyinput" className="control-label">Body</label>
          <textarea id="newsbodyinput" className="form-control" ref="newsBody"></textarea>
        </div>
        <a href="javascript:void(0)" class="btn btn-raised" onClick={this.addNews}>Submit</a>
      </div>
    );
  }
}
