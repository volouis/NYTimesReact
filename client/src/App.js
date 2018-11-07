import React, {Component} from 'react';
import Jumbotron from './components/Jumbotron'
import { Input, FormBtn } from './components/Form'
import {Row} from './components/List'
import {SavedArt} from './components/Saved'
import request from "request";
import API from './utils/API'
import "./App.css"

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      search: "",
      start: "",
      end: "",
      articles: [],
      lists: false,
      savedArticle: []
    }
    this.showArticle = this.showArticle.bind(this)
  } 

  componentDidMount() {
    this.loadSaveArticles();
  }

  loadSaveArticles() {
    API.getSavedArticles()
      .then(res => {
        this.setState({savedArticle: res.data})
        console.log(this.state.savedArticle)
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    

    if(this.state.start === "" && this.state.end === ""){
      
      request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          'api-key': "772cd36f0b1b485395f0aa1990048da0",
          "q": this.state.search
        },
      },(err, response, body) => {
        body = JSON.parse(body);
        this.showArticle(body)
  
      })
      
    }else if(this.state.start === "") {
      var end = this.state.end + '1231'
      request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          'api-key': "772cd36f0b1b485395f0aa1990048da0",
          "q": this.state.search,
          'end_date': end
        },
      }, function(err, response, body) {
        body = JSON.parse(body);
        this.showArticle(body)
  
      })
    }else if(this.state.end === "") {
      var start = this.state.start + "0101"

      request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          'api-key': "772cd36f0b1b485395f0aa1990048da0",
          "q": this.state.search,
          'start_date': start
        },
      }, function(err, response, body) {
        body = JSON.parse(body);
       this.showArticle(body);
  
      })
    }else {
      var start = this.state.start + "0101"
      var end = this.state.end + '1231'

      request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          'api-key': "772cd36f0b1b485395f0aa1990048da0",
          "q": this.state.search,
          'start_date': start,
          'end_date': end
        },
      }, function(err, response, body) {
        body = JSON.parse(body);
        this.showArticle(body)
  
      })
    }
  };

  showArticle = (article) => {
    console.log(article)
    let inputArt = [];
    article.response.docs.forEach(element => {
      inputArt.push({
        key: element._id,
        headline: element.headline.main,
        summary: element.snippet,
        date: element.pub_date,
        url: element.web_url
      })
    });
    this.setState({ articles: inputArt}, () => {
      this.setState({ lists: true})
    })
    console.log(this.state.articles, this.state.lists)

  };

  saveArticle = (title, date, url) => {
    API.saveArticle({
      title: title,
      date: date,
      url: url 
    })
      .then(res => {this.loadSaveArticles()})
      .catch(err => console.log(err));
  }

  removeArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSaveArticles())
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="content">
        <Jumbotron/>
        <div className="card border-secondary mb-3">
          <div className="card-header bg-secondary text-white">
            <div className="card-title">
              <h5 className="card-title">Search Panal</h5>
            </div>
          </div>
          <div className="card-body">
            <Input
              onChange={this.handleInputChange}
              name="search"
              placeholder="Search Title"
            />
            <Input
              onChange={this.handleInputChange}
              name="start"
              placeholder="Start Year"
            />
            <Input
              onChange={this.handleInputChange}
              name="end"
              placeholder="End Year"
            />
            <FormBtn
              onClick={this.handleFormSubmit}
            >
              Search
            </FormBtn>
          </div>
        </div>
        
        <Row
          article={this.state.articles}
          lists={this.state.lists}
          saveArticle={this.saveArticle}
        />

        <SavedArt
          savedArticle={this.state.savedArticle}
          removeArticle={this.removeArticle}
        />
      </div>
    )
  }
}

export default App;