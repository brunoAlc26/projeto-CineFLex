import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Filmes() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
    promessa.then((response) => {
      console.log("Filmes recebidos:", response.data);
      setImages(response.data);
    });
    promessa.catch((error) => console.log(error.response?.data || error.message));
  }, []);

  return (
    <>
    <Container>
    <Titulo>Em cartaz</Titulo>
      <Catalogo>
        {images.map((img) => (
          <div key={img.id}>
            <Link to={`/sessao/${img.id}`}>
              <Imagens src={img.posterURL} alt={img.title} />
            </Link>
          </div>
        ))}
      </Catalogo>
      </Container>
    </>
  );
}

export default Filmes;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;     
  justify-content: center; 
  gap: 20px;                
  padding: 20px;
`;

const Titulo = styled.div`
color: white;
font-size: 200%;
`


const Imagens = styled.img`
  height: 300px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
`;

const Catalogo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;
