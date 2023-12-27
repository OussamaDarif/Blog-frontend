import { PiUploadSimpleFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import logo from "../imgs/logo.png";
import EditorJS from "@editorjs/editorjs";
import { WithContext as ReactTags } from "react-tag-input";
import React from "react";
import { useCreatePost } from "../graphql/hooks";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

// import { toast } from "react-toastify";

export const BlogEditor = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    tags: [],
  });
  const [textEditor, setTextEditor] = useState(null);
  const { createPost } = useCreatePost();

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holderId: "textEditor",
        data: "",
        placeholder: "Write here your blog !",
      })
    );
  }, []);

  const handleDelete = (i) => {
    setBlog((blog) => ({
      ...blog,
      tags: blog.tags.filter((tag, index) => index !== i),
    }));
  };

  const handleAddition = (tag) => {
    console.log(tag)
    setBlog((blog) => ({ ...blog, tags: [...blog.tags, tag] }));
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = blog.tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setBlog((blog) => ({ ...blog, tags: newTags }));
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

    setBlog((blog) => ({ ...blog, title: input.value }));
  };

  const handleImageChange = (e) => {
    setBlog((blog) => ({ ...blog, image: e.target.files[0] }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!blog.image) {
      return toast.error("Upload a blog image to publish it");
    }
    if (!blog.title.length) {
      return toast.error("Write blog title to publish it");
    }

    if (textEditor.isReady) {
      try {
        const data = await textEditor.save();

        if (data.blocks.length) {
          setBlog((blog) => ({
            ...blog,
            content: data?.blocks[0]?.data?.text ?? "",
          }));
          await createPost({
            title: blog.title,
            file: blog.image,
            content: data?.blocks[0]?.data?.text ?? "",
            tags: blog.tags,
          });
        } else {
          return toast.error("Write something in your blog to publish it");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/home" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="text-xl font-bold">Med Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </nav>

      <Toaster />

      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
            <label htmlFor="uploadBanner">
              {blog?.image ? (
                <img className="z-20" src={URL.createObjectURL(blog?.image)} />
              ) : (
                <div className="h-full w-full flex justify-center items-center">

                <PiUploadSimpleFill className="z-20 w-56 h-56" />
                </div>
              )}
              <input
                id="uploadBanner"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          <textarea
            placeholder="Blog Title"
            onKeyDown={handleTitleKeyStroke}
            className="text-4xl font-medium placeholder:opacity-40 w-full h-20 outline-none resize-none mt-10 leading-tight overflow-hidden"
            onChange={handleTitleChange}
            value={blog.title}
          ></textarea>

          <hr className="w-full opacity-10 my-5" />
          <div className="w-full">
            <ReactTags
              tags={blog.tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              inputFieldPosition="bottom"
              autocomplete
            />
          </div>
          <hr className="w-full opacity-10 my-5" />
          <div id="textEditor" className="font-gelasio"></div>
        </div>
      </section>
    </>
  );
};
