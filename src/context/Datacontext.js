import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/Posts';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search
  useEffect(() => {
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  // Handlers
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      navigate('/');
    } catch (err) {
      setError(err);
    }
  };

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
      setError(err);
    }
  };

  const handleEdit = async (id, updatedPost) => {
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post =>
        String(post.id) === String(id) ? response.data : post
      ));
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <DataContext.Provider value={{
      posts,
      search,
      setSearch,
      searchResults,
      postTitle,
      setPostTitle,
      postContent,
      setPostContent,
      handleDelete,
      handleSubmit,
      handleEdit,
      loading,
      error
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;