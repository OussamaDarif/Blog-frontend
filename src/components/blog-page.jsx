import { createContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import PageNotFound from "./404-page";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer from "../components/comments.component";
import { staticBlogs, staticComments } from "../staticData";
import CommentField from "./comment-field.component";

export const BlogPageContext = createContext({});

const BlogPage = () => {
    let { blog_id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogComments, setBlogComments] = useState([]);

    useEffect(() => {
        const foundBlog = staticBlogs.find(blog => blog.id === parseInt(blog_id));
        if (foundBlog) {
            setBlog(foundBlog);
            const relatedComments = staticComments.filter(comment => foundBlog.comments.includes(comment.id));
            setBlogComments(relatedComments);
        }
        setLoading(false);
    }, [blog_id]);

    if (loading) {
        return <Loader />;
    }

    if (!blog) {
        return <PageNotFound />;
    }

    let { title, content, banner, author: { personal_info: { username: author_username, name: fullname, profile_img } }, publishedAt } = blog;
    console.log(blogComments);
    return (
        <AnimationWrapper>
            <BlogPageContext.Provider value={{ blog, setBlog }}>
                <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
                    <img src={banner} className="aspect-video" alt="Blog Banner" />

                    <div className="mt-12">
                        <h2>{title}</h2>
                        <div className="flex max-sm:flex-col justify-between my-8">
                            <div className="flex gap-5 items-start">
                                <img src={profile_img} alt={fullname} className="w-12 h-12 rounded-full" />
                                <p className="capitalize">
                                    {fullname}
                                    <br />
                                    @<Link to={`/user/${author_username}`} className="underline">{fullname}</Link>
                                </p>
                            </div>
                            <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                                Published on {getDay(publishedAt)}
                            </p>
                        </div>

                        <div className="my-12 font-gelasio blog-page-content">
                            <p>{content}</p>
                        </div>

                        <BlogInteraction />
                        <CommentField/>
                    </div>
                    {blogComments.length > 0 && <CommentsContainer commentsData={blogComments} />}
                </div>

                </BlogPageContext.Provider>
            </AnimationWrapper>
        );
};

export default BlogPage;
