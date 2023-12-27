import { getDay } from "../common/date";


const CommentCard = ({ index, comment, leftVal = 0 }) => {
  const {
    content,
    username: commented_by,
    createdAt: commentedAt,
  } = comment;

  if (!commented_by) {
    return null;
  }

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8">
          <img src={"/userprofile.png"} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {commented_by} @{commented_by}
          </p>
          <p className=" min-w-fit">{getDay(commentedAt)}</p>
        </div>
        <p className="font-gelasio text-xl ml-3">{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
