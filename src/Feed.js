import Post from "./Post";
import { Link } from "react-router-dom";

const Feed = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Link key={post.id} to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Post post={post} />
        </Link>
      ))}
    </>
  );
}

export default Feed;
