import React from "react";
import "./ListView.css";

const ListView = ({ results = [], isLoading = false }) => {
  return (
    <div className="results">
      {isLoading ? (
        <div className="loader"></div>
      ) : results.length > 0 ? (
        results.map(({ title, link, price, rating }) => (
          <div className="result-item">
            <h5 title="Visit link" onClick={() => window.open(link)}>
              {title}
            </h5>
            <div className="price-rating">
              <h3>{price}</h3>
              <h6>{rating}</h6>
            </div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ListView;
