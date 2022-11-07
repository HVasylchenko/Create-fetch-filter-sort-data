import React from "react";
import { useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";


const PostForm = ({create}) => {
    const [post, setPost] = useState({title:"", body:""});
    function addNewPost(e) {
        e.preventDefault();
      
        const newPost = {...post, id: Date.now()};
        // console.log("newPost=", newPost);
        create(newPost)
        // setPosts([...posts, {...post, id:Date.now()}]);
        setPost({title:"", body:""})
      }
  return (
    <div>
      <form>
        {/* <input
          type="text"
          // onChange={(e) => settitle(e.target.value)}
          placeholder="Name of post"
          ref={bodyInputRef}
        ></input> */}
        <MyInput
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Name of post"
          // ref={bodyInputRef}
        ></MyInput>
        <MyInput
          type="text"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          placeholder="Description of post"
        ></MyInput>
        <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
    </div>
  );
};

export default PostForm;
