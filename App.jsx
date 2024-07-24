import './App.css';
import { Fragment, useState, useEffect } from 'react';

function Header({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState('');

  function getDataInfo(e) {
    setInputValue(e.target.value);
  }

  function handleSearch() {
    setSearchQuery(inputValue);
  }

  return (
    <Fragment>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="BoxInfo">
        <i className="fa-brands fa-readme"></i>
        <h1>MangaUniverse</h1>
        <p>Join <br />now</p>
        <a href='https://discord.com/channels/290843998296342529/290843998296342529' className="box" target='_blank' rel="noreferrer"><i className="fa-brands fa-discord"></i></a>
        <a href='https://www.facebook.com/mangarockapp/' className="box2" target='_blank' rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
        <a href='https://www.reddit.com/r/manga/' className="box3" target='_blank' rel="noreferrer"><i className="fa-brands fa-reddit"></i></a>
        <a href='https://x.com/shonenjump' className="box4" target='_blank' rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
        <input type="search" onChange={getDataInfo} placeholder='Search any Comic or Manga...' />
        <button onClick={handleSearch} className='search'><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </Fragment>
  );
}

function Menu({ setSearchQuery }) {
  function handleMenuClick(e) {
    setSearchQuery(e.target.innerText);
  }

  return (
    <Fragment>
      <div className="Menu">
        <div className="close">Genres</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="action.jpeg" alt="Action" /> Action</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="advent..jpeg" alt="Adventure" /> Adventure</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="comdey.jpeg" alt="Comedy" /> Comedy</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="drama.jpg" alt="Drama" /> Drama</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="fact.jpg" alt="Fantasy" /> Fantasy</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="horror.jpg" alt="Horror" /> Horror</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="kid.jpg" alt="Kids" /> Kids</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="demon.jpeg" alt="Demons" /> Demons</div>
        <div className="MenuBox" onClick={handleMenuClick}><img src="mar.jpeg" alt="Martial Arts" /> Martial Arts</div>
      </div>
    </Fragment>
  );
}

function Data({ searchQuery }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://kitsu.io/api/edge/manga?filter[text]=${searchQuery}`)
        .then((result) => result.json())
        .then((resp) => {
          setData(resp.data);
        });
    }
  }, [searchQuery]);

  const handleBoxInfoClick = (comicTitle) => {
    console.log(comicTitle);
  };

  const boxes = data.map((comic, index) => (
    <div key={index} className="boxInfo" onClick={() => handleBoxInfoClick(comic.attributes.titles.ja_jp)}>
      <img src={comic.attributes.posterImage.original} alt={comic.attributes.titles.ja_jp} />
      <h1>{comic.attributes.titles.en || comic.attributes.titles.en_jp || comic.attributes.titles.ja_jp}</h1>
      <p>
        Manga | 
        <span> {comic.attributes.chapterCount ? `${comic.attributes.chapterCount} Chapters |` : 'Ongoing |'} </span>
        <big> {comic.attributes.averageRating ? `${comic.attributes.averageRating} AverageRating |` : 'N/A AverageRating |'} </big>
        <small>{comic.attributes.startDate} to {comic.attributes.endDate || '?'}</small>
      </p>
    </div>
  ));

  return (
    <Fragment>
      <div className="data">
        <h1>{searchQuery}  Manga</h1>
        <div className="info">{boxes}</div>
      </div>
    </Fragment>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('Naruto');

  return (
    <Fragment>
      <Menu setSearchQuery={setSearchQuery} />
      <Data searchQuery={searchQuery} />
      <Header setSearchQuery={setSearchQuery} />
    </Fragment>
  );
}

export default App;