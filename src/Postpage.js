import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Postpage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find(post => String(post.id) === id);

  if (!post) return <h2>Post not found</h2>;

  return (
    <div className="PostPage">
      <div className="postTitle">{post.title}</div>
      <div className="postDate">{post.date}</div>
      <div className="postContent">{post.content}</div>
      <div className="postActions">
        <Link to={`/post/edit/${post.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => handleDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Postpage;
