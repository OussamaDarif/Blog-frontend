import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ post, index }) => {
  let {
    title,
    id,
    author: { firstname, lastname },
    createdAt
  } = post;

  index++;

  return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
      <h1 className="blog-index">{index < 10 ? "0" + index : index}</h1>
      <div>
        <div className="flex gap-2 items-center mb-4">
          <img src={"userprofile.png"} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {firstname + "_" + lastname} @{firstname + "_" + lastname}
          </p>
          <p className=" min-w-fit">{getDay(createdAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
      </div>
    </Link>
  );
};

export default MinimalBlogPost;
