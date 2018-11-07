import React from "react";

export const Row = props => (
    <div className="card border-secondary mb-3">
        <div className="card-header bg-secondary text-white">
            <div className="card-title">
                <h5 className="card-title">Top Articles</h5>
            </div>
        </div>
        <div className="card-body">
            {props.lists ? (
                props.article.map((article) => {
                    return(
                        <div className="card articles" key={`${article.key}`}>
                            <div className="card-header">
                                <h5 className="card-title">{article.headline}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{article.summary}</p>
                                <p className="card-text">{(article.date.toString()).substring(0,10)}</p>
                                <a href={`${article.url}`} className="btn btn-primary">Go to Article</a>
                                <button type="button" className="btn btn-success" onClick={() => props.saveArticle(article.key, article.headline, (article.date.toString()).substring(0,10), article.url)}>
                                    Save Article
                                </button>
                            </div>
                        </div>
                    )
                })
            ):(
                <h5 className="card-title">No Articles</h5>
            )}
        </div> 
    </div>
);
