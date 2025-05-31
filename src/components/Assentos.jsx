import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

function Assentos() {
  const [assentos, setAssentos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [filme, setFilme] = useState("");
  const [sessao, setSessao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`)
      .then(res => {
        setAssentos(res.data.seats);
        setFilme(res.data.movie.title);
        setSessao(`${res.data.day.weekday} - ${res.data.name}`);
      })
      .catch(err => console.log(err));
  }, [id]);

  function toggleSelecionado(assentoId) {
    if (selecionados.includes(assentoId)) {
      setSelecionados(selecionados.filter(id => id !== assentoId));
    } else {
      setSelecionados([...selecionados, assentoId]);
    }
  }


function Reservas() {
  if (selecionados.length === 0) {
    alert("Você precisa selecionar pelo menos uma cadeira.");
    return;
  }
  if (nome.trim() === "") {
    alert("Por favor, preencha o nome do comprador.");
    return;
  }
  if (cpf.trim() === "") {
    alert("Por favor, preencha o CPF do comprador.");
    return;
  }

  const dadosReserva = {
    ids: selecionados,
    name: nome,
    cpf: cpf
  };

  axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", dadosReserva)
    .then(() => {
navigate("/confirmacao", {
  state: {
    nome,
    cpf,
    assentos: assentos
      .filter(assento => selecionados.includes(assento.id))
      .map(assento => assento.name)
  }
});

    })
    .catch((err) => {
      console.log("Erro ao reservar assentos:", err);
      alert("Ocorreu um erro ao reservar os assentos.");
    });
}

  return (
    <Container>
      <h2>Selecione o(s) assento(s)</h2>
      <SeatsContainer>
        {assentos.map((assento) => {
          const isSelected = selecionados.includes(assento.id);
          return (
            <Seat
              key={assento.id}
              available={assento.isAvailable}
              selected={isSelected}
              disabled={!assento.isAvailable}
              onClick={() => assento.isAvailable && toggleSelecionado(assento.id)}
            >
              {assento.name}
            </Seat>
          );
        })}
      </SeatsContainer>

      <div>____________________________________________________</div>

      <div>Nome do comprador(a)</div>
      <CaixaTexto
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome..."
      />

      <div>CPF do comprador(a)</div>
      <CaixaTexto
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Digite seu CPF..."
      />

      <BotaoConfirmar onClick={Reservas}>Reservar assento(s)</BotaoConfirmar>
    </Container>
  );
}

export default Assentos;

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 20px;
  margin-bottom: 15px;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SeatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 50%;
`;

const Seat = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ available, selected }) =>
    !available ? "#2B2D36" : selected ? "#FADBC5" : "#9DB899"};
  color: #2B2D36;
  border: 3px solid;
  border-radius: 50%;
  border-color: ${({ available, selected }) =>
    !available ? "#2B2D36" : selected ? "#E2877E" : "#9DB899"};

  font-weight: bold;
  user-select: none;
`;

const CaixaTexto = styled.input`
  width: 50%;
  height: 30px;
`;

const BotaoConfirmar = styled.button`
  width: 50%;
  height: 30px;
  background-color: #e2877e;
  border-radius: 10px;
  cursor: pointer;
`;
