import React from "react";

const Post = ({ post }) => (
  <div className="post">
    <div className="postTitle">{post.title}</div>
    <div className="postDate">{post.date}</div>
    <div className="postBody">{post.content.length > 120 ? post.content.slice(0, 120) + "..." : post.content}</div>
  </div>
);

export default Post;
