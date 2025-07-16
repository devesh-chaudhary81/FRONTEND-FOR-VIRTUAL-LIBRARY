import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import logo from '../assets/website-logo.jpg';

const Home = () => {
  return (
    <>
      <div className="background-image"></div>
      <div className="background-overlay"></div>

      <div className="main-content">
        <header className="header">
          <div>
            <img src={logo} alt="logo" className="logoimg" />
          </div>
          <nav className="navbar">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="#">My Shelf</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/feedback">Feedback</Link>
              <Link to="/categories">Categories</Link>
              <button className="profile-button">Me</button>
            </div>
          </nav>
        </header>

        <main>
          <section className="hero">
            <h1>
              Welcome to <span className="role">Antarix</span>
            </h1>
            <p className="intro">
              Explore a universe of stories, knowledge, and imagination. Your next great read is just a search away.
            </p>
            <form className="hero-search-form">
              <input
                type="search"
                placeholder="Search for books, authors, or genres"
                className="hero-search-input"
              />
            </form>
            <button className="hero-cta-button">Search Now</button>
          </section>

          <section className="featured">
            <div className="featured-content">
              <div className="featured-text">
                <h2>Our Featured Collections</h2>
                <p>
                  Discover curated collections from various genres and eras.
                  Handpicked by our librarians to spark your curiosity and imagination.
                </p>
                <button className="featured-cta-button">
                  <Link to="/categories" style={{ color: 'white', textDecoration: 'none' }}>
                    Explore More
                  </Link>
                </button>
              </div>

              <div className="featured-images">
                <div className="image-card-wrapper">
                  <div className="image-card">
                    <div className="image-card-inner">
                      <img
                        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
                        alt="Woman in a library aisle looking at books."
                      />
                    </div>
                  </div>
                </div>
                <div className="image-card-wrapper">
                  <div className="image-card">
                    <div className="image-card-inner">
                      <img
                        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop"
                        alt="A stack of old, hard-cover books."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-images-2">
              <div className="image-card-wrapper">
                <div className="image-card">
                  <div className="image-card-inner">
                    <img
                      src="https://media.istockphoto.com/id/1218656325/photo/laptop-with-online-library-realistic-3d-rendering.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZwTbE90EDfj64GhZRRsqipTaa-kHlXbpDZKQ6fozpQA="
                      alt="Online library on laptop"
                    />
                  </div>
                </div>
              </div>
              <div className="image-card-wrapper">
                <div className="image-card">
                  <div className="image-card-inner">
                    <img
                      src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=60"
                      alt="Books stacked in a library"
                    />
                  </div>
                </div>
              </div>
              <div className="image-card-wrapper">
                <div className="image-card">
                  <div className="image-card-inner">
                    <img
                      src="https://media.istockphoto.com/id/481209467/photo/youth-reading-books-in-library.webp?a=1&b=1&s=612x612&w=0&k=20&c=znfjoCoOJ778yCVjojhwCcnjApP7k3pJ8KRA6p0VaDU="
                      alt="Youth reading books"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;

