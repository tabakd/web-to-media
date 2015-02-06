var VideoLink = React.createClass({displayName: 'VideoLink',
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

    console.log('s')
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
    return React.createElement("div", {className: "VideoLink"}, 
      React.createElement("a", {href: this.state.url, ref: "d", style: this.state.style, download: true}, "Download"), 
      React.createElement("img", {src: this.state.thumbnail})
    )
  }
})

var InputRotate = React.createClass({displayName: 'InputRotate',
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
    return React.createElement("input", {type: "text", placeholder: this.state.placeholder})
  }
})

var Main = React.createClass({displayName: 'Main',
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
    return React.createElement("div", {className: "Main"}, 
      React.createElement(InputRotate, {ref: "url"}), 
      React.createElement("button", {onClick: this.handleSubmit}, "Download"), 
      React.createElement(VideoLink, {url: this.state.url})
      );
  }
});
 
React.render(React.createElement(Main, null), document.getElementById('main'));
