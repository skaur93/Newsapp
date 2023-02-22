import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);


    const update = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        setArticles(parseddata.articles);
        setTotal(parseddata.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        update();
    }, [])


    const fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs



        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata);
        setArticles(articles.concat(parseddata.articles));
        setTotal(parseddata.totalResults);
        setLoading(false);


    };


    return (
        <div className='container my-8'>
            <h2 className='text-center'>Top headlines</h2>
            {loading && <Spinner></Spinner>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length != total}
                loader={<Spinner />}
            >
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                    })}

                </div>
            </InfiniteScroll>

        </div>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
