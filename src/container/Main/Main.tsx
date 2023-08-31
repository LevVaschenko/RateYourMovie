import React, { useState, useEffect } from 'react'
import './Main.scss'

type Movie = {
    posterUrl: string
    nameRu: string
    nameEn: string
    year: number
    ratingKinopoisk: number
}

const Main = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([])

    const token = '52f30a40-4dc8-463a-ae4a-811304807c72'

    useEffect(() => {
        const getMovies = async () => {
            if (searchTerm.trim() !== '') {
                try {
                    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${searchTerm}&page=1`, {
                        headers: {
                            'X-API-KEY': token,
                            'accept': 'application/json',
                        },
                    })

                    const data = await response.json()

                    if (data.items) {
                        const sortedMovies = data.items
                            .sort((a: any, b: any) => b.ratingKinopoisk - a.ratingKinopoisk)
                            .map((film: any) => ({
                                posterUrl: film.posterUrl,
                                nameRu: film.nameRu,
                                nameEn: film.nameEn,
                                year: film.year,
                                ratingKinopoisk: film.ratingKinopoisk,
                            }))

                        setSearchResults(sortedMovies)
                    } else {
                        setSearchResults([])
                    }
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            } else {
                setSearchResults([]);
            }
        }

        getMovies()
    }, [searchTerm, token])

    return (
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
                            <img src={movie.posterUrl} alt={`${movie.nameRu} poster`} />
                            <div className="movie-data">
                                <p>{movie.nameRu}</p>
                                <p>{movie.nameEn}</p>
                                <p>Year: {movie.year}</p>
                                <p>Rating: {movie.ratingKinopoisk}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main
