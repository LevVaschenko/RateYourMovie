import React, { useState, useEffect } from 'react'
import './Main.scss'
import notFoundImage from './not-found.svg'

type Movie = {
    Poster: string | undefined
    Title: string
    Year: string
}

type Props = {};

const Main = (props: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([])

    const apiKey = 'b2254091'

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    setSearchResults(data.Search)
                } else {
                    setSearchResults([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [searchTerm, apiKey])

    return (
        <>
            <div className="main-container">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">&#128269;</span>
                </div>
                <div className="movie-results">
                    {searchResults.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <div className="movie-poster">
                                {movie.Poster !== 'N/A' ? (
                                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                ) : (
                                    <img src={notFoundImage} />
                                )}
                                {movie.Title} ({movie.Year})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Main
