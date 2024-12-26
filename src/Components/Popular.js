import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Spotlight from './Spotlight';

function Popular({ rendered }) {
    const { popularAnime, isSearch, searchResults } = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch && rendered === 'popular') {
            return popularAnime?.map((anime) => {
                return (
                    <div className="anime-card" key={anime.mal_id}>
                        <Link to={`/anime/${anime.mal_id}`}>
                            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                        </Link>
                        <p className="anime-title">{anime.title}</p>
                    </div>
                );
            });
        } else {
            return searchResults?.map((anime) => {
                return (
                    <div className="anime-card" key={anime.mal_id}>
                        <Link to={`/anime/${anime.mal_id}`}>
                            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                        </Link>
                        <p className="anime-title">{anime.title}</p>
                    </div>
                );
            });
        }
    };

    return (
        <PopularStyled>
            {!isSearch && <Spotlight />}
            <div className="popular-anime">
                {conditionalRender()}
            </div>
        </PopularStyled>
    );
}

const PopularStyled = styled.div`
    display: flex;
    flex-direction: column;

    .popular-anime {
        margin-top: 2rem;
        padding: 1rem 2rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 1.5rem;
        background-color: black;

        @media (min-width: 768px) {
            padding: 2rem 4rem;
            grid-gap: 2rem;
        }

        @media (min-width: 1200px) {
            padding: 2rem 5rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .anime-card {
            position: relative;
            height: 400px;
            border-radius: 7px;
            border: 5px solid #e5e7eb;
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            @media (min-width: 768px) {
                height: 450px;
            }

            @media (min-width: 1200px) {
                height: 500px;
            }

            a img {
                width: 100%;
                height: calc(100% - 40px);
                object-fit: cover;
                border-radius: 5px;
            }

            .fav-heart-icon {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: red;
                cursor: pointer;
                z-index: 2;

                @media (min-width: 1200px) {
                    font-size: 1.8rem;
                }
            }

            .anime-title {
                position: absolute;
                bottom: 10px;
                left: 10px;
                right: 10px;
                color: white;
                font-size: 0.9rem;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                @media (min-width: 768px) {
                    font-size: 1rem;
                }
            }

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            }
        }
    }
`;
export default Popular;
