import React from "react";
import MyButton from "../components/UI/button/MyButton";

const PostItem = (props) => {

  return (
    <div>
      <div className="post">
        <div className="post_content">
          {/* <strong>{props.number} . {props.post.title}</strong> */}
          <strong>{props.post.id} . {props.post.title}</strong>
          <div>{props.post.body}</div>
        </div>
        <div className="post_btn">
          <MyButton onClick={() => props.remove(props.post)}> Delete</MyButton>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
