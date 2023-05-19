import React, { Component } from 'react'
import NewsItem from './NewsItem';

export default class News extends Component {

    constructor(){
        super();
        this.state = {
          articles : [],
          loding :false,
          page:1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=24a858c0567a44e6a88284c203209bc0&page=1&pageSize=20` ;
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults}) 
      }
    handlePrevClick = async ()=>{
        console.log('previous')
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=24a858c0567a44e6a88284c203209bc0&page=${this.state.page - 1}&pageSize=20` ;
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
          page: this.state.page - 1,
          articles : parsedData.articles
        })
    } 
    handleNextClick = async()=>{
      console.log('next')
      if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=24a858c0567a44e6a88284c203209bc0&page=${this.state.page + 1}&pageSize=20` ;
        let data= await fetch(url);
        let parsedData = await data.json(); 
        console.log(parsedData);
        this.setState({
          page: this.state.page + 1,
          articles : parsedData.articles
        })
      }
  } 
  render() {
    return (
      <div className="container my-3">
          <h2>Keep yourself updated!!</h2>
          <div className="row">
            {this.state.articles.map((element) =>  {
              return (
              <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imgUrl={element.urlToImage?element.urlToImage:"https://variety.com/wp-content/uploads/2023/03/Squirrel-Jackalope-The-Masked-Singer.jpg?w=1000"} newsUrl={element.url}/>
              </div>
              )
            })}
          </div>
          <div className='container'>
              <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>Previous</button>
              <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
          </div>
      </div>
    )
  }
}
