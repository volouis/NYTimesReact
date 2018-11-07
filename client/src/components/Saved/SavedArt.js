import React from 'react'

export const SavedArt = props => (
    <div className="card border-secondary mb-3">
        <div className="card-header bg-secondary text-white">
            <div className="card-title">
                <h5 className="card-title">Saved Articles</h5>
            </div>
        </div>
        <div className="card-body">
            {props.savedArticle.length ? (
                props.savedArticle.map((article) => {
                    return(
                        <div className="card articles" key={`${article.id}`}>
                            <div className="card-header">
                                <h5 className="card-title">{article.title}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{(article.date.toString()).substring(0,10)}</p>
                                <a href={`${article.url}`} className="btn btn-primary">Go to Article</a>
                                <button type="button" className="btn btn-success" onClick={() => props.removeArticle(article._id)}>
                                    Remove Article
                                </button>
                            </div>
                        </div>
                    )
                })
            ):(
                <h5 className="card-title">No Saved Articles</h5>
            )}
        </div>
        
    </div>
)