import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogPageContext } from "./blog-page";


const BlogInteraction = () => {

    const { blog, setBlog } = useContext(BlogPageContext);
    const [likedByUser, setLikedByUser] = useState(false);
    let { title, id: blog_id, activity: { total_likes ,total_comments} } = blog;



    const handleLike = () => {

    }

    return (
        <>
            <hr className="border-grey my-2" />
            <div className="w-full p-1 px-5 flex items-center justify-between">

                <div className="flex gap-6">
                    <div className="flex gap-3 items-center">
                        <button className={`w-10 h-10 rounded-full flex items-center justify-center ${ likedByUser ? "bg-red/20 text-red" : "bg-grey/80" }`}>
                        <i className={`fi ${ likedByUser ? "fi-sr-heart" : "fi-rr-heart" } text-xl mt-2 pointer-events-none`}></i>
                        </button>
                        <p className="text-xl text-dark-grey">{total_likes}</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80" >
                        <i className="fi fi-rr-comment-dots text-xl mt-2"></i>
                        </button>
                        <p className="text-xl text-dark-grey">{total_comments}</p>
                    </div>
                </div>

                <div className="flex gap-6 items-center">

                    <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`} target="_blank" className="pt-2"><i className="fi fi-brands-twitter text-xl hover:text-twitter"></i></Link>
                </div>

            </div>
            <hr className="border-grey my-2" />
        </>
    )
}

export default BlogInteraction;


