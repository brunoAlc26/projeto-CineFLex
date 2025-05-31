import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

function Sucesso() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nome, cpf, assentos } = location.state || {};

  console.log("location.state:", location.state); 

  if (!location.state) {
    return <h2>Erro: Dados não encontrados. Volte para a tela inicial.</h2>;
  }

  return (
    <Container>
      <Pedido>
        <h2>Pedido feito com sucesso!</h2>
<div>
  <strong>Assentos:</strong>
  {assentos.map((nome, i) => (
    <div key={i}>Assento {nome}</div>
  ))}
</div>

        <div>
          <strong>Comprador(a):</strong>
          <div>Nome: {nome}</div>
          <div>CPF: {cpf}</div>
        </div>
        <BotaoVoltar onClick={() => navigate("/")}>Voltar para início</BotaoVoltar>
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
