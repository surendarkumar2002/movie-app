/* eslint-disable react/prop-types */

const MovieCard = ({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchList,
  handleRemoveWatchList,
  watchlist,
}) => {



  const doesContain = (movieObj) => {
  
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className="h-[50vh] w-[200px] flex flex-col items-end justify-between rounded-xl bg-center bg-cover hover:scale-110 duration-300 hover:cursor-pointer"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div onClick={()=>handleRemoveWatchList(movieObj)} className="m-4 flex justify-center h-8 w-8 items-center bg-gray-900/60 rounded-lg">&#10060; </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchList( movieObj )}
          className="m-4 flex justify-center h-8 w-8 items-center bg-gray-900/60 rounded-lg"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl p-2 text-center bg-gray-900/60 w-[100%] rounded-b-xl">
        {name}
      </div>
    </div>
  );
};

export default MovieCard;
