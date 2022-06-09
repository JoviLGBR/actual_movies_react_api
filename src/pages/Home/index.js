import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "40fabc26838bd198230a45ced014e60b",
          language: "pt-BR",
          page: 1,
        },
      });

      //console.log(response.data.results.slice(0,10));
      setFilmes(response.data.results);
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <div className="item">
              <article key={filme.id}>
                <div className="titulo">
                  <strong>{filme.title}</strong>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt={filme.title}
                ></img>
                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
