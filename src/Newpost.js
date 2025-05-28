import React, { useContext } from 'react'
import { DataContext } from './context/Datacontext';

const Newpost = () => {
  const {
    handleSubmit,
    postTitle,
    setPostTitle,
    postContent,
    setPostContent
  } = useContext(DataContext);

  return (
    <main className='Newpost'>
      <h2>Create a New Post</h2>
      <form className='new-post-form' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type='text'
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          required
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>

        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default Newpost
