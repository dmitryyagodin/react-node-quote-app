// import quotesData from './QuotesData';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {Twitter} from 'react-bootstrap-icons';
import Data from './data.json';

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    let randomNum = Math.floor(Math.random() * Data.length);
    this.setState({
      number: randomNum
    });
  }
  
  render() {
    let quoteText = Data[this.state.number].quote;
    let author = Data[this.state.number].author;
    let tweetCode = encodeURIComponent('"' + quoteText + '" ' + author);
    let tweetUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
    return (
      <div id="quote-box">
        <p id="text"><span>"</span>{quoteText}<span>"</span></p>
        <p id="author">{author}</p>
        <Button id="new-quote" onClick={this.handleClick} variant="outline-primary">
          New quote
        </Button>
        <a 
          id="tweet-quote" 
          role="button" 
          className="btn btn-outline-primary" 
          href={`${tweetUrl + tweetCode}`} 
          target="_blank">
            <Twitter />
             Tweet
        </a>
      </div>
    );
  }
};

export default QuoteBox;
