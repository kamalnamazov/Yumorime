import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Layout from './Layout'

function AnimeItem() {
    const { id } = useParams()

    const [anime, setAnime] = useState({})
    const [characters, setCharacters] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [showMore, setShowMore] = useState(false)

    const baseUrl = 'https://api.jikan.moe/v4/'

    const {
        title, synopsis, 
        trailer, duration, aired, 
        season, images, score, 
        popularity, status, 
        rating, source, studios, episodes, title_japanese, demographics
    } = anime

    const getAnime = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        const data = await response.json()
        setAnime(data.data)
    }

    const getCharacters = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`)
        const data = await response.json()
        setCharacters(data.data)
    }

    const getRecommendations = async (animeId) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`)
        const data = await response.json()
        setRecommendations(data.data.slice(0, 6)) 
    }

    useEffect(() => {
        getAnime(id)
        getCharacters(id)
        getRecommendations(id)
    }, [id])

    return (
        <Layout>
        <AnimeItemStyled>
            <div className="main-info">
                <div className="image">
                    <img src={images?.jpg.large_image_url} alt={title} />
                </div>
                <div className="info">
                    <h1>{title}</h1>
                    <div className="anime-details">
                        <p><span>Aired:</span> {aired?.string}</p>
                        <p><span>Rating:</span> {rating}</p>
                        <p><span>Score:</span> {score}</p>
                        <p><span>Popularity:</span> {popularity}</p>
                        <p><span>Status:</span> {status}</p>
                        <p><span>Source:</span> {source}</p>
                        <p><span>Season:</span> {season}</p>
                        <p><span>Duration:</span> {duration}</p>
                        <p><span>Episodes:</span> {episodes}</p>
                        <p><span>Demographics:</span> {demographics?.map(demographics => demographics.name).join(', ')}</p>
                        <p><span>Studios:</span> {studios?.map(studio => studio.name).join(', ')}</p>
                        <p><span>Japanese Title:</span> {title_japanese}</p>
                    </div>
                </div>
            </div>

            <div className="windows">
                <div className="window plot">
                    <h3>Plot</h3>
                    <p>{showMore ? synopsis : `${synopsis?.substring(0, 450)}...`}</p>
                    <button onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>
                </div>
                <div className="window characters">
                    <h3>Characters</h3>
                    <div className="character-list">
                        {characters.map((character, index) => (
                            
                            <div className="character" key={index}>
                                <img src={character.character.images?.jpg.image_url} alt={character.character.name} />
                                <h4>{character.character.name}</h4>
                                <p>{character.role}</p>
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>

            <div className="trailer-section">
                <h3>Trailer</h3>
                {trailer?.embed_url ? (
                    <iframe
                        src={trailer.embed_url}
                        title="Trailer"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>Trailer not available</p>
                )}
            </div>

            <div className="recommendations">
                <h3>Recommendations</h3>
                <div className="recommendation-list">
                    {recommendations.length > 0 ? (
                        recommendations.map((rec, index) => (
                            <Link to={`/anime/${rec.entry.mal_id}`} key={index}>
                                <div className="recommendation">
                                    <img src={rec.entry.images.jpg.image_url} alt={rec.entry.title} />
                                    <h4>{rec.entry.title}</h4>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No recommendations available</p>
                    )}
                </div>
            </div>
        </AnimeItemStyled>
        </Layout>
    )
}

const AnimeItemStyled = styled.div`
    padding: 2rem 5rem;
    color: white;
    background-color: black;

    .main-info {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;

        .image img {
            width: 100%;
            max-width: 300px;
            border-radius: 10px;
        }

        .info {
            flex: 1;

            h1 {
                font-size: clamp(1.8rem, 2.5vw, 2.5rem);
                margin-bottom: 1rem;
            }

            .anime-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;

                p {
                    span:first-child {
                        font-weight: bold;
                        color: #27AE60;
                    }
                }
            }
        }
    }

    .windows {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
        flex-wrap: wrap;

        .window {
            flex: 1;
            background-color: #1c1c1c;
            border-radius: 10px;
            padding: 1rem;
            overflow-y: auto;
            max-height: 400px;

            button {
                padding: 0.7rem 1.5rem;
                background-color: #27AE60;
                color: white;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                transition: background 0.3s ease;

                &:hover {
                    background-color: rgb(11, 108, 51);
                }
            }

            h3 {
                margin-bottom: 1rem;
                color: #27AE60;
            }

            .character-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 1rem;

                .character {
                    text-align: center;

                    img {
                        width: 100%;
                        border-radius: 5px;
                    }

                    h4 {
                        margin: 0.5rem 0 0.2rem;
                    }

                    p {
                        font-size: 0.8rem;
                        color: #aaa;
                    }
                }
            }
        }
    }

    .trailer-section {
        margin-top: 2rem;

        iframe {
            width: 100%;
            max-width: 800px;
            height: auto;
            aspect-ratio: 16 / 9;
            border: none;
            border-radius: 10px;
        }
    }

    .recommendations {
        margin-top: 2rem;

        .recommendation-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;

            .recommendation {
                text-align: center;

                img {
                    width: 100%;
                    border-radius: 5px;
                }

                h4 {
                    margin-top: 0.5rem;
                    font-size: 1rem;
                }
            }
        }
    }

    @media (max-width: 768px) {
        padding: 1rem 2rem;

        .main-info {
            flex-direction: column;
        }

        .windows {
            flex-direction: column;
        }
    }

    @media (max-width: 480px) {
        .main-info .info h1 {
            font-size: 1.8rem;
        }

        .windows .window {
            max-height: 300px;
        }

        .recommendation-list {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        }
    }
`;


export default AnimeItem;
