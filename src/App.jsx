import { useEffect, useState } from "react";

export default function App() {
  const [shows, setShows] = useState([]);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=popular")
      .then(res => res.json())
      .then(data => {
        setShows(data);
        setBanner(data[Math.floor(Math.random() * data.length)].show);
      });
  }, []);

  return (
    <>
      <div className="navbar">NETFLIX</div>

      {banner && (
        <header
          className="banner"
          style={{
            backgroundImage: `url(${banner.image?.original})`
          }}
        >
          <h1>{banner.name}</h1>
          <p dangerouslySetInnerHTML={{ __html: banner.summary }} />
        </header>
      )}

      <h2 className="title">Popular Shows</h2>
      <div className="row">
        {shows.map(item =>
          item.show.image && (
            <img
              key={item.show.id}
              src={item.show.image.medium}
              alt={item.show.name}
            />
          )
        )}
      </div>
    </>
  );
}
