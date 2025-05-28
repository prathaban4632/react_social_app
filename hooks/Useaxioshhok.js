import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Useaxioshhok = (dataUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
   const source = axios.CancelToken.source(); // Create a cancel token
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching new data
      try {
        const response = await axios.get(dataUrl, { cancelToken: source.token });
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          isMounted && setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
      source.cancel("Operation canceled by the user."); // Cancel the request
    };
  }, [dataUrl]);

  return { data, loading, error };
}

export default Useaxioshhok;
