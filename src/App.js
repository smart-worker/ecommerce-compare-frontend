import React, { useState } from "react";
import "./App.css";

import ListView from "./components/ListView";
import { API_URL } from "./constants";

const Tabs = ["Amazon", "Flipkart", "Comparison"];
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [amazonResults, setAmazonResults] = useState([]);
  const [flipkartResults, setFlipkartResults] = useState([]);
  const [isAmazonLoading, setIsAmazonLoading] = useState(false);
  const [isFlipkartLoading, setIsFlipkartLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Amazon");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleFlipkartSearch = async () => {
    setIsFlipkartLoading(true);
    try {
      const response = await fetch(`${API_URL}flipkart/${inputValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFlipkartResults(data.products || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFlipkartResults([]);
    }
    setIsFlipkartLoading(false);
  };

  const handleAmazonSearch = async () => {
    setIsAmazonLoading(true);
    try {
      const response = await fetch(`${API_URL}amazon/${inputValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAmazonResults(data.products || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAmazonResults([]);
    }
    setIsAmazonLoading(false);
  };

  return (
    <div className="homepage">
      <h1>Ecommerce Scraper</h1>
      <div className="search-bar">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter the item..."
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleAmazonSearch();
              handleFlipkartSearch();
            }
          }}
        />
        <button
          onClick={() => {
            handleAmazonSearch();
            handleFlipkartSearch();
          }}
        >
          Search
        </button>
      </div>

      <div className="tabs">
        {Tabs.map((tab, i) => (
          <button
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            key={tab + i}
            onClick={() => handleTabClick(tab)}
          >
            {tab} {i < 2 ? "Results" : ""}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Amazon" && (
          <div>
            <ListView isLoading={isAmazonLoading} results={amazonResults} />
          </div>
        )}
        {activeTab === "Flipkart" && (
          <div>
            <ListView isLoading={isFlipkartLoading} results={flipkartResults} />
          </div>
        )}
        {activeTab === "Comparison" && (
          <div>
            <p>Display comparison results here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// const dummy = [
//   {
//     title:
//       "Illo ducimus aspernatur aliquid pariatur voluptates sequi, vitae deleniti nesciunt accusamus odio recusandae, praesentium beatae omnis, doloribus similique quia nisi provident. Pariatur nihil eos repudiandae minima magni distinctio autem perferendis!",
//     link: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum delectus distinctio corrupti rem labore repudiandae! Adipisci nulla quasi ab perspiciatis officia. Inventore non dolore reprehenderit fugiat laudantium cumque odio necessitatibus ratione eligendi exercitationem? Aut mollitia tempora aperiam sunt molestiae similique!eligendi exercitationem? Aut mollitia tempora aperiam sunt molestiae similique!",
//     price: "700",
//     rating: "4.3 out of 5",
//   },
//   {
//     title:
//       "Illo ducimus aspernatur aliquid pariatur voluptates sequi, vitae deleniti nesciunt accusamus odio recusandae, praesentium beatae omnis, doloribus similique quia nisi provident. Pariatur nihil eos repudiandae minima magni distinctio autem perferendis!",
//     link: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum delectus distinctio corrupti rem labore repudiandae! Adipisci nulla quasi ab perspiciatis officia. Inventore non dolore reprehenderit fugiat laudantium cumque odio necessitatibus ratione eligendi exercitationem? Aut mollitia tempora aperiam sunt molestiae similique!eligendi exercitationem? Aut mollitia tempora aperiam sunt molestiae similique!",
//     price: "7900",
//     rating: "4.4 out of 5",
//   },
// ];
