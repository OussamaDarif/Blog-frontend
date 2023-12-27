import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ post }) => {
  let { createdAt, tags, title, content, likes, id, image } = post || {};
  let { firstname, lastname, id: authorId } = post?.author || {};

  return (
    <Link
      to={`/blog/${id}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={"/userprofile.png"}
            className="w-6 h-6 rounded-full"
            alt="Profile"
          />
          <p className="line-clamp-1">
            {firstname + "_" + lastname} @{firstname + "_" + lastname}
          </p>
          <p className="min-w-fit">{getDay(createdAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {content?.slice(0, 30)}...
        </p>
        <div className="mt-7 flex gap-4">
          <span className="btn-light py-1 px-4">{tags && tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>
            {likes}
          </span>
        </div>
      </div>
      <div className="aspect-square h-28 bg-grey">
        <img
          src={image}
          className="w-full h-full aspect-square object-cover"
          alt="Post image"
        />
      </div>
    </Link>
  );
};

export default BlogPostCard;
