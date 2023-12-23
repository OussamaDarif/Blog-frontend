
import AnimationWrapper from "../common/page-animation";
import InPageNavigation, { activeTabRef } from "./inpage-navigation.component";
import NoDataMessage from "./nodata.component";
import BlogPostCard from "./blog-post.component";
import { useState } from "react";
import Loader from "./loader.component";
import MinimalBlogPost from "./nobanner-blog-post.component";
import { staticBlogs, staticTrendingBlogs } from "../staticData";

const HomePage = () => {
    const [blogs] = useState(staticBlogs);
    const [trendingBlogs] = useState(staticTrendingBlogs);
    const [pageState] = useState("home");
    let categories = ["General Medicine", "Cardiology", "Dermatology", "Pediatrics", "Neurology", "Surgery", "Oncology", "Health and Wellness"];


    return (   
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10"> 
                <div className="w-full"> 
                    <InPageNavigation routes={ [pageState, "Trending Blogs"] } defaultHidden={["Trending Blogs"]}> 
                        <>
                        {
                                blogs == null ? <Loader /> :
                                    blogs.length > 0 ? 
                                        blogs.map((blog, i) => (
                                            <AnimationWrapper key={i} transition={{ delay: i * 0.08 }} ><BlogPostCard content={blog} author={blog.author.personal_info} /></AnimationWrapper>  
                                        ))
                                    : <NoDataMessage message="No Blogs Published" />
                            }
                        </>

                    </InPageNavigation>
                </div>
                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
                    <div className="flex flex-col gap-10">
                        <div>
                            <h1 className="font-medium text-xl mb-8">Stories from all interests</h1>
                            <div className="flex gap-3 flex-wrap">
                                {
                                    categories.map((category, i) => (
                                        <button key={i}  className={"tag " + (pageState === category ? "bg-black text-white" : "")} >{category}</button>
                                    ))
                                }
                            </div>
                        </div>

                        <div>
                            <h1 className="font-medium text-xl mb-8">Trending<i className="fi fi-rr-arrow-trend-up"></i></h1>
                            {
                                trendingBlogs == null ? <Loader /> :
                                    trendingBlogs.length > 0 ? 
                                        trendingBlogs.map((blog, i) => (
                                            <AnimationWrapper key={i}><MinimalBlogPost blog={blog} index={i} /></AnimationWrapper>
                                        ))
                                    : <NoDataMessage message="No Trending Blogs Found" />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </AnimationWrapper> 
    )
}
export default HomePage;
