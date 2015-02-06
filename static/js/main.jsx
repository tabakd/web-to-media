var VideoLink = React.createClass({
  getInitialState: function() {
    return {url: ''}
  },
  componentWillReceiveProps: function(p){
    this.setState({request_url : p.url}, function(){
      this.getUrl()
    })

  },
  getUrl: function() {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/url?q=' +
		 encodeURIComponent(this.state.request_url), true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {	
	this.setState(JSON.parse(request.responseText))
      } else {
	console.log('error')
      }
    }.bind(this)
    request.send();
  },
  render: function(){
    return <div className="VideoLink">
      <a href={this.state.url} download>Download</a>
      <img src={this.state.thumbnail} />
    </div>
  }
})

var Main = React.createClass({
  getInitialState: function() {
    return {}
  },
  handleSubmit: function(event) {
    this.setState({url: this.refs.url.getDOMNode().value});
  },
  render: function() {
    return <div className="Main">
      <input ref="url" type="text" />
      <button onClick={this.handleSubmit}>Get Link</button>
      <VideoLink url={this.state.url}/>
      </div>;
  }
});
 
React.render(<Main />, document.getElementById('main'));
