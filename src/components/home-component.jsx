import { useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "./inpage-navigation.component";
import NoDataMessage from "./nodata.component";
import BlogPostCard from "./blog-post.component";
import { useState } from "react";
import Loader from "./loader.component";
import MinimalBlogPost from "./nobanner-blog-post.component";
import { toast } from "react-toastify";
import { usePosts } from "../graphql/hooks";

const HomePage = () => {
  const [pageState] = useState("home");
  const { posts, loading, error } = usePosts();
  const navigate = useNavigate();

  let tags = posts?.map((post) => post.tags).flat();
  tags = [...new Set(tags)];

  if (error) {
    toast.error("Something went wrong while fetching.");
  }

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "Trending Blogs"]}
            defaultHidden={["Trending Blogs"]}
          >
            <>
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
            </>
          </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">Tags</h1>
              <div className="flex gap-3 flex-wrap">
                {tags.slice(0, 10).map((tag, i) => (
                  <button
                    onClick={() => {
                      const searchParams = new URLSearchParams();
                      searchParams.set("query", tag);
                      navigate(`/search?${searchParams}`);
                    }}
                    key={i}
                    className={
                      "tag " + (pageState === tag ? "bg-black text-white" : "")
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending<i className="fi fi-rr-arrow-trend-up"></i>
              </h1>
              {posts == null ? (
                <Loader />
              ) : posts.length > 0 ? (
                [...posts]
                  ?.sort((a, b) => b.likes - a.likes)
                  .slice(0, 3)
                  .map((post, i) => (
                    <AnimationWrapper key={i}>
                      <MinimalBlogPost post={post} index={i} />
                    </AnimationWrapper>
                  ))
              ) : (
                <NoDataMessage message="No Trending Blogs Found" />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};
export default HomePage;
