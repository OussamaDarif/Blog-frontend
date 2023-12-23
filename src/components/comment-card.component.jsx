import { useContext, useState } from "react";
import { getDay } from "../common/date";
import { BlogPageContext } from "./blog-page";
import CommentField from "./comment-field.component";
import { staticComments } from "../staticData";

const CommentCard = ({ index, commentData, leftVal = 0 }) => {
  const {
    content: comment,
    user: commented_by,
    createdAt: commentedAt,
    children,
    id: commentId
  } = commentData;

  const { blog } = useContext(BlogPageContext);
  const [isReplying, setReplying] = useState(false);

  if (!commented_by) {
    return null; // or handle this case as per your requirements
  }

  const { fullname, username: profile_username, profile_img } = commented_by;

  const handleReplyClick = () => {
    setReplying((preVal) => !preVal);
  };

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8">
          <img src={profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {fullname} @{profile_username}
          </p>
          <p className=" min-w-fit">{getDay(commentedAt)}</p>
        </div>
        <p className="font-gelasio text-xl ml-3">{comment}</p>

        <div className="flex gap-5 items-center mt-5">
          <button className="underline" onClick={handleReplyClick}>
            Reply
          </button>
        </div>

        {isReplying ? (
          <div className="mt-8">
            <CommentField action="Reply" index={index} replyingTo={commentId} setReplying={setReplying} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentCard;
