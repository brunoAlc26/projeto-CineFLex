import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, Route, useParams } from "react-router-dom";
import Assentos from "./Assentos";

function Sessao() {
  const [image, setImage] = useState(null);
  const [sessoes, setSessoes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
      .then((res) => {
        setImage(res.data);
        setSessoes(res.data.days);
      })
      .catch((err) => console.log(err.response.data));
  }, [id]);

  console.log('ID atual:', id);

  if (!image) {
    return <Sessoes><h1>Carregando...</h1></Sessoes>;
  }

return (
  <Sessoes>
    {sessoes.map(img => (
      <Dia key={img.date}>
        <div>{img.weekday}, {img.date}</div>
        <div>_______________________________</div>
        <div>
          {img.showtimes.map((horario) => (
            <Link key={horario.id} to={`/assento/${horario.id}`}>
              <Horario>{horario.name}</Horario>
            </Link>
          ))}
        </div>
      </Dia>
    ))}
  </Sessoes>
);

}

export default Sessao;

const Sessoes = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  gap: 30px;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
`;

const Poster = styled.div`
  height: 100px;
  width: 100px;
`;

const Dia = styled.div`
  height: 100px;
  width: 50%;
  background-color: #2B2D36;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Horario = styled.button`
  margin: 5px;
  padding: 8px 16px;
  background-color: #2B2D36;
  color: white;
  border: 2px solid #EE897F;
  color: #EE897F;
  border-radius: 5px;
  cursor: pointer;
`;

