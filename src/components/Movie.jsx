/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import axios from "axios"
import Pagination from "./Pagination";

const Movie = ({handleAddtoWatchList,handleRemoveWatchList,watchlist}) => {

  const[movies,setMovies]=useState([]);
  const[pageNo,setPageNo]=useState(1)

  const handlePrev=()=>{
    if(pageNo===1){
      setPageNo(1);
    }
   else{
    setPageNo(pageNo-1);
   }
  }

  const handleNext=()=>{
    setPageNo(pageNo+1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=94c58eca17ca87f1a24d25437c1254ab&language=en-US&page=${pageNo}`)
      .then(res => setMovies(res.data.results))
      .catch(error => console.error('There was an error!', error));
  }, [pageNo]); 

  return (
    <div className="p-5">
        <div className="text-2xl m-5 font-bold text-center">
            Trending Movies
        </div>
        <div className="flex flex-wrap flex-row gap-2">
           {
            movies.map((movieObj)=>{
              return <MovieCard watchlist={watchlist} movieObj={movieObj} poster_path={movieObj.poster_path} handleRemoveWatchList={handleRemoveWatchList} key={movieObj.id} name={movieObj.original_title
              } handleAddtoWatchList={handleAddtoWatchList} />
            })
           }
            
        </div>
      <div>
        <Pagination handleNext={handleNext} handlePrev={handlePrev} pageNo={pageNo} />
      </div>
        {/* 'https://api.themoviedb.org/3/movie/popular?api_key=94c58eca17ca87f1a24d25437c1254ab' */}
    </div>
  )
}

export default Movie