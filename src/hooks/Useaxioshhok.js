import { useState, useEffect } from 'react';
import axios from 'axios';

const Useaxioshhok = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axios.get(url)
      .then(response => {
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      })
      .catch(err => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      });

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
};

export default Useaxioshhok;