import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Layout({ children }) {
    return (
        <LayoutStyled>
            <header>
                <div className="header-content">
                    <div className="logo">
                        <Link to="/">
                            <img
                                src="https://img.icons8.com/ios/50/ffffff/anime.png"
                                alt="Logo"
                            />
                        </Link>
                        <Link to="/">
                            <h1>YUMORIME</h1>
                        </Link>
                    </div>
                </div>
            </header>

            <main>{children}</main>

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
                    <div className="rights">
                        Yumorime 2024. All rights reserved.
                    </div>
                </div>
            </footer>
        </LayoutStyled>
    );
}

const LayoutStyled = styled.div`
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
export default Layout;
