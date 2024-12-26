import React, { useState } from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Homepage() {
    const {
        handleSubmit,
        search,
        searchAnime,
        handleChange,
        getPopularAnime,
    } = useGlobalContext();

    const [rendered, setRendered] = useState('popular');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const clearSearch = () => {
        handleChange({ target: { value: '' } }); 
    };

    const switchComponent = () => {
        return <Popular rendered={rendered} />;
    };
    

    const handleFavoritesClick = () => {
        if (!isLoggedIn) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000); 
        }
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <HomepageStyled>
            <header>
                <div className="header-content">
                    <div className="logo" onClick={clearSearch}>
                        <Link to="/">
                            <img
                                src="https://img.icons8.com/ios/88/ffffff/anime.png"
                                alt="Logo"
                            />
                        </Link>
                        <Link to="/">
                            <h1>YUMORIME</h1>
                        </Link>
                    </div>

                    <div className="search-container">
                        <form action="" className="search-form" onSubmit={handleSubmit}>
                            <div className="input-control">
                                <input
                                    type="text"
                                    placeholder="Search Anime"
                                    value={search}
                                    onChange={handleChange}
                                />
                                <button type="submit">Search</button>
                            </div>
                        </form>
                    </div>

                    <div className="right-section">
                        <div className="social-icons">
                            <a href="https://www.instagram.com/kamalnamzv/" target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/ios/24/ffffff/instagram-new--v1.png" alt="IG" />
                            </a>
                            <a href="https://x.com/yumor88" target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/ios/24/ffffff/x--v1.png" alt="TW" />
                            </a>
                            <a href="https://github.com/kamalnamazov" target="_blank" rel="noopener noreferrer">
                                <img src="https://img.icons8.com/ios/24/ffffff/github--v1.png" alt="GH" />
                            </a>
                        </div>
                        <div className="favorites">
                            <button onClick={handleFavoritesClick}>Favorites</button>
                            {showTooltip && <span className="tooltip">Account required</span>}
                        </div>
                        <button className="account" onClick={toggleModal}>
                            Account
                        </button>
                    </div>
                </div>
            </header>
            {switchComponent()}
            <footer>
                <div className="footer-content">
                    <div className="links">
                        <a href="https://myanimelist.net" target="_blank" rel="noopener noreferrer">
                            MyAnimeList
                        </a>
                        <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer">
                            Jikan API
                        </a>
                    </div>
                    <div className="rights">© Yumorime 2024. All Rights Reserved.</div>
                </div>
            </footer>

            {isModalOpen && (
                <Modal>
                    <div className="modal-content">
                        <h2>{isLoginPage ? 'Login' : 'Register'}</h2>
                        <form>
                            <input type="text" placeholder="Username" required />
                            {!isLoginPage && <input type="email" placeholder="Email" required />}
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="show-password-btn"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <button type="submit">
                                {isLoginPage ? 'Login' : 'Register'}
                            </button>
                        </form>
                        <p>
                            {isLoginPage ? 'Don’t have an account?' : 'Already have an account?'}{' '}
                            <span onClick={() => setIsLoginPage(!isLoginPage)}>
                                {isLoginPage ? 'Register' : 'Login'}
                            </span>
                        </p>
                        <button className="close-btn" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </HomepageStyled>
    );
}


const HomepageStyled = styled.div`
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    header {
        padding: 1rem 2rem;
        border-bottom: 2px solid #333;

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            a {
                text-decoration: none;
                color: white;
            }

            img {
                width: 40px;
                cursor: pointer;
            }

            h1 {
                font-size: 1.5rem;
                font-weight: bold;
                cursor: pointer;
                color: white;
            }
        }

        .search-container {
            flex: 1;
            margin: 0 2rem;
            width: 100%;

            .search-form {
                display: flex;

                .input-control {
                    display: flex;
                    width: 100%;
                }

                input {
                    flex: 1;
                    padding: 0.7rem;
                    border: none;
                    border-radius: 30px 0 0 30px;
                    outline: none;
                }

                button {
                    padding: 0.7rem 1.5rem;
                    background-color: #27ae60;
                    color: white;
                    border: none;
                    border-radius: 0 30px 30px 0;
                    cursor: pointer;
                    transition: background 0.3s ease;

                    &:hover {
                        background-color: #1e874b;
                    }
                }
            }
        }

        .right-section {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            flex-wrap: wrap;

            .social-icons {
                display: flex;
                gap: 0.5rem;

                a {
                    color: white;
                    font-size: 1.2rem;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
            }

            .favorites {
                position: relative;

                button {
                    background-color: transparent;
                    color: white;
                    border: 2px solid #27ae60;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: #27ae60;
                    }
                }

                .tooltip {
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: black;
                    color: white;
                    padding: 0.5rem;
                    border: 1px solid #27ae60;
                    border-radius: 5px;
                    font-size: 0.8rem;
                }
            }

            .account {
                background-color: transparent;
                color: white;
                border: 2px solid #27ae60;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background-color: #27ae60;
                }
            }
        }
    }

    footer {
        background-color: #333;
        color: #ccc;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        flex-wrap: wrap;

        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .links {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;

                a {
                    color: #ccc;
                    text-decoration: none;
                    transition: color 0.3s ease, text-decoration 0.3s ease;

                    &:hover {
                        color: pink;
                        text-decoration: underline;
                    }
                }
            }

            .rights {
                font-size: 0.9rem;
                text-align: center;
            }
        }
    }

    @media (max-width: 768px) {
        header {
            .header-content {
                flex-direction: column;
                align-items: flex-start;
            }

            .search-container {
                margin: 1rem 0;
            }

            .right-section {
                justify-content: center;
            }
        }

        footer {
            flex-direction: column;
            align-items: center;

            .footer-content {
                flex-direction: column;
                align-items: center;
            }
        }
    }

    @media (max-width: 480px) {
        header {
            padding: 1rem;

            .logo {
                img {
                    width: 30px;
                }

                h1 {
                    font-size: 1.2rem;
                }
            }

            .search-container {
                .search-form {
                    flex-direction: column;

                    .input-control {
                        flex-direction: column;
                    }

                    input {
                        border-radius: 30px;
                        margin-bottom: 0.5rem;
                    }

                    button {
                        border-radius: 30px;
                    }
                }
            }

            .right-section {
                flex-direction: column;
                gap: 1rem;
            }
        }

        footer {
            padding: 1rem;

            .footer-content {
                text-align: center;
            }
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-content {
        background: #222;
        color: white;
        padding: 2rem;
        border-radius: 10px;
        width: 90%;
        max-width: 400px;
        text-align: center;

        h2 {
            margin-bottom: 1rem;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            input {
                padding: 0.7rem;
                border-radius: 5px;
                border: none;
                outline: none;
            }

            .password-container {
                position: relative;

                .show-password-btn {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: transparent;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
            }

            button {
                padding: 0.7rem;
                background-color: #27ae60;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s ease;

                &:hover {
                    background-color: #1e874b;
                }
            }
        }

        p {
            margin-top: 1rem;

            span {
                color: #27ae60;
                cursor: pointer;
                text-decoration: underline;
            }
        }

        .close-btn {
            margin-top: 1rem;
            background: transparent;
            border: 1px solid #27ae60;
            color: #27ae60;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background-color: #27ae60;
                color: white;
            }
        }
    }
`;

export default Homepage;
