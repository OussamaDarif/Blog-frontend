import { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BlogPageContext } from "./blog-page";

const CommentField = ({ action, index = undefined, replyingTo = undefined, setReplying }) => {

    const [ comment ] = useState("");

    return (
        <div className="text-center">
            <Toaster />
            <textarea 
                value={comment} 

                placeholder="Leave a comment..." 
                className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto border rounded p-2 mx-auto" 
            ></textarea>
            <button 
                className="btn-dark mt-5 px-10 py-2 rounded hover:bg-opacity-80" 
            >
                Submit
            </button>
        </div>
    )
    
    
    
}

export default CommentField;