import { useState } from 'react';
import '../style/App.css';
import Filmes from './Filmes';
import Sessao from './Sessao';
import Assentos from './Assentos';
import Sucesso from './Sucesso';
import styled from 'styled-components';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="site">
        <StyledLink to="/">
          <Topo>CineFlex</Topo>
        </StyledLink>
        <Conteudo>
          <Routes>
            <Route path="/" element={<Filmes />} />
            <Route path="/sessao/:id" element={<Sessao />} />
            <Route path="/assento/:id" element={<Assentos />} />
            <Route path="/confirmacao" element={<Sucesso />} />
          </Routes>
        </Conteudo>
      </div>
    </BrowserRouter>
  );
}

export default App;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Topo = styled.div`
  width: 100%;
  height: 100px;
  background-color: #E2877E;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 250%;
  color: #FADBC5;
  text-decoration: none;
`;

const Conteudo = styled.div`
  width: 100%;
  min-height: 100vh;
`;
