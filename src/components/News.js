import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
   
    static defaultProps = {
        country: 'in',
        pageSize : 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state= {
            articles:[],
            loading:false,
            page:1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28739367a9c0407184f54af6984b6f97&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
        this.setState({
            articles: parseddata.articles, 
            total:parseddata.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28739367a9c0407184f54af6984b6f97&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
       
        this.setState({
            page:this.state.page-1,
            articles: parseddata.articles,
            loading: false
        
    })
    }

     handleNextClick = async () => {
        if(!(this.state.page+1 > Math.ceil(this.state.total /this.props.pageSize) )) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28739367a9c0407184f54af6984b6f97&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parseddata = await data.json();
            console.log(parseddata);
          
            this.setState({
                page:this.state.page+1,
                articles: parseddata.articles,
                loading: false
            
        })
    }       
}

  render() {
    return (
      <div className='container my-8'>
        <h2 className='text-center'>Top headlines</h2>
       { this.state.loading && <Spinner></Spinner> }
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=> { 
            return <div className="col-md-4" key={element.url}>
                <NewsItem   title={element.title?element.title.slice(0,40):""} 
                description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
           
       })}
       
       </div>
       <div className="container d-flex justify-content-between my-2">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &laquo; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.total /this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &raquo;</button>
       </div>
      </div> 
    )
  }
}

export default News