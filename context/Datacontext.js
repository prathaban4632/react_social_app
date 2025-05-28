import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(posts);
  const [postTitle, setPostTitle] = React.useState("");
  const [postContent, setPostContent] = React.useState("");
  const navigate = useNavigate();
  const { width, height } = Usewindowsize();
  const { data, loading, error } = Useaxioshhok('http://localhost:3500/posts'); // Custom hook to fetch posts

  // Update posts when data changes
  useEffect(() => {
    if (data) setPosts(data);
  }, [data]);

  // Filter posts based on search
  useEffect(() => {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      navigate('/');
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  // Add post handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const newPost = {
      title: postTitle,
      content: postContent,
      date: timestamp
    };
    try {
      const response = await api.post('/posts', newPost);
      setPosts([...posts, response.data]);
      setPostTitle("");
      setPostContent("");
      navigate('/');
    } catch (err) {
      console.error("Failed to add post:", err);
    }
  };

  // Edit post handler
  const handleEdit = async (id, updatedPost) => {
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => 
        String(post.id) === String(id) ? response.data : post
      ));
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Failed to edit post:", err);
    }
  };

  // Render loading or error states
  if (loading) return <div className="statusMsg">Loading...</div>;
  if (error) return <div className="statusMsg">Error: {error.message}</div>;


  useEffect(() => {
    // Fetch data or perform any setup
    const fetchData = async () => {
      const response = await fetch('http://localhost:3500/posts');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;
