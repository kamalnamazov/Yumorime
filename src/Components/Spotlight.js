import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function Spotlight() {
    const { popularAnime } = useGlobalContext();
    const sorted = popularAnime?.sort((a, b) => b.score - a.score)?.slice(0, 10);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % sorted.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + sorted.length) % sorted.length);
    };

    const currentAnime = sorted[currentIndex];

    return (
        <SpotlightStyled>
            {currentAnime && (
                <div className="spotlight-container">
                    <div className="content">
                        <div className="image">
                            <img src={currentAnime.images.jpg.large_image_url} alt={currentAnime.title} />
                        </div>
                        <div className="details">
                            <h1>{currentAnime.title}</h1>
                            <h4>Spotlight #{currentIndex + 1}</h4>
                            <p>
                                {currentAnime.synopsis?.length > 150
                                    ? `${currentAnime.synopsis.slice(0, 150)}...`
                                    : currentAnime.synopsis}
                            </p>
                            <Link to={`/anime/${currentAnime.mal_id}`} className="about-button">
                                About
                            </Link>
                        </div>
                    </div>
                    <button className="arrow left" onClick={handlePrev}>
                        &larr;
                    </button>
                    <button className="arrow right" onClick={handleNext}>
                        &rarr;
                    </button>
                </div>
            )}
        </SpotlightStyled>
    );
}

const SpotlightStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
    height: 60vh;
    padding: 2rem;
    margin: 5rem 0;

    .spotlight-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        position: relative;
        flex-wrap: wrap; 

        .arrow {
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
                color: #27ae60;
            }
        }

        .content {
            display: flex;
            align-items: center;
            gap: 2rem;
            max-width: 900px;
            flex-wrap: wrap; 

            .image {
                flex-shrink: 0;

                img {
                    width: 100%; 
                    max-width: 300px;
                    border-radius: 10px;
                    border: 3px solid #27ae60;
                }
            }

            .details {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                flex: 1; 

                h1 {
                    font-size: clamp(1.5rem, 2vw, 2rem); 
                    color: #27ae60;
                }

                h4 {
                    font-size: clamp(1rem, 1.5vw, 1.2rem); 
                    color: #aaa;
                }

                p {
                    font-size: clamp(0.9rem, 1vw, 1rem); 
                    line-height: 1.5;
                    color: #ccc;
                }

                .about-button {
                display: inline-block;
                    text-decoration: none;
                    background-color: #27ae60;
                    color: #fff;
                    padding: 0.5rem 1.5rem;
                    border-radius: 5px;
                    font-size: clamp(0.9rem, 1vw, 1rem); 
                    text-align: center;
                    transition: background-color 0.3s ease;

                    &:hover {
                        background-color: #1f7a46;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        height: auto; 
        padding: 2rem;

        .spotlight-container {
            flex-direction: column; 
            gap: 1.5rem;
        }

        .content {
            flex-direction: column; 
        }

        .image img {
            max-width: 100%; 
        }
    }

    @media (max-width: 480px) {
        .arrow {
            font-size: 1.5rem; 
        }

        .details h1,
        .details h4,
        .details p,
        .about-button {
            text-align: center; 
        }
    }
`;


export default Spotlight;
