import React, { useState, useEffect } from 'react';
import { FaHeart, FaDownload, FaShare } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';

const Photo = () => {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [favouritePhotos, setFavouritePhotos] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
   

    const [page , setPage] = useState(1);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            const clientID = '?client_id=hA3cliXCAUI3EAj5yajsSmqvje0h3wmEvrDNJGPFJnI';
            const mainUrl = 'https://api.unsplash.com/photos/';
            let url = mainUrl + clientID;
            if (searchQuery) {
                url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`
            }

            url +=`&page=${page}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setPhotos(data.results || data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchImages();
    }, [searchQuery ,page]);


    useEffect(() => {
        const handleScroll = () => {
            if (
                !loading &&
                window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200
            ) {
                setPage(prevPage => prevPage + 1);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);
    
    const handleFavoriteClick = (photoId) => {
        const existingIndex = favouritePhotos.findIndex((favPhoto) => favPhoto.id === photoId);
        if (existingIndex !== -1) {
            setFavouritePhotos(prevFavorites => prevFavorites.filter((favPhoto) => favPhoto.id !== photoId));
        } else {
            const photoToAdd = photos.find((photo) => photo.id === photoId);
            setFavouritePhotos(prevFavorites => [...prevFavorites, photoToAdd]);
        }
    }

    const handleShare = (photoUrl) => {
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this awesome photo: ${photoUrl}`)}`;
        window.open(shareUrl, '_black');
    }

    const handleDownload = (photoUrl, photoId) => {
        const link = document.createElement('a');
        link.href = photoUrl;
        link.download = `photo_${photoId}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    }

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    }

    return (
        <main>
            <section className='photos'>
                <div className='photos-center'>
                {loading ? (
                    <p>Loading ...</p>
                ) : (
                    photos.map((photo, index) => (
                        <article key={photo.id} className={`photo ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'favourite-photo' : ""}`}>
                            <img src={photo.urls.regular} alt={photo.alt_description} onClick={() => openLightbox(index)} />
                            <div className='photo-info'>
                                <div className='photo-header'>
                                    <h4>{photo.user.name}</h4>
                                    <button className={`favourite-btn ${favouritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'active' : ""}`} onClick={() => handleFavoriteClick(photo.id)}>
                                        <FaHeart />
                                    </button>
                                    <div className='photo-actions'>
                                        <p>
                                            <FaHeart className='heart-icon' />
                                            {photo.likes}
                                        </p>
                                        <button className='share-btn' onClick={() => handleShare(photo.urls.regular)}>
                                            <FaShare />
                                        </button>
                                        <button className='download-btn' onClick={() => handleDownload(photo.urls.full, photo.id)}>
                                            <FaDownload />
                                        </button>
                                    </div>
                                    <a href={photo.user.portfolio_url}>
                                        <img
                                            src={photo.user.profile_image.medium}
                                            className='user-img'
                                            alt={photo.user.name}
                                        />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))
                )}
                </div>
            </section>
            {isLightboxOpen && (
                <Lightbox
                    mainSrc={photos[lightboxIndex].urls.full}
                    onCloseRequest={closeLightbox}
                />
            )}
        </main>
    );
};

export default Photo;
