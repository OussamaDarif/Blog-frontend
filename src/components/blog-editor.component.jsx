import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import EditorJS from "@editorjs/editorjs";
import { Toaster } from "react-hot-toast";

import React from 'react'
export const blogStructure = {
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: "",
    author: { personal_info: { } }
}

export const BlogEditor = () => {
    // const { blog, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext);
    // const { userAuth: { access_token } } = useContext(UserContext);
    // const navigate = useNavigate();
    // const blogBannerRef = useRef();

    useEffect(() => {
        let editor= new EditorJS({
            holderId: "textEditor",
            data: '',
            placeholder: "Write here your blog !",
        })
        
    }, [])

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("Uploading....");

            uploadImage(img).then((url) => {
                if (url) {
                    setBlog(latestBlogObj => ({ ...latestBlogObj, banner: url }))

                    toast.dismiss(loadingToast);
                    toast.success("Uploaded 👍");

                    blogBannerRef.current.src = url;
                }
            }).catch(err => {
                toast.dismiss(loadingToast);
                return toast.error(err)
            })
        }
    };

    const handleTitleKeyStroke = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    };

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = null;
        input.style.height = input.scrollHeight + "px";

        // setBlog({ ...blog, title: input.value })
    };

    const handlePublishEvent = (e) => {
        e.preventDefault();
        
        if(!banner.length) {
            return toast.error("Upload a blog banner to publish it");
        }
        if(!title.length){
            return toast.error("Write blog title to publish it");
        }

        if(textEditor.isReady){
            textEditor.save().then(data => {
                if(data.blocks.length){
                    setBlog({ ...blog, content: data });
                    setEditorState("publish");
                } else{
                    return toast.error("Write something in your blog to publish it");
                }
            }).catch((error) => {
                console.log(error)
            });
        }
    };

    const handleSaveDraft = (e) => {
        e.preventDefault();
        
        if(!title.length){
            return toast.error("You must provie a title to save this draft");
        }

        // saving draft

        let loadingToast = toast.loading("Publishing....");

        e.target.classList.add('disable');

        if(textEditor.isReady){
            textEditor.save().then(async data => {
                let content = data.blocks.length ? data : [];

                let blogObj = { title, des, banner, tags, content, draft: true }

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                .then(( ) => {
                    e.target.classList.remove('disable');

                    toast.dismiss(loadingToast);
                    toast.success("Draft Saved 👍");
    
                    resetEditor();
    
                    setTimeout(() => {
                        navigate(`/dashboard/blogs?tab=draft`);
                    }, 500);
                })
                .catch(({ response }) => {
                    e.target.classList.remove('disable');
    
                    toast.dismiss(loadingToast);
                    return toast.error(response.data.error);
                })
            })
        }
    }

    const handleBannerImageError = (e) => {
        e.target.src = defaultBanner;
    }

    const resetEditor = () => {
        setTextEditor({ isReady: false });
    }



    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10">
                    <img src={logo} />
                </Link>
                <p className="text-xl font-bold">
                     Med Blog
                </p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2" 
                    >
                        Publish
                    </button>

                    <button className="btn-light py-2"
                    >
                        Save Draft
                    </button>
                        
                </div>
            </nav>

            <Toaster />

                <section>
                    <div className="mx-auto max-w-[900px] w-full">

                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                            <label
                                htmlFor="uploadBanner"
                            >
                                <img
                                    className="z-20"
                                />
                                <input
                                    id="uploadBanner"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    hidden

                                />
                            </label>
                        </div>

                        <textarea
                            placeholder="Blog Title"
                            onKeyDown={handleTitleKeyStroke}
                            className="text-4xl font-medium placeholder:opacity-40 w-full h-20 outline-none resize-none mt-10 leading-tight overflow-hidden"
                            onChange={handleTitleChange}
                        ></textarea>

                        <hr className="w-full opacity-10 my-5" />

                        <div id="textEditor" className="font-gelasio"></div>

                    </div>
                </section>

        </>
    );
}

