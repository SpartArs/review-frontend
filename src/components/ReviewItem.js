import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import routes from "../routes/routes.js";
import ReviewDetails from "./ReviewDetails";
import Route from "react-router-dom/es/Route";


class ReviewItem extends Component {


    render() {
        const {item} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    {/*<h5 className="card-title" >{item.reviewTitle}</h5>*/}
                    <Link to={`/reviews/${item.id}`}><h5>{item.reviewTitle}</h5></Link>
                </div>
               <Link to={`/reviews/${item.id}`}> <img src={process.env.PUBLIC_URL + item.fileName} className="card-img-top" alt="..."/> </Link>
                <div className="card-body">


                    <h5 className="card-text">Автор: {item.author.name}</h5>
                    {/*<p className="card-text">{item.content}</p>*/}
                    <p className="card-text">{"Категория: " + item.category.title}</p>
                    <div>
                        <button className="btn btn-light"><span role="img" aria-label="thumbs-up">&#x1F44E;</span></button>
                        <button className="btn btn-light"><span role="img" aria-label="thumbs-down">&#x1F44D;</span></button>
                        {/*<span className="btn">{item.likes}</span>*/}
                    </div>
                </div>
                <div className="card-footer">
                    {item.tags.map(o => <a href="" key={o} className="card-link">#{o}</a>)}
                </div>
            </div>
        );
    }
}

ReviewItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default withRouter(ReviewItem);