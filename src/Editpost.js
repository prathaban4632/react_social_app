import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = ({ posts, handleEdit }) => {
  const { id } = useParams();
  const post = posts.find(post => String(post.id) === String(id));

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (!post) return (
    <>
      <h2>Post not found</h2>
      <p>The post you are trying to edit does not exist.</p>
    </>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    handleEdit(post.id, { ...post, title, content });
  };

  return (
    <main className='NewPost'>
      <form className='newpostform' onSubmit={onSubmit}>
        <h2>Edit Post</h2>
        <input
          type='text'
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Post Title'
        />
        <textarea
          required
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='Post Content'
        />
        <button type='submit'>Save</button>
      </form>
    </main>
  );
};

export default EditPost;
