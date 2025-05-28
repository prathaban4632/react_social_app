import React, { useContext } from 'react'
import Feed from './Feed'
import { DataContext } from './context/Datacontext';

const Home = () => {
  const { searchResults, loading, error } = useContext(DataContext);

  return (
   <main className='Home'>
    {searchResults.length ? (
        <Feed posts={searchResults} />
    ) : (
        <p style ={{marginTop:"2rem"}}>
            No posts available</p>
    )}
  </main>
  )
}

export default Home
