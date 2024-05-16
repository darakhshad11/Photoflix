import React from 'react';
import Photos from './Photo';

const Favourites = ({ favouritePhotos, handleRemoveFavourite }) => {
 
  if (!favouritePhotos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar_logo">photoflix</div>
        <div className="navbar_links">
          <a href='/'>home</a>
        </div>
      </nav>
      <main>
        <section className='photos'>
          {favouritePhotos.map((image, index) => (
            <Photos
              key={index}
              {...image}
              isFavourite={true}
              onFavouriteClick={() => handleRemoveFavourite(image)}
            >
              <span>Added to favourites</span>
            </Photos>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Favourites;
