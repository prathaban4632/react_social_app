import React, { useContext } from 'react';
import './App.css';
import Home from './Home';
import Newpost from './Newpost';
import Postpage from './Postpage';
import About from './About';
import Missing from './Missing';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Postlayout from './Postlayout';
import EditPost from './Editpost';
import { DataContext } from './context/Datacontext';

function App() {
  // Get all needed values from context
  const {
    search,
    setSearch,
    searchResults,
    handleSubmit,
    postTitle,
    setPostTitle,
    postContent,
    setPostContent,
    posts,
    handleDelete,
    handleEdit,
    loading,
    error
  } = useContext(DataContext);

  if (loading) return <div className="statusMsg">Loading...</div>;
  if (error) return <div className="statusMsg">Error: {error.message}</div>;

  return (
    <div className="App">
      <Header title="My Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post" element={
          <Newpost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postContent={postContent}
            setPostContent={setPostContent}
          />
        } />
        <Route path="post/:id" element={
          <Postpage posts={posts} handleDelete={handleDelete} />
        } />
        <Route path="post/edit/:id" element={
          <EditPost posts={posts} handleEdit={handleEdit} />
        } />
        <Route path="postpage" element={<Postlayout posts={posts} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

// Wrap App with DataProvider in your index.js, not here!
export default App;
