import { useState } from "react";
import { useComment } from "../graphql/hooks";

const CommentField = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { loading, error, comment: commentHandler } = useComment();

  const handleCommentButton = async (event) => {
    await commentHandler({ postId, content: comment });
    setComment("");
  };
  return (
    <div className="text-center">
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Leave a comment..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto border rounded p-2 mx-auto"
      ></textarea>
      <button
        disabled={loading}
        onClick={handleCommentButton}
        className={ loading? "btn-grey btn mt-5 px-10 py-2 rounded hover:bg-opacity-80": "btn-dark btn mt-5 px-10 py-2 rounded hover:bg-opacity-80"}
      >
        Submit
      </button>
    </div>
  );
};

export default CommentField;
