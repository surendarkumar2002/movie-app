import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";

function App() {

  const [watchlist,setWatchList]=useState([]);

  const handleAddtoWatchList =(movieObj)=>{
     let newWatchList=[...watchlist,movieObj];

     localStorage.setItem('moviesApp',JSON.stringify(newWatchList))

     setWatchList(newWatchList)
     console.log(watchlist)
  }

  const handleRemoveWatchList=(movieObj)=>{
    let filterWatchList=watchlist.filter((movie)=>{
      return movie.id !=movieObj.id
    })
   localStorage.setItem('moviesApp',JSON.stringify(filterWatchList))

    setWatchList(filterWatchList);
  }

  useEffect(()=>{
    let moviesFromLocalStroge=localStorage.getItem('moviesApp')
    if(!moviesFromLocalStroge){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStroge))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
              <Movie handleAddtoWatchList={handleAddtoWatchList} handleRemoveWatchList={handleRemoveWatchList} watchlist={watchlist} />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveWatchList={handleRemoveWatchList} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
