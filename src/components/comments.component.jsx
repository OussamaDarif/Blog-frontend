import CommentCard from "./comment-card.component";
import NoDataMessage from "./nodata.component";
import AnimationWrapper from "../common/page-animation";
import { usePostContext } from "../context/post/postContext";


const CommentsContainer = () => {
    const {post} = usePostContext();
    const comments = post?.comments || [];
    

    return (
        <div >

            <div className="flex justify-center mt-3">
                <h1 className="text-xl font-medium">Comments</h1>
            </div>

            <hr className="border-grey my-8 w-[120%] -ml-10" />


            {comments && comments.length ? comments.map((comment, i) => {
                return <AnimationWrapper key={i}><CommentCard comment={comment} /></AnimationWrapper>;
            }) : <NoDataMessage message="No Comments" />}
        </div>
    );
}

export default CommentsContainer;
