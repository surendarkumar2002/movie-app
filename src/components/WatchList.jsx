/* eslint-disable react/jsx-key */
import {  useEffect, useState } from "react";
import genreIds from '../utility/genre'

/* eslint-disable react/prop-types */
const WatchList = ({watchlist,setWatchList,handleRemoveWatchList}) => {

  const [search,setSearch]=useState('');
  const [genreList,setGenreList]=useState(['All Genres']);
  const [currGenre,setCurrGenre]=useState(['All Genres'])

  const handleSearch=(e)=>{
      setSearch(e.target.value)
  }

  const handleFilter=(genre)=>{
    setCurrGenre(genre);
  }

  const sortIncreasing=()=>{
    const sortedIncreasing= watchlist.sort((movieA,movieB)=>{
      return movieA.vote_average - movieB.vote_average
     })

     setWatchList([...sortedIncreasing])

  }

  const sortDecreasing=()=>{
   const sortedDecreasing= watchlist.sort((movieA,movieB)=>{
      return movieB.vote_average - movieA.vote_average
     })

     setWatchList([...sortedDecreasing])
  }

  useEffect(()=>{
    let temp=watchlist.map((movieObj)=>{
      return genreIds[movieObj.genre_ids[0]]
    })

    temp =new Set(temp)

    setGenreList(['All Genres',...temp]);
    console.log(temp)

  },[watchlist])

   
  return (
    <>

     <div className="flex justify-center flex-wrap m-8">
      {genreList.map((genre ,index)=>{
        return <div key={index} onClick={()=> handleFilter(genre)} className={currGenre===genre?"bg-blue-400 flex items-center justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold ml-4 hover:cursor-pointer":"hover:cursor-pointer bg-gray-400 flex items-center justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold ml-4 mx-4 mb-2"}>{genre}</div>
      })}
     
     </div>

      <div className="flex justify-center my-4">
        <input
        onChange={handleSearch}
        value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-400/20 outline-none px-4"
        />
      </div>
      <div className="rounded-lg overflow-hidden border border-gray-200 m-8">
        <table className="w-full text-gray-600 text-center">
          <thead className="border-2">
            <tr>
              <th>Name</th>
             <th  className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2"><i className="fa-solid fa-arrow-up"></i></div>
                <div className="p-2">Rating</div>
                <div onClick={sortDecreasing} className="p-2"><i className="fa-solid fa-arrow-down"></i></div>
             </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>

          {
            watchlist.filter((movieObj)=>{
              if(currGenre=='All Genres'){
                return true;
              }
              else{
                return genreIds[movieObj.genre_ids[0]]==currGenre
              }
            }).filter((movieObj)=>{
              return( movieObj.title.toLowerCase().includes(search.toLocaleLowerCase()))
            }).map((movieObj)=>{
              return (
                <tr className="border-b-2" key={movieObj.id}>
                <td className="flex  items-center px-6 py-4">
                  <img
                    className="h-[6rem] w-[10rem]"
                    src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path} `}
                    alt=""
                  />
                  <div className="m-10">{movieObj.title}</div>
                </td>
  
                <td>{(movieObj.vote_average).toFixed(2)}</td>
                <td>{movieObj.popularity.toFixed(2)}</td>
                <td>{genreIds[movieObj.genre_ids[0]]}</td>
                <td className="text-red-600 hover:cursor-pointer" onClick={()=>handleRemoveWatchList(movieObj)}>Delete</td>
              </tr>
              )
            })
          }

           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
