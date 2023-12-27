import { useState } from "react";
import { Link } from "react-router-dom";
import { useReact } from "../graphql/hooks";
import { usePostContext } from "../context/post/postContext";

const BlogInteraction = () => {
  const { post } = usePostContext();
  let { title, id, likes, isLiked } = post || {};
  const { react, loading, error } = useReact();
  console.log(isLiked)
  const handleLike = async () => {
    await react({ postId: id });
  };

  return (
    <>
      <hr className="border-grey my-2" />
      <div className="w-full p-1 px-5 flex items-center justify-between">
        <div className="flex gap-6">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleLike}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isLiked ? "bg-red/20 text-red" : "bg-grey/80"
              }`}
            >
              <i
                className={`fi ${
                  isLiked ? "fi-sr-heart" : "fi-rr-heart"
                } text-xl mt-2 pointer-events-none`}
              ></i>
            </button>
            <p className="text-xl text-dark-grey">{likes}</p>
          </div>

          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
              <i className="fi fi-rr-comment-dots text-xl mt-2"></i>
            </button>
            <p className="text-xl text-dark-grey">{post?.comments?.length}</p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <Link
            to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
            target="_blank"
            className="pt-2"
          >
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </>
  );
};

export default BlogInteraction;
