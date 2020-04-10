import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

//Create library for icons used
library.add(faTwitterSquare, faQuoteRight, faQuoteLeft);

//Color array for random background colors
const colorArray = ['#221D23', '#4F3824', '#D1603D', '#DDB967', '#D0E37F']

//Makes sure the background color fills 100% of the page, and centers the container div
const mainStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

/*Style for main container div. The flexbox centering of the parent combined with auto-height
makes this page totally responsive no matter the screen size as long as the user's device is
wider than 600 px. The iPhone SE has 640px width, so this should be plenty small for the
majority of users.*/
const divStyle = {
  backgroundColor: 'white',
  width: 600,
  height: 'auto',
  borderRadius: 10
};

//Style for random generated quote
const quoteStyle = {
  height: 'auto',
  width: 500,
  clear: 'both',
  margin: '40px 40px',
  wordWrap: 'break-word',
  textAlign: 'center',
  fontFamily: 'Playfair Display',
  fontSize: 30
}

//Style for author associated with quote
const authorStyle = {
  height: 'auto',
  width: 500,
  clear: 'both',
  margin: '40px 40px',
  textAlign: 'right',
  fontFamily: 'Playfair Display',
  fontSize: 20
}

//Style for div that contains the buttons at the bottom of the main container.
const buttonBlockStyle = {
  height: 'auto',
  width: 500,
  clear: 'both',
  margin: '40px 40px',
  display: 'block',
}

//Style for Twitter icon
const tIconStyle = {
  width: 50,
  height: 50
}

//Style for quote icons
const qIconStyle = {
  width: 30,
  height: 30
}

//Style for 'New Quote' button
const buttonStyle = {
  color: 'white',
  height: 50,
  borderRadius: 10,
  float: 'right',
  borderStyle: 'none',
  fontFamily: 'Open Sans',
  fontSize: 16,
  fontWeight: 600,
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#194f59',
      quote: '',
      author: ''
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  //Calls random quote generator API on initial page load and sets quote and author state
  componentDidMount() {
    //Have to go through CORS proxy to avoid CORS error
    fetch('https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/random.json', 
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(results => {
      return results.json();
    }).then(data => {
      let quote = data.quote;
      let author = data.author;
      this.setState({
        quote: quote,
        author: author
      })
    });
  };

  clickHandler() {
    //Changes the color in state, which controls the background color, icon colors, and text color; so each time you get a new quote the page changes color
    const randomNum = Math.floor(Math.random() * colorArray.length);
    this.setState(
      {color: colorArray[randomNum]}
    );
    //Each time you click 'New Quote', this fetches *surprise* a new quote!
    fetch('https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/random.json', 
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(results => {
      return results.json();
    }).then(data => {
      let quote = data.quote;
      let author = data.author;
      this.setState({
        quote: quote,
        author: author
      })
    });
  };

  render(){
    return (
      /*Object.assign allows using multiple styles. The reason to use this is because then we can dynamically change the colors
      on the page using state. Since the style variables are not part of this class, they do not update dynamically.*/
      <div style={Object.assign({}, mainStyle, {backgroundColor: this.state.color})}>
        <div id='quote-box' style={divStyle}>
          <div id='text' style={Object.assign({}, quoteStyle, {color: this.state.color})}>
            <FontAwesomeIcon style={Object.assign({}, qIconStyle, {color: this.state.color})} icon={'quote-left'} />
            {/*Render quote from state*/}
            <span> {this.state.quote} </span>
            <FontAwesomeIcon style={Object.assign({}, qIconStyle, {color: this.state.color})} icon={'quote-right'} />
          </div>
          <div id='author' style={Object.assign({}, authorStyle, {color: this.state.color})}>
            {/*Render author from state*/}
            <p>- {this.state.author}</p>
          </div>
          <div style={buttonBlockStyle}>
            {/*Twitter link lets user tweet something out. In this case, the quote and author.*/}
            <a id='tweet-quote' href={'https://www.twitter.com/intent/tweet?text=' + "'" + this.state.quote + "'  - " + this.state.author}>
              <FontAwesomeIcon style={Object.assign({}, tIconStyle, {color: this.state.color})} icon={['fab', 'twitter-square']} />
            </a>
            <button id='new-quote' style={Object.assign({}, buttonStyle, {backgroundColor: this.state.color})} onClick={this.clickHandler}>
            New quote
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;