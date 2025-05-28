import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

function Sucesso() {
  const location = useLocation();
  const navigate = useNavigate();

  const { filme, sessao, assentos, nome, cpf } = location.state || {};

  if (!filme) {
    navigate("/");
    return null;
  }

  return (
    <Container>
        <Titulo>Pedido finalizado!</Titulo>
      <Pedido>
        <Subtitulo>Filme e sessão </Subtitulo>
            <Linha>_____________________________________</Linha>

        <div>{filme}</div>
        <div> {sessao}</div>
        <Subtitulo>Assentos:</Subtitulo>
            <Linha>_____________________________________</Linha>
        <div>Assento(s) {assentos.join(", ")}</div>
        <Subtitulo>Comprador(a):</Subtitulo>
            <Linha>_____________________________________</Linha>
        <div> Nome: {nome}</div>
        <div> CPF: {cpf}</div>

        <BotaoVoltar onClick={() => navigate("/")}>
          Voltar para a página inicial
        </BotaoVoltar>
      </Pedido>
    </Container>
  );
}

export default Sucesso;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Titulo = styled.div`
  color: #9DB899;
  font-size: 200%;
`;

const Subtitulo = styled.div`
  color: #e2877e;
  font-size: 200%;
`;

const Linha = styled.div`
  color: #49535E;
  font-size: 100%;
`;

const Pedido = styled.div`
  width: 50%;
  background-color: #2B2D36;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  gap: 10px;
  text-align: left;
`;

const BotaoVoltar = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: #E2877E;
  color: #2B2D36;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e1d1cd;
  }
`;
