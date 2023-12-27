import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoDataMessage from "./nodata.component";
import BlogPostCard from "./blog-post.component";
import Loader from "./loader.component";
import AnimationWrapper from "../common/page-animation";

const SEARCH_API_URL = "http://localhost:8080/search";

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getSearchResults = async () => {
      const response = await fetch(SEARCH_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await response.json();
      setPosts(data);
    };
    getSearchResults();
  }, [query]);
  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <div className="mb-3">
          <h2 className="text-2xl">Results of {query}:</h2>
        </div>
        <hr className="border-grey mt-2 mb-10" />
        {posts == null ? (
          <Loader />
        ) : posts.length > 0 ? (
          posts.map((post, i) => (
            <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
              <BlogPostCard post={post} />
            </AnimationWrapper>
          ))
        ) : (
          <NoDataMessage message="No Blogs Published" />
        )}
      </div>
    </section>
  );
};

export default SearchResult;
