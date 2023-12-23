import { useContext } from "react";
import { BlogPageContext } from "./blog-page";
import CommentCard from "./comment-card.component";
import NoDataMessage from "./nodata.component";
import AnimationWrapper from "../common/page-animation";
import CommentField from "./comment-field.component";
import { staticComments } from "../staticData"; 

const CommentsContainer = () => {
    const { commentWrapper, setCommentWrapper, blog } = useContext(BlogPageContext);
    const commentsData = blog.comments 

    return (
        <div className={`max-sm:w-full fixed ${commentWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"} duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-10 overflow-y-auto overflow-x-hidden`}>

            <div className="relative">
                <h1 className="text-xl font-medium">Comments</h1>
                <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">{blog.title}</p>

                <button className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey" onClick={() => setCommentWrapper(false)}><i className="fi fi-br-cross-small text-2xl mt-1"></i></button>
            </div>

            <hr className="border-grey my-8 w-[120%] -ml-10" />

            <CommentField action="Comment" />

            {commentsData && commentsData.length ? commentsData.map((comment, i) => {
                return <AnimationWrapper key={i}><CommentCard commentData={comment} /></AnimationWrapper>;
            }) : <NoDataMessage message="No Comments" />}
        </div>
    );
}

export default CommentsContainer;
