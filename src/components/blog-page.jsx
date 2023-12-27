import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import PageNotFound from "./404-page";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer from "../components/comments.component";
import { staticBlogs, staticComments } from "../staticData";
import CommentField from "./comment-field.component";
import { usePost } from "../graphql/hooks";
import { toast } from "react-toastify";


const BlogPage = () => {
  const { blog_id } = useParams();

  const { post, loading, error } = usePost(blog_id);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast.error("something went wrong while fetching !");
  }

  if (!post) {
    return <PageNotFound />;
  }

  const {
    id: postId,
    title,
    content,
    image,
    isLiked,
    author: { firstname, lastname, email, id: authorId },
    createdAt,
  } = post;
  
  return (
    <AnimationWrapper>
      <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
        <img src={image} className="aspect-video" alt="Blog Banner" />

        <div className="mt-12">
          <h2>{title}</h2>
          <div className="flex max-sm:flex-col justify-between my-8">
            <div className="flex gap-5 items-start">
              <img
                src={"/userprofile.png"}
                alt={firstname + "_" + lastname}
                className="w-12 h-12 rounded-full"
              />
              <p className="capitalize">
                {firstname + "_" + lastname}
                <br />
                <span className="underline">
                  @{firstname + "_" + lastname}
                </span>
              </p>
            </div>
            <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
              Published on {getDay(createdAt)}
            </p>
          </div>

          <div className="my-12 font-gelasio blog-page-content">
            <p>{content}</p>
          </div>

          <BlogInteraction  />
          <CommentField postId={postId} />
        </div>

        <CommentsContainer  />
      </div>
    </AnimationWrapper>
  );
};

export default BlogPage;
