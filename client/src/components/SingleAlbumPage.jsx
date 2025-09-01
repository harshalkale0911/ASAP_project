import React, { useState } from "react";

const SingleAlbumPage = () => {
    
    const album = {
        title: "÷ (Divide)",
        artist: "Ed Sheeran",
        cover: "https://www.thisisdig.com/wp-content/uploads/2021/08/es-divide-final-artwork-lo-res-e1628675708209.jpg", 
        songs: [
            { id: 1, title: "Shape of you", lyrics: "Girl, you know I want your love...", rating: 4 },
            { id: 2, title: "Happier", lyrics: "'Cause baby you look happier, you do...", rating: 5 },
            { id: 3, title: "Perfect", lyrics: "Cause we were just kids when we fell in love, not knowin' what it was...", rating: 3 },
        ],
        description: "÷ (pronounced “Divide”) is the third studio album by Ed Sheeran, following in the mathematical footsteps of his + (Plus) and x (Multiply) albums. ÷ was released on March 3, 2017 through Asylum Records, a division of Atlantic Records."
    };

    const [favorites, setFavorites] = useState([]);

    
    const toggleFavorite = (songId) => {
        if (favorites.includes(songId)) {
            setFavorites(favorites.filter((id) => id !== songId));
        } else {
            setFavorites([...favorites, songId]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row items-center md:items-start">
                    <img
                        src={album.cover}
                        alt={album.title}
                        className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                    <div className="md:ml-6 mt-4 md:mt-0">
                        <h1 className="text-5xl font-bold mb-2 text-white dark:text-white">{album.title}</h1>
                        <h2 className="text-2xl font-light text-gray-600 dark:text-gray-400">{album.artist}</h2>
                        <br />
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{album.description}</p>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-white">Songs</h3>
                    <ul className="space-y-4">
                        {album.songs.map((song) => (
                            <li
                                key={song.id}
                                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
                            >
                                <div>
                                    <h4 className="text-xl font-medium text-white dark:text-white">{song.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {song.lyrics}
                                    </p>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">Rating: {"⭐".repeat(song.rating)}</p>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(song.id)}
                                    className={`mt-4 md:mt-0 px-4 py-2 text-sm font-medium rounded-md shadow-md ${favorites.includes(song.id)
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                                        }`}
                                >
                                    {favorites.includes(song.id) ? "Remove from Favorites" : "Add to Favorites"}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SingleAlbumPage;
