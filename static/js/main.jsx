var VideoLink = React.createClass({
  getInitialState: function() {
    return {
      url: '',
      style: {display:'None'}
    }
  },
  componentWillReceiveProps: function(p){
    this.setState({request_url : p.url}, function(){
      this.getUrl(function(){
	this.refs.d.getDOMNode().click()	
      })
    })
  },
  getUrl: function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/url?q=' +
		 encodeURIComponent(this.state.request_url), true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {	
	this.setState(JSON.parse(request.responseText), callback)
      } else {
	console.log('error')
      }
    }.bind(this)
    if(this.state.request_url){
      request.send();
    }
  },
  render: function(){
    return <div className="VideoLink">
      <a href={this.state.url} ref="d" style={this.state.style} download>Download</a>
      <img src={this.state.thumbnail} />
    </div>
  }
})

var InputRotate = React.createClass({
  getInitialState: function(){
    return {
      placeholders: ['youtube.com','vimeo.com', 'gorrilavid.com']
    }
  },
  switchPlaceholder: function(){
    var p = this.state.placeholders[Math.floor(Math.random() *
					       this.state.placeholders.length)];
    this.setState({placeholder: p})
  },
  componentDidMount: function(){
    this.interval = setInterval(this.switchPlaceholder, 3000);
  },
  render: function(){
    return <input type="text" placeholder={this.state.placeholder}/>
  }
})

var Main = React.createClass({
  getInitialState: function() {
    return {}
  },
  handleSubmit: function() {
    this.setState({url: this.refs.url.getDOMNode().value});
  },
  handlePaste: function(e){
    this.setState({url: e.target.value})
  },
  render: function() {
    return <div className="Main">
      <InputRotate  ref="url" />
      <button onClick={this.handleSubmit}>Download</button>
      <VideoLink url={this.state.url}/>
      </div>;
  }
});
 
React.render(<Main />, document.getElementById('main'));
