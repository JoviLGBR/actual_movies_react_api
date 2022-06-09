import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./filmes-info.css";
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilmes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "40fabc26838bd198230a45ced014e60b",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilmes(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilmes();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, [navigate, id]);

  function salvarFilmes(){
      const minhaLista = localStorage.getItem("@jovimovies");

      let filmesSalvos = JSON.parse(minhaLista) || [];

      const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id);

      if(hasFilme){
          toast.warn("Esse filme já está na sua lista!");
          return;
      }

      filmesSalvos.push(filme);
      localStorage.setItem("@jovimovies", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes....</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      ></img>
      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilmes}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
